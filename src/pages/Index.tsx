import { useState } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ProductSelector from "@/components/ProductSelector";
import PhotobookEditor from "@/components/PhotobookEditor";
import AdvancedCalendarEditor from "@/components/AdvancedCalendarEditor";
import WallArtEditor from "@/components/WallArtEditor";
import MagnetsEditor from "@/components/MagnetsEditor";
import StudioEditor from "@/components/StudioEditor";
import ProductGrid from "@/components/ProductGrid";
import ProductShowcase from "@/components/ProductShowcase";
import TestimonialSection from "@/components/TestimonialSection";
import FeaturesShowcase from "@/components/FeaturesShowcase";
import ProcessSteps from "@/components/ProcessSteps";
import ProductGallery from "@/components/ProductGallery";

const Index = () => {
  const [language, setLanguage] = useState<'cs' | 'en'>('cs');
  const [selectedProduct, setSelectedProduct] = useState<string | null>(null);
  const [showConfigurator, setShowConfigurator] = useState(false);

  const handleSelectProduct = (productId: string) => {
    setSelectedProduct(productId);
    setShowConfigurator(true);
  };

  const handleBack = () => {
    setSelectedProduct(null);
    setShowConfigurator(false);
  };

  // Show configurator if product is selected
  if (showConfigurator && selectedProduct) {
    const renderEditor = () => {
      // Nové produkty s specializovanými editory
      switch (selectedProduct) {
        case 'photobook':
          return <PhotobookEditor language={language} onBack={handleBack} />;
        case 'calendar-desk':
          return <AdvancedCalendarEditor language={language} productType="desk" />;
        case 'calendar-wall':
          return <AdvancedCalendarEditor language={language} productType="wall" />;
        case 'wallart-acrylic':
          return <WallArtEditor language={language} material="acrylic" />;
        case 'wallart-dibond':
          return <WallArtEditor language={language} material="dibond" />;
        case 'magnets':
          return <MagnetsEditor language={language} />;
        default:
          // Všechny ostatní produkty používají původní StudioEditor
          return <StudioEditor language={language} productType={selectedProduct as any} onBack={handleBack} />;
      }
    };
    
    return renderEditor();
  }

  return (
    <div className="min-h-screen">
      <Header 
        language={language} 
        onLanguageChange={setLanguage}
      />
      
      <main>
        <ProductSelector language={language} onSelectProduct={handleSelectProduct} />
        <FeaturesShowcase language={language} />
        <ProductGrid language={language} />
        <ProcessSteps language={language} />
        <ProductGallery language={language} />
        <ProductShowcase language={language} />
        <TestimonialSection language={language} />
      </main>
      <Footer language={language} />
    </div>
  );
};

export default Index;