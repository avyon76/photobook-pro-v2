import { useState } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ProductSelector from "@/components/ProductSelector";
import PhotobookEditor from "@/components/PhotobookEditor";
import AdvancedCalendarEditor from "@/components/AdvancedCalendarEditor";
import WallArtEditor from "@/components/WallArtEditor";
import MagnetsEditor from "@/components/MagnetsEditor";
import StudioEditor from "@/components/StudioEditor";

const Configurator = () => {
  const [language, setLanguage] = useState<'cs' | 'en'>('cs');
  const [selectedProduct, setSelectedProduct] = useState<string | null>(null);

  const handleSelectProduct = (productId: string) => {
    setSelectedProduct(productId);
  };

  const handleBack = () => {
    setSelectedProduct(null);
  };

  // Show configurator if product is selected
  if (selectedProduct) {
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
      <Header language={language} onLanguageChange={setLanguage} />
      
      <main className="pt-20">
        <ProductSelector language={language} onSelectProduct={handleSelectProduct} />
      </main>
      
      <Footer language={language} />
    </div>
  );
};

export default Configurator;