import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Slider } from "@/components/ui/slider";
import { 
  Ruler, Download, Save, Maximize, Image, Palette, 
  RotateCw, Crop, Move, ZoomIn, Layout, Sparkles 
} from "lucide-react";
import { toast } from "sonner";
import mockupWallartAcrylic from '@/assets/mockup-wallart-acrylic.jpg';
import mockupWallartDibond from '@/assets/mockup-wallart-dibond.jpg';

interface WallArtEditorProps {
  language: 'cs' | 'en';
  material: 'acrylic' | 'dibond';
}

const WallArtEditor = ({ language, material }: WallArtEditorProps) => {
  const [dimensions, setDimensions] = useState({ width: 600, height: 400 });
  const [zoom, setZoom] = useState([100]);
  const [showMockup, setShowMockup] = useState(true);
  const [selectedTool, setSelectedTool] = useState('move');

  const t = {
    cs: {
      title: "Wall Art Editor",
      dimensions: "Rozměry",
      tools: "Nástroje",
      materials: "Materiály",
      preview: "Náhled",
      width: "Šířka",
      height: "Výška",
      ratio: "Poměr stran",
      move: "Přesun",
      rotate: "Rotace",
      crop: "Ořez",
      zoom: "Přiblížit",
      save: "Uložit",
      export: "Exportovat",
      mockup: "Mockup",
      acrylic: "Akryl 10mm",
      dibond: "Dibond 3mm",
      minSize: "Min. 200×200 mm",
      maxSize: "Max. 2000×2000 mm",
      price: "Cena",
      aiEnhance: "AI vylepšení"
    },
    en: {
      title: "Wall Art Editor", 
      dimensions: "Dimensions",
      tools: "Tools",
      materials: "Materials",
      preview: "Preview",
      width: "Width",
      height: "Height", 
      ratio: "Aspect Ratio",
      move: "Move",
      rotate: "Rotate",
      crop: "Crop",
      zoom: "Zoom",
      save: "Save", 
      export: "Export",
      mockup: "Mockup",
      acrylic: "Acrylic 10mm",
      dibond: "Dibond 3mm",
      minSize: "Min. 200×200 mm",
      maxSize: "Max. 2000×2000 mm",
      price: "Price",
      aiEnhance: "AI Enhancement"
    }
  };

  const tools = [
    { id: 'move', icon: Move, label: t[language].move },
    { id: 'rotate', icon: RotateCw, label: t[language].rotate },
    { id: 'crop', icon: Crop, label: t[language].crop },
    { id: 'zoom', icon: ZoomIn, label: t[language].zoom }
  ];

  const ratios = [
    { label: '1:1', value: 1 },
    { label: '4:3', value: 4/3 },
    { label: '16:9', value: 16/9 },
    { label: '3:2', value: 3/2 }
  ];

  const handleRatioChange = (ratio: number) => {
    setDimensions(prev => ({
      width: prev.width,
      height: Math.round(prev.width / ratio)
    }));
  };

  const calculatePrice = () => {
    const area = (dimensions.width * dimensions.height) / 1000000; // m²
    const pricePerM2 = material === 'acrylic' ? 1990 : 1490;
    return Math.round(area * pricePerM2);
  };

  const handleAIEnhance = () => {
    toast.success(language === 'cs' 
      ? 'AI vylepšení aplikováno' 
      : 'AI enhancement applied'
    );
  };

  const mockupImage = material === 'acrylic' ? mockupWallartAcrylic : mockupWallartDibond;

  return (
    <div className="flex h-screen bg-background">
      {/* Left Sidebar */}
      <div className="w-80 glass-panel border-r border-border/20 p-4 overflow-y-auto">
        <div className="mb-6">
          <h2 className="text-xl font-bold mb-2">{t[language].title}</h2>
          <p className="text-sm text-muted-foreground">
            {material === 'acrylic' ? t[language].acrylic : t[language].dibond}
          </p>
        </div>

        <Tabs defaultValue="dimensions" className="w-full">
          <TabsList className="grid w-full grid-cols-3 mb-4">
            <TabsTrigger value="dimensions">{t[language].dimensions}</TabsTrigger>
            <TabsTrigger value="tools">{t[language].tools}</TabsTrigger>
            <TabsTrigger value="materials">{t[language].materials}</TabsTrigger>
          </TabsList>

          <TabsContent value="dimensions" className="space-y-4">
            <div className="space-y-4">
              <div>
                <label className="text-sm font-medium mb-2 block">{t[language].width} (mm)</label>
                <Input 
                  type="number"
                  value={dimensions.width}
                  onChange={(e) => setDimensions(prev => ({ ...prev, width: Number(e.target.value) }))}
                  min="200"
                  max="2000"
                />
              </div>
              
              <div>
                <label className="text-sm font-medium mb-2 block">{t[language].height} (mm)</label>
                <Input 
                  type="number"
                  value={dimensions.height}
                  onChange={(e) => setDimensions(prev => ({ ...prev, height: Number(e.target.value) }))}
                  min="200"
                  max="2000"
                />
              </div>

              <div>
                <label className="text-sm font-medium mb-2 block">{t[language].ratio}</label>
                <div className="grid grid-cols-2 gap-2">
                  {ratios.map((ratio) => (
                    <Button 
                      key={ratio.label}
                      variant="outline" 
                      size="sm"
                      onClick={() => handleRatioChange(ratio.value)}
                    >
                      {ratio.label}
                    </Button>
                  ))}
                </div>
              </div>

              <div className="p-4 glass-panel rounded-lg">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-sm font-medium">{t[language].price}:</span>
                  <span className="text-lg font-bold text-primary">{calculatePrice()} CZK</span>
                </div>
                <div className="text-xs text-muted-foreground">
                  {(dimensions.width * dimensions.height / 1000000).toFixed(2)} m²
                </div>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="tools" className="space-y-4">
            <div className="grid grid-cols-2 gap-2">
              {tools.map((tool) => (
                <Button
                  key={tool.id}
                  variant={selectedTool === tool.id ? "default" : "outline"}
                  size="sm"
                  className="flex flex-col h-20 gap-2"
                  onClick={() => setSelectedTool(tool.id)}
                >
                  <tool.icon className="h-5 w-5" />
                  <span className="text-xs">{tool.label}</span>
                </Button>
              ))}
            </div>

            <div className="space-y-3">
              <div>
                <label className="text-sm font-medium mb-2 block">{t[language].zoom}: {zoom[0]}%</label>
                <Slider
                  value={zoom}
                  onValueChange={setZoom}
                  max={200}
                  min={25}
                  step={25}
                  className="w-full"
                />
              </div>
            </div>

            <Button variant="glossy" className="w-full" onClick={handleAIEnhance}>
              <Sparkles className="h-4 w-4 mr-2" />
              {t[language].aiEnhance}
            </Button>
          </TabsContent>

          <TabsContent value="materials" className="space-y-4">
            <div className="space-y-3">
              <Card className={`p-4 cursor-pointer transition-all duration-300 ${
                material === 'acrylic' ? 'bg-primary/10 border-primary/50' : ''
              }`}>
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-gradient-primary rounded"></div>
                  <div>
                    <div className="font-medium">{t[language].acrylic}</div>
                    <div className="text-xs text-muted-foreground">Premium kvalita</div>
                  </div>
                </div>
              </Card>

              <Card className={`p-4 cursor-pointer transition-all duration-300 ${
                material === 'dibond' ? 'bg-primary/10 border-primary/50' : ''
              }`}>
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-gradient-secondary rounded"></div>
                  <div>
                    <div className="font-medium">{t[language].dibond}</div>
                    <div className="text-xs text-muted-foreground">Odolný hliník</div>
                  </div>
                </div>
              </Card>
            </div>

            <div className="text-xs text-muted-foreground space-y-1">
              <div>{t[language].minSize}</div>
              <div>{t[language].maxSize}</div>
            </div>
          </TabsContent>
        </Tabs>
      </div>

      {/* Main Canvas */}
      <div className="flex-1 flex flex-col">
        {/* Top Toolbar */}
        <div className="h-16 glass-panel border-b border-border/20 flex items-center justify-between px-4">
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm" onClick={() => setShowMockup(!showMockup)}>
              <Layout className="h-4 w-4 mr-2" />
              {t[language].mockup}
            </Button>
            <div className="text-sm text-muted-foreground">
              {dimensions.width} × {dimensions.height} mm
            </div>
          </div>
          
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm">
              <Save className="h-4 w-4 mr-2" />
              {t[language].save}
            </Button>
            <Button variant="glossy" size="sm">
              <Download className="h-4 w-4 mr-2" />
              {t[language].export}
            </Button>
          </div>
        </div>

        {/* Canvas Area */}
        <div className="flex-1 bg-muted/10 p-8 overflow-auto flex items-center justify-center">
          {showMockup ? (
            <div className="max-w-4xl mx-auto">
              <div className="relative">
                <img 
                  src={mockupImage} 
                  alt="Wall art mockup"
                  className="w-full h-auto rounded-lg shadow-elegant"
                />
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="bg-white/90 backdrop-blur-sm rounded-lg p-6 text-center">
                    <Ruler className="h-12 w-12 mx-auto mb-4 text-primary" />
                    <h3 className="text-lg font-semibold mb-2">
                      {dimensions.width} × {dimensions.height} mm
                    </h3>
                    <p className="text-muted-foreground">
                      {material === 'acrylic' ? t[language].acrylic : t[language].dibond}
                    </p>
                    <p className="text-primary font-semibold mt-2">
                      {calculatePrice()} CZK
                    </p>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div 
              className="relative bg-white rounded-lg shadow-elegant border-2 border-dashed border-gray-300"
              style={{ 
                width: `${Math.min(400, dimensions.width / 2)}px`, 
                height: `${Math.min(400, dimensions.height / 2)}px`,
                transform: `scale(${zoom[0] / 100})`
              }}
            >
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-center">
                  <Image className="h-16 w-16 mx-auto mb-4 text-muted-foreground" />
                  <p className="text-lg font-medium text-foreground">Vaše fotografie</p>
                  <p className="text-sm text-muted-foreground">{dimensions.width} × {dimensions.height} mm</p>
                </div>
              </div>
              
              {/* Measurement guides */}
              <div className="absolute -top-8 left-0 right-0 h-6 flex items-center justify-center text-xs text-muted-foreground">
                {dimensions.width} mm
              </div>
              <div className="absolute -left-8 top-0 bottom-0 w-6 flex items-center justify-center text-xs text-muted-foreground writing-mode-vertical">
                {dimensions.height} mm
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default WallArtEditor;