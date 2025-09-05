import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  ArrowRight, Star, Heart, Eye, ShoppingCart, 
  Calendar, Frame, FileImage, Magnet
} from "lucide-react";
import { useNavigate } from "react-router-dom";

// Import hero images
import photobookHero from "@/assets/photobook-premium-hero.jpg";
import wallartHero from "@/assets/wallart-gallery-hero.jpg";
import calendarHero from "@/assets/calendar-modern-hero.jpg";
import framesHero from "@/assets/frames-collection-hero.jpg";
import bannersHero from "@/assets/banners-showcase-hero.jpg";
import decalsHero from "@/assets/decals-showcase-hero.jpg";

interface ProductGalleryProps {
  language: 'cs' | 'en';
}

const ProductGallery = ({ language }: ProductGalleryProps) => {
  const navigate = useNavigate();
  const [favorites, setFavorites] = useState<Set<string>>(new Set());

  const t = {
    cs: {
      title: "Naše ",
      titleGradient: "produktová galerie",
      subtitle: "Prohlédněte si ukázky našich nejoblíbenějších produktů vytvořených s láskou k detailům",
      viewAll: "Zobrazit všechny produkty",
      configure: "Konfigurovat",
      quickView: "Rychlý náhled",
      addToFavorites: "Přidat k oblíbeným",
      from: "od",
      popular: "Oblíbené",
      new: "Nové",
      bestseller: "Nejprodávanější",
      products: [
        {
          id: "photobook-premium",
          name: "Premium fotokniha A4",
          description: "Luxusní fotokniha s matným povrchem a profesionální vazbou",
          price: "890 Kč",
          originalPrice: "1200 Kč",
          image: photobookHero,
          icon: FileImage,
          badge: "bestseller",
          rating: 4.9,
          reviews: 124
        },
        {
          id: "wallart-canvas",
          name: "Canvas Wall Art",
          description: "Umělecké plátno s vysokou kvalitou tisku na dřevěný rám",
          price: "1490 Kč",
          image: wallartHero,
          icon: Frame,
          badge: "popular",
          rating: 4.8,
          reviews: 89
        },
        {
          id: "calendar-desk",
          name: "Stolní kalendář A5",
          description: "Personalizovaný stolní kalendář s vlastními fotografiemi",
          price: "390 Kč",
          originalPrice: "490 Kč",
          image: calendarHero,
          icon: Calendar,
          badge: "new",
          rating: 4.7,
          reviews: 67
        },
        {
          id: "frames-collection",
          name: "Kolekce rámečků",
          description: "Set elegantních rámečků různých velikostí",
          price: "1890 Kč",
          image: framesHero,
          icon: Frame,
          rating: 4.9,
          reviews: 156
        },
        {
          id: "banners-large",
          name: "Velkoplošný banner",
          description: "Profesionální banner pro události a reklamu",
          price: "2490 Kč",
          image: bannersHero,
          icon: FileImage,
          rating: 4.6,
          reviews: 43
        },
        {
          id: "decals-custom",
          name: "Vlastní samolepky",
          description: "Odolné samolepky pro okna a auta",
          price: "290 Kč",
          image: decalsHero,
          icon: Magnet,
          badge: "popular",
          rating: 4.8,
          reviews: 201
        }
      ]
    },
    en: {
      title: "Our ",
      titleGradient: "product gallery",
      subtitle: "Explore samples of our most popular products created with attention to detail",
      viewAll: "View All Products",
      configure: "Configure",
      quickView: "Quick View", 
      addToFavorites: "Add to Favorites",
      from: "from",
      popular: "Popular",
      new: "New",
      bestseller: "Bestseller",
      products: [
        {
          id: "photobook-premium",
          name: "Premium Photobook A4",
          description: "Luxury photobook with matte finish and professional binding",
          price: "$35",
          originalPrice: "$48",
          image: photobookHero,
          icon: FileImage,
          badge: "bestseller",
          rating: 4.9,
          reviews: 124
        },
        {
          id: "wallart-canvas",
          name: "Canvas Wall Art",
          description: "Art canvas with high-quality printing on wooden frame",
          price: "$59",
          image: wallartHero,
          icon: Frame,
          badge: "popular",
          rating: 4.8,
          reviews: 89
        },
        {
          id: "calendar-desk", 
          name: "Desk Calendar A5",
          description: "Personalized desk calendar with your own photos",
          price: "$15",
          originalPrice: "$19",
          image: calendarHero,
          icon: Calendar,
          badge: "new",
          rating: 4.7,
          reviews: 67
        },
        {
          id: "frames-collection",
          name: "Frame Collection",
          description: "Set of elegant frames in various sizes",
          price: "$75",
          image: framesHero,
          icon: Frame,
          rating: 4.9,
          reviews: 156
        },
        {
          id: "banners-large",
          name: "Large Format Banner",
          description: "Professional banner for events and advertising",
          price: "$99",
          image: bannersHero,
          icon: FileImage,
          rating: 4.6,
          reviews: 43
        },
        {
          id: "decals-custom",
          name: "Custom Decals",
          description: "Durable stickers for windows and cars",
          price: "$12",
          image: decalsHero,
          icon: Magnet,
          badge: "popular",
          rating: 4.8,
          reviews: 201
        }
      ]
    }
  };

  const toggleFavorite = (productId: string) => {
    const newFavorites = new Set(favorites);
    if (newFavorites.has(productId)) {
      newFavorites.delete(productId);
    } else {
      newFavorites.add(productId);
    }
    setFavorites(newFavorites);
  };

  const getBadgeVariant = (badge: string) => {
    switch (badge) {
      case 'bestseller': return 'bg-gradient-to-r from-yellow-500 to-orange-500 text-white';
      case 'popular': return 'bg-gradient-primary text-white';
      case 'new': return 'bg-gradient-to-r from-green-500 to-emerald-500 text-white';
      default: return 'bg-muted text-muted-foreground';
    }
  };

  return (
    <section className="py-20 relative overflow-hidden">
      <div className="container mx-auto px-4">
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

        {/* Products Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {t[language].products.map((product) => {
            const IconComponent = product.icon;
            const isFavorite = favorites.has(product.id);

            return (
              <div 
                key={product.id}
                className="group relative"
              >
                {/* Product Card */}
                <div className="glass-panel rounded-3xl overflow-hidden group-hover:scale-105 transition-all duration-500 relative">
                  {/* Image Container */}
                  <div className="relative overflow-hidden aspect-[4/3]">
                    <img 
                      src={product.image}
                      alt={product.name}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                    />
                    
                    {/* Overlay */}
                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300"></div>
                    
                    {/* Badges */}
                    <div className="absolute top-4 left-4">
                      {product.badge && (
                        <Badge className={`${getBadgeVariant(product.badge)} border-0 shadow-lg`}>
                          {product.badge === 'bestseller' ? t[language].bestseller : 
                           product.badge === 'popular' ? t[language].popular :
                           product.badge === 'new' ? t[language].new : product.badge}
                        </Badge>
                      )}
                    </div>

                    {/* Action Buttons */}
                    <div className="absolute top-4 right-4 flex flex-col gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <Button
                        size="sm"
                        variant="glass"
                        className="w-10 h-10 p-0"
                        onClick={() => toggleFavorite(product.id)}
                      >
                        <Heart className={`h-4 w-4 ${isFavorite ? 'fill-red-500 text-red-500' : ''}`} />
                      </Button>
                      <Button
                        size="sm"
                        variant="glass"
                        className="w-10 h-10 p-0"
                      >
                        <Eye className="h-4 w-4" />
                      </Button>
                    </div>

                    {/* Quick Actions Bar */}
                    <div className="absolute bottom-4 left-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <div className="flex gap-2">
                        <Button 
                          variant="glass" 
                          size="sm" 
                          className="flex-1"
                          onClick={() => navigate('/configurator')}
                        >
                          <IconComponent className="h-4 w-4 mr-2" />
                          {t[language].configure}
                        </Button>
                        <Button 
                          variant="glass" 
                          size="sm"
                          className="px-3"
                        >
                          <ShoppingCart className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </div>

                  {/* Content */}
                  <div className="p-6">
                    {/* Rating */}
                    <div className="flex items-center gap-2 mb-3">
                      <div className="flex items-center">
                        <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                        <span className="text-sm font-medium ml-1">{product.rating}</span>
                      </div>
                      <span className="text-xs text-muted-foreground">
                        ({product.reviews} {language === 'cs' ? 'hodnocení' : 'reviews'})
                      </span>
                    </div>

                    {/* Title */}
                    <h3 className="text-lg font-semibold mb-2 group-hover:text-primary transition-colors">
                      {product.name}
                    </h3>

                    {/* Description */}
                    <p className="text-sm text-muted-foreground mb-4 line-clamp-2">
                      {product.description}
                    </p>

                    {/* Price */}
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <span className="text-lg font-bold gradient-text">
                          {product.price}
                        </span>
                        {product.originalPrice && (
                          <span className="text-sm text-muted-foreground line-through">
                            {product.originalPrice}
                          </span>
                        )}
                      </div>
                      <div className="text-xs text-muted-foreground">
                        {t[language].from}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* CTA */}
        <div className="text-center">
          <Button 
            variant="glossy" 
            size="lg" 
            className="px-8 py-4 group"
            onClick={() => navigate('/products')}
          >
            {t[language].viewAll}
            <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
          </Button>
        </div>
      </div>
    </section>
  );
};

export default ProductGallery;