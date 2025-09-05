import { useState } from "react";
import ProductSelector from "@/components/ProductSelector";
import PhotobookEditor from "@/components/PhotobookEditor";
import AdvancedCalendarEditor from "@/components/AdvancedCalendarEditor";
import WallArtEditor from "@/components/WallArtEditor";
import MagnetsEditor from "@/components/MagnetsEditor";

const Studio = () => {
  const [selectedProduct, setSelectedProduct] = useState<string | null>(null);
  const [language] = useState<'cs' | 'en'>('cs');

  const handleSelectProduct = (productId: string) => {
    setSelectedProduct(productId);
  };

  const handleBack = () => {
    setSelectedProduct(null);
  };

  // Show product selector if no product is selected
  if (!selectedProduct) {
    return (
      <ProductSelector 
        language={language} 
        onSelectProduct={handleSelectProduct}
      />
    );
  }

  // Render appropriate editor based on selected product
  const renderEditor = () => {
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
        return <ProductSelector language={language} onSelectProduct={handleSelectProduct} />;
    }
  };

  return renderEditor();
};

export default Studio;