import { useState, useMemo } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Search, Star, Download, Heart, Eye, Crown, 
  Filter, Grid3X3, List, ChevronDown 
} from "lucide-react";
import { useTemplates, useFavoriteTemplates, ProductTemplate } from "@/hooks/useTemplates";
import { toast } from "sonner";

interface TemplateGalleryProps {
  productType: string;
  language: 'cs' | 'en';
  onSelectTemplate: (template: ProductTemplate) => void;
  selectedTemplateId?: string;
}

const TemplateGallery = ({ 
  productType, 
  language, 
  onSelectTemplate,
  selectedTemplateId 
}: TemplateGalleryProps) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [sortBy, setSortBy] = useState<"rating" | "downloads" | "name">("rating");
  
  const { templates, categories, loading } = useTemplates(productType);
  const { favorites, toggleFavorite } = useFavoriteTemplates();

  const t = {
    cs: {
      title: "Šablony produktů",
      subtitle: "Vyberte si z našich profesionálních šablon",
      search: "Hledat šablony...",
      allCategories: "Všechny kategorie",
      featured: "Doporučené",
      popular: "Oblíbené",
      newest: "Nejnovější",
      premium: "Premium",
      free: "Zdarma",
      useTemplate: "Použít šablonu",
      preview: "Náhled",
      addToFavorites: "Přidat k oblíbeným",
      removeFromFavorites: "Odebrat z oblíbených",
      downloads: "stažení",
      rating: "hodnocení",
      sortBy: "Řadit podle:",
      sortRating: "Hodnocení",
      sortDownloads: "Stažení",
      sortName: "Názvu",
      noResults: "Nenalezeny žádné šablony",
      tryDifferent: "Zkuste jiné hledání nebo kategorii"
    },
    en: {
      title: "Product Templates",
      subtitle: "Choose from our professional templates",
      search: "Search templates...",
      allCategories: "All Categories",
      featured: "Featured",
      popular: "Popular",
      newest: "Newest",
      premium: "Premium", 
      free: "Free",
      useTemplate: "Use Template",
      preview: "Preview",
      addToFavorites: "Add to Favorites",
      removeFromFavorites: "Remove from Favorites",
      downloads: "downloads",
      rating: "rating",
      sortBy: "Sort by:",
      sortRating: "Rating",
      sortDownloads: "Downloads",
      sortName: "Name",
      noResults: "No templates found",
      tryDifferent: "Try different search or category"
    }
  };

  const filteredAndSortedTemplates = useMemo(() => {
    let filtered = templates;

    // Filter by search term
    if (searchTerm) {
      filtered = filtered.filter(template =>
        template.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        template.description?.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Filter by category
    if (selectedCategory !== "all") {
      filtered = filtered.filter(template => template.category === selectedCategory);
    }

    // Sort templates
    filtered.sort((a, b) => {
      switch (sortBy) {
        case "rating":
          return b.rating - a.rating;
        case "downloads":
          return b.downloads_count - a.downloads_count;
        case "name":
          return a.name.localeCompare(b.name);
        default:
          return 0;
      }
    });

    return filtered;
  }, [templates, searchTerm, selectedCategory, sortBy]);

  const handleSelectTemplate = (template: ProductTemplate) => {
    onSelectTemplate(template);
    toast.success(language === 'cs' 
      ? `Šablona "${template.name}" byla vybrána` 
      : `Template "${template.name}" selected`
    );
  };

  const handleToggleFavorite = async (templateId: string, event: React.MouseEvent) => {
    event.stopPropagation();
    await toggleFavorite(templateId);
    
    const isFavorited = !favorites.has(templateId);
    toast.success(language === 'cs' 
      ? (isFavorited ? 'Přidáno k oblíbeným' : 'Odebráno z oblíbených')
      : (isFavorited ? 'Added to favorites' : 'Removed from favorites')
    );
  };

  if (loading) {
    return (
      <div className="space-y-4">
        {/* Loading skeletons */}
        {[...Array(6)].map((_, i) => (
          <div key={i} className="glass-panel p-4 rounded-lg animate-pulse">
            <div className="bg-muted h-48 rounded-lg mb-4"></div>
            <div className="bg-muted h-4 rounded mb-2 w-3/4"></div>
            <div className="bg-muted h-3 rounded w-1/2"></div>
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="text-center">
        <h2 className="text-2xl font-bold mb-2">{t[language].title}</h2>
        <p className="text-muted-foreground">{t[language].subtitle}</p>
      </div>

      {/* Search and Filters */}
      <div className="glass-panel p-4 rounded-xl">
        <div className="flex flex-col md:flex-row gap-4 items-center">
          {/* Search */}
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder={t[language].search}
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>

          {/* Category Filter */}
          <div className="flex items-center gap-2">
            <Filter className="h-4 w-4 text-muted-foreground" />
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="bg-background border border-border rounded-lg px-3 py-2 text-sm"
            >
              <option value="all">{t[language].allCategories}</option>
              {categories.map((category) => (
                <option key={category.id} value={category.slug}>
                  {category.name}
                </option>
              ))}
            </select>
          </div>

          {/* Sort */}
          <div className="flex items-center gap-2">
            <span className="text-sm text-muted-foreground">{t[language].sortBy}</span>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as any)}
              className="bg-background border border-border rounded-lg px-3 py-2 text-sm"
            >
              <option value="rating">{t[language].sortRating}</option>
              <option value="downloads">{t[language].sortDownloads}</option>
              <option value="name">{t[language].sortName}</option>
            </select>
          </div>

          {/* View Mode */}
          <div className="flex border border-border rounded-lg">
            <Button
              variant={viewMode === "grid" ? "default" : "ghost"}
              size="sm"
              onClick={() => setViewMode("grid")}
              className="rounded-r-none"
            >
              <Grid3X3 className="h-4 w-4" />
            </Button>
            <Button
              variant={viewMode === "list" ? "default" : "ghost"}
              size="sm"
              onClick={() => setViewMode("list")}
              className="rounded-l-none"
            >
              <List className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>

      {/* Templates Grid */}
      {filteredAndSortedTemplates.length === 0 ? (
        <div className="text-center py-12">
          <div className="text-muted-foreground mb-2">{t[language].noResults}</div>
          <div className="text-sm text-muted-foreground">{t[language].tryDifferent}</div>
        </div>
      ) : (
        <div className={viewMode === "grid" 
          ? "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6" 
          : "space-y-4"
        }>
          {filteredAndSortedTemplates.map((template) => (
            <TemplateCard
              key={template.id}
              template={template}
              language={language}
              isSelected={selectedTemplateId === template.id}
              isFavorited={favorites.has(template.id)}
              viewMode={viewMode}
              onSelect={handleSelectTemplate}
              onToggleFavorite={handleToggleFavorite}
              translations={t[language]}
            />
          ))}
        </div>
      )}
    </div>
  );
};

interface TemplateCardProps {
  template: ProductTemplate;
  language: 'cs' | 'en';
  isSelected: boolean;
  isFavorited: boolean;
  viewMode: "grid" | "list";
  onSelect: (template: ProductTemplate) => void;
  onToggleFavorite: (templateId: string, event: React.MouseEvent) => void;
  translations: any;
}

const TemplateCard = ({ 
  template, 
  isSelected, 
  isFavorited, 
  viewMode,
  onSelect, 
  onToggleFavorite,
  translations 
}: TemplateCardProps) => {
  const cardClass = viewMode === "grid" 
    ? "glass-panel rounded-xl overflow-hidden group cursor-pointer hover:scale-105 transition-all duration-300"
    : "glass-panel rounded-xl overflow-hidden group cursor-pointer flex gap-4 p-4";

  return (
    <Card 
      className={`${cardClass} ${isSelected ? 'ring-2 ring-primary' : ''}`}
      onClick={() => onSelect(template)}
    >
      {/* Template Preview */}
      <div className={viewMode === "grid" ? "relative aspect-[4/3] overflow-hidden" : "w-32 h-24 flex-shrink-0 rounded-lg overflow-hidden"}>
        {template.preview_image ? (
          <img 
            src={template.preview_image} 
            alt={template.name}
            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
          />
        ) : (
          <div className="w-full h-full bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center">
            <span className="text-2xl font-bold text-muted-foreground opacity-50">
              {template.name.charAt(0)}
            </span>
          </div>
        )}
        
        {/* Overlay Actions - Grid Mode */}
        {viewMode === "grid" && (
          <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300">
            <div className="absolute top-3 right-3 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              <Button
                size="sm"
                variant="glass"
                className="w-8 h-8 p-0"
                onClick={(e) => onToggleFavorite(template.id, e)}
              >
                <Heart className={`h-4 w-4 ${isFavorited ? 'fill-red-500 text-red-500' : ''}`} />
              </Button>
              <Button
                size="sm"
                variant="glass"
                className="w-8 h-8 p-0"
              >
                <Eye className="h-4 w-4" />
              </Button>
            </div>
          </div>
        )}

        {/* Badges */}
        <div className="absolute top-3 left-3 flex gap-2">
          {template.is_premium && (
            <Badge className="bg-gradient-to-r from-yellow-500 to-orange-500 text-white border-0">
              <Crown className="h-3 w-3 mr-1" />
              {translations.premium}
            </Badge>
          )}
          {!template.is_premium && (
            <Badge variant="secondary" className="bg-green-500 text-white border-0">
              {translations.free}
            </Badge>
          )}
        </div>
      </div>

      {/* Template Info */}
      <div className={viewMode === "grid" ? "p-4" : "flex-1 min-w-0"}>
        <div className="flex items-start justify-between mb-2">
          <h3 className="font-semibold text-sm group-hover:text-primary transition-colors truncate">
            {template.name}
          </h3>
          {viewMode === "list" && (
            <Button
              size="sm"
              variant="ghost"
              className="w-8 h-8 p-0 flex-shrink-0"
              onClick={(e) => onToggleFavorite(template.id, e)}
            >
              <Heart className={`h-4 w-4 ${isFavorited ? 'fill-red-500 text-red-500' : ''}`} />
            </Button>
          )}
        </div>

        {template.description && (
          <p className="text-xs text-muted-foreground mb-3 line-clamp-2">
            {template.description}
          </p>
        )}

        {/* Stats */}
        <div className="flex items-center gap-4 text-xs text-muted-foreground mb-3">
          <div className="flex items-center gap-1">
            <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
            <span>{template.rating.toFixed(1)}</span>
          </div>
          <div className="flex items-center gap-1">
            <Download className="h-3 w-3" />
            <span>{template.downloads_count} {translations.downloads}</span>
          </div>
        </div>

        {/* Action Button */}
        <Button 
          variant={isSelected ? "default" : "outline"} 
          size="sm" 
          className="w-full"
          onClick={(e) => {
            e.stopPropagation();
            onSelect(template);
          }}
        >
          {isSelected ? '✓ ' : ''}{translations.useTemplate}
        </Button>
      </div>
    </Card>
  );
};

export default TemplateGallery;