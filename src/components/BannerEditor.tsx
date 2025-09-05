import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Slider } from "@/components/ui/slider";
import { 
  Maximize, Download, Save, Image, Ruler, Wind, 
  Eye, Layout, Sparkles, Settings
} from "lucide-react";
import { toast } from "sonner";
import mockupBannerLarge from '@/assets/mockup-banner-large.jpg';

interface BannerEditorProps {
  language: 'cs' | 'en';
  bannerType: 'basic' | 'premium';
}

const BannerEditor = ({ language, bannerType }: BannerEditorProps) => {
  const [dimensions, setDimensions] = useState({ width: 3000, height: 2000 });
  const [showMockup, setShowMockup] = useState(true);
  const [showEyelets, setShowEyelets] = useState(true);
  const [hemSize, setHemSize] = useState(2);

  const t = {
    cs: {
      title: "Editor bannerů",
      dimensions: "Rozměry",
      materials: "Materiály",
      finishing: "Dokončení",
      width: "Šířka",
      height: "Výška",
      basic: "Basic 510g/m²",
      premium: "Premium 680g/m² B1",
      hems: "Lemy",
      eyelets: "Očka",
      tunnels: "Tunýlky",
      corners: "Rohové výztuhy",
      save: "Uložit",
      export: "Exportovat",
      mockup: "Mockup",
      price: "Cena",
      outdoor: "Venkovní použití",
      fireproof: "Ohnivzdorný B1"
    },
    en: {
      title: "Banner Editor",
      dimensions: "Dimensions",
      materials: "Materials", 
      finishing: "Finishing",
      width: "Width",
      height: "Height",
      basic: "Basic 510g/m²",
      premium: "Premium 680g/m² B1",
      hems: "Hems",
      eyelets: "Eyelets",
      tunnels: "Tunnels",
      corners: "Corner reinforcements",
      save: "Save",
      export: "Export",
      mockup: "Mockup",
      price: "Price",
      outdoor: "Outdoor use",
      fireproof: "Fireproof B1"
    }
  };

  const calculatePrice = () => {
    const area = (dimensions.width * dimensions.height) / 1000000; // m²
    const pricePerM2 = bannerType === 'basic' ? 150 : 250;
    return Math.round(area * pricePerM2);
  };

  const handleAutoSize = (preset: string) => {
    switch (preset) {
      case 'billboard':
        setDimensions({ width: 5000, height: 2380 });
        break;
      case 'facade':
        setDimensions({ width: 3000, height: 2000 });
        break;
      case 'shop':
        setDimensions({ width: 2000, height: 1000 });
        break;
    }
  };

  return (
    <div className="flex h-screen bg-background">
      {/* Left Sidebar */}
      <div className="w-80 glass-panel border-r border-border/20 p-4 overflow-y-auto">
        <div className="mb-6">
          <h2 className="text-xl font-bold mb-2">{t[language].title}</h2>
          <p className="text-sm text-muted-foreground">
            {bannerType === 'basic' ? t[language].basic : t[language].premium}
          </p>
        </div>

        <Tabs defaultValue="dimensions" className="w-full">
          <TabsList className="grid w-full grid-cols-3 mb-4">
            <TabsTrigger value="dimensions">{t[language].dimensions}</TabsTrigger>
            <TabsTrigger value="materials">{t[language].materials}</TabsTrigger>
            <TabsTrigger value="finishing">{t[language].finishing}</TabsTrigger>
          </TabsList>

          <TabsContent value="dimensions" className="space-y-4">
            <div className="space-y-4">
              <div>
                <label className="text-sm font-medium mb-2 block">{t[language].width} (mm)</label>
                <Input 
                  type="number"
                  value={dimensions.width}
                  onChange={(e) => setDimensions(prev => ({ ...prev, width: Number(e.target.value) }))}
                  min="500"
                  max="10000"
                />
              </div>
              
              <div>
                <label className="text-sm font-medium mb-2 block">{t[language].height} (mm)</label>
                <Input 
                  type="number"
                  value={dimensions.height}
                  onChange={(e) => setDimensions(prev => ({ ...prev, height: Number(e.target.value) }))}
                  min="300"
                  max="5000"
                />
              </div>

              <div>
                <label className="text-sm font-medium mb-2 block">Předvolby</label>
                <div className="grid grid-cols-1 gap-2">
                  <Button variant="outline" size="sm" onClick={() => handleAutoSize('billboard')}>
                    Billboard 5×2.4m
                  </Button>
                  <Button variant="outline" size="sm" onClick={() => handleAutoSize('facade')}>
                    Fasáda 3×2m
                  </Button>
                  <Button variant="outline" size="sm" onClick={() => handleAutoSize('shop')}>
                    Výloha 2×1m
                  </Button>
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

          <TabsContent value="materials" className="space-y-4">
            <div className="space-y-3">
              <Card className={`p-4 cursor-pointer transition-all duration-300 ${
                bannerType === 'basic' ? 'bg-primary/10 border-primary/50' : ''
              }`}>
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-gradient-secondary rounded"></div>
                  <div>
                    <div className="font-medium">{t[language].basic}</div>
                    <div className="text-xs text-muted-foreground">{t[language].outdoor}</div>
                  </div>
                </div>
              </Card>

              <Card className={`p-4 cursor-pointer transition-all duration-300 ${
                bannerType === 'premium' ? 'bg-primary/10 border-primary/50' : ''
              }`}>
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-gradient-primary rounded"></div>
                  <div>
                    <div className="font-medium">{t[language].premium}</div>
                    <div className="text-xs text-muted-foreground">{t[language].fireproof}</div>
                  </div>
                </div>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="finishing" className="space-y-4">
            <div className="space-y-4">
              <div>
                <label className="text-sm font-medium mb-2 block">{t[language].hems} (cm)</label>
                <Slider
                  value={[hemSize]}
                  onValueChange={(value) => setHemSize(value[0])}
                  max={5}
                  min={1}
                  step={0.5}
                  className="w-full"
                />
                <div className="text-xs text-muted-foreground mt-1">{hemSize} cm</div>
              </div>

              <div className="space-y-2">
                <Button 
                  variant={showEyelets ? "default" : "outline"}
                  size="sm"
                  className="w-full justify-start"
                  onClick={() => setShowEyelets(!showEyelets)}
                >
                  <Eye className="h-4 w-4 mr-2" />
                  {t[language].eyelets} co 50cm
                </Button>

                {bannerType === 'premium' && (
                  <>
                    <Button variant="outline" size="sm" className="w-full justify-start">
                      <Wind className="h-4 w-4 mr-2" />
                      {t[language].tunnels}
                    </Button>
                    <Button variant="outline" size="sm" className="w-full justify-start">
                      <Settings className="h-4 w-4 mr-2" />
                      {t[language].corners}
                    </Button>
                  </>
                )}
              </div>
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
                  src={mockupBannerLarge} 
                  alt="Banner mockup"
                  className="w-full h-auto rounded-lg shadow-elegant"
                />
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="bg-white/90 backdrop-blur-sm rounded-lg p-6 text-center">
                    <Maximize className="h-12 w-12 mx-auto mb-4 text-primary" />
                    <h3 className="text-lg font-semibold mb-2">
                      {dimensions.width} × {dimensions.height} mm
                    </h3>
                    <p className="text-muted-foreground">
                      {bannerType === 'basic' ? t[language].basic : t[language].premium}
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
                width: `${Math.min(600, dimensions.width / 5)}px`, 
                height: `${Math.min(400, dimensions.height / 5)}px`
              }}
            >
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-center">
                  <Image className="h-16 w-16 mx-auto mb-4 text-muted-foreground" />
                  <p className="text-lg font-medium text-foreground">Váš design</p>
                  <p className="text-sm text-muted-foreground">{dimensions.width} × {dimensions.height} mm</p>
                </div>
              </div>
              
              {/* Eyelets visualization */}
              {showEyelets && (
                <>
                  <div className="absolute top-2 left-4 w-2 h-2 bg-gray-400 rounded-full"></div>
                  <div className="absolute top-2 right-4 w-2 h-2 bg-gray-400 rounded-full"></div>
                  <div className="absolute bottom-2 left-4 w-2 h-2 bg-gray-400 rounded-full"></div>
                  <div className="absolute bottom-2 right-4 w-2 h-2 bg-gray-400 rounded-full"></div>
                </>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default BannerEditor;