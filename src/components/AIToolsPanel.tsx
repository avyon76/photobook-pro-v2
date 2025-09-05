import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/hooks/use-toast";
import { 
  Sparkles, 
  Scissors, 
  Palette, 
  Wand2, 
  Copy, 
  Layout, 
  Type,
  Download,
  Loader2,
  CheckCircle,
  AlertCircle
} from "lucide-react";
import {
  removeBackground,
  enhancePhoto,
  autoCrop,
  detectDuplicates,
  generateLayouts,
  generateTextSuggestions,
  extractColorPalette,
  loadImage
} from "@/lib/ai-services";

interface AIToolsPanelProps {
  language: 'cs' | 'en';
  images: File[];
  onImagesUpdate: (images: File[]) => void;
}

const AIToolsPanel = ({ language, images, onImagesUpdate }: AIToolsPanelProps) => {
  const [isProcessing, setIsProcessing] = useState(false);
  const [processedImages, setProcessedImages] = useState<{ [key: string]: Blob }>({});
  const [progress, setProgress] = useState(0);
  const [duplicates, setDuplicates] = useState<number[][]>([]);
  const [colorPalettes, setColorPalettes] = useState<{ [key: number]: string[] }>({});
  const [textSuggestions, setTextSuggestions] = useState<string[]>([]);
  const [layouts, setLayouts] = useState<any[]>([]);
  const { toast } = useToast();

  const t = {
    cs: {
      title: "AI Nástroje",
      backgroundRemoval: {
        title: "Odstranění pozadí",
        description: "Automaticky odstraní pozadí z fotografií",
        button: "Odstranit pozadí"
      },
      photoEnhancement: {
        title: "Vylepšení fotky",
        description: "Zlepší jas, kontrast a sytost",
        button: "Vylepšit fotky"
      },
      autoCrop: {
        title: "Automatický ořez",
        description: "Inteligentní ořez se zaměřením na obličeje",
        button: "Automaticky oříznout"
      },
      duplicateDetection: {
        title: "Detekce duplikátů",
        description: "Najde podobné a duplicitní fotky",
        button: "Najít duplikáty"
      },
      layoutGenerator: {
        title: "Generátor layoutů",
        description: "AI návrhy rozmístění fotografií",
        button: "Vygenerovat layout"
      },
      textSuggestions: {
        title: "Návrhy textů",
        description: "AI návrhy popisků a titulků",
        button: "Získat návrhy"
      },
      colorPalette: {
        title: "Barevná paleta",
        description: "Extrakce hlavních barev z fotografií",  
        button: "Analyzovat barvy"
      },
      processing: "Zpracovávám...",
      completed: "Dokončeno",
      failed: "Chyba",
      noDuplicates: "Žádné duplikáty nenalezeny",
      foundDuplicates: "Nalezeno {count} skupin duplikátů",
      applyAll: "Aplikovat na všechny",
      download: "Stáhnout",
      contexts: {
        birthday: "Narozeniny",
        wedding: "Svatba", 
        vacation: "Dovolená",
        baby: "Dítě",
        graduation: "Promoce",
        general: "Obecné"
      }
    },
    en: {
      title: "AI Tools",
      backgroundRemoval: {
        title: "Background Removal",
        description: "Automatically remove backgrounds from photos",
        button: "Remove Background"
      },
      photoEnhancement: {
        title: "Photo Enhancement",
        description: "Improve brightness, contrast and saturation",
        button: "Enhance Photos"
      },
      autoCrop: {
        title: "Smart Crop",
        description: "Intelligent cropping focused on faces",
        button: "Auto Crop"
      },
      duplicateDetection: {
        title: "Duplicate Detection",
        description: "Find similar and duplicate photos",
        button: "Find Duplicates"
      },
      layoutGenerator: {
        title: "Layout Generator",
        description: "AI suggestions for photo arrangement",
        button: "Generate Layout"
      },
      textSuggestions: {
        title: "Text Suggestions",
        description: "AI suggestions for captions and titles",
        button: "Get Suggestions"
      },
      colorPalette: {
        title: "Color Palette",
        description: "Extract main colors from photos",
        button: "Analyze Colors"
      },
      processing: "Processing...",
      completed: "Completed",
      failed: "Failed",
      noDuplicates: "No duplicates found",
      foundDuplicates: "Found {count} duplicate groups",
      applyAll: "Apply to All",
      download: "Download",
      contexts: {
        birthday: "Birthday",
        wedding: "Wedding",
        vacation: "Vacation", 
        baby: "Baby",
        graduation: "Graduation",
        general: "General"
      }
    }
  };

  const handleBackgroundRemoval = async () => {
    if (images.length === 0) {
      toast({
        title: "Chyba",
        description: "Nahrajte nejprve fotografie",
        variant: "destructive"
      });
      return;
    }

    setIsProcessing(true);
    setProgress(0);

    try {
      const processedImages: { [key: string]: Blob } = {};
      
      for (let i = 0; i < images.length; i++) {
        const img = await loadImage(images[i]);
        const processedBlob = await removeBackground(img);
        processedImages[`${i}_bg_removed`] = processedBlob;
        setProgress(((i + 1) / images.length) * 100);
      }
      
      setProcessedImages(prev => ({ ...prev, ...processedImages }));
      
      toast({
        title: t[language].completed,
        description: `Pozadí odstraněno z ${images.length} fotografií`
      });
      
    } catch (error) {
      console.error('Background removal error:', error);
      toast({
        title: t[language].failed,
        description: "Nepodařilo se odstranit pozadí",
        variant: "destructive"
      });
    } finally {
      setIsProcessing(false);
      setProgress(0);
    }
  };

  const handlePhotoEnhancement = async () => {
    if (images.length === 0) return;

    setIsProcessing(true);
    setProgress(0);

    try {
      const enhanced: { [key: string]: Blob } = {};
      
      for (let i = 0; i < images.length; i++) {
        const img = await loadImage(images[i]);
        const enhancedBlob = await enhancePhoto(img);
        enhanced[`${i}_enhanced`] = enhancedBlob;
        setProgress(((i + 1) / images.length) * 100);
      }
      
      setProcessedImages(prev => ({ ...prev, ...enhanced }));
      
      toast({
        title: t[language].completed,
        description: `Vylepšeno ${images.length} fotografií`
      });
      
    } catch (error) {
      console.error('Photo enhancement error:', error);
      toast({
        title: t[language].failed,
        description: "Nepodařilo se vylepšit fotografie",
        variant: "destructive"
      });
    } finally {
      setIsProcessing(false);
      setProgress(0);
    }
  };

  const handleAutoCrop = async () => {
    if (images.length === 0) return;

    setIsProcessing(true);
    setProgress(0);

    try {
      const cropped: { [key: string]: Blob } = {};
      
      for (let i = 0; i < images.length; i++) {
        const img = await loadImage(images[i]);
        const croppedBlob = await autoCrop(img);
        cropped[`${i}_cropped`] = croppedBlob;
        setProgress(((i + 1) / images.length) * 100);
      }
      
      setProcessedImages(prev => ({ ...prev, ...cropped }));
      
      toast({
        title: t[language].completed,
        description: `Oříznuto ${images.length} fotografií`
      });
      
    } catch (error) {
      console.error('Auto crop error:', error);
      toast({
        title: t[language].failed,
        description: "Nepodařilo se oříznout fotografie",
        variant: "destructive"
      });
    } finally {
      setIsProcessing(false);
      setProgress(0);
    }
  };

  const handleDuplicateDetection = async () => {
    if (images.length === 0) return;

    setIsProcessing(true);
    setProgress(50);

    try {
      const imageElements = await Promise.all(
        images.map(img => loadImage(img))
      );
      
      const foundDuplicates = await detectDuplicates(imageElements);
      setDuplicates(foundDuplicates);
      
      const message = foundDuplicates.length > 0 
        ? t[language].foundDuplicates.replace('{count}', foundDuplicates.length.toString())
        : t[language].noDuplicates;
      
      toast({
        title: t[language].completed,
        description: message
      });
      
    } catch (error) {
      console.error('Duplicate detection error:', error);
      toast({
        title: t[language].failed,
        description: "Nepodařilo se najít duplikáty",
        variant: "destructive"
      });
    } finally {
      setIsProcessing(false);
      setProgress(0);
    }
  };

  const handleLayoutGeneration = async () => {
    if (images.length === 0) return;

    setIsProcessing(true);
    setProgress(50);

    try {
      const imageElements = await Promise.all(
        images.map(img => loadImage(img))
      );
      
      const generatedLayouts = await generateLayouts(imageElements, 10, 'A4-landscape');
      setLayouts(generatedLayouts);
      
      toast({
        title: t[language].completed,
        description: `Vygenerováno ${generatedLayouts.length} layoutů`
      });
      
    } catch (error) {
      console.error('Layout generation error:', error);
      toast({
        title: t[language].failed,
        description: "Nepodařilo se vygenerovat layouty",
        variant: "destructive"
      });
    } finally {
      setIsProcessing(false);
      setProgress(0);
    }
  };

  const handleTextSuggestions = async (context: string) => {
    setIsProcessing(true);
    
    try {
      const suggestions = await generateTextSuggestions(context as any, language);
      setTextSuggestions(suggestions);
      
      toast({
        title: t[language].completed,
        description: `Vygenerováno ${suggestions.length} návrhů textu`
      });
      
    } catch (error) {
      console.error('Text suggestions error:', error);
      toast({
        title: t[language].failed,
        description: "Nepodařilo se vygenerovat návrhy",
        variant: "destructive"
      });
    } finally {
      setIsProcessing(false);
    }
  };

  const handleColorAnalysis = async () => {
    if (images.length === 0) return;

    setIsProcessing(true);
    setProgress(0);

    try {
      const palettes: { [key: number]: string[] } = {};
      
      for (let i = 0; i < Math.min(5, images.length); i++) {
        const img = await loadImage(images[i]);
        const palette = await extractColorPalette(img);
        palettes[i] = palette;
        setProgress(((i + 1) / Math.min(5, images.length)) * 100);
      }
      
      setColorPalettes(palettes);
      
      toast({
        title: t[language].completed,
        description: "Barevné palety extrahovány"
      });
      
    } catch (error) {
      console.error('Color analysis error:', error);
      toast({
        title: t[language].failed,
        description: "Nepodařilo se analyzovat barvy",
        variant: "destructive"
      });
    } finally {
      setIsProcessing(false);
      setProgress(0);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-2 mb-4">
        <Sparkles className="h-6 w-6 text-primary" />
        <h2 className="text-2xl font-bold">{t[language].title}</h2>
        <Badge variant="secondary" className="bg-gradient-primary text-white">
          FREE
        </Badge>
      </div>

      <Tabs defaultValue="enhance" className="w-full">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="enhance">Vylepšit</TabsTrigger>
          <TabsTrigger value="organize">Organizovat</TabsTrigger>
          <TabsTrigger value="layout">Layout</TabsTrigger>
          <TabsTrigger value="text">Text</TabsTrigger>
        </TabsList>

        <TabsContent value="enhance" className="space-y-4">
          {/* Background Removal */}
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="flex items-center gap-2 text-lg">
                <Scissors className="h-5 w-5" />
                {t[language].backgroundRemoval.title}
              </CardTitle>
              <p className="text-sm text-muted-foreground">
                {t[language].backgroundRemoval.description}
              </p>
            </CardHeader>
            <CardContent>
              <Button 
                onClick={handleBackgroundRemoval}
                disabled={isProcessing || images.length === 0}
                className="w-full"
              >
                {isProcessing ? <Loader2 className="h-4 w-4 mr-2 animate-spin" /> : <Scissors className="h-4 w-4 mr-2" />}
                {t[language].backgroundRemoval.button}
              </Button>
            </CardContent>
          </Card>

          {/* Photo Enhancement */}
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="flex items-center gap-2 text-lg">
                <Wand2 className="h-5 w-5" />
                {t[language].photoEnhancement.title}
              </CardTitle>
              <p className="text-sm text-muted-foreground">
                {t[language].photoEnhancement.description}
              </p>
            </CardHeader>
            <CardContent>
              <Button 
                onClick={handlePhotoEnhancement}
                disabled={isProcessing || images.length === 0}
                className="w-full"
              >
                {isProcessing ? <Loader2 className="h-4 w-4 mr-2 animate-spin" /> : <Wand2 className="h-4 w-4 mr-2" />}
                {t[language].photoEnhancement.button}
              </Button>
            </CardContent>
          </Card>

          {/* Auto Crop */}
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="flex items-center gap-2 text-lg">
                <Scissors className="h-5 w-5" />
                {t[language].autoCrop.title}
              </CardTitle>
              <p className="text-sm text-muted-foreground">
                {t[language].autoCrop.description}
              </p>
            </CardHeader>
            <CardContent>
              <Button 
                onClick={handleAutoCrop}
                disabled={isProcessing || images.length === 0}
                className="w-full"
              >
                {isProcessing ? <Loader2 className="h-4 w-4 mr-2 animate-spin" /> : <Scissors className="h-4 w-4 mr-2" />}
                {t[language].autoCrop.button}
              </Button>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="organize" className="space-y-4">
          {/* Duplicate Detection */}
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="flex items-center gap-2 text-lg">
                <Copy className="h-5 w-5" />
                {t[language].duplicateDetection.title}
              </CardTitle>
              <p className="text-sm text-muted-foreground">
                {t[language].duplicateDetection.description}
              </p>
            </CardHeader>
            <CardContent>
              <Button 
                onClick={handleDuplicateDetection}
                disabled={isProcessing || images.length === 0}
                className="w-full mb-4"
              >
                {isProcessing ? <Loader2 className="h-4 w-4 mr-2 animate-spin" /> : <Copy className="h-4 w-4 mr-2" />}
                {t[language].duplicateDetection.button}
              </Button>
              
              {duplicates.length > 0 && (
                <div className="space-y-2">
                  <h4 className="font-medium">Nalezené duplikáty:</h4>
                  {duplicates.map((pair, index) => (
                    <div key={index} className="flex items-center gap-2 text-sm">
                      <AlertCircle className="h-4 w-4 text-yellow-500" />
                      Fotky #{pair[0] + 1} a #{pair[1] + 1} jsou podobné
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>

          {/* Color Palette */}
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="flex items-center gap-2 text-lg">
                <Palette className="h-5 w-5" />
                {t[language].colorPalette.title}
              </CardTitle>
              <p className="text-sm text-muted-foreground">
                {t[language].colorPalette.description}
              </p>
            </CardHeader>
            <CardContent>
              <Button 
                onClick={handleColorAnalysis}
                disabled={isProcessing || images.length === 0}
                className="w-full mb-4"
              >
                {isProcessing ? <Loader2 className="h-4 w-4 mr-2 animate-spin" /> : <Palette className="h-4 w-4 mr-2" />}
                {t[language].colorPalette.button}
              </Button>
              
              {Object.keys(colorPalettes).length > 0 && (
                <div className="space-y-3">
                  {Object.entries(colorPalettes).map(([index, colors]) => (
                    <div key={index} className="space-y-2">
                      <h4 className="text-sm font-medium">Fotka #{parseInt(index) + 1}:</h4>
                      <div className="flex gap-1">
                        {colors.map((color, colorIndex) => (
                          <div
                            key={colorIndex}
                            className="w-8 h-8 rounded border"
                            style={{ backgroundColor: color }}
                            title={color}
                          />
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="layout" className="space-y-4">
          {/* Layout Generator */}
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="flex items-center gap-2 text-lg">
                <Layout className="h-5 w-5" />
                {t[language].layoutGenerator.title}
              </CardTitle>
              <p className="text-sm text-muted-foreground">
                {t[language].layoutGenerator.description}
              </p>
            </CardHeader>
            <CardContent>
              <Button 
                onClick={handleLayoutGeneration}
                disabled={isProcessing || images.length === 0}
                className="w-full mb-4"
              >
                {isProcessing ? <Loader2 className="h-4 w-4 mr-2 animate-spin" /> : <Layout className="h-4 w-4 mr-2" />}
                {t[language].layoutGenerator.button}
              </Button>
              
              {layouts.length > 0 && (
                <div className="text-sm text-muted-foreground">
                  <CheckCircle className="h-4 w-4 inline mr-1 text-green-500" />
                  Vygenerováno {layouts.length} layoutů pro váš projekt
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="text" className="space-y-4">
          {/* Text Suggestions */}
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="flex items-center gap-2 text-lg">
                <Type className="h-5 w-5" />
                {t[language].textSuggestions.title}
              </CardTitle>
              <p className="text-sm text-muted-foreground">
                {t[language].textSuggestions.description}
              </p>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 gap-2 mb-4">
                {Object.entries(t[language].contexts).map(([key, label]) => (
                  <Button
                    key={key}
                    variant="outline"
                    size="sm"
                    onClick={() => handleTextSuggestions(key)}
                    disabled={isProcessing}
                  >
                    {label}
                  </Button>
                ))}
              </div>
              
              {textSuggestions.length > 0 && (
                <div className="space-y-2">
                  <h4 className="font-medium">Návrhy textů:</h4>
                  {textSuggestions.map((suggestion, index) => (
                    <div key={index} className="p-2 bg-muted rounded text-sm">
                      {suggestion}
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Progress Bar */}
      {isProcessing && progress > 0 && (
        <Card>
          <CardContent className="pt-6">
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>{t[language].processing}</span>
                <span>{Math.round(progress)}%</span>
              </div>
              <Progress value={progress} className="w-full" />
            </div>
          </CardContent>
        </Card>
      )}

      {/* Processed Images Download */}
      {Object.keys(processedImages).length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Download className="h-5 w-5" />
              Zpracované fotografie
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 gap-2">
              {Object.entries(processedImages).map(([key, blob]) => (
                <Button
                  key={key}
                  variant="outline"
                  size="sm"
                  onClick={() => {
                    const url = URL.createObjectURL(blob);
                    const a = document.createElement('a');
                    a.href = url;
                    a.download = `processed_${key}.jpg`;
                    a.click();
                    URL.revokeObjectURL(url);
                  }}
                >
                  <Download className="h-3 w-3 mr-1" />
                  {key.split('_').slice(1).join(' ')}
                </Button>
              ))}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default AIToolsPanel;