import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { 
  ShoppingCart, 
  Sparkles, 
  Heart, 
  Eye, 
  Star, 
  ChevronLeft, 
  ChevronRight,
  Info,
  Zap
} from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

interface ProductCardProps {
  id: string;
  name: string;
  description: string;
  price: string;
  originalPrice?: string;
  category: string;
  features: string[];
  image: string;
  gallery?: string[];
  mockup?: string;
  mockups?: string[];
  isNew?: boolean;
  isBestseller?: boolean;
  rating?: number;
  reviewCount?: number;
  specifications?: {
    [key: string]: string | number;
  };
  detailedDescription?: string;
  useCases?: string[];
  advantages?: string[];
  language: 'cs' | 'en';
}

const ProductCard = ({ 
  id, name, description, price, originalPrice, category, 
  features, image, gallery, mockup, mockups, isNew, isBestseller,
  rating, reviewCount, specifications, detailedDescription, 
  useCases, advantages, language 
}: ProductCardProps) => {
  const navigate = useNavigate();
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isFavorite, setIsFavorite] = useState(false);
  
  const images = gallery || [image];
  const allMockups = mockups || (mockup ? [mockup] : []);

  const t = {
    cs: {
      configure: "Konfigurovat",
      quickOrder: "Rychlá objednávka",
      addToCart: "Do košíku",
      from: "od",
      bestseller: "Bestseller",
      new: "Novinka",
      reviews: "hodnocení",
      specifications: "Specifikace",
      description: "Popis",
      useCases: "Použití",
      advantages: "Výhody",
      quickView: "Rychlý náhled",
      addToFavorites: "Přidat k oblíbeným"
    },
    en: {
      configure: "Configure", 
      quickOrder: "Quick Order",
      addToCart: "Add to Cart",
      from: "from",
      bestseller: "Bestseller",
      new: "New",
      reviews: "reviews",
      specifications: "Specifications",
      description: "Description", 
      useCases: "Use Cases",
      advantages: "Advantages",
      quickView: "Quick View",
      addToFavorites: "Add to Favorites"
    }
  };

  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % images.length);
  };

  const prevImage = () => {
    setCurrentImageIndex((prev) => (prev - 1 + images.length) % images.length);
  };

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        className={`h-3 w-3 ${
          i < Math.floor(rating) 
            ? 'fill-yellow-400 text-yellow-400' 
            : 'text-muted-foreground'
        }`}
      />
    ));
  };

  return (
    <Card className="group overflow-hidden glass-panel hover:glow-effect transition-all duration-300 relative">
      {/* Image Gallery Section */}
      <div className="relative h-56 overflow-hidden">
        <img 
          src={images[currentImageIndex]} 
          alt={name}
          className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
        />
        
        {/* Image Navigation */}
        {images.length > 1 && (
          <>
            <Button
              variant="ghost"
              size="sm"
              className="absolute left-2 top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity bg-black/20 hover:bg-black/40 text-white"
              onClick={prevImage}
            >
              <ChevronLeft className="h-4 w-4" />
            </Button>
            <Button
              variant="ghost"
              size="sm"
              className="absolute right-2 top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity bg-black/20 hover:bg-black/40 text-white"
              onClick={nextImage}
            >
              <ChevronRight className="h-4 w-4" />
            </Button>
            
            {/* Image Indicators */}
            <div className="absolute bottom-2 left-1/2 -translate-x-1/2 flex gap-1">
              {images.map((_, index) => (
                <div
                  key={index}
                  className={`w-2 h-2 rounded-full transition-all ${
                    index === currentImageIndex ? 'bg-white' : 'bg-white/50'
                  }`}
                />
              ))}
            </div>
          </>
        )}
        
        {/* Badges */}
        <div className="absolute top-3 right-3 flex flex-col gap-1">
          {isNew && (
            <Badge className="bg-accent text-accent-foreground">
              {t[language].new}
            </Badge>
          )}
          {isBestseller && (
            <Badge className="bg-primary text-primary-foreground">
              {t[language].bestseller}
            </Badge>
          )}
        </div>
        
        {/* Quick Actions */}
        <div className="absolute top-3 left-3 flex flex-col gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
          <Button
            variant="ghost"
            size="sm"
            className="bg-black/20 hover:bg-black/40 text-white"
            onClick={() => setIsFavorite(!isFavorite)}
          >
            <Heart className={`h-4 w-4 ${isFavorite ? 'fill-red-500 text-red-500' : ''}`} />
          </Button>
          
          <Dialog>
            <DialogTrigger asChild>
              <Button
                variant="ghost"
                size="sm" 
                className="bg-black/20 hover:bg-black/40 text-white"
              >
                <Eye className="h-4 w-4" />
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-4xl">
              <DialogHeader>
                <DialogTitle>{name}</DialogTitle>
              </DialogHeader>
              <ProductDetailModal 
                {...{ 
                  name, description, detailedDescription, 
                  specifications, useCases, advantages, 
                  images, allMockups, language, t 
                }} 
              />
            </DialogContent>
          </Dialog>
        </div>
      </div>
      
      {/* Content Section */}
      <div className="p-6">
        {/* Header with Rating */}
        <div className="mb-3">
          <div className="flex items-start justify-between mb-2">
            <div className="flex-1">
              <h3 className="font-semibold text-lg mb-1">{name}</h3>
              {rating && (
                <div className="flex items-center gap-1 mb-2">
                  <div className="flex">{renderStars(rating)}</div>
                  <span className="text-sm text-muted-foreground">
                    {rating} ({reviewCount} {t[language].reviews})
                  </span>
                </div>
              )}
            </div>
            
            <div className="text-right">
              {originalPrice && (
                <span className="text-sm text-muted-foreground line-through block">
                  {originalPrice}
                </span>
              )}
              <span className="font-bold text-primary">
                {t[language].from} {price}
              </span>
            </div>
          </div>
          
          <p className="text-sm text-muted-foreground mb-3">{description}</p>
        </div>
        
        {/* Features Pills */}
        <div className="flex flex-wrap gap-1 mb-4">
          {features.slice(0, 3).map((feature, index) => (
            <span key={index} className="pill text-xs py-1 px-2">
              {feature}
            </span>
          ))}
          {features.length > 3 && (
            <span className="pill text-xs py-1 px-2 bg-muted/50">
              +{features.length - 3}
            </span>
          )}
        </div>
        
        {/* Action Buttons */}
        <div className="flex gap-2">
          <Button 
            variant="glossy" 
            size="sm" 
            className="flex-1"
            onClick={() => navigate(`/configurator/${id}`)}
          >
            <Sparkles className="h-4 w-4 mr-2" />
            {t[language].configure}
          </Button>
          
          <Button 
            variant="outline" 
            size="sm"
            className="hover:bg-primary hover:text-primary-foreground"
          >
            <ShoppingCart className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </Card>
  );
};

// Product Detail Modal Component
interface ProductDetailModalProps {
  name: string;
  description: string;
  detailedDescription?: string;
  specifications?: { [key: string]: string | number };
  useCases?: string[];
  advantages?: string[];
  images: string[];
  allMockups: string[];
  language: 'cs' | 'en';
  t: any;
}

const ProductDetailModal = ({ 
  name, description, detailedDescription, specifications, 
  useCases, advantages, images, allMockups, language, t 
}: ProductDetailModalProps) => {
  return (
    <Tabs defaultValue="description" className="w-full">
      <TabsList className="grid w-full grid-cols-4">
        <TabsTrigger value="description">{t[language].description}</TabsTrigger>
        <TabsTrigger value="specifications">{t[language].specifications}</TabsTrigger>
        <TabsTrigger value="useCases">{t[language].useCases}</TabsTrigger>
        <TabsTrigger value="advantages">{t[language].advantages}</TabsTrigger>
      </TabsList>
      
      <TabsContent value="description" className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <div>
            <h4 className="font-semibold mb-2">{t[language].description}</h4>
            <p className="text-muted-foreground">{detailedDescription || description}</p>
          </div>
          <div className="space-y-2">
            {images.map((img, idx) => (
              <img key={idx} src={img} alt={name} className="w-full h-24 object-cover rounded" />
            ))}
          </div>
        </div>
      </TabsContent>
      
      <TabsContent value="specifications">
        {specifications && (
          <div className="grid grid-cols-2 gap-4">
            {Object.entries(specifications).map(([key, value]) => (
              <div key={key} className="flex justify-between p-2 bg-muted/50 rounded">
                <span className="font-medium capitalize">{key}:</span>
                <span>{String(value)}</span>
              </div>
            ))}
          </div>
        )}
      </TabsContent>
      
      <TabsContent value="useCases">
        {useCases && (
          <div className="grid grid-cols-2 gap-2">
            {useCases.map((useCase, idx) => (
              <div key={idx} className="flex items-center gap-2 p-2 bg-primary/10 rounded">
                <Zap className="h-4 w-4 text-primary" />
                <span>{useCase}</span>
              </div>
            ))}
          </div>
        )}
      </TabsContent>
      
      <TabsContent value="advantages">
        {advantages && (
          <div className="grid grid-cols-1 gap-2">
            {advantages.map((advantage, idx) => (
              <div key={idx} className="flex items-center gap-2 p-2 bg-accent/10 rounded">
                <Sparkles className="h-4 w-4 text-accent" />
                <span>{advantage}</span>
              </div>
            ))}
          </div>
        )}
      </TabsContent>
    </Tabs>
  );
};

export default ProductCard;