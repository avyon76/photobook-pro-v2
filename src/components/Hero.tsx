import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ArrowRight, Star, Camera, Book, Calendar, Play, Sparkles, Award, Users } from "lucide-react";
import { useNavigate } from "react-router-dom";
import photobookHero from "@/assets/photobook-premium-hero.jpg";

interface HeroProps {
  language: 'cs' | 'en';
}

const Hero = ({ language }: HeroProps) => {
  const navigate = useNavigate();
  
  const t = {
    cs: {
      title: "Vytvořte ",
      titleGradient: "dokonalé",
      titleEnd: " fotoknihy",
      subtitle: "Profesionální tisk, AI editor a nekonečné možnosti. Vaše vzpomínky si zaslouží to nejlepší.",
      cta: "Začít vytvářet zdarma",
      tryStudio: "Vyzkoušet Studio",
      watchDemo: "Podívat se na demo",
      rating: "4.9/5 od 12 500+ zákazníků",
      newBadge: "Nové AI funkce!",
      stats: {
        customers: "12 500+",
        customersLabel: "spokojených zákazníků",
        projects: "50 000+",
        projectsLabel: "vytvořených projektů", 
        rating: "4.9/5",
        ratingLabel: "hodnocení"
      },
      features: [
        "AI Smart-Fill technologie",
        "Vysoký kvalitní tisk",
        "Online editor"
      ]
    },
    en: {
      title: "Create ",
      titleGradient: "perfect",
      titleEnd: " photobooks",
      subtitle: "Professional printing, AI editor, and endless possibilities. Your memories deserve the best.",
      cta: "Start Creating Free",
      tryStudio: "Try Studio",
      watchDemo: "Watch Demo",
      rating: "4.9/5 from 12,500+ customers",
      newBadge: "New AI Features!",
      stats: {
        customers: "12,500+",
        customersLabel: "satisfied customers",
        projects: "50,000+",
        projectsLabel: "created projects",
        rating: "4.9/5", 
        ratingLabel: "rating"
      },
      features: [
        "AI Smart-Fill technology",
        "High quality printing", 
        "Online editor"
      ]
    }
  };

  return (
    <section className="min-h-screen flex items-center justify-center relative overflow-hidden pt-16">
      {/* Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-96 h-96 bg-gradient-primary rounded-full opacity-15 blur-3xl animate-float"></div>
        <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-gradient-accent rounded-full opacity-15 blur-3xl animate-float" style={{ animationDelay: '2s' }}></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gradient-subtle opacity-5 rounded-full blur-3xl"></div>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <div className="text-center lg:text-left">
            {/* New Badge */}
            <Badge variant="secondary" className="mb-6 bg-gradient-primary text-white border-0 animate-glow">
              <Sparkles className="h-3 w-3 mr-1" />
              {t[language].newBadge}
            </Badge>

            {/* Hero Title */}
            <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold mb-6 leading-tight">
              {t[language].title}
              <span className="gradient-text animate-gradient">
                {t[language].titleGradient}
              </span>
              <br />
              {t[language].titleEnd}
            </h1>

            {/* Subtitle */}
            <p className="text-xl md:text-2xl text-muted-foreground mb-8 max-w-2xl lg:max-w-none">
              {t[language].subtitle}
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start mb-12">
            <Button 
              variant="glossy" 
              size="lg" 
              className="text-lg px-8 py-4 group" 
              onClick={() => navigate('/products')}
            >
              {t[language].cta}
              <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
            </Button>
              <Button 
                variant="glass" 
                size="lg" 
                className="text-lg px-8 py-4"
                onClick={() => navigate('/products')}
              >
                <Play className="mr-2 h-5 w-5" />
                {t[language].watchDemo}
              </Button>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-8 mb-12">
              <div className="text-center lg:text-left">
                <div className="text-3xl font-bold gradient-text mb-1">{t[language].stats.customers}</div>
                <div className="text-sm text-muted-foreground">{t[language].stats.customersLabel}</div>
              </div>
              <div className="text-center lg:text-left">
                <div className="text-3xl font-bold gradient-text mb-1">{t[language].stats.projects}</div>
                <div className="text-sm text-muted-foreground">{t[language].stats.projectsLabel}</div>
              </div>
              <div className="text-center lg:text-left">
                <div className="text-3xl font-bold gradient-text mb-1 flex items-center justify-center lg:justify-start gap-1">
                  <Star className="h-6 w-6 fill-yellow-400 text-yellow-400" />
                  {t[language].stats.rating}
                </div>
                <div className="text-sm text-muted-foreground">{t[language].stats.ratingLabel}</div>
              </div>
            </div>

            {/* Feature Pills */}
            <div className="flex flex-wrap gap-3 justify-center lg:justify-start">
              {t[language].features.map((feature, index) => (
                <div key={index} className="pill animate-float" style={{ animationDelay: `${index * 0.2}s` }}>
                  {index === 0 && <Sparkles className="h-4 w-4 mr-2" />}
                  {index === 1 && <Award className="h-4 w-4 mr-2" />}
                  {index === 2 && <Users className="h-4 w-4 mr-2" />}
                  {feature}
                </div>
              ))}
            </div>
          </div>

          {/* Right Visual */}
          <div className="relative">
            {/* Main Product Image */}
            <div className="relative group">
              <div className="absolute inset-0 bg-gradient-primary rounded-3xl blur-2xl opacity-20 group-hover:opacity-30 transition-opacity duration-500 animate-glow"></div>
              <div className="glass-panel p-8 rounded-3xl relative z-10 group-hover:scale-105 transition-all duration-500">
                <img 
                  src={photobookHero} 
                  alt="Premium PhotoBook"
                  className="w-full h-auto rounded-2xl shadow-elegant"
                />
                
                {/* Floating Elements */}
                <div className="absolute -top-4 -right-4 glass-panel p-3 rounded-xl animate-float">
                  <Star className="h-6 w-6 text-yellow-400 fill-yellow-400" />
                </div>
                <div className="absolute -bottom-4 -left-4 glass-panel p-3 rounded-xl animate-float" style={{ animationDelay: '1s' }}>
                  <Camera className="h-6 w-6 text-primary" />
                </div>
                <div className="absolute top-1/2 -left-6 glass-panel p-3 rounded-xl animate-float" style={{ animationDelay: '2s' }}>
                  <Book className="h-6 w-6 text-accent" />
                </div>
              </div>
            </div>

            {/* Decorative Elements */}
            <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-accent rounded-full opacity-10 blur-2xl animate-float"></div>
            <div className="absolute bottom-0 left-0 w-24 h-24 bg-gradient-primary rounded-full opacity-10 blur-2xl animate-float" style={{ animationDelay: '3s' }}></div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;