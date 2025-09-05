import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search, X } from "lucide-react";

interface SearchBarProps {
  language: 'cs' | 'en';
  onSearch: (query: string) => void;
}

const SearchBar = ({ language, onSearch }: SearchBarProps) => {
  const [query, setQuery] = useState("");
  const [isOpen, setIsOpen] = useState(false);

  const t = {
    cs: {
      placeholder: "Hledat produkty...",
      search: "Hledat"
    },
    en: {
      placeholder: "Search products...",
      search: "Search"
    }
  };

  const handleSearch = () => {
    onSearch(query);
    setIsOpen(false);
  };

  const handleClear = () => {
    setQuery("");
    onSearch("");
    setIsOpen(false);
  };

  return (
    <div className="relative">
      <Button
        variant="outline"
        size="sm"
        onClick={() => setIsOpen(!isOpen)}
        className="glass-panel"
      >
        <Search className="h-4 w-4" />
      </Button>
      
      {isOpen && (
        <div className="absolute top-12 right-0 w-80 glass-panel border border-border/20 rounded-lg p-3 z-50">
          <div className="flex gap-2">
            <Input
              placeholder={t[language].placeholder}
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
              className="flex-1"
            />
            <Button size="sm" onClick={handleSearch}>
              <Search className="h-4 w-4" />
            </Button>
            <Button variant="outline" size="sm" onClick={handleClear}>
              <X className="h-4 w-4" />
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};

export default SearchBar;