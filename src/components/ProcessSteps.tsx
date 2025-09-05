import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { 
  Upload, Wand2, Eye, Truck, ArrowRight, Check, Circle
} from "lucide-react";

interface ProcessStepsProps {
  language: 'cs' | 'en';
}

const ProcessSteps = ({ language }: ProcessStepsProps) => {
  const t = {
    cs: {
      title: "Jak to ",
      titleGradient: "funguje",
      subtitle: "Vytvořte svou fotoknihu ve 4 jednoduchých krocích",
      cta: "Začít hned",
      steps: [
        {
          number: "01",
          icon: Upload,
          title: "Nahrajte fotografie",
          description: "Přetáhněte své oblíbené fotografie nebo je vyberte ze svého zařízení. Podporujeme všechny běžné formáty.",
          details: ["JPG, PNG, HEIC", "Až 100 fotografií", "Automatická optimalizace"]
        },
        {
          number: "02", 
          icon: Wand2,
          title: "AI vytvoří návrh",
          description: "Naše AI analyzuje vaše fotografie a automaticky vytvoří krásné rozložení s inteligentním řazením.",
          details: ["Smart rozpoznávání", "Automatické řazení", "Optimální kompozice"]
        },
        {
          number: "03",
          icon: Eye,
          title: "Upravte a zkontrolujte",
          description: "Přizpůsobte si rozložení podle svých představ. Přidejte texty, změňte pořadí nebo upravte design.",
          details: ["Drag & drop editor", "Textové nástroje", "Live náhled"]
        },
        {
          number: "04",
          icon: Truck,
          title: "Objednejte a dostanete",
          description: "Zvolte formát a počet kopií. Tiskneme a doručíme vám hotovou fotoknihu během 3-5 pracovních dnů.",
          details: ["Profesionální tisk", "Rychlé doručení", "100% záruka kvality"]
        }
      ]
    },
    en: {
      title: "How it ",
      titleGradient: "works",
      subtitle: "Create your photobook in 4 simple steps",
      cta: "Start Now",
      steps: [
        {
          number: "01",
          icon: Upload,
          title: "Upload Photos",
          description: "Drag and drop your favorite photos or select them from your device. We support all common formats.",
          details: ["JPG, PNG, HEIC", "Up to 100 photos", "Auto optimization"]
        },
        {
          number: "02",
          icon: Wand2,
          title: "AI Creates Design",
          description: "Our AI analyzes your photos and automatically creates beautiful layouts with intelligent sorting.",
          details: ["Smart recognition", "Auto sorting", "Optimal composition"]
        },
        {
          number: "03",
          icon: Eye,
          title: "Edit and Review",
          description: "Customize the layout according to your vision. Add texts, change order, or modify the design.",
          details: ["Drag & drop editor", "Text tools", "Live preview"]
        },
        {
          number: "04",
          icon: Truck,
          title: "Order and Receive",
          description: "Choose format and number of copies. We print and deliver your finished photobook within 3-5 business days.",
          details: ["Professional printing", "Fast delivery", "100% quality guarantee"]
        }
      ]
    }
  };

  return (
    <section className="py-20 relative overflow-hidden bg-muted/30">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0" style={{
          backgroundImage: `radial-gradient(circle at 2px 2px, currentColor 1px, transparent 1px)`,
          backgroundSize: '40px 40px'
        }}></div>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            {t[language].title}
            <span className="gradient-text">{t[language].titleGradient}</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            {t[language].subtitle}
          </p>
        </div>

        {/* Steps */}
        <div className="relative">
          {/* Connection Line */}
          <div className="absolute top-1/2 left-0 right-0 h-px bg-gradient-to-r from-transparent via-border to-transparent hidden lg:block transform -translate-y-1/2 z-0"></div>

          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 relative z-10">
            {t[language].steps.map((step, index) => {
              const IconComponent = step.icon;
              const isActive = index === 1; // Highlight the AI step

              return (
                <div key={index} className="relative group">
                  {/* Step Card */}
                  <Card className={`glass-panel p-8 text-center group-hover:scale-105 transition-all duration-500 relative overflow-hidden ${
                    isActive ? 'border-primary/30' : ''
                  }`}>
                    {/* Step Number Badge */}
                    <div className={`absolute top-4 left-4 w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold ${
                      isActive 
                        ? 'bg-gradient-primary text-white' 
                        : 'bg-muted text-muted-foreground'
                    }`}>
                      {step.number}
                    </div>

                    {/* Icon */}
                    <div className="mb-6">
                      <div className={`w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300 ${
                        isActive 
                          ? 'bg-gradient-primary' 
                          : 'glass-panel'
                      }`}>
                        <IconComponent className={`h-8 w-8 ${
                          isActive ? 'text-white' : 'text-primary'
                        }`} />
                      </div>
                    </div>

                    {/* Content */}
                    <h3 className="text-lg font-semibold mb-3">{step.title}</h3>
                    <p className="text-muted-foreground text-sm mb-6 leading-relaxed">
                      {step.description}
                    </p>

                    {/* Details */}
                    <div className="space-y-2">
                      {step.details.map((detail, detailIndex) => (
                        <div key={detailIndex} className="flex items-center text-xs text-muted-foreground">
                          <Check className="h-3 w-3 text-green-500 mr-2 flex-shrink-0" />
                          <span>{detail}</span>
                        </div>
                      ))}
                    </div>

                    {/* Hover Effect */}
                    <div className="absolute inset-0 bg-gradient-primary opacity-0 group-hover:opacity-3 transition-opacity duration-300 rounded-[var(--radius-glass)]"></div>
                  </Card>

                  {/* Connection Dot for larger screens */}
                  {index < 3 && (
                    <div className="hidden lg:block absolute top-1/2 -right-4 transform -translate-y-1/2 z-20">
                      <div className={`w-8 h-8 rounded-full border-4 border-background flex items-center justify-center ${
                        isActive 
                          ? 'bg-gradient-primary' 
                          : 'bg-muted'
                      }`}>
                        <Circle className={`h-3 w-3 ${
                          isActive ? 'text-white' : 'text-muted-foreground'
                        }`} />
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* CTA */}
        <div className="text-center mt-16">
          <Button variant="glossy" size="lg" className="px-8 py-4 group">
            {t[language].cta}
            <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
          </Button>
        </div>
      </div>
    </section>
  );
};

export default ProcessSteps;