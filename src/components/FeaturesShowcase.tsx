import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { 
  Sparkles, Wand2, Palette, Download, Shield, Clock,
  ArrowRight, Check, Star, Zap, Image, Layout
} from "lucide-react";

interface FeaturesShowcaseProps {
  language: 'cs' | 'en';
}

const FeaturesShowcase = ({ language }: FeaturesShowcaseProps) => {
  const t = {
    cs: {
      title: "Proč si vybrat ",
      titleGradient: "PhotoBook Pro",
      subtitle: "Moderní technologie a AI funkce pro vytváření dokonalých fotoknih",
      learnMore: "Zjistit více",
      features: [
        {
          icon: Sparkles,
          title: "AI Smart-Fill",
          description: "Automatické rozpoznávání a rozmístění fotografií pomocí pokročilé AI",
          highlight: true
        },
        {
          icon: Wand2,
          title: "Odstranění pozadí",
          description: "Profesionální úprava fotografií přímo v prohlížeči"
        },
        {
          icon: Palette,
          title: "Color Palette AI",
          description: "Automatické vytváření barevných palet z vašich fotografií"
        },
        {
          icon: Layout,
          title: "Smart Layouts",
          description: "AI generuje optimální rozložení na základě obsahu fotografií"
        },
        {
          icon: Image,
          title: "Photo Enhancement",
          description: "Automatické vylepšení kvality a korekce fotografií"
        },
        {
          icon: Download,
          title: "Instant Preview",
          description: "Okamžitý náhled výsledného produktu ve vysoké kvalitě"
        }
      ],
      benefits: [
        {
          icon: Shield,
          title: "100% Bezpečné",
          description: "Vaše fotografie zůstávají ve vašem prohlížeči"
        },
        {
          icon: Clock,
          title: "5x Rychlejší",
          description: "Vytvoření fotoknihy za pouhých 10 minut"
        },
        {
          icon: Zap,
          title: "AI Powered",
          description: "Nejmodernější AI technologie pro perfektní výsledky"
        }
      ]
    },
    en: {
      title: "Why choose ",
      titleGradient: "PhotoBook Pro",
      subtitle: "Modern technology and AI features for creating perfect photobooks",
      learnMore: "Learn More",
      features: [
        {
          icon: Sparkles,
          title: "AI Smart-Fill",
          description: "Automatic photo recognition and placement using advanced AI",
          highlight: true
        },
        {
          icon: Wand2,
          title: "Background Removal",
          description: "Professional photo editing directly in your browser"
        },
        {
          icon: Palette,
          title: "Color Palette AI",
          description: "Automatic color palette creation from your photographs"
        },
        {
          icon: Layout,
          title: "Smart Layouts",
          description: "AI generates optimal layouts based on photo content"
        },
        {
          icon: Image,
          title: "Photo Enhancement",
          description: "Automatic quality improvement and photo correction"
        },
        {
          icon: Download,
          title: "Instant Preview",
          description: "Immediate preview of the final product in high quality"
        }
      ],
      benefits: [
        {
          icon: Shield,
          title: "100% Secure",
          description: "Your photos stay in your browser"
        },
        {
          icon: Clock,
          title: "5x Faster",
          description: "Create photobooks in just 10 minutes"
        },
        {
          icon: Zap,
          title: "AI Powered",
          description: "Cutting-edge AI technology for perfect results"
        }
      ]
    }
  };

  return (
    <section className="py-20 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-gradient-primary rounded-full opacity-5 blur-3xl"></div>
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-gradient-accent rounded-full opacity-5 blur-3xl"></div>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            {t[language].title}
            <span className="gradient-text">{t[language].titleGradient}</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            {t[language].subtitle}
          </p>
        </div>

        {/* Main Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-20">
          {t[language].features.map((feature, index) => {
            const IconComponent = feature.icon;
            return (
              <Card 
                key={index} 
                className={`glass-panel p-8 group hover:scale-105 transition-all duration-500 relative overflow-hidden ${
                  feature.highlight ? 'border-primary/20' : ''
                }`}
              >
                {feature.highlight && (
                  <div className="absolute top-4 right-4">
                    <span className="pill text-xs bg-gradient-primary text-white px-3 py-1">
                      <Star className="h-3 w-3 mr-1" />
                      Popular
                    </span>
                  </div>
                )}

                {/* Icon */}
                <div className="mb-6">
                  <div className={`w-14 h-14 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300 ${
                    feature.highlight 
                      ? 'bg-gradient-primary' 
                      : 'glass-panel'
                  }`}>
                    <IconComponent className={`h-7 w-7 ${
                      feature.highlight ? 'text-white' : 'text-primary'
                    }`} />
                  </div>
                </div>

                {/* Content */}
                <h3 className="text-xl font-semibold mb-3">{feature.title}</h3>
                <p className="text-muted-foreground mb-4 text-sm leading-relaxed">
                  {feature.description}
                </p>

                {/* Hover Effect */}
                <div className="absolute inset-0 bg-gradient-primary opacity-0 group-hover:opacity-3 transition-opacity duration-300 rounded-[var(--radius-glass)]"></div>
              </Card>
            );
          })}
        </div>

        {/* Benefits Bar */}
        <div className="glass-panel p-8 rounded-3xl">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {t[language].benefits.map((benefit, index) => {
              const IconComponent = benefit.icon;
              return (
                <div key={index} className="text-center group">
                  <div className="w-16 h-16 bg-gradient-primary rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
                    <IconComponent className="h-8 w-8 text-white" />
                  </div>
                  <h3 className="text-lg font-semibold mb-2">{benefit.title}</h3>
                  <p className="text-muted-foreground text-sm">{benefit.description}</p>
                </div>
              );
            })}
          </div>
        </div>

        {/* CTA */}
        <div className="text-center mt-16">
          <Button variant="glossy" size="lg" className="px-8 py-4 group">
            {t[language].learnMore}
            <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
          </Button>
        </div>
      </div>
    </section>
  );
};

export default FeaturesShowcase;