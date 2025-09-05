// Photo bank integration services for free stock photos

// Mock Supabase for development
const supabase = {
  from: (table: string) => ({
    upsert: (data: any, options: any) => Promise.resolve({ data: [], error: null })
  })
};

// Unsplash API - free tier allows 50 requests per hour
const UNSPLASH_ACCESS_KEY = 'YOUR_UNSPLASH_ACCESS_KEY'; // This would be stored in Supabase secrets in production

export interface PhotoBankImage {
  id: string;
  source: 'unsplash' | 'pexels' | 'pixabay';
  sourceId: string;
  author: string;
  title?: string;
  description?: string;
  tags: string[];
  urls: {
    small: string;
    regular: string;
    full: string;
    download: string;
  };
  license: string;
}

export interface SearchOptions {
  query: string;
  page?: number;
  perPage?: number;
  orientation?: 'landscape' | 'portrait' | 'squarish';
  category?: string;
  color?: string;
}

// Unsplash integration
export const searchUnsplash = async (options: SearchOptions): Promise<PhotoBankImage[]> => {
  try {
    const { query, page = 1, perPage = 20, orientation = 'landscape' } = options;
    
    // For demo purposes, using a demo access key
    const response = await fetch(`https://api.unsplash.com/search/photos?` + new URLSearchParams({
      query,
      page: page.toString(),
      per_page: perPage.toString(),
      orientation,
      client_id: 'YOUR_UNSPLASH_ACCESS_KEY' // In production, this would come from Supabase secrets
    }));

    if (!response.ok) {
      throw new Error(`Unsplash API error: ${response.statusText}`);
    }

    const data = await response.json();
    
    return data.results.map((photo: any): PhotoBankImage => ({
      id: `unsplash-${photo.id}`,
      source: 'unsplash',
      sourceId: photo.id,
      author: photo.user.name,
      title: photo.alt_description || photo.description,
      description: photo.description,
      tags: photo.tags?.map((tag: any) => tag.title) || [],
      urls: {
        small: photo.urls.small,
        regular: photo.urls.regular,
        full: photo.urls.full,
        download: photo.links.download_location
      },
      license: 'Unsplash License'
    }));
  } catch (error) {
    console.error('Error searching Unsplash:', error);
    throw error;
  }
};

// Pexels integration  
export const searchPexels = async (options: SearchOptions): Promise<PhotoBankImage[]> => {
  try {
    const { query, page = 1, perPage = 20 } = options;
    
    const response = await fetch(`https://api.pexels.com/v1/search?` + new URLSearchParams({
      query,
      page: page.toString(),
      per_page: perPage.toString()
    }), {
      headers: {
        'Authorization': 'YOUR_PEXELS_API_KEY' // In production, this would come from Supabase secrets
      }
    });

    if (!response.ok) {
      throw new Error(`Pexels API error: ${response.statusText}`);
    }

    const data = await response.json();
    
    return data.photos.map((photo: any): PhotoBankImage => ({
      id: `pexels-${photo.id}`,
      source: 'pexels',
      sourceId: photo.id.toString(),
      author: photo.photographer,
      title: photo.alt,
      description: photo.alt,
      tags: [], // Pexels doesn't provide tags in search results
      urls: {
        small: photo.src.small,
        regular: photo.src.medium,
        full: photo.src.large,
        download: photo.src.original
      },
      license: 'Pexels License'
    }));
  } catch (error) {
    console.error('Error searching Pexels:', error);
    throw error;
  }
};

// Demo/local photo bank with sample images
export const searchDemoPhotoBank = async (options: SearchOptions): Promise<PhotoBankImage[]> => {
  const demoImages: PhotoBankImage[] = [
    {
      id: 'demo-1',
      source: 'unsplash',
      sourceId: 'demo-1',
      author: 'Demo Photographer',
      title: 'Beautiful Landscape',
      description: 'A stunning mountain landscape at sunset',
      tags: ['landscape', 'mountain', 'sunset', 'nature'],
      urls: {
        small: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400',
        regular: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800',
        full: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1200',
        download: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4'
      },
      license: 'Unsplash License'
    },
    {
      id: 'demo-2',
      source: 'unsplash',
      sourceId: 'demo-2',
      author: 'Nature Lover',
      title: 'Ocean Waves',
      description: 'Peaceful ocean waves on a sandy beach',
      tags: ['ocean', 'beach', 'waves', 'peaceful', 'blue'],
      urls: {
        small: 'https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=400',
        regular: 'https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=800',
        full: 'https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=1200',
        download: 'https://images.unsplash.com/photo-1544551763-46a013bb70d5'
      },
      license: 'Unsplash License'
    },
    {
      id: 'demo-3',
      source: 'unsplash',
      sourceId: 'demo-3',
      author: 'Urban Explorer',
      title: 'City Skyline',
      description: 'Modern city skyline at night',
      tags: ['city', 'skyline', 'night', 'urban', 'lights'],
      urls: {
        small: 'https://images.unsplash.com/photo-1480714378408-67cf0d13bc1f?w=400',
        regular: 'https://images.unsplash.com/photo-1480714378408-67cf0d13bc1f?w=800',
        full: 'https://images.unsplash.com/photo-1480714378408-67cf0d13bc1f?w=1200',
        download: 'https://images.unsplash.com/photo-1480714378408-67cf0d13bc1f'
      },
      license: 'Unsplash License'
    },
    {
      id: 'demo-4',
      source: 'unsplash',
      sourceId: 'demo-4',
      author: 'Family Moments',
      title: 'Happy Family',
      description: 'Happy family enjoying time together',
      tags: ['family', 'happy', 'togetherness', 'love', 'children'],
      urls: {
        small: 'https://images.unsplash.com/photo-1511895426328-dc8714efa2d2?w=400',
        regular: 'https://images.unsplash.com/photo-1511895426328-dc8714efa2d2?w=800',
        full: 'https://images.unsplash.com/photo-1511895426328-dc8714efa2d2?w=1200',
        download: 'https://images.unsplash.com/photo-1511895426328-dc8714efa2d2'
      },
      license: 'Unsplash License'
    },
    {
      id: 'demo-5',
      source: 'unsplash',
      sourceId: 'demo-5',
      author: 'Wedding Memories',
      title: 'Wedding Celebration',
      description: 'Beautiful wedding ceremony moment',
      tags: ['wedding', 'celebration', 'love', 'bride', 'groom'],
      urls: {
        small: 'https://images.unsplash.com/photo-1519741497674-611481863552?w=400',
        regular: 'https://images.unsplash.com/photo-1519741497674-611481863552?w=800',
        full: 'https://images.unsplash.com/photo-1519741497674-611481863552?w=1200',
        download: 'https://images.unsplash.com/photo-1519741497674-611481863552'
      },
      license: 'Unsplash License'
    },
    {
      id: 'demo-6',
      source: 'unsplash',
      sourceId: 'demo-6',
      author: 'Travel Guide',
      title: 'Travel Adventure',
      description: 'Amazing travel destination view',
      tags: ['travel', 'adventure', 'destination', 'explore', 'vacation'],
      urls: {
        small: 'https://images.unsplash.com/photo-1488646953014-85cb44e25828?w=400',
        regular: 'https://images.unsplash.com/photo-1488646953014-85cb44e25828?w=800',
        full: 'https://images.unsplash.com/photo-1488646953014-85cb44e25828?w=1200',
        download: 'https://images.unsplash.com/photo-1488646953014-85cb44e25828'
      },
      license: 'Unsplash License'
    }
  ];

  // Simple search filtering based on query
  const { query } = options;
  if (query) {
    const filtered = demoImages.filter(image => 
      image.title?.toLowerCase().includes(query.toLowerCase()) ||
      image.description?.toLowerCase().includes(query.toLowerCase()) ||
      image.tags.some(tag => tag.toLowerCase().includes(query.toLowerCase()))
    );
    return filtered.length > 0 ? filtered : demoImages.slice(0, 3);
  }

  return demoImages;
};

// Main search function that combines all sources
export const searchPhotoBank = async (options: SearchOptions): Promise<PhotoBankImage[]> => {
  try {
    // For now, use demo images. In production, this would try multiple sources
    const results = await searchDemoPhotoBank(options);
    
    // Cache results in Supabase
    if (results.length > 0) {
      await cachePhotoBankResults(results);
    }
    
    return results;
  } catch (error) {
    console.error('Error searching photo banks:', error);
    // Return demo images as fallback
    return searchDemoPhotoBank(options);
  }
};

// Cache photo bank results in Supabase
const cachePhotoBankResults = async (images: PhotoBankImage[]) => {
  try {
    const cacheData = images.map(image => ({
      source: image.source,
      source_id: image.sourceId,
      author: image.author,
      title: image.title,
      description: image.description,
      tags: image.tags,
      small_url: image.urls.small,
      regular_url: image.urls.regular,
      full_url: image.urls.full,
      download_url: image.urls.download,
      license: image.license
    }));

    await supabase
      .from('photo_bank_images')
      .upsert(cacheData, { 
        onConflict: 'source,source_id',
        ignoreDuplicates: true 
      });
  } catch (error) {
    console.warn('Failed to cache photo bank results:', error);
  }
};

// Get popular searches
export const getPopularSearchTerms = (): string[] => {
  return [
    'family', 'wedding', 'travel', 'nature', 'sunset',
    'children', 'love', 'celebration', 'friends', 'beach',
    'mountain', 'city', 'business', 'pets', 'flowers'
  ];
};