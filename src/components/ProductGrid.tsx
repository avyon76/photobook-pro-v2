import { Button } from "@/components/ui/button";
import { ArrowRight, Calendar, CreditCard, Image, Magnet, Frame, FileImage } from "lucide-react";
import { useNavigate } from "react-router-dom";

interface ProductGridProps {
  language: 'cs' | 'en';
}

const ProductGrid = ({ language }: ProductGridProps) => {
  const navigate = useNavigate();
  const t = {
    cs: {
      title: "Naše ",
      titleGradient: "produkty",
      subtitle: "Profesionální tiskové produkty s nejmodernějšími technologiemi",
      configure: "Konfigurovat",
      products: [
        {
          name: "Fotoknihy",
          description: "Prémiové fotoknihy s AI editorem",
          icon: Image,
          popular: true
        },
        {
          name: "Kalendáře", 
          description: "Personalizované kalendáře na celý rok",
          icon: Calendar
        },
        {
          name: "Karty & Přání",
          description: "Kvalitní pohlednice a přání",
          icon: CreditCard
        },
        {
          name: "Magnetky",
          description: "Odolné magnetky s vašimi fotkami",
          icon: Magnet
        },
        {
          name: "Wall-Art",
          description: "Umělecké tisky na různé materiály",
          icon: Frame
        },
        {
          name: "Retro Prints",
          description: "Klasické fototiskové formáty",
          icon: FileImage
        }
      ]
    },
    en: {
      title: "Our ",
      titleGradient: "products",
      subtitle: "Professional print products with cutting-edge technologies",
      configure: "Configure",
      products: [
        {
          name: "Photobooks",
          description: "Premium photobooks with AI editor",
          icon: Image,
          popular: true
        },
        {
          name: "Calendars",
          description: "Personalized year-round calendars", 
          icon: Calendar
        },
        {
          name: "Cards & Greetings",
          description: "High-quality postcards and greetings",
          icon: CreditCard
        },
        {
          name: "Magnets",
          description: "Durable magnets with your photos",
          icon: Magnet
        },
        {
          name: "Wall-Art",
          description: "Artistic prints on various materials",
          icon: Frame
        },
        {
          name: "Retro Prints", 
          description: "Classic photo print formats",
          icon: FileImage
        }
      ]
    }
  };

  return (
    <section id="products" className="py-20 relative">
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

        {/* Product Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {t[language].products.map((product, index) => {
            const IconComponent = product.icon;
            return (
              <div
                key={index}
                className="glass-panel p-6 group hover:scale-105 transition-all duration-300 relative overflow-hidden"
              >
                {/* Popular Badge */}
                {product.popular && (
                  <div className="absolute top-4 right-4">
                    <span className="pill text-xs bg-gradient-primary text-white px-2 py-1">
                      Popular
                    </span>
                  </div>
                )}

                {/* Product Icon */}
                <div className="mb-4">
                  <div className="w-12 h-12 bg-gradient-primary rounded-lg flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                    <IconComponent className="h-6 w-6 text-white" />
                  </div>
                </div>

                {/* Content */}
                <h3 className="text-xl font-semibold mb-2">{product.name}</h3>
                <p className="text-muted-foreground mb-6 text-sm">
                  {product.description}
                </p>

                {/* CTA Button */}
                <Button 
                  variant="outline" 
                  className="w-full group-hover:bg-primary group-hover:text-primary-foreground transition-all duration-300"
                  onClick={() => navigate('/products')}
                >
                  {t[language].configure}
                  <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform duration-300" />
                </Button>

                {/* Gradient Overlay on Hover */}
                <div className="absolute inset-0 bg-gradient-primary opacity-0 group-hover:opacity-5 transition-opacity duration-300 rounded-[var(--radius-glass)]"></div>
              </div>
            );
          })}
        </div>

        {/* CTA Section */}
        <div className="text-center mt-16">
          <Button variant="glossy" size="lg" className="px-8 py-4">
            {language === 'cs' ? 'Zobrazit všechny produkty' : 'View All Products'}
            <ArrowRight className="ml-2 h-5 w-5" />
          </Button>
        </div>
      </div>
    </section>
  );
};

export default ProductGrid;