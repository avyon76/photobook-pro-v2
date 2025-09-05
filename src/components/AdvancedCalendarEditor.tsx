import { useState, useEffect, useRef, useCallback } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Slider } from "@/components/ui/slider";
import { Calendar, ChevronLeft, ChevronRight, Download, Save, Wand2, Image, Layout, Type, Plus, Palette, Settings, Grid3X3, Eye, MousePointer } from "lucide-react";
import { Canvas as FabricCanvas, Image as FabricImage, Textbox, Rect, Group, Circle } from "fabric";
import { toast } from "sonner";
import PhotoBankModal from "@/components/PhotoBankModal";
import { PhotoBankImage } from "@/lib/photobank-services";
import mockupCalendarDesk from '@/assets/mockup-calendar-desk.jpg';
import mockupCalendarWall from '@/assets/mockup-calendar-wall.jpg';

interface AdvancedCalendarEditorProps {
  language: 'cs' | 'en';
  productType: 'desk' | 'wall';
}

const AdvancedCalendarEditor = ({ language, productType }: AdvancedCalendarEditorProps) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [fabricCanvas, setFabricCanvas] = useState<FabricCanvas | null>(null);
  const [currentMonth, setCurrentMonth] = useState(0);
  const [selectedTemplate, setSelectedTemplate] = useState('modern');
  const [showMockup, setShowMockup] = useState(false);
  const [showPhotoBank, setShowPhotoBank] = useState(false);
  const [selectedTool, setSelectedTool] = useState('select');
  const [selectedObject, setSelectedObject] = useState<any>(null);
  const [zoom, setZoom] = useState([100]);
  const [showGrid, setShowGrid] = useState(false);

  const t = {
    cs: {
      title: "Pokročilý editor kalendáře",
      months: [
        "Leden", "Únor", "Březen", "Duben", "Květen", "Červen",
        "Červenec", "Srpen", "Září", "Říjen", "Listopad", "Prosinec"
      ],
      layout: "Layout",
      photos: "Fotografie", 
      design: "Design",
      templates: "Šablony",
      addPhoto: "Přidat fotku",
      autoFill: "Auto-vyplnit",
      save: "Uložit",
      export: "Exportovat",
      mockup: "Mockup",
      text: "Text",
      image: "Obrázek",
      background: "Pozadí",
      colors: "Barvy",
      fonts: "Písma",
      events: "Události",
      holidays: "Svátky",
      notes: "Poznámky",
      photoPosition: "Pozice fotografie",
      calendarStyle: "Styl kalendáře",
      dateFormat: "Formát data",
      weekStart: "Začátek týdne"
    },
    en: {
      title: "Advanced Calendar Editor",
      months: [
        "January", "February", "March", "April", "May", "June",
        "July", "August", "September", "October", "November", "December"
      ],
      layout: "Layout",
      photos: "Photos",
      design: "Design", 
      templates: "Templates",
      addPhoto: "Add Photo",
      autoFill: "Auto-Fill",
      save: "Save",
      export: "Export",
      mockup: "Mockup",
      text: "Text",
      image: "Image",
      background: "Background",
      colors: "Colors",
      fonts: "Fonts",
      events: "Events",
      holidays: "Holidays",
      notes: "Notes",
      photoPosition: "Photo Position",
      calendarStyle: "Calendar Style",
      dateFormat: "Date Format",
      weekStart: "Week Start"
    }
  };

  const templates = [
    { id: 'modern', name: 'Modern', color: '#4F46E5', preview: '🎨' },
    { id: 'classic', name: 'Classic', color: '#059669', preview: '📅' },
    { id: 'minimal', name: 'Minimal', color: '#DC2626', preview: '◻️' },
    { id: 'nature', name: 'Nature', color: '#16A34A', preview: '🌿' },
    { id: 'business', name: 'Business', color: '#1F2937', preview: '💼' },
    { id: 'family', name: 'Family', color: '#F59E0B', preview: '👨‍👩‍👧‍👦' }
  ];

  const tools = [
    { id: 'select', icon: MousePointer, label: 'Select' },
    { id: 'text', icon: Type, label: t[language].text },
    { id: 'image', icon: Image, label: t[language].image },
    { id: 'background', icon: Palette, label: t[language].background }
  ];

  // Initialize Fabric Canvas
  useEffect(() => {
    if (!canvasRef.current || fabricCanvas) return;

    const canvas = new FabricCanvas(canvasRef.current, {
      width: productType === 'desk' ? 600 : 800,
      height: productType === 'desk' ? 400 : 600,
      backgroundColor: '#ffffff',
    });

    // Add default calendar layout
    addCalendarLayout(canvas);
    setFabricCanvas(canvas);

    // Handle object selection
    canvas.on('selection:created', (e) => {
      setSelectedObject(e.selected![0]);
    });

    canvas.on('selection:updated', (e) => {
      setSelectedObject(e.selected![0]);
    });

    canvas.on('selection:cleared', () => {
      setSelectedObject(null);
    });

    return () => {
      canvas.dispose();
    };
  }, [productType]);

  const addCalendarLayout = (canvas: FabricCanvas) => {
    // Add month title
    const monthTitle = new Textbox(t[language].months[currentMonth] + ' 2024', {
      left: 20,
      top: 20,
      fontSize: 32,
      fontFamily: 'Arial',
      fill: templates.find(t => t.id === selectedTemplate)?.color || '#000000',
      fontWeight: 'bold',
      width: 300
    });
    canvas.add(monthTitle);

    // Add photo placeholder
    const photoPlaceholder = new Rect({
      left: 20,
      top: 80,
      width: canvas.width! - 40,
      height: (canvas.height! - 200) * 0.6,
      fill: 'rgba(79, 70, 229, 0.1)',
      stroke: '#4F46E5',
      strokeDashArray: [5, 5],
      strokeWidth: 2,
    });
    canvas.add(photoPlaceholder);

    // Add calendar grid
    const calendarGrid = createCalendarGrid(canvas);
    canvas.add(calendarGrid);
  };

  const createCalendarGrid = (canvas: FabricCanvas) => {
    const gridGroup = new Group([], {
      left: 20,
      top: canvas.height! - 160,
    });

    // Week days
    const weekDays = language === 'cs' ? ['Po', 'Út', 'St', 'Čt', 'Pá', 'So', 'Ne'] : ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
    const cellWidth = (canvas.width! - 40) / 7;
    const cellHeight = 20;

    weekDays.forEach((day, i) => {
      const dayText = new Textbox(day, {
        left: i * cellWidth,
        top: 0,
        width: cellWidth,
        fontSize: 12,
        textAlign: 'center',
        fontWeight: 'bold',
        fill: '#666666'
      });
      gridGroup.add(dayText);
    });

    // Calendar dates
    for (let week = 0; week < 5; week++) {
      for (let day = 0; day < 7; day++) {
        const date = week * 7 + day + 1;
        if (date <= 31) {
          const dateRect = new Rect({
            left: day * cellWidth,
            top: (week + 1) * cellHeight + 10,
            width: cellWidth - 2,
            height: cellHeight - 2,
            fill: 'transparent',
            stroke: '#E5E7EB',
            strokeWidth: 1,
          });
          
          const dateText = new Textbox(date.toString(), {
            left: day * cellWidth + 5,
            top: (week + 1) * cellHeight + 15,
            fontSize: 10,
            fill: '#374151',
            width: cellWidth - 10
          });
          
          gridGroup.add(dateRect);
          gridGroup.add(dateText);
        }
      }
    }

    return gridGroup;
  };

  const handleToolSelect = (toolId: string) => {
    setSelectedTool(toolId);
    
    if (!fabricCanvas) return;

    switch (toolId) {
      case 'text':
        const text = new Textbox('Nový text', {
          left: 100,
          top: 100,
          fontSize: 16,
          fill: '#000000',
        });
        fabricCanvas.add(text);
        fabricCanvas.setActiveObject(text);
        break;
        
      case 'image':
        setShowPhotoBank(true);
        break;
    }

    toast.success(`${tools.find(t => t.id === toolId)?.label} aktivován`);
  };

  const handleTemplateChange = (templateId: string) => {
    setSelectedTemplate(templateId);
    if (fabricCanvas) {
      // Update canvas colors based on template
      const template = templates.find(t => t.id === templateId);
      const objects = fabricCanvas.getObjects();
      
      objects.forEach(obj => {
        if (obj.type === 'textbox' && (obj as any).fontWeight === 'bold') {
          obj.set('fill', template?.color || '#000000');
        }
      });
      
      fabricCanvas.renderAll();
    }
    toast.success(`Šablona "${templates.find(t => t.id === templateId)?.name}" použita`);
  };

  const handleSelectImage = (image: PhotoBankImage) => {
    if (!fabricCanvas) return;

    FabricImage.fromURL(image.urls.small, {
      crossOrigin: 'anonymous'
    }).then((img) => {
      img.scale(0.8);
      img.set({
        left: 20,
        top: 80,
      });
      
      // Remove old photo placeholder
      const objects = fabricCanvas.getObjects();
      objects.forEach(obj => {
        if (obj.type === 'rect' && obj.strokeDashArray) {
          fabricCanvas.remove(obj);
        }
      });
      
      fabricCanvas.add(img);
      fabricCanvas.setActiveObject(img);
      fabricCanvas.renderAll();
    });
    
    setShowPhotoBank(false);
    toast.success('Fotografie přidána');
  };

  const handleAutoFill = () => {
    if (!fabricCanvas) return;
    
    // Simulate AI auto-fill
    const holidays = [
      { date: 1, name: 'Nový rok' },
      { date: 14, name: 'Valentýn' },
      { date: 25, name: 'Vánoce' }
    ];
    
    // Add holiday markers
    holidays.forEach(holiday => {
      const marker = new Circle({
        left: 50 + (holiday.date % 7) * 80,
        top: 350 + Math.floor(holiday.date / 7) * 25,
        radius: 3,
        fill: '#EF4444'
      });
      fabricCanvas.add(marker);
    });
    
    fabricCanvas.renderAll();
    toast.success('AI automaticky přidalo svátky a události');
  };

  const mockupImage = productType === 'desk' ? mockupCalendarDesk : mockupCalendarWall;

  return (
    <div className="flex h-screen bg-background">
      {/* Left Sidebar */}
      <div className="w-80 glass-panel border-r border-border/20 p-4 overflow-y-auto">
        <div className="mb-6">
          <h2 className="text-xl font-bold mb-2">{t[language].title}</h2>
          <div className="flex items-center justify-between">
            <Button variant="outline" size="sm" onClick={() => {
              const prev = Math.max(0, currentMonth - 1);
              setCurrentMonth(prev);
              if (fabricCanvas) {
                fabricCanvas.clear();
                addCalendarLayout(fabricCanvas);
              }
            }}>
              <ChevronLeft className="h-4 w-4" />
            </Button>
            <span className="font-medium">{t[language].months[currentMonth]}</span>
            <Button variant="outline" size="sm" onClick={() => {
              const next = Math.min(11, currentMonth + 1);
              setCurrentMonth(next);
              if (fabricCanvas) {
                fabricCanvas.clear();
                addCalendarLayout(fabricCanvas);
              }
            }}>
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
        </div>

        <Tabs defaultValue="templates" className="w-full">
          <TabsList className="grid w-full grid-cols-4 mb-4 text-xs">
            <TabsTrigger value="templates">{t[language].templates}</TabsTrigger>
            <TabsTrigger value="photos">{t[language].photos}</TabsTrigger>
            <TabsTrigger value="design">{t[language].design}</TabsTrigger>
            <TabsTrigger value="layout">{t[language].layout}</TabsTrigger>
          </TabsList>

          <TabsContent value="templates" className="space-y-4">
            <div className="grid grid-cols-2 gap-3">
              {templates.map((template) => (
                <Card 
                  key={template.id}
                  className={`p-4 cursor-pointer transition-all duration-300 hover:scale-105 ${
                    selectedTemplate === template.id ? 'ring-2 ring-primary' : ''
                  }`}
                  onClick={() => handleTemplateChange(template.id)}
                >
                  <div className="flex flex-col items-center gap-2">
                    <div className="text-2xl">{template.preview}</div>
                    <div className="text-sm font-medium">{template.name}</div>
                    <div 
                      className="w-full h-2 rounded" 
                      style={{ backgroundColor: template.color }}
                    />
                  </div>
                </Card>
              ))}
            </div>
            
            <Button variant="glossy" className="w-full" onClick={handleAutoFill}>
              <Wand2 className="h-4 w-4 mr-2" />
              {t[language].autoFill}
            </Button>
          </TabsContent>

          <TabsContent value="photos" className="space-y-4">
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

            <Button variant="outline" className="w-full" onClick={() => setShowPhotoBank(true)}>
              <Image className="h-4 w-4 mr-2" />
              {t[language].addPhoto}
            </Button>
            
            <div className="space-y-2">
              <label className="text-sm font-medium">{t[language].photoPosition}</label>
              <div className="grid grid-cols-3 gap-2 text-xs">
                <Button variant="outline" size="sm">Nahoře</Button>
                <Button variant="outline" size="sm">Uprostřed</Button>
                <Button variant="outline" size="sm">Dole</Button>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="design" className="space-y-4">
            {selectedObject && (
              <div className="space-y-3">
                {selectedObject.type === 'textbox' && (
                  <>
                    <div>
                      <label className="text-sm font-medium mb-2 block">Velikost písma</label>
                      <Slider
                        value={[selectedObject.fontSize || 16]}
                        onValueChange={([value]) => {
                          selectedObject.set('fontSize', value);
                          fabricCanvas?.renderAll();
                        }}
                        max={48}
                        min={8}
                        step={2}
                      />
                    </div>
                    <div>
                      <label className="text-sm font-medium mb-2 block">Text</label>
                      <Input
                        value={selectedObject.text || ''}
                        onChange={(e) => {
                          selectedObject.set('text', e.target.value);
                          fabricCanvas?.renderAll();
                        }}
                      />
                    </div>
                    <div>
                      <label className="text-sm font-medium mb-2 block">Barva textu</label>
                      <Input
                        type="color"
                        value={selectedObject.fill || '#000000'}
                        onChange={(e) => {
                          selectedObject.set('fill', e.target.value);
                          fabricCanvas?.renderAll();
                        }}
                      />
                    </div>
                  </>
                )}
              </div>
            )}

            <Card className="p-3">
              <h4 className="text-sm font-medium mb-2">{t[language].colors}</h4>
              <div className="grid grid-cols-6 gap-2">
                {['#4F46E5', '#059669', '#DC2626', '#F59E0B', '#8B5CF6', '#06B6D4'].map(color => (
                  <div
                    key={color}
                    className="w-8 h-8 rounded cursor-pointer border-2 border-transparent hover:border-gray-300"
                    style={{ backgroundColor: color }}
                    onClick={() => {
                      if (selectedObject && selectedObject.type === 'textbox') {
                        selectedObject.set('fill', color);
                        fabricCanvas?.renderAll();
                      }
                    }}
                  />
                ))}
              </div>
            </Card>
          </TabsContent>

          <TabsContent value="layout" className="space-y-4">
            <div className="space-y-3">
              <div>
                <label className="text-sm font-medium mb-2 block">{t[language].calendarStyle}</label>
                <div className="grid grid-cols-2 gap-2">
                  <Button variant="outline" size="sm">Kompaktní</Button>
                  <Button variant="outline" size="sm">Rozšířený</Button>
                </div>
              </div>
              
              <div>
                <label className="text-sm font-medium mb-2 block">{t[language].weekStart}</label>
                <div className="grid grid-cols-2 gap-2">
                  <Button variant="outline" size="sm">Pondělí</Button>
                  <Button variant="outline" size="sm">Neděle</Button>
                </div>
              </div>

              <div className="flex gap-2">
                <Button
                  variant={showGrid ? "default" : "outline"}
                  size="sm"
                  onClick={() => setShowGrid(!showGrid)}
                  className="flex-1"
                >
                  <Grid3X3 className="h-4 w-4 mr-2" />
                  Mřížka
                </Button>
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
            <Button variant="outline" size="sm">
              <Wand2 className="h-4 w-4 mr-2" />
              AI návrhy
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
                  src={mockupImage} 
                  alt="Calendar mockup"
                  className="w-full h-auto rounded-lg shadow-elegant"
                />
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="bg-white/90 backdrop-blur-sm rounded-lg p-6 text-center">
                    <Calendar className="h-12 w-12 mx-auto mb-4 text-primary" />
                    <h3 className="text-lg font-semibold mb-2">
                      {t[language].months[currentMonth]} 2024
                    </h3>
                    <p className="text-muted-foreground">
                      {productType === 'desk' ? 'Stolní kalendář A5' : 'Nástěnný kalendář A3'}
                    </p>
                    <p className="text-sm text-primary mt-2">
                      Šablona: {templates.find(t => t.id === selectedTemplate)?.name}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div className="relative">
              <canvas 
                ref={canvasRef}
                className="border border-border rounded-lg shadow-elegant bg-white"
              />
            </div>
          )}
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

export default AdvancedCalendarEditor;