import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Slider } from "@/components/ui/slider";
import { 
  Move, RotateCw, Crop, Type, Image, Save, Share2, Download,
  Grid3X3, Eye, Layers, Palette, Sparkles, Undo, Redo, FileImage, Wand2, Camera, Layout, ArrowLeft
} from "lucide-react";
import { toast } from "sonner";
import TemplateGallery from "@/components/TemplateGallery";
import PhotoBankModal from "@/components/PhotoBankModal";
import CalendarEditor from "@/components/CalendarEditor";
import AdvancedCalendarEditor from "@/components/AdvancedCalendarEditor";
import WallArtEditor from "@/components/WallArtEditor";
import MagnetsEditor from "@/components/MagnetsEditor";
import { ProductTemplate } from "@/hooks/useTemplates";
import { PhotoBankImage } from "@/lib/photobank-services";
import mockupPhotobookOpen from '@/assets/mockup-photobook-open.jpg';

interface StudioEditorProps {
  language: 'cs' | 'en';
  productType?: 'photobook' | 'calendar-desk' | 'calendar-wall' | 'wallart-acrylic' | 'wallart-dibond' | 'magnets' | 'banners';
  onBack?: () => void;
}

const StudioEditor = ({ language, productType = 'photobook', onBack }: StudioEditorProps) => {
  const [selectedTool, setSelectedTool] = useState<string>('move');
  const [zoom, setZoom] = useState([100]);
  const [showGrid, setShowGrid] = useState(true);
  const [showSafeArea, setShowSafeArea] = useState(true);
  const [showTemplateGallery, setShowTemplateGallery] = useState(true);
  const [showPhotoBank, setShowPhotoBank] = useState(false);
  const [selectedTemplate, setSelectedTemplate] = useState<ProductTemplate | null>(null);
  const [canvasImages, setCanvasImages] = useState<PhotoBankImage[]>([]);
  const [showMockup, setShowMockup] = useState(true);

  const t = {
    cs: {
      tools: "Nástroje",
      layers: "Vrstvy", 
      properties: "Vlastnosti",
      templates: "Šablony",
      photobank: "Fotobanky",
      canvas: "Plátno",
      move: "Přesun",
      rotate: "Rotace",
      crop: "Ořez",
      text: "Text",
      image: "Obrázek",
      zoom: "Přiblížení",
      grid: "Mřížka",
      safeArea: "Bezpečná oblast",
      save: "Uložit",
      share: "Sdílet",
      export: "Exportovat",
      undo: "Zpět",
      redo: "Vpřed",
      aiSuggest: "AI návrhy"
    },
    en: {
      tools: "Tools",
      layers: "Layers",
      properties: "Properties",
      templates: "Templates",
      photobank: "Photo Banks", 
      canvas: "Canvas",
      move: "Move",
      rotate: "Rotate",
      crop: "Crop",
      text: "Text",
      image: "Image",
      zoom: "Zoom",
      grid: "Grid",
      safeArea: "Safe Area",
      save: "Save",
      share: "Share",
      export: "Export",
      undo: "Undo",
      redo: "Redo",
      aiSuggest: "AI Suggestions"
    }
  };

  const tools = [
    { id: 'move', icon: Move, label: t[language].move },
    { id: 'rotate', icon: RotateCw, label: t[language].rotate },
    { id: 'crop', icon: Crop, label: t[language].crop },
    { id: 'text', icon: Type, label: t[language].text },
    { id: 'image', icon: Image, label: t[language].image },
  ];

  const handleToolSelect = (toolId: string) => {
    setSelectedTool(toolId);
    toast.success(`${t[language][toolId as keyof typeof t[typeof language]]} nástroj aktivován`);
  };

  const handleSave = () => {
    toast.success(language === 'cs' ? 'Projekt uložen' : 'Project saved');
  };

  const handleShare = () => {
    toast.success(language === 'cs' ? 'Odkaz zkopírován' : 'Link copied');
  };

  const handleSelectTemplate = (template: ProductTemplate) => {
    setSelectedTemplate(template);
    setShowTemplateGallery(false);
    toast.success(language === 'cs' 
      ? `Šablona "${template.name}" byla načtena` 
      : `Template "${template.name}" loaded`
    );
  };

  const handleSelectImage = (image: PhotoBankImage) => {
    setCanvasImages([...canvasImages, image]);
    toast.success(language === 'cs' 
      ? 'Obrázek přidán na plátno' 
      : 'Image added to canvas'
    );
  };

  // Render specialized editors for specific product types
  if (productType === 'calendar-desk') {
    return <AdvancedCalendarEditor language={language} productType="desk" />;
  }
  
  if (productType === 'calendar-wall') {
    return <AdvancedCalendarEditor language={language} productType="wall" />;
  }
  
  if (productType === 'wallart-acrylic') {
    return <WallArtEditor language={language} material="acrylic" />;
  }
  
  if (productType === 'wallart-dibond') {
    return <WallArtEditor language={language} material="dibond" />;
  }
  
  if (productType === 'magnets') {
    return <MagnetsEditor language={language} />;
  }

  return (
    <div className="flex h-screen bg-background">
      {/* Left Sidebar */}
      <div className="w-80 glass-panel border-r border-border/20 p-4 overflow-y-auto">
        <Tabs defaultValue={showTemplateGallery ? "templates" : "tools"} className="w-full">
          <TabsList className="grid w-full grid-cols-4 mb-4 text-xs">
            <TabsTrigger value="templates">{t[language].templates}</TabsTrigger>
            <TabsTrigger value="tools">{t[language].tools}</TabsTrigger>
            <TabsTrigger value="layers">{t[language].layers}</TabsTrigger>
            <TabsTrigger value="properties">{t[language].properties}</TabsTrigger>
          </TabsList>
          
          <TabsContent value="templates" className="space-y-4">
            <TemplateGallery
              productType="photobook"
              language={language}
              onSelectTemplate={handleSelectTemplate}
              selectedTemplateId={selectedTemplate?.id}
            />
          </TabsContent>
          
          <TabsContent value="tools" className="space-y-4">
            <div className="grid grid-cols-2 gap-2">
              {tools.map((tool) => (
                <Button
                  key={tool.id}
                  variant={selectedTool === tool.id ? "default" : "outline"}
                  size="sm"
                  className="flex flex-col h-20 gap-2"
                  onClick={() => handleToolSelect(tool.id)}
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
              
              <div className="flex gap-2">
                <Button
                  variant={showGrid ? "default" : "outline"}
                  size="sm"
                  onClick={() => setShowGrid(!showGrid)}
                  className="flex-1"
                >
                  <Grid3X3 className="h-4 w-4 mr-2" />
                  {t[language].grid}
                </Button>
                <Button
                  variant={showSafeArea ? "default" : "outline"}
                  size="sm"
                  onClick={() => setShowSafeArea(!showSafeArea)}
                  className="flex-1"
                >
                  <Eye className="h-4 w-4 mr-2" />
                  {t[language].safeArea}
                </Button>
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="layers" className="space-y-2">
            <Card className="p-3 glass-panel">
              <div className="flex items-center gap-2">
                <Layers className="h-4 w-4" />
                <span className="text-sm">Background</span>
              </div>
            </Card>
            <Card className="p-3 glass-panel">
              <div className="flex items-center gap-2">
                <Image className="h-4 w-4" />
                <span className="text-sm">Photo 1</span>
              </div>
            </Card>
            <Card className="p-3 glass-panel">
              <div className="flex items-center gap-2">
                <Type className="h-4 w-4" />
                <span className="text-sm">Title Text</span>
              </div>
            </Card>
          </TabsContent>
          
          <TabsContent value="properties" className="space-y-4">
            <div className="space-y-3">
              <div>
                <label className="text-sm font-medium mb-2 block">X Position</label>
                <Slider defaultValue={[50]} max={100} step={1} />
              </div>
              <div>
                <label className="text-sm font-medium mb-2 block">Y Position</label>
                <Slider defaultValue={[50]} max={100} step={1} />
              </div>
              <div>
                <label className="text-sm font-medium mb-2 block">Width</label>
                <Slider defaultValue={[75]} max={100} step={1} />
              </div>
              <div>
                <label className="text-sm font-medium mb-2 block">Height</label>
                <Slider defaultValue={[75]} max={100} step={1} />
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </div>

      {/* Main Canvas Area */}
      <div className="flex-1 flex flex-col">
        {/* Top Toolbar */}
        <div className="h-16 glass-panel border-b border-border/20 flex items-center justify-between px-4">
          <div className="flex items-center gap-2">
            {onBack && (
              <Button variant="outline" size="sm" onClick={onBack}>
                <ArrowLeft className="h-4 w-4 mr-2" />
                Zpět
              </Button>
            )}
            <Button variant="outline" size="sm">
              <Undo className="h-4 w-4" />
            </Button>
            <Button variant="outline" size="sm">
              <Redo className="h-4 w-4" />
            </Button>
            <div className="h-4 w-px bg-border mx-2" />
            <Button variant="outline" size="sm" onClick={() => setShowMockup(!showMockup)}>
              <Layout className="h-4 w-4 mr-2" />
              Mockup
            </Button>
            <Button variant="outline" size="sm">
              <Sparkles className="h-4 w-4 mr-2" />
              {t[language].aiSuggest}
            </Button>
          </div>
          
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm" onClick={handleSave}>
              <Save className="h-4 w-4 mr-2" />
              {t[language].save}
            </Button>
            <Button variant="outline" size="sm" onClick={handleShare}>
              <Share2 className="h-4 w-4 mr-2" />
              {t[language].share}
            </Button>
            <Button variant="glossy" size="sm">
              <Download className="h-4 w-4 mr-2" />
              {t[language].export}
            </Button>
          </div>
        </div>

        {/* Canvas */}
        <div className="flex-1 bg-muted/10 flex items-center justify-center p-8 relative overflow-auto">
          {showMockup ? (
            <div className="max-w-4xl mx-auto">
              <div className="relative">
                <img 
                  src={mockupPhotobookOpen} 
                  alt="Photobook mockup"
                  className="w-full h-auto rounded-lg shadow-elegant"
                />
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="bg-white/90 backdrop-blur-sm rounded-lg p-6 text-center">
                    <Image className="h-12 w-12 mx-auto mb-4 text-primary" />
                    <h3 className="text-lg font-semibold mb-2">Fotokniha A4</h3>
                    <p className="text-muted-foreground">
                      {selectedTemplate ? selectedTemplate.name : 'Vyberte šablonu'}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div 
              className="relative bg-white rounded-lg shadow-elegant"
              style={{ 
                width: `${300 * (zoom[0] / 100)}px`, 
                height: `${400 * (zoom[0] / 100)}px`,
                transform: `scale(${zoom[0] / 100})`
              }}
            >
              {/* Grid Overlay */}
              {showGrid && (
                <div 
                  className="absolute inset-0 opacity-20 pointer-events-none"
                  style={{
                    backgroundImage: `
                      linear-gradient(rgba(99, 102, 241, 0.3) 1px, transparent 1px),
                      linear-gradient(90deg, rgba(99, 102, 241, 0.3) 1px, transparent 1px)
                    `,
                    backgroundSize: '20px 20px'
                  }}
                />
              )}
              
              {/* Safe Area Overlay */}
              {showSafeArea && (
                <div className="absolute inset-4 border-2 border-amber-400 border-dashed opacity-50 pointer-events-none" />
              )}
              
              {/* Content */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-center p-8">
                  <div className="w-32 h-32 bg-muted rounded-lg mb-4 flex items-center justify-center">
                    <Image className="h-12 w-12 text-muted-foreground" />
                  </div>
                  <h3 className="text-xl font-bold text-foreground mb-2">Váš nadpis</h3>
                  <p className="text-muted-foreground">Váš text zde</p>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

        {/* Right Sidebar */}
        <div className="w-80 glass-panel border-l border-border/20 p-4">
          <div className="space-y-4">
            {/* Photo Bank Integration */}
            <Card className="p-4 glass-panel">
              <h3 className="font-semibold mb-3 flex items-center gap-2">
                <FileImage className="h-4 w-4" />
                {t[language].photobank}
              </h3>
              <p className="text-sm text-muted-foreground mb-4">
                {language === 'cs' 
                  ? 'Přidejte profesionální fotografie z našich fotobánek.'
                  : 'Add professional photos from our photo banks.'
                }
              </p>
              <Button 
                variant="outline" 
                className="w-full"
                onClick={() => setShowPhotoBank(true)}
              >
                <Camera className="h-4 w-4 mr-2" />
                {language === 'cs' ? 'Procházet fotobanky' : 'Browse Photo Banks'}
              </Button>
            </Card>

            {/* AI Smart-Fill */}
            <Card className="p-4 glass-panel">
              <h3 className="font-semibold mb-3 flex items-center gap-2">
                <Sparkles className="h-4 w-4" />
                AI Smart-Fill
              </h3>
              <p className="text-sm text-muted-foreground mb-4">
                {language === 'cs'
                  ? 'Automaticky vyplňte stránky pomocí AI analýzy vašich fotek.'
                  : 'Automatically fill pages using AI analysis of your photos.'
                }
              </p>
              <Button variant="glossy" className="w-full">
                <Wand2 className="h-4 w-4 mr-2" />
                {language === 'cs' ? 'Spustit AI' : 'Run AI'}
              </Button>
            </Card>

            {/* Template Info */}
            {selectedTemplate && (
              <Card className="p-4 glass-panel">
                <h3 className="font-semibold mb-3">
                  {language === 'cs' ? 'Aktivní šablona' : 'Active Template'}
                </h3>
                <div className="space-y-2">
                  <div className="text-sm font-medium">{selectedTemplate.name}</div>
                  <div className="text-xs text-muted-foreground">{selectedTemplate.description}</div>
                  <Button 
                    variant="outline" 
                    size="sm" 
                    className="w-full"
                    onClick={() => {
                      setSelectedTemplate(null);
                      setShowTemplateGallery(true);
                    }}
                  >
                    {language === 'cs' ? 'Změnit šablonu' : 'Change Template'}
                  </Button>
                </div>
              </Card>
            )}
            
            {/* Quick Actions */}
            <Card className="p-4 glass-panel">
              <h3 className="font-semibold mb-3">
                {language === 'cs' ? 'Rychlé akce' : 'Quick Actions'}
              </h3>
              <div className="space-y-2">
                <Button variant="outline" size="sm" className="w-full justify-start">
                  <Palette className="h-4 w-4 mr-2" />
                  {language === 'cs' ? 'Změnit barvy' : 'Change Colors'}
                </Button>
                <Button variant="outline" size="sm" className="w-full justify-start">
                  <Type className="h-4 w-4 mr-2" />
                  {language === 'cs' ? 'Upravit text' : 'Edit Text'}
                </Button>
                <Button 
                  variant="outline" 
                  size="sm" 
                  className="w-full justify-start"
                  onClick={() => setShowPhotoBank(true)}
                >
                  <Image className="h-4 w-4 mr-2" />
                  {language === 'cs' ? 'Přidat obrázek' : 'Add Image'}
                </Button>
              </div>
            </Card>
          </div>
        </div>

      {/* Photo Bank Modal */}
      <PhotoBankModal
        isOpen={showPhotoBank}
        onClose={() => setShowPhotoBank(false)}
        onSelectImage={handleSelectImage}
        language={language}
      />
    </div>
  );
};

export default StudioEditor;