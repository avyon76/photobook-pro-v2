import { pipeline, env } from '@huggingface/transformers';

// Configure transformers.js
env.allowLocalModels = false;
env.useBrowserCache = true;

const MAX_IMAGE_DIMENSION = 1024;

// AI Background Removal
export const removeBackground = async (imageElement: HTMLImageElement): Promise<Blob> => {
  try {
    console.log('Starting AI background removal...');
    const segmenter = await pipeline('image-segmentation', 'Xenova/segformer-b0-finetuned-ade-512-512', {
      device: 'webgpu',
    });
    
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    
    if (!ctx) throw new Error('Could not get canvas context');
    
    // Resize if needed
    let width = imageElement.naturalWidth;
    let height = imageElement.naturalHeight;

    if (width > MAX_IMAGE_DIMENSION || height > MAX_IMAGE_DIMENSION) {
      if (width > height) {
        height = Math.round((height * MAX_IMAGE_DIMENSION) / width);
        width = MAX_IMAGE_DIMENSION;
      } else {
        width = Math.round((width * MAX_IMAGE_DIMENSION) / height);
        height = MAX_IMAGE_DIMENSION;
      }
    }

    canvas.width = width;
    canvas.height = height;
    ctx.drawImage(imageElement, 0, 0, width, height);
    
    const imageData = canvas.toDataURL('image/jpeg', 0.8);
    const result = await segmenter(imageData);
    
    if (!result || !Array.isArray(result) || result.length === 0 || !result[0].mask) {
      throw new Error('Invalid segmentation result');
    }
    
    // Create output canvas
    const outputCanvas = document.createElement('canvas');
    outputCanvas.width = width;
    outputCanvas.height = height;
    const outputCtx = outputCanvas.getContext('2d');
    
    if (!outputCtx) throw new Error('Could not get output canvas context');
    
    outputCtx.drawImage(canvas, 0, 0);
    const outputImageData = outputCtx.getImageData(0, 0, width, height);
    const data = outputImageData.data;
    
    // Apply mask
    for (let i = 0; i < result[0].mask.data.length; i++) {
      const alpha = Math.round((1 - result[0].mask.data[i]) * 255);
      data[i * 4 + 3] = alpha;
    }
    
    outputCtx.putImageData(outputImageData, 0, 0);
    
    return new Promise((resolve, reject) => {
      outputCanvas.toBlob(
        (blob) => {
          if (blob) resolve(blob);
          else reject(new Error('Failed to create blob'));
        },
        'image/png',
        1.0
      );
    });
  } catch (error) {
    console.error('Error removing background:', error);
    throw error;
  }
};

// AI Photo Enhancement
export const enhancePhoto = async (
  imageElement: HTMLImageElement,
  options: {
    brightness?: number;
    contrast?: number;
    saturation?: number;
    sharpness?: number;
  } = {}
): Promise<Blob> => {
  const canvas = document.createElement('canvas');
  const ctx = canvas.getContext('2d');
  
  if (!ctx) throw new Error('Could not get canvas context');
  
  canvas.width = imageElement.naturalWidth;
  canvas.height = imageElement.naturalHeight;
  ctx.drawImage(imageElement, 0, 0);
  
  const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
  const data = imageData.data;
  
  const {
    brightness = 1.1,
    contrast = 1.1,
    saturation = 1.2,
  } = options;
  
  // Apply enhancements
  for (let i = 0; i < data.length; i += 4) {
    // Brightness
    data[i] *= brightness;
    data[i + 1] *= brightness;
    data[i + 2] *= brightness;
    
    // Contrast
    data[i] = ((data[i] - 128) * contrast) + 128;
    data[i + 1] = ((data[i + 1] - 128) * contrast) + 128;
    data[i + 2] = ((data[i + 2] - 128) * contrast) + 128;
    
    // Saturation
    const gray = 0.299 * data[i] + 0.587 * data[i + 1] + 0.114 * data[i + 2];
    data[i] = gray + saturation * (data[i] - gray);
    data[i + 1] = gray + saturation * (data[i + 1] - gray);
    data[i + 2] = gray + saturation * (data[i + 2] - gray);
    
    // Clamp values
    data[i] = Math.max(0, Math.min(255, data[i]));
    data[i + 1] = Math.max(0, Math.min(255, data[i + 1]));
    data[i + 2] = Math.max(0, Math.min(255, data[i + 2]));
  }
  
  ctx.putImageData(imageData, 0, 0);
  
  return new Promise((resolve, reject) => {
    canvas.toBlob(
      (blob) => {
        if (blob) resolve(blob);
        else reject(new Error('Failed to create enhanced image blob'));
      },
      'image/jpeg',
      0.95
    );
  });
};

// AI Auto Crop with Face Detection
export const autoCrop = async (imageElement: HTMLImageElement): Promise<Blob> => {
  try {
    const detector = await pipeline('object-detection', 'Xenova/detr-resnet-50', {
      device: 'webgpu',
    });
    
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    
    if (!ctx) throw new Error('Could not get canvas context');
    
    canvas.width = imageElement.naturalWidth;
    canvas.height = imageElement.naturalHeight;
    ctx.drawImage(imageElement, 0, 0);
    
    const imageData = canvas.toDataURL('image/jpeg', 0.8);
    const result = await detector(imageData);
    
    // Find people/faces in the image
    const people = result.filter((item: any) => 
      item.label === 'person' && item.score > 0.7
    );
    
    let cropArea;
    if (people.length > 0) {
      // Calculate bounding box around all people
      const boxes = people.map((person: any) => person.box);
      const minX = Math.min(...boxes.map((box: any) => box.xmin));
      const maxX = Math.max(...boxes.map((box: any) => box.xmax));
      const minY = Math.min(...boxes.map((box: any) => box.ymin));
      const maxY = Math.max(...boxes.map((box: any) => box.ymax));
      
      // Add padding
      const padding = 50;
      cropArea = {
        x: Math.max(0, minX - padding),
        y: Math.max(0, minY - padding),
        width: Math.min(canvas.width, maxX - minX + 2 * padding),
        height: Math.min(canvas.height, maxY - minY + 2 * padding)
      };
    } else {
      // Default center crop
      const size = Math.min(canvas.width, canvas.height);
      cropArea = {
        x: (canvas.width - size) / 2,
        y: (canvas.height - size) / 2,
        width: size,
        height: size
      };
    }
    
    const croppedCanvas = document.createElement('canvas');
    const croppedCtx = croppedCanvas.getContext('2d');
    
    if (!croppedCtx) throw new Error('Could not get cropped canvas context');
    
    croppedCanvas.width = cropArea.width;
    croppedCanvas.height = cropArea.height;
    
    croppedCtx.drawImage(
      canvas,
      cropArea.x, cropArea.y, cropArea.width, cropArea.height,
      0, 0, cropArea.width, cropArea.height
    );
    
    return new Promise((resolve, reject) => {
      croppedCanvas.toBlob(
        (blob) => {
          if (blob) resolve(blob);
          else reject(new Error('Failed to create cropped image blob'));
        },
        'image/jpeg',
        0.95
      );
    });
    
  } catch (error) {
    console.error('Error in auto crop:', error);
    throw error;
  }
};

// AI Duplicate Detection
export const detectDuplicates = async (images: HTMLImageElement[]): Promise<number[][]> => {
  try {
    const extractor = await pipeline('feature-extraction', 'Xenova/clip-vit-base-patch32', {
      device: 'webgpu',
    });
    
    // Extract features from all images
    const features = [];
    for (const img of images) {
      const canvas = document.createElement('canvas');
      const ctx = canvas.getContext('2d');
      
      if (!ctx) continue;
      
      canvas.width = 224;
      canvas.height = 224;
      ctx.drawImage(img, 0, 0, 224, 224);
      
      const imageData = canvas.toDataURL('image/jpeg', 0.8);
      const feature = await extractor(imageData);
      features.push(feature.data);
    }
    
    // Find similar images
    const duplicates: number[][] = [];
    const threshold = 0.9; // Similarity threshold
    
    for (let i = 0; i < features.length; i++) {
      for (let j = i + 1; j < features.length; j++) {
        const similarity = cosineSimilarity(features[i], features[j]);
        if (similarity > threshold) {
          duplicates.push([i, j]);
        }
      }
    }
    
    return duplicates;
    
  } catch (error) {
    console.error('Error detecting duplicates:', error);
    return [];
  }
};

// AI Layout Generator
export const generateLayouts = async (
  images: HTMLImageElement[],
  pageCount: number,
  format: 'A4-landscape' | 'A4-portrait' | 'square'
): Promise<any[]> => {
  // Smart layout generation based on image analysis
  const layouts = [];
  
  const dimensions = {
    'A4-landscape': { width: 297, height: 210 },
    'A4-portrait': { width: 210, height: 297 },
    'square': { width: 210, height: 210 }
  };
  
  const pageDim = dimensions[format];
  
  for (let page = 0; page < pageCount; page++) {
    const imagesPerPage = Math.min(4, Math.max(1, Math.ceil(images.length / pageCount)));
    const pageImages = images.slice(page * imagesPerPage, (page + 1) * imagesPerPage);
    
    const layout = {
      pageNumber: page + 1,
      elements: []
    };
    
    // Smart positioning based on image count
    if (pageImages.length === 1) {
      layout.elements.push({
        type: 'image',
        x: pageDim.width * 0.1,
        y: pageDim.height * 0.1,
        width: pageDim.width * 0.8,
        height: pageDim.height * 0.8,
        imageIndex: page * imagesPerPage
      });
    } else if (pageImages.length === 2) {
      layout.elements.push(
        {
          type: 'image',
          x: pageDim.width * 0.05,
          y: pageDim.height * 0.1,
          width: pageDim.width * 0.4,
          height: pageDim.height * 0.8,
          imageIndex: page * imagesPerPage
        },
        {
          type: 'image',
          x: pageDim.width * 0.55,
          y: pageDim.height * 0.1,
          width: pageDim.width * 0.4,
          height: pageDim.height * 0.8,
          imageIndex: page * imagesPerPage + 1
        }
      );
    } else {
      // Grid layout for multiple images
      const cols = Math.ceil(Math.sqrt(pageImages.length));
      const rows = Math.ceil(pageImages.length / cols);
      
      pageImages.forEach((_, index) => {
        const col = index % cols;
        const row = Math.floor(index / cols);
        
        layout.elements.push({
          type: 'image',
          x: (pageDim.width / cols) * col + 10,
          y: (pageDim.height / rows) * row + 10,
          width: (pageDim.width / cols) - 20,
          height: (pageDim.height / rows) - 20,
          imageIndex: page * imagesPerPage + index
        });
      });
    }
    
    layouts.push(layout);
  }
  
  return layouts;
};

// AI Text Suggestions
export const generateTextSuggestions = async (
  context: 'birthday' | 'wedding' | 'vacation' | 'baby' | 'graduation' | 'general',
  language: 'cs' | 'en' = 'cs'
): Promise<string[]> => {
  const suggestions = {
    cs: {
      birthday: [
        "Všechno nejlepší k narozeninám!",
        "Další rok plný radosti a štěstí",
        "Krásné vzpomínky na tento speciální den",
        "Přejeme ti splnění všech přání"
      ],
      wedding: [
        "Navždy spolu, navždy šťastní",
        "Začátek nového životního příběhu",
        "Láska, která přetrvá věky",
        "Dva srdce, jeden osud"
      ],
      vacation: [
        "Nezapomenutelné chvíle z dovolené",
        "Objevování nových míst",
        "Odpočinek a relaxace",
        "Dobrodružství, která zůstanou v srdci"
      ],
      baby: [
        "Malý zázrak se narodil",
        "Nekonečná láska k našemu miláčkovi",
        "První kroky do života",
        "Radost, která nemá hranice"
      ],
      graduation: [
        "Tvrdá práce se vyplatila",
        "Nový začátek, nové příležitosti",
        "Hrdí na tvé úspěchy",
        "Budoucnost je v tvých rukou"
      ],
      general: [
        "Vzpomínky, které potěší srdce",
        "Chvíle, které stojí za to si uchovat",
        "Život je krásný",
        "Společně je vše lepší"
      ]
    },
    en: {
      birthday: [
        "Happy Birthday!",
        "Another year of joy and happiness",
        "Beautiful memories of this special day",
        "Wishing all your dreams come true"
      ],
      wedding: [
        "Forever together, forever happy",
        "Beginning of a new life story",
        "Love that will last through ages",
        "Two hearts, one destiny"
      ],
      vacation: [
        "Unforgettable vacation moments",
        "Discovering new places",
        "Rest and relaxation",
        "Adventures that stay in the heart"
      ],
      baby: [
        "A little miracle was born",
        "Endless love for our little one",
        "First steps into life",
        "Joy without boundaries"
      ],
      graduation: [
        "Hard work pays off",
        "New beginning, new opportunities",
        "Proud of your achievements",
        "The future is in your hands"
      ],
      general: [
        "Memories that warm the heart",
        "Moments worth keeping",
        "Life is beautiful",
        "Together everything is better"
      ]
    }
  };
  
  return suggestions[language][context] || suggestions[language].general;
};

// AI Color Palette Extraction
export const extractColorPalette = async (imageElement: HTMLImageElement): Promise<string[]> => {
  const canvas = document.createElement('canvas');
  const ctx = canvas.getContext('2d');
  
  if (!ctx) throw new Error('Could not get canvas context');
  
  // Resize for faster processing
  canvas.width = 100;
  canvas.height = 100;
  ctx.drawImage(imageElement, 0, 0, 100, 100);
  
  const imageData = ctx.getImageData(0, 0, 100, 100);
  const data = imageData.data;
  
  // Color frequency map
  const colorMap = new Map<string, number>();
  
  for (let i = 0; i < data.length; i += 16) { // Sample every 4th pixel
    const r = data[i];
    const g = data[i + 1];
    const b = data[i + 2];
    const color = `rgb(${r},${g},${b})`;
    
    colorMap.set(color, (colorMap.get(color) || 0) + 1);
  }
  
  // Get top 5 colors
  const sortedColors = Array.from(colorMap.entries())
    .sort((a, b) => b[1] - a[1])
    .slice(0, 5)
    .map(([color]) => color);
  
  return sortedColors;
};

// Helper function for cosine similarity
function cosineSimilarity(a: number[], b: number[]): number {
  let dotProduct = 0;
  let normA = 0;
  let normB = 0;
  
  for (let i = 0; i < a.length; i++) {
    dotProduct += a[i] * b[i];
    normA += a[i] * a[i];
    normB += b[i] * b[i];
  }
  
  return dotProduct / (Math.sqrt(normA) * Math.sqrt(normB));
}

// Load image helper
export const loadImage = (file: Blob): Promise<HTMLImageElement> => {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.onload = () => resolve(img);
    img.onerror = reject;
    img.src = URL.createObjectURL(file);
  });
};