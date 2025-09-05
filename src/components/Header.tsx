import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import SearchBar from "@/components/SearchBar";
import Cart from "@/components/Cart";
import { Menu, X, User, Globe } from "lucide-react";

interface HeaderProps {
  language: 'cs' | 'en';
  onLanguageChange: (lang: 'cs' | 'en') => void;
}

const Header = ({ language, onLanguageChange }: HeaderProps) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const t = {
    cs: {
      products: "Produkty",
      configurator: "Konfigurátor", 
      faq: "FAQ",
      blog: "Blog",
      about: "O nás",
      contact: "Kontakty",
      cart: "Košík",
      login: "Přihlášení"
    },
    en: {
      products: "Products",
      configurator: "Configurator",
      faq: "FAQ", 
      blog: "Blog",
      about: "About",
      contact: "Contact",
      cart: "Cart",
      login: "Login"
    }
  };

  const menuItems = [
    { key: 'products', label: t[language].products, href: '/products' },
    { key: 'configurator', label: t[language].configurator, href: '/configurator' },
    { key: 'faq', label: t[language].faq, href: '/faq' },
    { key: 'blog', label: t[language].blog, href: '/blog' },
    { key: 'about', label: t[language].about, href: '/about' },
    { key: 'contact', label: t[language].contact, href: '/contact' }
  ];

  return (
    <header className="fixed top-0 left-0 right-0 z-50 glass-panel border-b border-glass-border/50">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        {/* Logo */}
        <Link to="/" className="flex items-center space-x-2">
          <div className="w-8 h-8 bg-gradient-primary rounded-lg flex items-center justify-center">
            <span className="text-white font-bold text-sm">PB</span>
          </div>
          <span className="font-bold text-lg gradient-text">PhotoBook Pro</span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-8">
          {menuItems.map((item) => (
            <Link
              key={item.key}
              to={item.href}
              className="text-foreground/80 hover:text-foreground transition-colors duration-300 font-medium"
            >
              {item.label}
            </Link>
          ))}
        </nav>

        {/* Utility Icons */}
        <div className="hidden md:flex items-center space-x-4">
          <SearchBar language={language} onSearch={(query) => console.log('Search:', query)} />
          <Cart language={language} />
          <Button
            variant="outline"
            size="sm"
            onClick={() => onLanguageChange(language === 'cs' ? 'en' : 'cs')}
            className="glass-panel"
          >
            <Globe className="h-4 w-4 mr-2" />
            {language.toUpperCase()}
          </Button>
        </div>

        {/* Mobile Menu Button */}
        <div className="flex items-center gap-2 md:hidden">
          <Button variant="ghost" size="sm">
            <User className="h-4 w-4" />
          </Button>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
          </Button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden glass-panel border-t border-glass-border/50">
          <nav className="flex flex-col space-y-4 p-4">
            {menuItems.map((item) => (
              <Link
                key={item.key}
                to={item.href}
                className="text-foreground/80 hover:text-foreground transition-colors duration-300 font-medium py-2"
                onClick={() => setIsMenuOpen(false)}
              >
                {item.label}
              </Link>
            ))}
            <Button 
              variant="pill" 
              size="sm"
              onClick={() => onLanguageChange(language === 'cs' ? 'en' : 'cs')}
              className="w-fit"
            >
              <Globe className="h-4 w-4 mr-1" />
              {language.toUpperCase()}
            </Button>
          </nav>
        </div>
      )}
    </header>
  );
};

export default Header;