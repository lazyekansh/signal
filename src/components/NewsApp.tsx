import { useState, useEffect } from "react";
import { useToast } from "@/hooks/use-toast";
import { useLocalStorage } from "@/hooks/useLocalStorage";
import { newsApi } from "@/services/newsApi";
import { Article, NewsCard } from "./NewsCard";
import { SearchBar } from "./SearchBar";
import { CategoryFilter } from "./CategoryFilter";
import { RegionFilter } from "./RegionFilter";
import { NewsHeader } from "./NewsHeader";
import { ArticleDetail } from "./ArticleDetail";
import { LoadingSpinner, LoadingCard } from "./LoadingSpinner";

export const NewsApp = () => {
  const [articles, setArticles] = useState<Article[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState("all");
  const [activeRegion, setActiveRegion] = useState("all");
  const [selectedArticle, setSelectedArticle] = useState<Article | null>(null);
  const [showSearch, setShowSearch] = useState(false);
  const [showBookmarks, setShowBookmarks] = useState(false);
  const [savedArticles, setSavedArticles] = useLocalStorage<Article[]>("saved-articles", []);
  const { toast } = useToast();

  const categories = newsApi.getCategories();
  const regions = newsApi.getRegions();

  // Load articles on component mount and when filters change
  useEffect(() => {
    loadArticles();
  }, [activeCategory, activeRegion, searchQuery]);

  const loadArticles = async () => {
    try {
      setLoading(true);
      const fetchedArticles = await newsApi.getTopHeadlines(
        activeCategory === "all" ? undefined : activeCategory,
        searchQuery || undefined,
        activeRegion === "all" ? undefined : activeRegion
      );
      setArticles(fetchedArticles);
    } catch (error) {
      console.error("Error loading articles:", error);
      toast({
        title: "Error Loading News",
        description: "Failed to load articles. Please try again.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = (query: string) => {
    setSearchQuery(query);
    setActiveCategory("all"); // Reset category when searching
    if (query) {
      setShowSearch(false); // Hide search bar after searching
    }
  };

  const handleCategoryChange = (category: string) => {
    setActiveCategory(category);
    setSearchQuery(""); // Clear search when changing category
  };

  const handleRegionChange = (region: string) => {
    setActiveRegion(region);
    setSearchQuery(""); // Clear search when changing region
  };

  const handleSaveArticle = (article: Article) => {
    const newSavedArticles = [...savedArticles, article];
    setSavedArticles(newSavedArticles);
    toast({
      title: "Article Saved",
      description: "Article added to your bookmarks.",
    });
  };

  const handleRemoveArticle = (articleId: string) => {
    const newSavedArticles = savedArticles.filter(article => article.id !== articleId);
    setSavedArticles(newSavedArticles);
    toast({
      title: "Article Removed",
      description: "Article removed from bookmarks.",
    });
  };

  const isArticleSaved = (articleId: string) => {
    return savedArticles.some(article => article.id === articleId);
  };

  const displayArticles = showBookmarks ? savedArticles : articles;

  if (selectedArticle) {
    return (
      <ArticleDetail
        article={selectedArticle}
        onBack={() => setSelectedArticle(null)}
        onSave={handleSaveArticle}
        onRemove={handleRemoveArticle}
        isSaved={isArticleSaved(selectedArticle.id)}
      />
    );
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <NewsHeader
        onSearchToggle={() => setShowSearch(!showSearch)}
        onBookmarksToggle={() => setShowBookmarks(!showBookmarks)}
        showBookmarks={showBookmarks}
      />

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 py-8">
        {/* Search Bar */}
        {showSearch && (
          <div className="mb-8 slide-up">
            <SearchBar
              onSearch={handleSearch}
              defaultValue={searchQuery}
              placeholder="Search breaking news, technology, business..."
            />
          </div>
        )}

        {/* Region Filter */}
        {!showBookmarks && (
          <RegionFilter
            regions={regions}
            activeRegion={activeRegion}
            onRegionChange={handleRegionChange}
          />
        )}

        {/* Category Filter */}
        {!showBookmarks && (
          <CategoryFilter
            categories={categories}
            activeCategory={activeCategory}
            onCategoryChange={handleCategoryChange}
          />
        )}

        {/* Section Title */}
        <div className="mb-8">
          <h2 className="headline-secondary">
            {showBookmarks 
              ? `Your Bookmarks (${savedArticles.length})`
              : searchQuery 
                ? `Search Results for "${searchQuery}"`
                : (() => {
                    const regionText = activeRegion === "all" ? "" : 
                      activeRegion === "india" ? "Indian " : "Global ";
                    const categoryText = activeCategory === "all" ? 
                      "News" : `${activeCategory.charAt(0).toUpperCase() + activeCategory.slice(1)} News`;
                    return activeRegion === "all" && activeCategory === "all" 
                      ? "Latest News" 
                      : `${regionText}${categoryText}`;
                  })()
            }
          </h2>
          
          {(searchQuery || activeRegion !== "all" || activeCategory !== "all") && !showBookmarks && (
            <button
              onClick={() => {
                setSearchQuery("");
                setActiveRegion("all");
                setActiveCategory("all");
              }}
              className="text-sm text-muted-foreground hover:text-foreground mt-2 underline"
            >
              Clear all filters and show all news
            </button>
          )}
        </div>

        {/* Loading State */}
        {loading && !showBookmarks && (
          <div className="news-grid">
            {Array.from({ length: 6 }).map((_, index) => (
              <LoadingCard key={index} />
            ))}
          </div>
        )}

        {/* Empty States */}
        {!loading && displayArticles.length === 0 && (
          <div className="text-center py-16">
            <div className="max-w-md mx-auto">
              <h3 className="headline-tertiary mb-4">
                {showBookmarks 
                  ? "No Bookmarks Yet"
                  : searchQuery 
                    ? "No Results Found"
                    : "No Articles Available"
                }
              </h3>
              <p className="body-text mb-6">
                {showBookmarks 
                  ? "Start bookmarking articles you want to read later."
                  : searchQuery 
                    ? `No articles found for "${searchQuery}". Try different keywords.`
                    : "No articles are currently available. Please check back later."
                }
              </p>
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery("")}
                  className="btn-primary"
                >
                  Browse All News
                </button>
              )}
            </div>
          </div>
        )}

        {/* Articles Grid */}
        {!loading && displayArticles.length > 0 && (
          <div className="news-grid fade-in">
            {displayArticles.map((article) => (
              <NewsCard
                key={article.id}
                article={article}
                onSave={handleSaveArticle}
                onRemove={handleRemoveArticle}
                isSaved={isArticleSaved(article.id)}
                onClick={setSelectedArticle}
              />
            ))}
          </div>
        )}

        {/* Load More Button - Future Enhancement */}
        {!loading && !showBookmarks && displayArticles.length > 0 && (
          <div className="text-center mt-12">
            <button
              onClick={loadArticles}
              className="btn-secondary"
            >
              Refresh Articles
            </button>
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="bg-subtle border-t border-border mt-16">
        <div className="max-w-7xl mx-auto px-4 py-8">
          <div className="text-center">
            <p className="caption-text">
              NewsHub Pro - Professional news aggregation platform
            </p>
            <p className="caption-text mt-2">
              Built with React, TypeScript, and Tailwind CSS
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};