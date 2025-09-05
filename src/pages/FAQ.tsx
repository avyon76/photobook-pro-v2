import { useState } from "react";
import Header from "@/components/Header";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { ChevronDown, HelpCircle, Search, FileText, Printer, Truck } from "lucide-react";

const FAQ = () => {
  const [language, setLanguage] = useState<'cs' | 'en'>('cs');
  const [searchTerm, setSearchTerm] = useState('');
  const [openItems, setOpenItems] = useState<number[]>([]);

  const t = {
    cs: {
      title: "Často kladené ",
      titleGradient: "otázky",
      subtitle: "Najděte odpovědi na nejčastější otázky o našich produktech a službách",
      search: "Hledat v FAQ...",
      categories: [
        {
          icon: FileText,
          name: "Obecné otázky",
          faqs: [
            {
              question: "Jaké formáty souborů podporujete?",
              answer: "Podporujeme JPG, PNG a PDF soubory. Pro nejlepší kvalitu doporučujeme JPG s rozlišením alespoň 300 DPI."
            },
            {
              question: "Jak funguje AI Smart-Fill?",
              answer: "AI Smart-Fill automaticky analyzuje vaše fotografie a rozmístí je na stránky podle kompozice, barev a obsahu. Výsledek můžete kdykoli upravit."
            },
            {
              question: "Mohu upravit automatický layout?",
              answer: "Ano, po vygenerování AI layoutu můžete fotografie přesouvat, měnit velikost a upravovat podle vašich přání."
            }
          ]
        },
        {
          icon: Printer,
          name: "Tisk a kvalita",
          faqs: [
            {
              question: "Jaké jsou minimální požadavky na rozlišení?",
              answer: "Doporučujeme rozlišení alespoň 300 DPI pro optimální kvalitu tisku. Minimum je 150 DPI, ale kvalita může být snížená."
            },
            {
              question: "Na jakých materiálech tisknete?",
              answer: "Nabízíme tisk na kvalitní fotografický papír, canvas, acrylic, metal a další speciální materiály podle typu produktu."
            },
            {
              question: "Jak dlouho trvá výroba?",
              answer: "Standardní doba výroby je 3-5 pracovních dní. Express varianty jsou hotové během 24-48 hodin."
            }
          ]
        },
        {
          icon: Truck,
          name: "Doprava a doručení",
          faqs: [
            {
              question: "Jaké máte možnosti dopravy?",
              answer: "Nabízíme dopravu České pošty, PPL, DPD a osobní odběr v našich pobočkách."
            },
            {
              question: "Kolik stojí doprava?",
              answer: "Doprava začína na 99 CZK. Při objednávce nad 1500 CZK je doprava zdarma."
            },
            {
              question: "Můžu sledovat svou objednávku?",
              answer: "Ano, po odeslání obdržíte tracking číslo a můžete sledovat zásilku v reálném čase."
            }
          ]
        }
      ]
    },
    en: {
      title: "Frequently asked ",
      titleGradient: "questions",
      subtitle: "Find answers to the most common questions about our products and services",
      search: "Search FAQ...",
      categories: [
        {
          icon: FileText,
          name: "General questions",
          faqs: [
            {
              question: "What file formats do you support?",
              answer: "We support JPG, PNG and PDF files. For best quality we recommend JPG with at least 300 DPI resolution."
            },
            {
              question: "How does AI Smart-Fill work?",
              answer: "AI Smart-Fill automatically analyzes your photos and arranges them on pages based on composition, colors and content. You can always edit the result."
            },
            {
              question: "Can I edit the automatic layout?",
              answer: "Yes, after AI layout generation you can move photos, resize and adjust according to your preferences."
            }
          ]
        },
        {
          icon: Printer,
          name: "Printing and quality",
          faqs: [
            {
              question: "What are the minimum resolution requirements?",
              answer: "We recommend at least 300 DPI resolution for optimal print quality. Minimum is 150 DPI, but quality may be reduced."
            },
            {
              question: "What materials do you print on?",
              answer: "We offer printing on high-quality photo paper, canvas, acrylic, metal and other special materials depending on product type."
            },
            {
              question: "How long does production take?",
              answer: "Standard production time is 3-5 business days. Express options are ready within 24-48 hours."
            }
          ]
        },
        {
          icon: Truck,
          name: "Shipping and delivery",
          faqs: [
            {
              question: "What shipping options do you have?",
              answer: "We offer Czech Post, PPL, DPD shipping and personal pickup at our branches."
            },
            {
              question: "How much does shipping cost?",
              answer: "Shipping starts at €4. Orders over €60 include free shipping."
            },
            {
              question: "Can I track my order?",
              answer: "Yes, after shipping you'll receive a tracking number and can follow your package in real time."
            }
          ]
        }
      ]
    }
  };

  const filteredFAQs = t[language].categories.map(category => ({
    ...category,
    faqs: category.faqs.filter(faq => 
      faq.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
      faq.answer.toLowerCase().includes(searchTerm.toLowerCase())
    )
  })).filter(category => category.faqs.length > 0);

  const toggleItem = (categoryIndex: number, faqIndex: number) => {
    const itemId = categoryIndex * 1000 + faqIndex;
    setOpenItems(prev => 
      prev.includes(itemId) 
        ? prev.filter(id => id !== itemId)
        : [...prev, itemId]
    );
  };

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
            
            {/* Search */}
            <div className="max-w-md mx-auto relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-5 w-5" />
              <input
                type="text"
                placeholder={t[language].search}
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-3 glass-panel border border-glass-border rounded-lg bg-glass backdrop-blur-lg"
              />
            </div>
          </div>
        </section>

        {/* FAQ Categories */}
        <section className="py-20 bg-muted/30">
          <div className="container mx-auto px-4 max-w-4xl">
            {filteredFAQs.map((category, categoryIndex) => {
              const IconComponent = category.icon;
              return (
                <div key={categoryIndex} className="mb-12">
                  <div className="flex items-center mb-6">
                    <div className="w-12 h-12 bg-gradient-primary rounded-lg flex items-center justify-center mr-4">
                      <IconComponent className="h-6 w-6 text-white" />
                    </div>
                    <h2 className="text-2xl font-bold">{category.name}</h2>
                  </div>
                  
                  <div className="space-y-4">
                    {category.faqs.map((faq, faqIndex) => {
                      const itemId = categoryIndex * 1000 + faqIndex;
                      const isOpen = openItems.includes(itemId);
                      
                      return (
                        <Card key={faqIndex} className="overflow-hidden">
                          <Collapsible open={isOpen} onOpenChange={() => toggleItem(categoryIndex, faqIndex)}>
                            <CollapsibleTrigger asChild>
                              <Button 
                                variant="ghost" 
                                className="w-full justify-between p-6 text-left h-auto hover:bg-accent/5"
                              >
                                <span className="font-medium text-base">{faq.question}</span>
                                <ChevronDown className={`h-5 w-5 transition-transform duration-200 ${
                                  isOpen ? 'transform rotate-180' : ''
                                }`} />
                              </Button>
                            </CollapsibleTrigger>
                            <CollapsibleContent className="px-6 pb-6">
                              <div className="text-muted-foreground leading-relaxed">
                                {faq.answer}
                              </div>
                            </CollapsibleContent>
                          </Collapsible>
                        </Card>
                      );
                    })}
                  </div>
                </div>
              );
            })}
            
            {filteredFAQs.length === 0 && searchTerm && (
              <div className="text-center py-12">
                <HelpCircle className="h-16 w-16 mx-auto mb-4 text-muted-foreground" />
                <h3 className="text-xl font-semibold mb-2">Nenalezeny žádné výsledky</h3>
                <p className="text-muted-foreground">Zkuste upravit vyhledávací dotaz</p>
              </div>
            )}
          </div>
        </section>

        {/* Contact CTA */}
        <section className="py-20">
          <div className="container mx-auto px-4 text-center">
            <div className="glass-panel p-8 max-w-2xl mx-auto">
              <h3 className="text-2xl font-bold mb-4">
                {language === 'cs' ? 'Nenašli jste odpověď?' : 'Didn\'t find an answer?'}
              </h3>
              <p className="text-muted-foreground mb-6">
                {language === 'cs' 
                  ? 'Kontaktujte nás a rádi vám pomůžeme s jakýmkoli dotazem.' 
                  : 'Contact us and we\'ll be happy to help with any question.'
                }
              </p>
              <Button variant="glossy">
                {language === 'cs' ? 'Kontaktovat podporu' : 'Contact Support'}
              </Button>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
};

export default FAQ;