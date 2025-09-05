import { useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Slider } from "@/components/ui/slider";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/hooks/use-toast";
import { 
  Sparkles, 
  RotateCcw, 
  FlipHorizontal, 
  FlipVertical, 
  Crop,
  Palette,
  Sun,
  Contrast,
  Zap,
  Download,
  Undo,
  Redo,
  Eye,
  EyeOff
} from "lucide-react";

interface AIPhotoEditorProps {
  language: 'cs' | 'en';
  image: File | null;
  onImageUpdate: (image: File) => void;
}

const AIPhotoEditor = ({ language, image, onImageUpdate }: AIPhotoEditorProps) => {
  const [brightness, setBrightness] = useState(100);
  const [contrast, setContrast] = useState(100);
  const [saturation, setSaturation] = useState(100);
  const [rotation, setRotation] = useState(0);
  const [flipH, setFlipH] = useState(false);
  const [flipV, setFlipV] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [showOriginal, setShowOriginal] = useState(false);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const originalCanvasRef = useRef<HTMLCanvasElement>(null);
  const { toast } = useToast();

  const t = {
    cs: {
      title: "AI Editor fotografií",
      tabs: {
        adjust: "Úpravy",
        effects: "Efekty", 
        crop: "Ořez",
        ai: "AI Nástroje"
      },
      adjustments: {
        brightness: "Jas",
        contrast: "Kontrast", 
        saturation: "Sytost",
        rotation: "Otočení"
      },
      transform: {
        flipH: "Překlopit vodorovně",
        flipV: "Překlopit svisle",
        rotate: "Otočit o 90°"
      },
      ai: {
        autoEnhance: "Automatické vylepšení",
        smartCrop: "Inteligentní ořez",
        backgroundRemoval: "Odstranění pozadí",
        colorCorrection: "Korekce barev"
      },
      actions: {
        reset: "Resetovat",
        undo: "Zpět",
        redo: "Vpřed", 
        preview: "Náhled",
        showOriginal: "Zobrazit originál",
        hideOriginal: "Skrýt originál",
        download: "Stáhnout",
        apply: "Použít"
      }
    },
    en: {
      title: "AI Photo Editor",
      tabs: {
        adjust: "Adjustments",
        effects: "Effects",
        crop: "Crop", 
        ai: "AI Tools"
      },
      adjustments: {
        brightness: "Brightness",
        contrast: "Contrast",
        saturation: "Saturation", 
        rotation: "Rotation"
      },
      transform: {
        flipH: "Flip Horizontal",
        flipV: "Flip Vertical",
        rotate: "Rotate 90°"
      },
      ai: {
        autoEnhance: "Auto Enhance",
        smartCrop: "Smart Crop",
        backgroundRemoval: "Background Removal",
        colorCorrection: "Color Correction"
      },
      actions: {
        reset: "Reset",
        undo: "Undo",
        redo: "Redo",
        preview: "Preview", 
        showOriginal: "Show Original",
        hideOriginal: "Hide Original",
        download: "Download",
        apply: "Apply"
      }
    }
  };

  const applyFilters = () => {
    if (!image || !canvasRef.current) return;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const img = new Image();
    img.onload = () => {
      canvas.width = img.width;
      canvas.height = img.height;

      // Apply transformations
      ctx.save();
      ctx.translate(canvas.width / 2, canvas.height / 2);
      ctx.rotate((rotation * Math.PI) / 180);
      ctx.scale(flipH ? -1 : 1, flipV ? -1 : 1);

      // Apply filters
      ctx.filter = `
        brightness(${brightness}%)
        contrast(${contrast}%)
        saturate(${saturation}%)
      `;

      ctx.drawImage(img, -img.width / 2, -img.height / 2);
      ctx.restore();
    };
    
    img.src = URL.createObjectURL(image);
  };

  const handleAutoEnhance = async () => {
    setIsProcessing(true);
    
    // Simulate AI processing
    setTimeout(() => {
      setBrightness(110);
      setContrast(115);
      setSaturation(120);
      setIsProcessing(false);
      
      toast({
        title: "Automatické vylepšení",
        description: "Fotografie byla automaticky vylepšena"
      });
    }, 2000);
  };

  const handleReset = () => {
    setBrightness(100);
    setContrast(100);
    setSaturation(100);
    setRotation(0);
    setFlipH(false);
    setFlipV(false);
  };

  const handleDownload = () => {
    if (!canvasRef.current) return;
    
    canvasRef.current.toBlob((blob) => {
      if (blob) {
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'edited-photo.jpg';
        a.click();
        URL.revokeObjectURL(url);
      }
    }, 'image/jpeg', 0.95);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Sparkles className="h-6 w-6 text-primary" />
          <h2 className="text-2xl font-bold">{t[language].title}</h2>
          <Badge variant="secondary" className="bg-gradient-primary text-white">
            AI
          </Badge>
        </div>
        
        <div className="flex gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => setShowOriginal(!showOriginal)}
          >
            {showOriginal ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
            {showOriginal ? t[language].actions.hideOriginal : t[language].actions.showOriginal}
          </Button>
          <Button variant="outline" size="sm" onClick={handleReset}>
            <RotateCcw className="h-4 w-4 mr-1" />
            {t[language].actions.reset}
          </Button>
        </div>
      </div>

      {/* Image Preview */}
      <Card>
        <CardContent className="p-6">
          <div className="relative bg-muted rounded-lg min-h-[300px] flex items-center justify-center">
            {image ? (
              <div className="relative">
                <canvas
                  ref={canvasRef}
                  className="max-w-full max-h-[400px] rounded"
                  style={{ display: showOriginal ? 'none' : 'block' }}
                />
                <canvas
                  ref={originalCanvasRef}
                  className="max-w-full max-h-[400px] rounded"
                  style={{ display: showOriginal ? 'block' : 'none' }}
                />
              </div>
            ) : (
              <div className="text-center text-muted-foreground">
                <img className="h-16 w-16 mx-auto mb-4 opacity-50" />
                <p>Vyberte fotografii pro úpravy</p>
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Editor Controls */}
      <Tabs defaultValue="adjust" className="w-full">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="adjust">{t[language].tabs.adjust}</TabsTrigger>
          <TabsTrigger value="effects">{t[language].tabs.effects}</TabsTrigger>
          <TabsTrigger value="crop">{t[language].tabs.crop}</TabsTrigger>
          <TabsTrigger value="ai">{t[language].tabs.ai}</TabsTrigger>
        </TabsList>

        <TabsContent value="adjust" className="space-y-4">
          {/* Brightness */}
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="flex items-center gap-2 text-lg">
                <Sun className="h-5 w-5" />
                {t[language].adjustments.brightness}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <Slider
                  value={[brightness]}
                  onValueChange={(value) => setBrightness(value[0])}
                  min={0}
                  max={200}
                  step={1}
                  className="w-full"
                />
                <div className="flex justify-between text-sm text-muted-foreground">
                  <span>0%</span>
                  <span>{brightness}%</span>
                  <span>200%</span>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Contrast */}
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="flex items-center gap-2 text-lg">
                <Contrast className="h-5 w-5" />
                {t[language].adjustments.contrast}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <Slider
                  value={[contrast]}
                  onValueChange={(value) => setContrast(value[0])}
                  min={0}
                  max={200}
                  step={1}
                  className="w-full"
                />
                <div className="flex justify-between text-sm text-muted-foreground">
                  <span>0%</span>
                  <span>{contrast}%</span>
                  <span>200%</span>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Saturation */}
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="flex items-center gap-2 text-lg">
                <Palette className="h-5 w-5" />
                {t[language].adjustments.saturation}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <Slider
                  value={[saturation]}
                  onValueChange={(value) => setSaturation(value[0])}
                  min={0}
                  max={200}
                  step={1}
                  className="w-full"
                />
                <div className="flex justify-between text-sm text-muted-foreground">
                  <span>0%</span>
                  <span>{saturation}%</span>
                  <span>200%</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="effects" className="space-y-4">
          {/* Transform Controls */}
          <Card>
            <CardHeader>
              <CardTitle>Transformace</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <Button
                  variant="outline"
                  onClick={() => setFlipH(!flipH)}
                  className={flipH ? "bg-primary text-primary-foreground" : ""}
                >
                  <FlipHorizontal className="h-4 w-4 mr-2" />
                  {t[language].transform.flipH}
                </Button>
                <Button
                  variant="outline"
                  onClick={() => setFlipV(!flipV)}
                  className={flipV ? "bg-primary text-primary-foreground" : ""}
                >
                  <FlipVertical className="h-4 w-4 mr-2" />
                  {t[language].transform.flipV}
                </Button>
              </div>
              <Button
                variant="outline"
                onClick={() => setRotation((rotation + 90) % 360)}
                className="w-full"
              >
                <RotateCcw className="h-4 w-4 mr-2" />
                {t[language].transform.rotate} ({rotation}°)
              </Button>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="crop" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Crop className="h-5 w-5" />
                Ořez fotografií
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground mb-4">
                Funkce ořezu bude přidána v další verzi.
              </p>
              <Button variant="outline" disabled>
                <Crop className="h-4 w-4 mr-2" />
                Aktivovat ořez
              </Button>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="ai" className="space-y-4">
          {/* AI Auto Enhance */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Sparkles className="h-5 w-5" />
                {t[language].ai.autoEnhance}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <Button 
                onClick={handleAutoEnhance} 
                disabled={isProcessing || !image}
                className="w-full"
              >
                <Zap className="h-4 w-4 mr-2" />
                {isProcessing ? "Zpracovávám..." : t[language].ai.autoEnhance}
              </Button>
            </CardContent>
          </Card>

          {/* AI Smart Crop */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Crop className="h-5 w-5" />
                {t[language].ai.smartCrop}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <Button variant="outline" disabled className="w-full">
                <Sparkles className="h-4 w-4 mr-2" />
                {t[language].ai.smartCrop}
              </Button>
            </CardContent>
          </Card>

          {/* AI Background Removal */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Sparkles className="h-5 w-5" />
                {t[language].ai.backgroundRemoval}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <Button variant="outline" disabled className="w-full">
                <Sparkles className="h-4 w-4 mr-2" />
                {t[language].ai.backgroundRemoval}
              </Button>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Action Buttons */}
      <div className="flex gap-4">
        <Button onClick={() => applyFilters()} className="flex-1">
          <Eye className="h-4 w-4 mr-2" />
          {t[language].actions.preview}
        </Button>
        <Button onClick={handleDownload} variant="outline" className="flex-1">
          <Download className="h-4 w-4 mr-2" />
          {t[language].actions.download}
        </Button>
      </div>
    </div>
  );
};

export default AIPhotoEditor;