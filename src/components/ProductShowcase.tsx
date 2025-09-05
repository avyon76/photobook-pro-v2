import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ArrowRight, ShoppingCart, Heart, Eye, Star } from "lucide-react";
import { products, Product } from "@/data/products";
import { useNavigate } from "react-router-dom";

interface ProductShowcaseProps {
  language: 'cs' | 'en';
}

const ProductShowcase = ({ language }: ProductShowcaseProps) => {
  const [favorites, setFavorites] = useState<string[]>([]);
  const navigate = useNavigate();
  
  const t = {
    cs: {
      title: "Oblíbené ",
      titleGradient: "produkty",
      subtitle: "Nejprodávanější produkty s nejlepšími recenzemi",
      newBadge: "Novinka",
      configure: "Konfigurovat",
      addToCart: "Do košíku",
      viewDetails: "Detail",
      rating: "hodnocení",
      from: "od"
    },
    en: {
      title: "Featured ",
      titleGradient: "products",
      subtitle: "Best-selling products with top reviews",
      newBadge: "New",
      configure: "Configure",
      addToCart: "Add to Cart", 
      viewDetails: "View Details",
      rating: "rating",
      from: "from"
    }
  };

  const currentProducts = products[language];
  const featuredProducts = currentProducts.slice(0, 6);

  const toggleFavorite = (productId: string) => {
    setFavorites(prev => 
      prev.includes(productId) 
        ? prev.filter(id => id !== productId)
        : [...prev, productId]
    );
  };

  const handleConfigure = (productId: string) => {
    navigate(`/configurator/${productId}`);
  };

  return (
    <section id="showcase" className="py-20 bg-muted/30">
      <div className="container mx-auto px-4">
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

        {/* Products Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {featuredProducts.map((product) => (
            <Card key={product.id} className="group overflow-hidden hover:shadow-xl transition-all duration-300 border-glass">
              <div className="relative overflow-hidden">
                {/* Product Image */}
                <div className="aspect-[4/3] bg-gradient-muted">
                  <img 
                    src={product.image} 
                    alt={product.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                </div>
                
                {/* Badges */}
                <div className="absolute top-4 left-4 flex flex-col gap-2">
                  {product.isNew && (
                    <Badge variant="secondary" className="bg-gradient-primary text-white">
                      {t[language].newBadge}
                    </Badge>
                  )}
                  {product.originalPrice && (
                    <Badge variant="outline" className="bg-red-500/90 text-white border-red-500">
                      Sale
                    </Badge>
                  )}
                </div>

                {/* Favorite Button */}
                <Button
                  variant="ghost"
                  size="sm"
                  className="absolute top-4 right-4 bg-white/80 hover:bg-white"
                  onClick={() => toggleFavorite(product.id)}
                >
                  <Heart 
                    className={`h-4 w-4 ${
                      favorites.includes(product.id) ? 'fill-red-500 text-red-500' : ''
                    }`} 
                  />
                </Button>

                {/* Quick Actions Overlay */}
                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                  <div className="flex gap-2">
                    <Button variant="secondary" size="sm">
                      <Eye className="h-4 w-4 mr-1" />
                      {t[language].viewDetails}
                    </Button>
                  </div>
                </div>
              </div>

              <CardHeader className="pb-3">
                <div className="flex items-start justify-between">
                  <CardTitle className="text-lg line-clamp-2">{product.name}</CardTitle>
                  <div className="text-right">
                    {product.originalPrice && (
                      <div className="text-sm text-muted-foreground line-through">
                        {product.originalPrice}
                      </div>
                    )}
                    <div className="text-lg font-bold text-primary">
                      {product.price.includes('/') ? `${t[language].from} ${product.price}` : product.price}
                    </div>
                  </div>
                </div>
                
                {/* Rating */}
                <div className="flex items-center gap-1 mt-2">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                  ))}
                  <span className="text-sm text-muted-foreground ml-1">
                    4.9 (127 {t[language].rating})
                  </span>
                </div>
              </CardHeader>

              <CardContent className="pt-0">
                <p className="text-muted-foreground text-sm mb-4 line-clamp-2">
                  {product.description}
                </p>

                {/* Features */}
                <div className="flex flex-wrap gap-1 mb-4">
                  {product.features.slice(0, 3).map((feature, index) => (
                    <Badge key={index} variant="outline" className="text-xs">
                      {feature}
                    </Badge>
                  ))}
                  {product.features.length > 3 && (
                    <Badge variant="outline" className="text-xs">
                      +{product.features.length - 3}
                    </Badge>
                  )}
                </div>

                {/* Action Buttons */}
                <div className="flex gap-2">
                  <Button 
                    variant="outline" 
                    size="sm" 
                    className="flex-1"
                    onClick={() => handleConfigure(product.id)}
                  >
                    {t[language].configure}
                    <ArrowRight className="h-3 w-3 ml-1" />
                  </Button>
                  <Button variant="default" size="sm" className="flex-1">
                    <ShoppingCart className="h-3 w-3 mr-1" />
                    {t[language].addToCart}
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* CTA Section */}
        <div className="text-center mt-16">
          <Button 
            variant="glossy" 
            size="lg" 
            className="px-8 py-4"
            onClick={() => navigate('/products')}
          >
            {language === 'cs' ? 'Zobrazit všechny produkty' : 'View All Products'}
            <ArrowRight className="ml-2 h-5 w-5" />
          </Button>
        </div>
      </div>
    </section>
  );
};

export default ProductShowcase;