import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { 
  Square, Circle, Heart, Star, Image, Download, Save, 
  Grid3X3, Scissors, Copy, Trash2, Wand2, Layout
} from "lucide-react";
import { toast } from "sonner";
import mockupMagnets from '@/assets/mockup-magnets.jpg';

interface MagnetsEditorProps {
  language: 'cs' | 'en';
}

const MagnetsEditor = ({ language }: MagnetsEditorProps) => {
  const [selectedShape, setSelectedShape] = useState('square');
  const [magnetCount, setMagnetCount] = useState(9);
  const [showMockup, setShowMockup] = useState(true);
  const [selectedMagnets, setSelectedMagnets] = useState<number[]>([]);

  const t = {
    cs: {
      title: "Editor magnetů",
      shapes: "Tvary",
      layout: "Rozložení", 
      photos: "Fotografie",
      cutting: "Řezání",
      square: "Čtverec",
      circle: "Kruh",
      heart: "Srdce",
      star: "Hvězda",
      custom: "Vlastní",
      count: "Počet magnetů",
      size: "Velikost",
      spacing: "Rozestup",
      autoArrange: "Auto-rozložení",
      addPhoto: "Přidat fotku",
      duplicate: "Duplikovat",
      delete: "Smazat",
      save: "Uložit",
      export: "Exportovat",
      mockup: "Mockup",
      price: "Cena",
      small: "Malý (50×50mm)",
      medium: "Střední (70×70mm)",
      large: "Velký (90×90mm)"
    },
    en: {
      title: "Magnets Editor",
      shapes: "Shapes",
      layout: "Layout",
      photos: "Photos", 
      cutting: "Cutting",
      square: "Square",
      circle: "Circle",
      heart: "Heart",
      star: "Star",
      custom: "Custom",
      count: "Magnet Count",
      size: "Size",
      spacing: "Spacing",
      autoArrange: "Auto-Arrange",
      addPhoto: "Add Photo",
      duplicate: "Duplicate",
      delete: "Delete",
      save: "Save",
      export: "Export",
      mockup: "Mockup",
      price: "Price",
      small: "Small (50×50mm)",
      medium: "Medium (70×70mm)",
      large: "Large (90×90mm)"
    }
  };

  const shapes = [
    { id: 'square', icon: Square, label: t[language].square },
    { id: 'circle', icon: Circle, label: t[language].circle },
    { id: 'heart', icon: Heart, label: t[language].heart },
    { id: 'star', icon: Star, label: t[language].star }
  ];

  const sizes = [
    { id: 'small', label: t[language].small, price: 25 },
    { id: 'medium', label: t[language].medium, price: 35 },
    { id: 'large', label: t[language].large, price: 45 }
  ];

  const [selectedSize, setSelectedSize] = useState('medium');

  const handleAutoArrange = () => {
    toast.success(language === 'cs' 
      ? 'Fotografie automaticky rozmístěny' 
      : 'Photos automatically arranged'
    );
  };

  const toggleMagnetSelection = (index: number) => {
    setSelectedMagnets(prev => 
      prev.includes(index) 
        ? prev.filter(i => i !== index)
        : [...prev, index]
    );
  };

  const calculatePrice = () => {
    const size = sizes.find(s => s.id === selectedSize);
    return magnetCount * (size?.price || 35);
  };

  return (
    <div className="flex h-screen bg-background">
      {/* Left Sidebar */}
      <div className="w-80 glass-panel border-r border-border/20 p-4 overflow-y-auto">
        <div className="mb-6">
          <h2 className="text-xl font-bold mb-2">{t[language].title}</h2>
          <p className="text-sm text-muted-foreground">
            {magnetCount} magnetů × {sizes.find(s => s.id === selectedSize)?.price} CZK
          </p>
        </div>

        <Tabs defaultValue="shapes" className="w-full">
          <TabsList className="grid w-full grid-cols-3 mb-4">
            <TabsTrigger value="shapes">{t[language].shapes}</TabsTrigger>
            <TabsTrigger value="layout">{t[language].layout}</TabsTrigger>
            <TabsTrigger value="photos">{t[language].photos}</TabsTrigger>
          </TabsList>

          <TabsContent value="shapes" className="space-y-4">
            <div className="grid grid-cols-2 gap-2">
              {shapes.map((shape) => (
                <Button
                  key={shape.id}
                  variant={selectedShape === shape.id ? "default" : "outline"}
                  size="sm"
                  className="flex flex-col h-20 gap-2"
                  onClick={() => setSelectedShape(shape.id)}
                >
                  <shape.icon className="h-5 w-5" />
                  <span className="text-xs">{shape.label}</span>
                </Button>
              ))}
            </div>

            <div>
              <label className="text-sm font-medium mb-2 block">{t[language].size}</label>
              <div className="space-y-2">
                {sizes.map((size) => (
                  <Card 
                    key={size.id}
                    className={`p-3 cursor-pointer transition-all duration-300 ${
                      selectedSize === size.id ? 'bg-primary/10 border-primary/50' : ''
                    }`}
                    onClick={() => setSelectedSize(size.id)}
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-sm">{size.label}</span>
                      <span className="text-sm font-medium">{size.price} CZK</span>
                    </div>
                  </Card>
                ))}
              </div>
            </div>
          </TabsContent>

          <TabsContent value="layout" className="space-y-4">
            <div>
              <label className="text-sm font-medium mb-2 block">{t[language].count}</label>
              <Input 
                type="number"
                value={magnetCount}
                onChange={(e) => setMagnetCount(Number(e.target.value))}
                min="1"
                max="20"
              />
            </div>

            <div className="grid grid-cols-3 gap-2">
              <Button variant="outline" size="sm">3×3</Button>
              <Button variant="outline" size="sm">4×3</Button>
              <Button variant="outline" size="sm">5×2</Button>
            </div>

            <Button variant="glossy" className="w-full" onClick={handleAutoArrange}>
              <Wand2 className="h-4 w-4 mr-2" />
              {t[language].autoArrange}
            </Button>

            <div className="p-4 glass-panel rounded-lg">
              <div className="flex justify-between items-center">
                <span className="text-sm font-medium">{t[language].price}:</span>
                <span className="text-lg font-bold text-primary">{calculatePrice()} CZK</span>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="photos" className="space-y-4">
            <Button variant="outline" className="w-full">
              <Image className="h-4 w-4 mr-2" />
              {t[language].addPhoto}
            </Button>
            
            <div className="grid grid-cols-3 gap-2">
              {Array.from({ length: 9 }).map((_, i) => (
                <Card 
                  key={i} 
                  className={`aspect-square bg-muted/50 flex items-center justify-center cursor-pointer transition-all duration-300 ${
                    selectedMagnets.includes(i) ? 'ring-2 ring-primary' : ''
                  }`}
                  onClick={() => toggleMagnetSelection(i)}
                >
                  <Image className="h-6 w-6 text-muted-foreground" />
                </Card>
              ))}
            </div>

            {selectedMagnets.length > 0 && (
              <div className="flex gap-2">
                <Button variant="outline" size="sm" className="flex-1">
                  <Copy className="h-3 w-3 mr-1" />
                  {t[language].duplicate}
                </Button>
                <Button variant="outline" size="sm" className="flex-1">
                  <Trash2 className="h-3 w-3 mr-1" />
                  {t[language].delete}
                </Button>
              </div>
            )}
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
            <Button variant="outline" size="sm">
              <Scissors className="h-4 w-4 mr-2" />
              {t[language].cutting} Path
            </Button>
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
                  src={mockupMagnets} 
                  alt="Magnets mockup"
                  className="w-full h-auto rounded-lg shadow-elegant"
                />
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="bg-white/90 backdrop-blur-sm rounded-lg p-6 text-center">
                    <Grid3X3 className="h-12 w-12 mx-auto mb-4 text-primary" />
                    <h3 className="text-lg font-semibold mb-2">
                      {magnetCount} magnetů
                    </h3>
                    <p className="text-muted-foreground">
                      {shapes.find(s => s.id === selectedShape)?.label} • {sizes.find(s => s.id === selectedSize)?.label}
                    </p>
                    <p className="text-primary font-semibold mt-2">
                      {calculatePrice()} CZK
                    </p>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div className="grid grid-cols-3 gap-4 max-w-md mx-auto">
              {Array.from({ length: magnetCount }).map((_, i) => {
                const ShapeIcon = shapes.find(s => s.id === selectedShape)?.icon || Square;
                return (
                  <Card 
                    key={i}
                    className={`aspect-square p-4 cursor-pointer transition-all duration-300 hover:scale-105 ${
                      selectedMagnets.includes(i) ? 'ring-2 ring-primary bg-primary/10' : ''
                    }`}
                    onClick={() => toggleMagnetSelection(i)}
                  >
                    <div className="w-full h-full bg-gradient-secondary rounded flex items-center justify-center">
                      <div className="text-center text-white">
                        <ShapeIcon className="h-8 w-8 mx-auto mb-2 opacity-80" />
                        <Image className="h-6 w-6 mx-auto opacity-60" />
                      </div>
                    </div>
                  </Card>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default MagnetsEditor;