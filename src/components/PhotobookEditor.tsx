import { useState, useEffect, useRef, useCallback } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Slider } from "@/components/ui/slider";
import { Input } from "@/components/ui/input";
import { 
  Move, RotateCw, Crop, Type, Image, Save, Share2, Download, Grid3X3, Eye, 
  Layers, Palette, Sparkles, Undo, Redo, FileImage, Wand2, Camera, Layout,
  Plus, Minus, Copy, Trash2, AlignLeft, AlignCenter, AlignRight, Bold, Italic,
  Underline, ZoomIn, ZoomOut, MousePointer, Square, Circle, ArrowLeft
} from "lucide-react";
import { Canvas as FabricCanvas, Image as FabricImage, Textbox, Rect, Circle as FabricCircle, Line } from "fabric";
import { toast } from "sonner";
import TemplateGallery from "@/components/TemplateGallery";
import PhotoBankModal from "@/components/PhotoBankModal";
import { ProductTemplate } from "@/hooks/useTemplates";
import { PhotoBankImage } from "@/lib/photobank-services";
import mockupPhotobookOpen from '@/assets/mockup-photobook-open.jpg';

interface PhotobookEditorProps {
  language: 'cs' | 'en';
  onBack?: () => void;
}

const PhotobookEditor = ({ language, onBack }: PhotobookEditorProps) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [fabricCanvas, setFabricCanvas] = useState<FabricCanvas | null>(null);
  const [selectedTool, setSelectedTool] = useState<string>('select');
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(20);
  const [zoom, setZoom] = useState([100]);
  const [showGrid, setShowGrid] = useState(true);
  const [showSafeArea, setShowSafeArea] = useState(true);
  const [showTemplateGallery, setShowTemplateGallery] = useState(false);
  const [showPhotoBank, setShowPhotoBank] = useState(false);
  const [selectedTemplate, setSelectedTemplate] = useState<ProductTemplate | null>(null);
  const [showMockup, setShowMockup] = useState(false);
  const [selectedObject, setSelectedObject] = useState<any>(null);
  const [layers, setLayers] = useState<any[]>([]);

  const t = {
    cs: {
      title: "Editor fotoknih",
      tools: "Nástroje",
      layers: "Vrstvy", 
      properties: "Vlastnosti",
      templates: "Šablony",
      photobank: "Fotobanky",
      pages: "Stránky",
      select: "Výběr",
      move: "Přesun",
      rotate: "Rotace",
      crop: "Ořez",
      text: "Text",
      image: "Obrázek",
      shape: "Tvar",
      zoom: "Přiblížení",
      grid: "Mřížka",
      safeArea: "Bezpečná oblast",
      save: "Uložit",
      share: "Sdílet",
      export: "Exportovat",
      undo: "Zpět",
      redo: "Vpřed",
      aiSuggest: "AI návrhy",
      addPage: "Přidat stránku",
      deletePage: "Smazat stránku",
      duplicatePage: "Duplikovat stránku",
      position: "Pozice",
      size: "Velikost",
      rotation: "Rotace",
      opacity: "Průhlednost",
      fillColor: "Barva výplně",
      strokeColor: "Barva ohraničení",
      strokeWidth: "Šířka ohraničení",
      fontSize: "Velikost písma",
      fontFamily: "Typ písma",
      textAlign: "Zarovnání textu",
      backgroundColor: "Barva pozadí"
    },
    en: {
      title: "Photobook Editor",
      tools: "Tools",
      layers: "Layers",
      properties: "Properties",
      templates: "Templates",
      photobank: "Photo Banks", 
      pages: "Pages",
      select: "Select",
      move: "Move",
      rotate: "Rotate",
      crop: "Crop",
      text: "Text",
      image: "Image",
      shape: "Shape",
      zoom: "Zoom",
      grid: "Grid",
      safeArea: "Safe Area",
      save: "Save",
      share: "Share",
      export: "Export",
      undo: "Undo",
      redo: "Redo",
      aiSuggest: "AI Suggestions",
      addPage: "Add Page",
      deletePage: "Delete Page",
      duplicatePage: "Duplicate Page",
      position: "Position",
      size: "Size",
      rotation: "Rotation",
      opacity: "Opacity",
      fillColor: "Fill Color",
      strokeColor: "Stroke Color",
      strokeWidth: "Stroke Width",
      fontSize: "Font Size",
      fontFamily: "Font Family",
      textAlign: "Text Align",
      backgroundColor: "Background Color"
    }
  };

  const tools = [
    { id: 'select', icon: MousePointer, label: t[language].select },
    { id: 'move', icon: Move, label: t[language].move },
    { id: 'rotate', icon: RotateCw, label: t[language].rotate },
    { id: 'text', icon: Type, label: t[language].text },
    { id: 'image', icon: Image, label: t[language].image },
    { id: 'rectangle', icon: Square, label: 'Rectangle' },
    { id: 'circle', icon: Circle, label: 'Circle' },
  ];

  // Initialize Fabric Canvas
  useEffect(() => {
    if (!canvasRef.current || fabricCanvas) return;

    const canvas = new FabricCanvas(canvasRef.current, {
      width: 800,
      height: 600,
      backgroundColor: '#ffffff',
    });

    setFabricCanvas(canvas);

    // Handle object selection
    canvas.on('selection:created', (e) => {
      setSelectedObject(e.selected![0]);
      updateLayers();
    });

    canvas.on('selection:updated', (e) => {
      setSelectedObject(e.selected![0]);
      updateLayers();
    });

    canvas.on('selection:cleared', () => {
      setSelectedObject(null);
    });

    canvas.on('object:modified', () => {
      updateLayers();
    });

    return () => {
      canvas.dispose();
    };
  }, []);

  // Add grid when showGrid changes
  useEffect(() => {
    if (!fabricCanvas) return;

    // Remove existing grid lines
    const objects = fabricCanvas.getObjects();
    objects.forEach(obj => {
      if (obj.selectable === false && obj.evented === false) {
        fabricCanvas.remove(obj);
      }
    });

    if (showGrid) {
      const gridSize = 20;
      const gridOptions = {
        stroke: '#ddd',
        strokeWidth: 1,
        selectable: false,
        evented: false,
      };

      // Vertical lines
      for (let i = 0; i < fabricCanvas.width!; i += gridSize) {
        const line = new Line([i, 0, i, fabricCanvas.height!], gridOptions);
        fabricCanvas.add(line);
      }

      // Horizontal lines
      for (let i = 0; i < fabricCanvas.height!; i += gridSize) {
        const line = new Line([0, i, fabricCanvas.width!, i], gridOptions);
        fabricCanvas.add(line);
      }
    }

    fabricCanvas.renderAll();
  }, [showGrid, fabricCanvas]);

  const updateLayers = useCallback(() => {
    if (!fabricCanvas) return;
    
    const objects = fabricCanvas.getObjects().filter(obj => obj.selectable !== false);
    setLayers(objects.map((obj, index) => ({
      id: index,
      name: obj.type === 'textbox' ? 'Text' : obj.type === 'image' ? 'Image' : 'Shape',
      type: obj.type,
      visible: obj.visible,
      object: obj
    })));
  }, [fabricCanvas]);

  const handleToolSelect = (toolId: string) => {
    setSelectedTool(toolId);
    
    if (!fabricCanvas) return;

    fabricCanvas.isDrawingMode = false;
    
    switch (toolId) {
      case 'text':
        const text = new Textbox('Váš text', {
          left: 100,
          top: 100,
          fontFamily: 'Arial',
          fontSize: 20,
          fill: '#000000',
        });
        fabricCanvas.add(text);
        fabricCanvas.setActiveObject(text);
        break;
        
      case 'rectangle':
        const rect = new Rect({
          left: 100,
          top: 100,
          fill: '#ff0000',
          width: 100,
          height: 100,
        });
        fabricCanvas.add(rect);
        fabricCanvas.setActiveObject(rect);
        break;
        
      case 'circle':
        const circle = new FabricCircle({
          left: 100,
          top: 100,
          fill: '#00ff00',
          radius: 50,
        });
        fabricCanvas.add(circle);
        fabricCanvas.setActiveObject(circle);
        break;
    }

    updateLayers();
    toast.success(`${tools.find(t => t.id === toolId)?.label} aktivován`);
  };

  const handleAddImage = (imageUrl: string) => {
    if (!fabricCanvas) return;

    FabricImage.fromURL(imageUrl, {
      crossOrigin: 'anonymous'
    }).then((img) => {
      img.scale(0.5);
      img.set({
        left: 50,
        top: 50,
      });
      fabricCanvas.add(img);
      fabricCanvas.setActiveObject(img);
      updateLayers();
    });
  };

  const handleSelectImage = (image: PhotoBankImage) => {
    handleAddImage(image.urls.small);
    toast.success('Obrázek přidán na plátno');
  };

  const handleSave = () => {
    if (fabricCanvas) {
      const dataURL = fabricCanvas.toDataURL();
      console.log('Saved canvas:', dataURL);
    }
    toast.success('Projekt uložen');
  };

  const handleZoomChange = (value: number[]) => {
    setZoom(value);
    if (fabricCanvas) {
      const zoomLevel = value[0] / 100;
      fabricCanvas.setZoom(zoomLevel);
      fabricCanvas.renderAll();
    }
  };

  const updateObjectProperty = (property: string, value: any) => {
    if (!selectedObject || !fabricCanvas) return;
    
    selectedObject.set(property, value);
    fabricCanvas.renderAll();
    updateLayers();
  };

  return (
    <div className="flex h-screen bg-background">
      {/* Left Sidebar */}
      <div className="w-80 glass-panel border-r border-border/20 p-4 overflow-y-auto">
        <div className="mb-4">
          <h2 className="text-xl font-bold mb-2">{t[language].title}</h2>
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <span>Stránka {currentPage} z {totalPages}</span>
            <Button variant="outline" size="sm" onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}>
              <Minus className="h-3 w-3" />
            </Button>
            <Button variant="outline" size="sm" onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}>
              <Plus className="h-3 w-3" />
            </Button>
          </div>
        </div>

        <Tabs defaultValue="tools" className="w-full">
          <TabsList className="grid w-full grid-cols-4 mb-4 text-xs">
            <TabsTrigger value="tools">{t[language].tools}</TabsTrigger>
            <TabsTrigger value="layers">{t[language].layers}</TabsTrigger>
            <TabsTrigger value="templates">{t[language].templates}</TabsTrigger>
            <TabsTrigger value="properties">{t[language].properties}</TabsTrigger>
          </TabsList>
          
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
                  onValueChange={handleZoomChange}
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
            {layers.map((layer, index) => (
              <Card 
                key={index} 
                className={`p-3 glass-panel cursor-pointer transition-all duration-300 ${
                  selectedObject === layer.object ? 'bg-primary/10 border-primary/50' : ''
                }`}
                onClick={() => {
                  fabricCanvas?.setActiveObject(layer.object);
                  fabricCanvas?.renderAll();
                  setSelectedObject(layer.object);
                }}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    {layer.type === 'textbox' && <Type className="h-4 w-4" />}
                    {layer.type === 'image' && <Image className="h-4 w-4" />}
                    {(layer.type === 'rect' || layer.type === 'circle') && <Layers className="h-4 w-4" />}
                    <span className="text-sm">{layer.name}</span>
                  </div>
                  <div className="flex gap-1">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={(e) => {
                        e.stopPropagation();
                        layer.object.set('visible', !layer.object.visible);
                        fabricCanvas?.renderAll();
                        updateLayers();
                      }}
                    >
                      <Eye className={`h-3 w-3 ${layer.visible ? '' : 'opacity-50'}`} />
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={(e) => {
                        e.stopPropagation();
                        fabricCanvas?.remove(layer.object);
                        updateLayers();
                      }}
                    >
                      <Trash2 className="h-3 w-3" />
                    </Button>
                  </div>
                </div>
              </Card>
            ))}
          </TabsContent>
          
          <TabsContent value="templates" className="space-y-4">
            <TemplateGallery
              productType="photobook"
              language={language}
              onSelectTemplate={(template) => {
                setSelectedTemplate(template);
                toast.success(`Šablona "${template.name}" načtena`);
              }}
              selectedTemplateId={selectedTemplate?.id}
            />
          </TabsContent>
          
          <TabsContent value="properties" className="space-y-4">
            {selectedObject ? (
              <div className="space-y-3">
                {selectedObject.type === 'textbox' && (
                  <>
                    <div>
                      <label className="text-sm font-medium mb-2 block">{t[language].fontSize}</label>
                      <Slider
                        value={[selectedObject.fontSize || 20]}
                        onValueChange={([value]) => updateObjectProperty('fontSize', value)}
                        max={72}
                        min={8}
                        step={2}
                      />
                    </div>
                    <div>
                      <label className="text-sm font-medium mb-2 block">Text</label>
                      <Input
                        value={selectedObject.text || ''}
                        onChange={(e) => updateObjectProperty('text', e.target.value)}
                      />
                    </div>
                    <div className="flex gap-2">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => updateObjectProperty('textAlign', 'left')}
                      >
                        <AlignLeft className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => updateObjectProperty('textAlign', 'center')}
                      >
                        <AlignCenter className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => updateObjectProperty('textAlign', 'right')}
                      >
                        <AlignRight className="h-4 w-4" />
                      </Button>
                    </div>
                  </>
                )}

                <div>
                  <label className="text-sm font-medium mb-2 block">{t[language].opacity}</label>
                  <Slider
                    value={[selectedObject.opacity * 100 || 100]}
                    onValueChange={([value]) => updateObjectProperty('opacity', value / 100)}
                    max={100}
                    min={0}
                    step={5}
                  />
                </div>

                <div>
                  <label className="text-sm font-medium mb-2 block">{t[language].rotation}</label>
                  <Slider
                    value={[selectedObject.angle || 0]}
                    onValueChange={([value]) => updateObjectProperty('angle', value)}
                    max={360}
                    min={0}
                    step={15}
                  />
                </div>

                {selectedObject.type !== 'image' && (
                  <div>
                    <label className="text-sm font-medium mb-2 block">{t[language].fillColor}</label>
                    <Input
                      type="color"
                      value={selectedObject.fill || '#000000'}
                      onChange={(e) => updateObjectProperty('fill', e.target.value)}
                    />
                  </div>
                )}
              </div>
            ) : (
              <div className="text-center py-8">
                <Layers className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
                <p className="text-muted-foreground">Vyberte objekt pro úpravy</p>
              </div>
            )}
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
            <Button variant="outline" size="sm">
              <Plus className="h-4 w-4 mr-2" />
              {t[language].addPage}
            </Button>
            <Button variant="outline" size="sm" onClick={handleSave}>
              <Save className="h-4 w-4 mr-2" />
              {t[language].save}
            </Button>
            <Button variant="outline" size="sm">
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
                      Stránka {currentPage} z {totalPages}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div className="relative">
              <canvas 
                ref={canvasRef}
                className="border border-border rounded-lg shadow-elegant"
                style={{ maxWidth: '100%', maxHeight: '100%' }}
              />
              
              {/* Safe Area Overlay */}
              {showSafeArea && (
                <div className="absolute inset-4 border-2 border-amber-400 border-dashed opacity-50 pointer-events-none rounded" />
              )}
            </div>
          )}
        </div>
      </div>

      {/* Right Sidebar */}
      <div className="w-80 glass-panel border-l border-border/20 p-4">
        <div className="space-y-4">
          {/* Page Management */}
          <Card className="p-4 glass-panel">
            <h3 className="font-semibold mb-3 flex items-center gap-2">
              <FileImage className="h-4 w-4" />
              {t[language].pages}
            </h3>
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>Celkem stránek:</span>
                <span>{totalPages}</span>
              </div>
              <div className="flex gap-2">
                <Button variant="outline" size="sm" className="flex-1">
                  <Plus className="h-3 w-3 mr-1" />
                  {t[language].addPage}
                </Button>
                <Button variant="outline" size="sm" className="flex-1">
                  <Copy className="h-3 w-3 mr-1" />
                  Duplikovat
                </Button>
              </div>
            </div>
          </Card>

          {/* Photo Bank Integration */}
          <Card className="p-4 glass-panel">
            <h3 className="font-semibold mb-3 flex items-center gap-2">
              <Camera className="h-4 w-4" />
              {t[language].photobank}
            </h3>
            <p className="text-sm text-muted-foreground mb-4">
              Přidejte profesionální fotografie z našich fotobánek.
            </p>
            <Button 
              variant="outline" 
              className="w-full"
              onClick={() => setShowPhotoBank(true)}
            >
              <Camera className="h-4 w-4 mr-2" />
              Procházet fotobanky
            </Button>
          </Card>

          {/* AI Smart-Fill */}
          <Card className="p-4 glass-panel">
            <h3 className="font-semibold mb-3 flex items-center gap-2">
              <Sparkles className="h-4 w-4" />
              AI Smart-Fill
            </h3>
            <p className="text-sm text-muted-foreground mb-4">
              Automaticky vyplňte stránky pomocí AI analýzy vašich fotek.
            </p>
            <Button variant="glossy" className="w-full">
              <Wand2 className="h-4 w-4 mr-2" />
              Spustit AI
            </Button>
          </Card>

          {/* Quick Actions */}
          <Card className="p-4 glass-panel">
            <h3 className="font-semibold mb-3">
              Rychlé akce
            </h3>
            <div className="space-y-2">
              <Button 
                variant="outline" 
                size="sm" 
                className="w-full justify-start"
                onClick={() => handleToolSelect('text')}
              >
                <Type className="h-4 w-4 mr-2" />
                Přidat text
              </Button>
              <Button 
                variant="outline" 
                size="sm" 
                className="w-full justify-start"
                onClick={() => setShowPhotoBank(true)}
              >
                <Image className="h-4 w-4 mr-2" />
                Přidat obrázek
              </Button>
              <Button 
                variant="outline" 
                size="sm" 
                className="w-full justify-start"
                onClick={() => handleToolSelect('rectangle')}
              >
                <Square className="h-4 w-4 mr-2" />
                Přidat tvar
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

export default PhotobookEditor;