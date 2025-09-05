import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Calendar, ChevronLeft, ChevronRight, Download, Save, Wand2, Image, Layout } from "lucide-react";
import { toast } from "sonner";
import mockupCalendarDesk from '@/assets/mockup-calendar-desk.jpg';
import mockupCalendarWall from '@/assets/mockup-calendar-wall.jpg';

interface CalendarEditorProps {
  language: 'cs' | 'en';
  productType: 'desk' | 'wall';
}

const CalendarEditor = ({ language, productType }: CalendarEditorProps) => {
  const [currentMonth, setCurrentMonth] = useState(0);
  const [selectedTemplate, setSelectedTemplate] = useState('classic');
  const [showMockup, setShowMockup] = useState(true);

  const t = {
    cs: {
      title: "Editor kalendáře",
      months: [
        "Leden", "Únor", "Březen", "Duben", "Květen", "Červen",
        "Červenec", "Srpen", "Září", "Říjen", "Listopad", "Prosinec"
      ],
      layout: "Layout",
      photos: "Fotografie", 
      preview: "Náhled",
      templates: "Šablony",
      addPhoto: "Přidat fotku",
      autoFill: "Auto-vyplnit",
      save: "Uložit",
      export: "Exportovat",
      mockup: "Mockup",
      classic: "Klasický",
      modern: "Moderní",
      minimal: "Minimální"
    },
    en: {
      title: "Calendar Editor",
      months: [
        "January", "February", "March", "April", "May", "June",
        "July", "August", "September", "October", "November", "December"
      ],
      layout: "Layout",
      photos: "Photos",
      preview: "Preview", 
      templates: "Templates",
      addPhoto: "Add Photo",
      autoFill: "Auto-Fill",
      save: "Save",
      export: "Export",
      mockup: "Mockup",
      classic: "Classic",
      modern: "Modern",
      minimal: "Minimal"
    }
  };

  const templates = [
    { id: 'classic', name: t[language].classic, preview: '📅' },
    { id: 'modern', name: t[language].modern, preview: '🎨' },
    { id: 'minimal', name: t[language].minimal, preview: '◻️' }
  ];

  const handleAutoFill = () => {
    toast.success(language === 'cs' 
      ? 'AI automaticky rozmístilo fotografie' 
      : 'AI automatically arranged photos'
    );
  };

  const mockupImage = productType === 'desk' ? mockupCalendarDesk : mockupCalendarWall;

  return (
    <div className="flex h-screen bg-background">
      {/* Left Sidebar */}
      <div className="w-80 glass-panel border-r border-border/20 p-4 overflow-y-auto">
        <div className="mb-6">
          <h2 className="text-xl font-bold mb-2">{t[language].title}</h2>
          <div className="flex items-center justify-between">
            <Button variant="outline" size="sm" onClick={() => setCurrentMonth(Math.max(0, currentMonth - 1))}>
              <ChevronLeft className="h-4 w-4" />
            </Button>
            <span className="font-medium">{t[language].months[currentMonth]}</span>
            <Button variant="outline" size="sm" onClick={() => setCurrentMonth(Math.min(11, currentMonth + 1))}>
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
        </div>

        <Tabs defaultValue="templates" className="w-full">
          <TabsList className="grid w-full grid-cols-3 mb-4">
            <TabsTrigger value="templates">{t[language].templates}</TabsTrigger>
            <TabsTrigger value="photos">{t[language].photos}</TabsTrigger>
            <TabsTrigger value="layout">{t[language].layout}</TabsTrigger>
          </TabsList>

          <TabsContent value="templates" className="space-y-4">
            <div className="grid grid-cols-1 gap-3">
              {templates.map((template) => (
                <Card 
                  key={template.id}
                  className={`p-4 cursor-pointer transition-all duration-300 hover:scale-105 ${
                    selectedTemplate === template.id ? 'bg-primary/10 border-primary/50' : ''
                  }`}
                  onClick={() => setSelectedTemplate(template.id)}
                >
                  <div className="flex items-center gap-3">
                    <div className="text-2xl">{template.preview}</div>
                    <div className="font-medium">{template.name}</div>
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
            <Button variant="outline" className="w-full">
              <Image className="h-4 w-4 mr-2" />
              {t[language].addPhoto}
            </Button>
            
            <div className="grid grid-cols-2 gap-2">
              {Array.from({ length: 12 }).map((_, i) => (
                <Card key={i} className="aspect-square bg-muted/50 flex items-center justify-center">
                  <Image className="h-8 w-8 text-muted-foreground" />
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="layout" className="space-y-4">
            <div className="space-y-3">
              <div>
                <label className="text-sm font-medium mb-2 block">Pozice fotografie</label>
                <div className="grid grid-cols-3 gap-2">
                  <Button variant="outline" size="sm">Nahoře</Button>
                  <Button variant="outline" size="sm">Uprostřed</Button>
                  <Button variant="outline" size="sm">Dole</Button>
                </div>
              </div>
              
              <div>
                <label className="text-sm font-medium mb-2 block">Velikost kalendáře</label>
                <div className="grid grid-cols-2 gap-2">
                  <Button variant="outline" size="sm">Malý</Button>
                  <Button variant="outline" size="sm">Velký</Button>
                </div>
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
        <div className="flex-1 bg-muted/10 p-8 overflow-auto">
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
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div className="max-w-2xl mx-auto">
              <Card className="p-8 glass-panel">
                <div className="text-center mb-6">
                  <h3 className="text-2xl font-bold mb-2">{t[language].months[currentMonth]} 2024</h3>
                  <p className="text-muted-foreground">Template: {templates.find(t => t.id === selectedTemplate)?.name}</p>
                </div>
                
                {/* Calendar Grid */}
                <div className="grid grid-cols-7 gap-2 mb-6">
                  {['Po', 'Út', 'St', 'Čt', 'Pá', 'So', 'Ne'].map(day => (
                    <div key={day} className="text-center font-medium text-sm p-2">
                      {day}
                    </div>
                  ))}
                  {Array.from({ length: 35 }).map((_, i) => (
                    <div key={i} className="aspect-square bg-muted/30 rounded flex items-center justify-center text-sm">
                      {i < 31 ? i + 1 : ''}
                    </div>
                  ))}
                </div>

                {/* Photo Placeholder */}
                <div className="bg-gradient-secondary aspect-[4/3] rounded-lg flex items-center justify-center">
                  <div className="text-center text-white">
                    <Image className="h-16 w-16 mx-auto mb-4 opacity-80" />
                    <p className="text-lg font-medium">Vaše fotografie</p>
                    <p className="opacity-80">Přidejte fotku pro tento měsíc</p>
                  </div>
                </div>
              </Card>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CalendarEditor;