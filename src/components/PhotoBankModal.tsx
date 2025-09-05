import { useState, useEffect } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Search, Download, Heart, Eye, Filter, Grid3X3, 
  List, X, Camera, Sparkles, Loader2
} from "lucide-react";
import { 
  searchPhotoBank, 
  PhotoBankImage, 
  getPopularSearchTerms,
  SearchOptions 
} from "@/lib/photobank-services";
import { toast } from "sonner";

interface PhotoBankModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectImage: (image: PhotoBankImage) => void;
  language: 'cs' | 'en';
  searchHint?: string;
}

const PhotoBankModal = ({ 
  isOpen, 
  onClose, 
  onSelectImage, 
  language,
  searchHint 
}: PhotoBankModalProps) => {
  const [searchQuery, setSearchQuery] = useState(searchHint || "");
  const [images, setImages] = useState<PhotoBankImage[]>([]);
  const [loading, setLoading] = useState(false);
  const [selectedImages, setSelectedImages] = useState<Set<string>>(new Set());
  const [favorites, setFavorites] = useState<Set<string>>(new Set());
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [orientation, setOrientation] = useState<"landscape" | "portrait" | "squarish">("landscape");
  const [currentPage, setCurrentPage] = useState(1);

  const t = {
    cs: {
      title: "Fotobanky",
      subtitle: "Najděte dokonalé fotografie pro váš projekt",
      search: "Hledat fotografie...",
      searchButton: "Hledat",
      popular: "Oblíbené dotazy",
      recent: "Nedávno použité",
      orientation: "Orientace",
      landscape: "Na šířku",
      portrait: "Na výšku", 
      square: "Čtvercové",
      selectImage: "Vybrat obrázek",
      addToFavorites: "Přidat k oblíbeným",
      removeFromFavorites: "Odebrat z oblíbených",
      preview: "Náhled",
      author: "Autor",
      license: "Licence",
      loadMore: "Načíst další",
      noResults: "Nenalezeny žádné obrázky",
      tryDifferent: "Zkuste jiné klíčové slovo",
      loading: "Načítání...",
      multiSelect: "Více výběrů"
    },
    en: {
      title: "Photo Banks",
      subtitle: "Find perfect photos for your project",
      search: "Search photos...",
      searchButton: "Search",
      popular: "Popular searches",
      recent: "Recently used",
      orientation: "Orientation",
      landscape: "Landscape",
      portrait: "Portrait",
      square: "Square",
      selectImage: "Select Image",
      addToFavorites: "Add to Favorites", 
      removeFromFavorites: "Remove from Favorites",
      preview: "Preview",
      author: "Author",
      license: "License",
      loadMore: "Load More",
      noResults: "No images found",
      tryDifferent: "Try different keywords",
      loading: "Loading...",
      multiSelect: "Multi Select"
    }
  };

  const popularTerms = getPopularSearchTerms();

  useEffect(() => {
    if (isOpen && searchQuery) {
      handleSearch();
    }
  }, [isOpen]);

  const handleSearch = async () => {
    if (!searchQuery.trim()) return;

    try {
      setLoading(true);
      const options: SearchOptions = {
        query: searchQuery,
        page: currentPage,
        perPage: 20,
        orientation: orientation
      };

      const results = await searchPhotoBank(options);
      setImages(currentPage === 1 ? results : [...images, ...results]);
    } catch (error) {
      console.error('Error searching photos:', error);
      toast.error(language === 'cs' 
        ? 'Chyba při hledání fotografií' 
        : 'Error searching photos'
      );
    } finally {
      setLoading(false);
    }
  };

  const handleLoadMore = () => {
    setCurrentPage(prev => prev + 1);
    handleSearch();
  };

  const handleImageSelect = (image: PhotoBankImage) => {
    onSelectImage(image);
    toast.success(language === 'cs' 
      ? 'Obrázek byl vybrán' 
      : 'Image selected'
    );
    onClose();
  };

  const handleToggleFavorite = (imageId: string) => {
    const newFavorites = new Set(favorites);
    if (newFavorites.has(imageId)) {
      newFavorites.delete(imageId);
    } else {
      newFavorites.add(imageId);
    }
    setFavorites(newFavorites);
  };

  const handlePopularSearch = (term: string) => {
    setSearchQuery(term);
    setCurrentPage(1);
    handleSearch();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-6xl max-h-[90vh] overflow-hidden flex flex-col">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Camera className="h-5 w-5" />
            {t[language].title}
          </DialogTitle>
          <p className="text-sm text-muted-foreground">{t[language].subtitle}</p>
        </DialogHeader>

        {/* Search Header */}
        <div className="glass-panel p-4 rounded-xl">
          <div className="flex gap-3 mb-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder={t[language].search}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
                className="pl-10"
              />
            </div>
            <Button onClick={handleSearch} disabled={loading}>
              {loading ? (
                <Loader2 className="h-4 w-4 animate-spin mr-2" />
              ) : (
                <Search className="h-4 w-4 mr-2" />
              )}
              {t[language].searchButton}
            </Button>
          </div>

          {/* Filters */}
          <div className="flex flex-wrap gap-3 items-center">
            {/* Orientation Filter */}
            <div className="flex items-center gap-2">
              <span className="text-sm text-muted-foreground">{t[language].orientation}:</span>
              <div className="flex border border-border rounded-lg">
                {[
                  { value: 'landscape', label: t[language].landscape },
                  { value: 'portrait', label: t[language].portrait },
                  { value: 'squarish', label: t[language].square }
                ].map((option) => (
                  <Button
                    key={option.value}
                    variant={orientation === option.value ? "default" : "ghost"}
                    size="sm"
                    onClick={() => setOrientation(option.value as any)}
                    className="rounded-none first:rounded-l-lg last:rounded-r-lg"
                  >
                    {option.label}
                  </Button>
                ))}
              </div>
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

          {/* Popular Searches */}
          <div className="mt-4">
            <div className="text-sm text-muted-foreground mb-2">{t[language].popular}:</div>
            <div className="flex flex-wrap gap-2">
              {popularTerms.map((term) => (
                <Badge
                  key={term}
                  variant="outline"
                  className="cursor-pointer hover:bg-primary hover:text-primary-foreground"
                  onClick={() => handlePopularSearch(term)}
                >
                  {term}
                </Badge>
              ))}
            </div>
          </div>
        </div>

        {/* Images Grid */}
        <div className="flex-1 overflow-y-auto">
          {loading && images.length === 0 ? (
            <div className="flex items-center justify-center py-12">
              <Loader2 className="h-8 w-8 animate-spin mr-2" />
              <span>{t[language].loading}</span>
            </div>
          ) : images.length === 0 ? (
            <div className="text-center py-12">
              <div className="text-muted-foreground mb-2">{t[language].noResults}</div>
              <div className="text-sm text-muted-foreground">{t[language].tryDifferent}</div>
            </div>
          ) : (
            <div className={viewMode === "grid" 
              ? "grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 p-4" 
              : "space-y-4 p-4"
            }>
              {images.map((image) => (
                <PhotoBankImageCard
                  key={image.id}
                  image={image}
                  language={language}
                  isSelected={selectedImages.has(image.id)}
                  isFavorited={favorites.has(image.id)}
                  viewMode={viewMode}
                  onSelect={handleImageSelect}
                  onToggleFavorite={handleToggleFavorite}
                  translations={t[language]}
                />
              ))}
            </div>
          )}

          {/* Load More Button */}
          {images.length > 0 && (
            <div className="text-center py-4">
              <Button 
                variant="outline" 
                onClick={handleLoadMore}
                disabled={loading}
              >
                {loading ? (
                  <Loader2 className="h-4 w-4 animate-spin mr-2" />
                ) : null}
                {t[language].loadMore}
              </Button>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};

interface PhotoBankImageCardProps {
  image: PhotoBankImage;
  language: 'cs' | 'en';
  isSelected: boolean;
  isFavorited: boolean;
  viewMode: "grid" | "list";
  onSelect: (image: PhotoBankImage) => void;
  onToggleFavorite: (imageId: string) => void;
  translations: any;
}

const PhotoBankImageCard = ({
  image,
  isSelected,
  isFavorited,
  viewMode,
  onSelect,
  onToggleFavorite,
  translations
}: PhotoBankImageCardProps) => {
  const cardClass = viewMode === "grid"
    ? "glass-panel rounded-lg overflow-hidden group cursor-pointer hover:scale-105 transition-all duration-300"
    : "glass-panel rounded-lg overflow-hidden group cursor-pointer flex gap-4 p-3";

  return (
    <Card 
      className={`${cardClass} ${isSelected ? 'ring-2 ring-primary' : ''}`}
      onClick={() => onSelect(image)}
    >
      {/* Image Preview */}
      <div className={viewMode === "grid" ? "relative aspect-[4/3] overflow-hidden" : "w-24 h-24 flex-shrink-0 rounded overflow-hidden"}>
        <img
          src={image.urls.small}
          alt={image.title || 'Stock photo'}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
          loading="lazy"
        />

        {/* Overlay Actions - Grid Mode */}
        {viewMode === "grid" && (
          <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-colors duration-300">
            <div className="absolute top-2 right-2 flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              <Button
                size="sm"
                variant="glass"
                className="w-8 h-8 p-0"
                onClick={(e) => {
                  e.stopPropagation();
                  onToggleFavorite(image.id);
                }}
              >
                <Heart className={`h-3 w-3 ${isFavorited ? 'fill-red-500 text-red-500' : 'text-white'}`} />
              </Button>
              <Button
                size="sm"
                variant="glass"
                className="w-8 h-8 p-0"
              >
                <Eye className="h-3 w-3 text-white" />
              </Button>
            </div>

            <div className="absolute bottom-2 left-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              <Button 
                size="sm" 
                variant="glass" 
                className="w-full text-white"
                onClick={(e) => {
                  e.stopPropagation();
                  onSelect(image);
                }}
              >
                <Download className="h-3 w-3 mr-1" />
                {translations.selectImage}
              </Button>
            </div>
          </div>
        )}

        {/* Source Badge */}
        <div className="absolute top-2 left-2">
          <Badge variant="secondary" className="text-xs">
            {image.source}
          </Badge>
        </div>
      </div>

      {/* Image Info */}
      {viewMode === "list" && (
        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between mb-1">
            <h4 className="font-medium text-sm truncate">
              {image.title || 'Untitled'}
            </h4>
            <Button
              size="sm"
              variant="ghost"
              className="w-6 h-6 p-0 flex-shrink-0"
              onClick={(e) => {
                e.stopPropagation();
                onToggleFavorite(image.id);
              }}
            >
              <Heart className={`h-3 w-3 ${isFavorited ? 'fill-red-500 text-red-500' : ''}`} />
            </Button>
          </div>

          <p className="text-xs text-muted-foreground mb-2">
            {translations.author}: {image.author}
          </p>

          <div className="flex gap-2">
            <Button 
              size="sm" 
              variant="outline"
              className="flex-1"
              onClick={(e) => {
                e.stopPropagation();
                onSelect(image);
              }}
            >
              <Download className="h-3 w-3 mr-1" />
              {translations.selectImage}
            </Button>
          </div>
        </div>
      )}
    </Card>
  );
};

export default PhotoBankModal;