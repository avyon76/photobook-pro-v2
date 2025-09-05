import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  BookOpen, Calendar, Magnet, Image as ImageIcon, 
  Sparkles, Wand2, Palette, Layout, ArrowRight,
  Zap, Crown, Star
} from "lucide-react";
import { toast } from "sonner";
import mockupPhotobookOpen from '@/assets/mockup-photobook-open.jpg';
import mockupCalendarDesk from '@/assets/mockup-calendar-desk.jpg';
import mockupCalendarWall from '@/assets/mockup-calendar-wall.jpg';
import mockupWallartAcrylic from '@/assets/mockup-wallart-acrylic.jpg';
import mockupWallartDibond from '@/assets/mockup-wallart-dibond.jpg';
import mockupMagnets from '@/assets/mockup-magnets.jpg';

interface Product {
  id: string;
  name: string;
  description: string;
  icon: any;
  mockup: string;
  templates: number;
  aiFeatures: string[];
  premium?: boolean;
  popular?: boolean;
}

interface ProductSelectorProps {
  language: 'cs' | 'en';
  onSelectProduct: (productId: string) => void;
}

const ProductSelector = ({ language, onSelectProduct }: ProductSelectorProps) => {
  const [selectedCategory, setSelectedCategory] = useState('all');

  const t = {
    cs: {
      title: "Vyberte produkt",
      subtitle: "Začněte vytvářením profesionálního produktu s AI asistencí",
      categories: {
        all: "Všechny",
        books: "Knihy",
        calendars: "Kalendáře", 
        prints: "Tisky",
        promo: "Promo"
      },
      templates: "šablon",
      aiFeatures: "AI funkce",
      popular: "Populární",
      premium: "Premium",
      startCreating: "Začít tvořit"
    },
    en: {
      title: "Choose Product",
      subtitle: "Start creating professional products with AI assistance", 
      categories: {
        all: "All",
        books: "Books",
        calendars: "Calendars",
        prints: "Prints", 
        promo: "Promo"
      },
      templates: "templates",
      aiFeatures: "AI Features",
      popular: "Popular",
      premium: "Premium",
      startCreating: "Start Creating"
    }
  };

  const products: Product[] = [
    {
      id: 'photobook',
      name: language === 'cs' ? 'Fotokniha Premium' : 'Premium Photobook',
      description: language === 'cs' ? 'Luxusní fotokniha s tvrdými deskami' : 'Luxury hardcover photobook',
      icon: BookOpen,
      mockup: mockupPhotobookOpen,
      templates: 45,
      aiFeatures: ['AI Layout', 'Smart Crop', 'Color Enhancement', 'Text Generation'],
      premium: true,
      popular: true
    },
    {
      id: 'calendar-desk',
      name: language === 'cs' ? 'Stolní kalendář' : 'Desk Calendar',
      description: language === 'cs' ? 'Elegantní stolní kalendář A5' : 'Elegant A5 desk calendar',
      icon: Calendar,
      mockup: mockupCalendarDesk,
      templates: 32,
      aiFeatures: ['Smart Dates', 'Holiday Detection', 'Event Planning', 'Weather Integration'],
      popular: true
    },
    {
      id: 'calendar-wall',
      name: language === 'cs' ? 'Nástěnný kalendář' : 'Wall Calendar',
      description: language === 'cs' ? 'Velký nástěnný kalendář A3' : 'Large A3 wall calendar',
      icon: Calendar,
      mockup: mockupCalendarWall,
      templates: 28,
      aiFeatures: ['Smart Dates', 'Holiday Detection', 'Large Format AI', 'Family Planning']
    },
    {
      id: 'wallart-acrylic',
      name: language === 'cs' ? 'Akrylový tisk' : 'Acrylic Print',
      description: language === 'cs' ? 'Prémiový tisk na akrylové sklo' : 'Premium acrylic glass print',
      icon: ImageIcon,
      mockup: mockupWallartAcrylic,
      templates: 24,
      aiFeatures: ['Image Enhancement', 'Color Optimization', 'Resolution Upscale', 'Art Filters'],
      premium: true
    },
    {
      id: 'wallart-dibond',
      name: language === 'cs' ? 'Dibond tisk' : 'Dibond Print',
      description: language === 'cs' ? 'Moderní tisk na hliníkový kompozit' : 'Modern aluminum composite print',
      icon: ImageIcon,
      mockup: mockupWallartDibond,
      templates: 20,
      aiFeatures: ['Metal Enhancement', 'Contrast Boost', 'Edge Detection', 'Modern Filters']
    },
    {
      id: 'magnets',
      name: language === 'cs' ? 'Magnetky' : 'Photo Magnets',
      description: language === 'cs' ? 'Personalizované foto magnetky' : 'Personalized photo magnets',
      icon: Magnet,
      mockup: mockupMagnets,
      templates: 18,
      aiFeatures: ['Batch Processing', 'Auto Crop', 'Face Detection', 'Collection Builder'],
      popular: true
    }
  ];

  const categories = [
    { id: 'all', name: t[language].categories.all, icon: Layout },
    { id: 'books', name: t[language].categories.books, icon: BookOpen },
    { id: 'calendars', name: t[language].categories.calendars, icon: Calendar },
    { id: 'prints', name: t[language].categories.prints, icon: ImageIcon },
    { id: 'promo', name: t[language].categories.promo, icon: Magnet }
  ];

  const filteredProducts = products.filter(product => {
    if (selectedCategory === 'all') return true;
    if (selectedCategory === 'books') return product.id === 'photobook';
    if (selectedCategory === 'calendars') return product.id.includes('calendar');
    if (selectedCategory === 'prints') return product.id.includes('wallart');
    if (selectedCategory === 'promo') return product.id === 'magnets';
    return true;
  });

  const handleSelectProduct = (productId: string) => {
    const product = products.find(p => p.id === productId);
    toast.success(
      language === 'cs' 
        ? `${product?.name} vybrán - načítání editoru...`
        : `${product?.name} selected - loading editor...`
    );
    onSelectProduct(productId);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted/20">
      <div className="container mx-auto px-4 py-12">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 bg-primary/10 text-primary px-4 py-2 rounded-full text-sm font-medium mb-4">
            <Sparkles className="h-4 w-4" />
            AI-Powered Design Studio
          </div>
          <h1 className="text-4xl font-bold mb-4 bg-gradient-to-r from-primary via-primary to-primary/70 bg-clip-text text-transparent">
            {t[language].title}
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            {t[language].subtitle}
          </p>
        </div>

        {/* Categories */}
        <div className="flex justify-center mb-8">
          <div className="flex gap-2 p-1 bg-muted/50 rounded-lg">
            {categories.map((category) => (
              <Button
                key={category.id}
                variant={selectedCategory === category.id ? "default" : "ghost"}
                size="sm"
                onClick={() => setSelectedCategory(category.id)}
                className="flex items-center gap-2"
              >
                <category.icon className="h-4 w-4" />
                {category.name}
              </Button>
            ))}
          </div>
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProducts.map((product) => (
            <Card 
              key={product.id}
              className="group relative overflow-hidden border-0 bg-gradient-to-br from-card via-card to-muted/10 hover:shadow-elegant transition-all duration-500 hover:scale-[1.02]"
            >
              {/* Badges */}
              <div className="absolute top-4 left-4 z-10 flex gap-2">
                {product.popular && (
                  <Badge className="bg-gradient-to-r from-amber-500 to-orange-500 text-white border-0">
                    <Star className="h-3 w-3 mr-1" />
                    {t[language].popular}
                  </Badge>
                )}
                {product.premium && (
                  <Badge className="bg-gradient-to-r from-violet-500 to-purple-500 text-white border-0">
                    <Crown className="h-3 w-3 mr-1" />
                    {t[language].premium}
                  </Badge>
                )}
              </div>

              {/* Mockup Image */}
              <div className="aspect-[4/3] bg-gradient-to-br from-muted/20 to-muted/40 flex items-center justify-center relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent" />
                <img 
                  src={product.mockup} 
                  alt={product.name}
                  className="w-full h-full object-cover"
                />
                <div className="absolute bottom-4 right-4 bg-white/90 backdrop-blur-sm rounded-lg px-3 py-1 text-sm font-medium text-foreground">
                  {product.templates} {t[language].templates}
                </div>
              </div>

              {/* Content */}
              <div className="p-6">
                <h3 className="text-xl font-bold mb-2 group-hover:text-primary transition-colors">
                  {product.name}
                </h3>
                <p className="text-muted-foreground mb-4 text-sm">
                  {product.description}
                </p>

                {/* AI Features */}
                <div className="mb-4">
                  <div className="flex items-center gap-2 mb-2">
                    <Wand2 className="h-4 w-4 text-primary" />
                    <span className="text-sm font-medium">{t[language].aiFeatures}</span>
                  </div>
                  <div className="flex flex-wrap gap-1">
                    {product.aiFeatures.slice(0, 3).map((feature, index) => (
                      <Badge key={index} variant="secondary" className="text-xs">
                        {feature}
                      </Badge>
                    ))}
                    {product.aiFeatures.length > 3 && (
                      <Badge variant="secondary" className="text-xs">
                        +{product.aiFeatures.length - 3}
                      </Badge>
                    )}
                  </div>
                </div>

                {/* Action Button */}
                <Button 
                  className="w-full group-hover:bg-primary group-hover:text-primary-foreground transition-all duration-300"
                  onClick={() => handleSelectProduct(product.id)}
                  variant="outline"
                >
                  <Zap className="h-4 w-4 mr-2" />
                  {t[language].startCreating}
                  <ArrowRight className="h-4 w-4 ml-2 group-hover:translate-x-1 transition-transform" />
                </Button>
              </div>
            </Card>
          ))}
        </div>

        {/* AI Features Showcase */}
        <div className="mt-16 text-center">
          <div className="inline-flex items-center gap-2 bg-gradient-to-r from-primary/10 via-primary/5 to-primary/10 text-primary px-6 py-3 rounded-full text-lg font-medium mb-6">
            <Sparkles className="h-5 w-5" />
            Powered by Advanced AI
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-4xl mx-auto">
            {[
              { icon: Wand2, title: "Smart Layout", desc: "AI-generated layouts" },
              { icon: Palette, title: "Color Harmony", desc: "Perfect color schemes" },
              { icon: Zap, title: "Auto Enhancement", desc: "Image optimization" },
              { icon: Sparkles, title: "Text Generation", desc: "AI-powered copy" }
            ].map((feature, index) => (
              <div key={index} className="text-center">
                <div className="w-12 h-12 bg-gradient-to-br from-primary/10 to-primary/20 rounded-xl flex items-center justify-center mx-auto mb-3">
                  <feature.icon className="h-6 w-6 text-primary" />
                </div>
                <h4 className="font-semibold mb-1">{feature.title}</h4>
                <p className="text-sm text-muted-foreground">{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductSelector;