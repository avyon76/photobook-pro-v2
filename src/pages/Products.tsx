import { useState, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import Header from "@/components/Header";
import ProductCard from "@/components/ProductCard";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Zap } from "lucide-react";
import { products } from "@/data/products";

const Products = () => {
  const [language, setLanguage] = useState<'cs' | 'en'>('cs');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const navigate = useNavigate();

  const categories = {
    cs: {
      all: "Vše",
      photobooks: "Fotoknihy", 
      calendars: "Kalendáře",
      wallart: "Wall Art",
      frames: "Rámování",
      banners: "Bannery",
      backlit: "Backlit",
      decals: "Polepy"
    },
    en: {
      all: "All",
      photobooks: "Photobooks",
      calendars: "Calendars", 
      wallart: "Wall Art",
      frames: "Framing",
      banners: "Banners",
      backlit: "Backlit",
      decals: "Decals"
    }
  };

  const t = {
    cs: {
      title: "Všechny ",
      titleGradient: "produkty",
      subtitle: "Kompletní nabídka profesionálních tiskových produktů s AI podporou",
      filterBy: "Filtrovat podle kategorie",
      startDesigning: "Začít navrhovat",
      configure: "Konfigurovat"
    },
    en: {
      title: "All ",
      titleGradient: "products", 
      subtitle: "Complete range of professional print products with AI support",
      filterBy: "Filter by category",
      startDesigning: "Start Designing",
      configure: "Configure"
    }
  };

  const currentProducts = products[language] || products.cs;
  
  const filteredProducts = useMemo(() => {
    if (selectedCategory === 'all') {
      return currentProducts;
    }
    return currentProducts.filter(product => product.category === selectedCategory);
  }, [currentProducts, selectedCategory]);

  return (
    <div className="min-h-screen">
      <Header language={language} onLanguageChange={setLanguage} />
      
      <main className="pt-20">
        {/* Hero Section */}
        <section className="py-20">
          <div className="container mx-auto px-4 text-center">
            <h1 className="text-5xl md:text-6xl font-bold mb-6">
              {t[language].title}
              <span className="gradient-text">{t[language].titleGradient}</span>
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto mb-12">
              {t[language].subtitle}
            </p>
            
            <Button 
              variant="glossy" 
              size="lg"
              onClick={() => navigate('/configurator')}
              className="mb-8"
            >
              <Zap className="h-5 w-5 mr-2" />
              {t[language].startDesigning}
            </Button>
          </div>
        </section>

        {/* Product Filter */}
        <section className="pb-10">
          <div className="container mx-auto px-4">
            <h2 className="text-lg font-semibold mb-4">{t[language].filterBy}:</h2>
            <Tabs value={selectedCategory} onValueChange={setSelectedCategory} className="w-full">
              <TabsList className="grid grid-cols-4 md:grid-cols-8 gap-2 h-auto p-1">
                {Object.entries(categories[language]).map(([key, label]) => (
                  <TabsTrigger key={key} value={key} className="text-xs px-3 py-2">
                    {label}
                  </TabsTrigger>
                ))}
              </TabsList>
            </Tabs>
          </div>
        </section>

        {/* Products Grid */}
        <section className="pb-20">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredProducts.map((product) => (
                <ProductCard
                  key={product.id}
                  {...product}
                  language={language}
                />
              ))}
            </div>
          </div>
        </section>
      </main>
      <Footer language={language} />
    </div>
  );
};

export default Products;