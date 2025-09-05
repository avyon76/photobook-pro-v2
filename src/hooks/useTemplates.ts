import { useState, useEffect } from 'react';

export interface ProductTemplate {
  id: string;
  name: string;
  description?: string;
  product_type: string;
  category: string;
  preview_image?: string;
  template_data: any;
  is_premium: boolean;
  downloads_count: number;
  rating: number;
  created_at: string;
  updated_at: string;
}

export interface TemplateCategory {
  id: string;
  name: string;
  slug: string;
  description?: string;
  product_type: string;
  sort_order: number;
}

// Mock data and functions for development
const mockTemplates: ProductTemplate[] = [
  {
    id: '1',
    name: 'Elegantní svatební album',
    description: 'Luxusní šablona pro svatební fotoknihu s jemnými dekory',
    product_type: 'photobook',
    category: 'wedding',
    preview_image: '/templates/wedding-elegant.jpg',
    template_data: { layout: 'elegant', pages: 20 },
    is_premium: false,
    downloads_count: 245,
    rating: 4.8,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString()
  },
  {
    id: '2', 
    name: 'Rodinné vzpomínky',
    description: 'Teplá šablona pro rodinné momenty',
    product_type: 'photobook',
    category: 'family',
    preview_image: '/templates/family-memories.jpg',
    template_data: { layout: 'warm', pages: 16 },
    is_premium: false,
    downloads_count: 189,
    rating: 4.9,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString()
  }
];

const mockCategories: TemplateCategory[] = [
  { id: '1', name: 'Svatební', slug: 'wedding', product_type: 'photobook', sort_order: 1 },
  { id: '2', name: 'Rodinné', slug: 'family', product_type: 'photobook', sort_order: 2 }
];

export const useTemplates = (productType?: string, category?: string) => {
  const [templates, setTemplates] = useState<ProductTemplate[]>(mockTemplates);
  const [categories, setCategories] = useState<TemplateCategory[]>(mockCategories);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const getFeaturedTemplates = async (limit: number = 6): Promise<ProductTemplate[]> => {
    return mockTemplates.slice(0, limit);
  };

  const getTemplatesByCategory = async (category: string): Promise<ProductTemplate[]> => {
    return mockTemplates.filter(t => t.category === category);
  };

  const searchTemplates = async (searchTerm: string): Promise<ProductTemplate[]> => {
    return mockTemplates.filter(t => 
      t.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
  };

  const incrementDownloadCount = async (templateId: string) => {
    // Mock implementation
  };

  return {
    templates,
    categories,
    loading,
    error,
    refetch: () => {},
    getFeaturedTemplates,
    getTemplatesByCategory,
    searchTemplates,
    incrementDownloadCount
  };
};

export const useFavoriteTemplates = () => {
  const [favorites, setFavorites] = useState<Set<string>>(new Set());
  const [loading, setLoading] = useState(false);

  const toggleFavorite = async (templateId: string) => {
    // Mock implementation for development
    const newFavorites = new Set(favorites);
    if (newFavorites.has(templateId)) {
      newFavorites.delete(templateId);
    } else {
      newFavorites.add(templateId);
    }
    setFavorites(newFavorites);
  };

  const loadUserFavorites = async () => {
    // Mock implementation
  };

  return {
    favorites,
    toggleFavorite,
    loading,
    refetch: loadUserFavorites
  };
};