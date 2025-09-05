import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Upload, Image, Settings, Download, ArrowRight, Check } from "lucide-react";

interface PhotobookConfiguratorProps {
  language: 'cs' | 'en';
}

const PhotobookConfigurator = ({ language }: PhotobookConfiguratorProps) => {
  const [activeTab, setActiveTab] = useState('upload');
  const [selectedFormat, setSelectedFormat] = useState('A4-landscape');
  const [selectedPages, setSelectedPages] = useState(20);

  const t = {
    cs: {
      title: "Konfigurátor ",
      titleGradient: "fotoknih",
      subtitle: "Vytvořte si svou fotoknihu v několika jednoduchých krocích",
      tabs: {
        upload: "Nahrát",
        format: "Formát", 
        pages: "Stránky",
        preview: "Náhled"
      },
      upload: {
        title: "Nahrajte své fotografie",
        subtitle: "Podporované formáty: JPG, PNG, PDF",
        button: "Vybrat soubory",
        dragText: "Nebo přetáhněte soubory sem"
      },
      format: {
        title: "Vyberte formát",
        formats: [
          { id: 'A4-landscape', name: 'A4 na šířku', size: '297×210 mm' },
          { id: 'A4-portrait', name: 'A4 na výšku', size: '210×297 mm' },
          { id: 'square', name: 'Čtvercový', size: '210×210 mm' }
        ]
      },
      pages: {
        title: "Počet stránek",
        min: "Min. 20 stránek",
        price: "Cena od"
      },
      summary: {
        title: "Souhrn objednávky",
        format: "Formát",
        pages: "Stránky", 
        photos: "Fotografie",
        price: "Cena",
        vat: "bez DPH",
        shipping: "Doprava",
        total: "Celkem",
        coupon: "Slevový kód",
        order: "Objednat",
        eta: "Dodání za 3-5 dní"
      }
    },
    en: {
      title: "Photobook ",
      titleGradient: "configurator",
      subtitle: "Create your photobook in a few simple steps",
      tabs: {
        upload: "Upload",
        format: "Format",
        pages: "Pages", 
        preview: "Preview"
      },
      upload: {
        title: "Upload your photos",
        subtitle: "Supported formats: JPG, PNG, PDF",
        button: "Select files",
        dragText: "Or drag and drop files here"
      },
      format: {
        title: "Select format",
        formats: [
          { id: 'A4-landscape', name: 'A4 Landscape', size: '297×210 mm' },
          { id: 'A4-portrait', name: 'A4 Portrait', size: '210×297 mm' },
          { id: 'square', name: 'Square', size: '210×210 mm' }
        ]
      },
      pages: {
        title: "Number of pages",
        min: "Min. 20 pages",
        price: "Price from"
      },
      summary: {
        title: "Order summary",
        format: "Format",
        pages: "Pages",
        photos: "Photos",
        price: "Price", 
        vat: "excl. VAT",
        shipping: "Shipping",
        total: "Total",
        coupon: "Coupon code",
        order: "Order",
        eta: "Delivery in 3-5 days"
      }
    }
  };

  const tabs = [
    { id: 'upload', label: t[language].tabs.upload, icon: Upload },
    { id: 'format', label: t[language].tabs.format, icon: Settings },
    { id: 'pages', label: t[language].tabs.pages, icon: Image },
    { id: 'preview', label: t[language].tabs.preview, icon: Download }
  ];

  const renderTabContent = () => {
    switch (activeTab) {
      case 'upload':
        return (
          <div className="space-y-6">
            <div className="text-center">
              <h3 className="text-2xl font-semibold mb-2">{t[language].upload.title}</h3>
              <p className="text-muted-foreground">{t[language].upload.subtitle}</p>
            </div>
            <div className="glass-panel p-8 border-dashed border-2 border-glass-border hover:border-primary/50 transition-colors duration-300">
              <div className="text-center">
                <Upload className="h-16 w-16 mx-auto mb-4 text-muted-foreground" />
                <Button variant="glossy" className="mb-4">
                  {t[language].upload.button}
                </Button>
                <p className="text-muted-foreground">{t[language].upload.dragText}</p>
              </div>
            </div>
          </div>
        );

      case 'format':
        return (
          <div className="space-y-6">
            <div className="text-center">
              <h3 className="text-2xl font-semibold mb-2">{t[language].format.title}</h3>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {t[language].format.formats.map((format) => (
                <div
                  key={format.id}
                  className={`glass-panel p-4 cursor-pointer transition-all duration-300 ${
                    selectedFormat === format.id ? 'bg-primary/10 border-primary/50' : ''
                  }`}
                  onClick={() => setSelectedFormat(format.id)}
                >
                  <div className="text-center">
                    <div className="w-16 h-20 bg-gradient-secondary rounded mx-auto mb-2"></div>
                    <h4 className="font-medium">{format.name}</h4>
                    <p className="text-sm text-muted-foreground">{format.size}</p>
                    {selectedFormat === format.id && (
                      <Check className="h-5 w-5 text-primary mx-auto mt-2" />
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        );

      case 'pages':
        return (
          <div className="space-y-6">
            <div className="text-center">
              <h3 className="text-2xl font-semibold mb-2">{t[language].pages.title}</h3>
              <p className="text-muted-foreground">{t[language].pages.min}</p>
            </div>
            <div className="glass-panel p-6">
              <div className="flex items-center justify-between mb-4">
                <span className="font-medium">{selectedPages} {t[language].tabs.pages.toLowerCase()}</span>
                <span className="text-primary font-semibold">
                  {t[language].pages.price} {(selectedPages * 2.5).toFixed(2)} CZK
                </span>
              </div>
              <input
                type="range"
                min="20"
                max="100"
                step="2"
                value={selectedPages}
                onChange={(e) => setSelectedPages(Number(e.target.value))}
                className="w-full h-2 bg-muted rounded-lg appearance-none cursor-pointer"
              />
              <div className="flex justify-between text-sm text-muted-foreground mt-2">
                <span>20</span>
                <span>100</span>
              </div>
            </div>
          </div>
        );

      case 'preview':
        return (
          <div className="space-y-6">
            <div className="text-center">
              <h3 className="text-2xl font-semibold mb-2">{t[language].tabs.preview}</h3>
            </div>
            <div className="glass-panel p-6">
              <div className="bg-gradient-primary h-48 rounded-lg flex items-center justify-center">
                <div className="text-white text-center">
                  <Image className="h-16 w-16 mx-auto mb-4 opacity-80" />
                  <p className="text-lg font-medium">AI Smart-Fill Preview</p>
                  <p className="opacity-80">Automatic layout generation</p>
                </div>
              </div>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <section id="configurator" className="py-20 bg-muted/30">
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

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {/* Left Side - Configuration */}
          <div className="lg:col-span-2 space-y-6">
            {/* Tab Navigation */}
            <div className="flex flex-wrap gap-2">
              {tabs.map((tab) => {
                const IconComponent = tab.icon;
                return (
                  <Button
                    key={tab.id}
                    variant={activeTab === tab.id ? "default" : "pill"}
                    onClick={() => setActiveTab(tab.id)}
                    className="flex items-center gap-2"
                  >
                    <IconComponent className="h-4 w-4" />
                    {tab.label}
                  </Button>
                );
              })}
            </div>

            {/* Tab Content */}
            <div className="min-h-[400px]">
              {renderTabContent()}
            </div>
          </div>

          {/* Right Side - Summary */}
          <div className="lg:col-span-1">
            <div className="glass-panel p-6 sticky top-24">
              <h3 className="text-xl font-semibold mb-6">{t[language].summary.title}</h3>
              
              <div className="space-y-4 mb-6">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">{t[language].summary.format}:</span>
                  <span>A4 Landscape</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">{t[language].summary.pages}:</span>
                  <span>{selectedPages}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">{t[language].summary.photos}:</span>
                  <span>0</span>
                </div>
                <hr className="border-glass-border" />
                <div className="flex justify-between">
                  <span className="text-muted-foreground">{t[language].summary.price} ({t[language].summary.vat}):</span>
                  <span>{(selectedPages * 2.5).toFixed(2)} CZK</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">{t[language].summary.shipping}:</span>
                  <span>99 CZK</span>
                </div>
                <hr className="border-glass-border" />
                <div className="flex justify-between text-lg font-semibold">
                  <span>{t[language].summary.total}:</span>
                  <span>{(selectedPages * 2.5 + 99).toFixed(2)} CZK</span>
                </div>
              </div>

              <div className="space-y-4">
                <input
                  type="text"
                  placeholder={t[language].summary.coupon}
                  className="w-full px-3 py-2 border border-glass-border rounded-lg bg-glass backdrop-blur-lg"
                />
                <Button variant="glossy" className="w-full">
                  {t[language].summary.order}
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
                <p className="text-sm text-muted-foreground text-center">
                  {t[language].summary.eta}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PhotobookConfigurator;