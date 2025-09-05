import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { Mail, Phone, MapPin, Facebook, Instagram, Youtube } from "lucide-react";

interface FooterProps {
  language: 'cs' | 'en';
}

const Footer = ({ language }: FooterProps) => {
  const t = {
    cs: {
      company: "PhotoBook Pro",
      tagline: "Profesionální tiskové služby s AI podporou",
      products: "Produkty",
      services: "Služby", 
      support: "Podpora",
      legal: "Právní informace",
      newsletter: "Newsletter",
      newsletterText: "Přihlaste se k odběru novinek a slev",
      subscribe: "Přihlásit",
      contact: "Kontakt",
      followUs: "Sledujte nás",
      copyright: "© 2024 PhotoBook Pro. Všechna práva vyhrazena.",
      
      // Menu items
      photobooks: "Fotoknihy",
      calendars: "Kalendáře", 
      cards: "Karty & Přání",
      prints: "Retro Prints",
      magnets: "Magnetky",
      wallart: "Wall Art",
      frames: "Rámování",
      banners: "Bannery",
      
      // Services
      aiSmartfill: "AI Smart-Fill",
      studio: "Studio Editor",
      proofing: "Korektury",
      express: "Express výroba",
      
      faq: "FAQ",
      contactUs: "Kontakt",
      delivery: "Doprava & platby",
      complaints: "Reklamace",
      iccProfiles: "ICC profily",
      
      // Legal
      terms: "Obchodní podmínky",
      privacy: "GDPR",
      cookies: "Cookies"
    },
    en: {
      company: "PhotoBook Pro",
      tagline: "Professional print services with AI support",
      products: "Products",
      services: "Services",
      support: "Support", 
      legal: "Legal",
      newsletter: "Newsletter",
      newsletterText: "Subscribe to news and discounts",
      subscribe: "Subscribe",
      contact: "Contact",
      followUs: "Follow Us",
      copyright: "© 2024 PhotoBook Pro. All rights reserved.",
      
      // Menu items
      photobooks: "Photobooks",
      calendars: "Calendars",
      cards: "Cards & Greetings", 
      prints: "Retro Prints",
      magnets: "Magnets",
      wallart: "Wall Art",
      frames: "Framing",
      banners: "Banners",
      
      // Services
      aiSmartfill: "AI Smart-Fill",
      studio: "Studio Editor",
      proofing: "Proofing",
      express: "Express Production",
      
      // Support
      faq: "FAQ",
      contactUs: "Contact",
      delivery: "Shipping & Payment",
      complaints: "Complaints",
      iccProfiles: "ICC Profiles",
      
      // Legal
      terms: "Terms & Conditions",
      privacy: "Privacy Policy",
      cookies: "Cookies"
    }
  };

  return (
    <footer className="bg-muted/5 border-t border-border/10 mt-20">
      <div className="container mx-auto px-4 py-16">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 mb-12">
          {/* Company Info */}
          <div className="lg:col-span-2">
            <h3 className="text-xl font-bold gradient-text mb-3">{t[language].company}</h3>
            <p className="text-muted-foreground mb-6 max-w-md">
              {t[language].tagline}
            </p>
            
            {/* Newsletter */}
            <div className="space-y-3">
              <h4 className="font-semibold">{t[language].newsletter}</h4>
              <p className="text-sm text-muted-foreground">{t[language].newsletterText}</p>
              <div className="flex gap-2">
                <Input 
                  placeholder="váš@email.cz" 
                  className="flex-1 glass-panel"
                />
                <Button variant="glossy" size="sm">
                  {t[language].subscribe}
                </Button>
              </div>
            </div>
          </div>
          
          {/* Products */}
          <div>
            <h4 className="font-semibold mb-4">{t[language].products}</h4>
            <ul className="space-y-2 text-sm">
              <li><a href="/products" className="text-muted-foreground hover:text-foreground transition-colors">{t[language].photobooks}</a></li>
              <li><a href="/products" className="text-muted-foreground hover:text-foreground transition-colors">{t[language].calendars}</a></li>
              <li><a href="/products" className="text-muted-foreground hover:text-foreground transition-colors">{t[language].cards}</a></li>
              <li><a href="/products" className="text-muted-foreground hover:text-foreground transition-colors">{t[language].prints}</a></li>
              <li><a href="/products" className="text-muted-foreground hover:text-foreground transition-colors">{t[language].magnets}</a></li>
              <li><a href="/products" className="text-muted-foreground hover:text-foreground transition-colors">{t[language].wallart}</a></li>
            </ul>
          </div>
          
          {/* Support */}
          <div>
            <h4 className="font-semibold mb-4">{t[language].support}</h4>
            <ul className="space-y-2 text-sm">
              <li><a href="/faq" className="text-muted-foreground hover:text-foreground transition-colors">{t[language].faq}</a></li>
              <li><a href="/contact" className="text-muted-foreground hover:text-foreground transition-colors">{t[language].contactUs}</a></li>
              <li><a href="#" className="text-muted-foreground hover:text-foreground transition-colors">{t[language].delivery}</a></li>
              <li><a href="#" className="text-muted-foreground hover:text-foreground transition-colors">{t[language].complaints}</a></li>
              <li><a href="#" className="text-muted-foreground hover:text-foreground transition-colors">{t[language].iccProfiles}</a></li>
            </ul>
          </div>
          
          {/* Legal */}
          <div>
            <h4 className="font-semibold mb-4">{t[language].legal}</h4>
            <ul className="space-y-2 text-sm">
              <li><a href="#" className="text-muted-foreground hover:text-foreground transition-colors">{t[language].terms}</a></li>
              <li><a href="#" className="text-muted-foreground hover:text-foreground transition-colors">{t[language].privacy}</a></li>
              <li><a href="#" className="text-muted-foreground hover:text-foreground transition-colors">{t[language].cookies}</a></li>
            </ul>
            
            {/* Contact Info */}
            <div className="mt-6 space-y-2 text-sm">
              <div className="flex items-center gap-2 text-muted-foreground">
                <Mail className="h-4 w-4" />
                <span>info@photobookpro.cz</span>
              </div>
              <div className="flex items-center gap-2 text-muted-foreground">
                <Phone className="h-4 w-4" />
                <span>+420 123 456 789</span>
              </div>
            </div>
          </div>
        </div>
        
        <Separator className="my-8" />
        
        {/* Bottom Footer */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-sm text-muted-foreground">
            {t[language].copyright}
          </p>
          
          {/* Social Media */}
          <div className="flex items-center gap-4">
            <span className="text-sm text-muted-foreground">{t[language].followUs}:</span>
            <div className="flex gap-2">
              <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                <Facebook className="h-4 w-4" />
              </Button>
              <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                <Instagram className="h-4 w-4" />
              </Button>
              <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                <Youtube className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;