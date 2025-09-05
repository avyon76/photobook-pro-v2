import { useState } from "react";
import Header from "@/components/Header";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Calendar, User, ArrowRight, Tag } from "lucide-react";

const Blog = () => {
  const [language, setLanguage] = useState<'cs' | 'en'>('cs');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  const t = {
    cs: {
      title: "Náš ",
      titleGradient: "blog",
      subtitle: "Tipy, triky a inspirace pro vytváření krásných fotoknih",
      readMore: "Číst více",
      categories: ["Všechny", "Tipy", "Inspirace", "Novinky", "Návody"],
      posts: [
        {
          id: 1,
          title: "10 tipů pro dokonalé rozvržení fotoknihy",
          excerpt: "Naučte se, jak správně rozložit fotografie pro maximální vizuální dopad.",
          category: "Tipy",
          author: "PhotoBook Pro Team",
          date: "15. března 2024",
          readTime: "5 min čtení",
          image: "/api/placeholder/400/250"
        },
        {
          id: 2, 
          title: "AI Smart-Fill: Budoucnost automatického layoutu",
          excerpt: "Zjistěte, jak naše AI technologie revolucionalizuje tvorbu fotoknih.",
          category: "Novinky",
          author: "Tech Team",
          date: "10. března 2024", 
          readTime: "3 min čtení",
          image: "/api/placeholder/400/250"
        },
        {
          id: 3,
          title: "Inspirace z rodinných fotoknih našich zákazníků",
          excerpt: "Podívejte se na krásné příklady rodinných fotoknih a nechte se inspirovat.",
          category: "Inspirace",
          author: "Design Team",
          date: "5. března 2024",
          readTime: "4 min čtení", 
          image: "/api/placeholder/400/250"
        },
        {
          id: 4,
          title: "Jak připravit fotografie pro tisk",
          excerpt: "Praktický návod pro přípravu fotografií s optimální kvalitou pro tisk.",
          category: "Návody",
          author: "Print Expert",
          date: "1. března 2024",
          readTime: "6 min čtení",
          image: "/api/placeholder/400/250"
        }
      ]
    },
    en: {
      title: "Our ",
      titleGradient: "blog", 
      subtitle: "Tips, tricks and inspiration for creating beautiful photobooks",
      readMore: "Read more",
      categories: ["All", "Tips", "Inspiration", "News", "Tutorials"],
      posts: [
        {
          id: 1,
          title: "10 tips for perfect photobook layout",
          excerpt: "Learn how to properly arrange photos for maximum visual impact.",
          category: "Tips",
          author: "PhotoBook Pro Team",
          date: "March 15, 2024",
          readTime: "5 min read",
          image: "/api/placeholder/400/250"
        },
        {
          id: 2,
          title: "AI Smart-Fill: The future of automatic layout", 
          excerpt: "Discover how our AI technology revolutionizes photobook creation.",
          category: "News",
          author: "Tech Team", 
          date: "March 10, 2024",
          readTime: "3 min read",
          image: "/api/placeholder/400/250"
        },
        {
          id: 3,
          title: "Inspiration from our customers' family photobooks",
          excerpt: "See beautiful examples of family photobooks and get inspired.",
          category: "Inspiration",
          author: "Design Team",
          date: "March 5, 2024", 
          readTime: "4 min read",
          image: "/api/placeholder/400/250"
        },
        {
          id: 4,
          title: "How to prepare photos for printing",
          excerpt: "Practical guide for preparing photos with optimal print quality.",
          category: "Tutorials",
          author: "Print Expert",
          date: "March 1, 2024",
          readTime: "6 min read", 
          image: "/api/placeholder/400/250"
        }
      ]
    }
  };

  const filteredPosts = selectedCategory === 'all' || selectedCategory === t[language].categories[0]
    ? t[language].posts
    : t[language].posts.filter(post => post.category === selectedCategory);

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
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              {t[language].subtitle}
            </p>
          </div>
        </section>

        {/* Category Filter */}
        <section className="py-10 bg-muted/30">
          <div className="container mx-auto px-4">
            <div className="flex flex-wrap gap-3 justify-center">
              {t[language].categories.map((category, index) => (
                <Button
                  key={index}
                  variant={selectedCategory === category || (selectedCategory === 'all' && index === 0) ? "default" : "pill"}
                  onClick={() => setSelectedCategory(index === 0 ? 'all' : category)}
                >
                  <Tag className="h-4 w-4 mr-2" />
                  {category}
                </Button>
              ))}
            </div>
          </div>
        </section>

        {/* Blog Posts */}
        <section className="py-20">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
              {filteredPosts.map((post) => (
                <Card key={post.id} className="overflow-hidden group hover:scale-105 transition-transform duration-300">
                  {/* Post Image */}
                  <div className="aspect-video bg-gradient-primary opacity-80 relative overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-accent/20"></div>
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="text-white text-center">
                        <Calendar className="h-12 w-12 mx-auto mb-2 opacity-60" />
                        <p className="font-medium opacity-80">Blog Image</p>
                      </div>
                    </div>
                  </div>
                  
                  <div className="p-6">
                    {/* Category Badge */}
                    <Badge variant="secondary" className="mb-3">
                      {post.category}
                    </Badge>
                    
                    {/* Title */}
                    <h3 className="text-xl font-semibold mb-2 group-hover:text-primary transition-colors">
                      {post.title}
                    </h3>
                    
                    {/* Excerpt */}
                    <p className="text-muted-foreground text-sm mb-4 line-clamp-3">
                      {post.excerpt}
                    </p>
                    
                    {/* Meta Info */}
                    <div className="flex items-center text-xs text-muted-foreground mb-4 space-x-4">
                      <div className="flex items-center">
                        <User className="h-3 w-3 mr-1" />
                        {post.author}
                      </div>
                      <div className="flex items-center">
                        <Calendar className="h-3 w-3 mr-1" />
                        {post.date}
                      </div>
                      <span>{post.readTime}</span>
                    </div>
                    
                    {/* Read More Button */}
                    <Button variant="outline" size="sm" className="w-full group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
                      {t[language].readMore}
                      <ArrowRight className="ml-2 h-3 w-3" />
                    </Button>
                  </div>
                </Card>
              ))}
            </div>

            {/* Load More */}
            <div className="text-center mt-12">
              <Button variant="outline" size="lg">
                {language === 'cs' ? 'Načíst více článků' : 'Load more articles'}
              </Button>
            </div>
          </div>
        </section>

        {/* Newsletter CTA */}
        <section className="py-20 bg-muted/30">
          <div className="container mx-auto px-4 text-center">
            <div className="glass-panel p-8 max-w-2xl mx-auto">
              <h3 className="text-2xl font-bold mb-4">
                {language === 'cs' ? 'Zůstaňte v obraze' : 'Stay updated'}
              </h3>
              <p className="text-muted-foreground mb-6">
                {language === 'cs' 
                  ? 'Přihlaste se k odběru našeho newsletteru a dostávejte nejnovější tipy a inspirace.' 
                  : 'Subscribe to our newsletter and get the latest tips and inspiration.'
                }
              </p>
              <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
                <input
                  type="email"
                  placeholder="váš@email.cz"
                  className="flex-1 px-4 py-2 border border-glass-border rounded-lg bg-glass backdrop-blur-lg"
                />
                <Button variant="glossy">
                  {language === 'cs' ? 'Přihlásit' : 'Subscribe'}
                </Button>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
};

export default Blog;