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
import { LoadingCard } from "./LoadingSpinner";
import { RefreshCw } from "lucide-react";

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

  useEffect(() => { loadArticles(); }, [activeCategory, activeRegion, searchQuery]);

  const loadArticles = async () => {
    try {
      setLoading(true);
      const fetchedArticles = await newsApi.getTopHeadlines(
        activeCategory === "all" ? undefined : activeCategory,
        searchQuery || undefined,
        activeRegion === "all" ? undefined : activeRegion
      );
      setArticles(fetchedArticles);
    } catch {
      toast({ title: "Error", description: "Failed to load articles.", variant: "destructive" });
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = (q: string) => { setSearchQuery(q); setActiveCategory("all"); if (q) setShowSearch(false); };
  const handleCategory = (c: string) => { setActiveCategory(c); setSearchQuery(""); };
  const handleRegion = (r: string) => { setActiveRegion(r); setSearchQuery(""); };
  const handleSave = (a: Article) => { setSavedArticles([...savedArticles, a]); toast({ title: "Saved" }); };
  const handleRemove = (id: string) => { setSavedArticles(savedArticles.filter(a => a.id !== id)); toast({ title: "Removed" }); };
  const isSaved = (id: string) => savedArticles.some(a => a.id === id);

  const displayArticles = showBookmarks ? savedArticles : articles;

  const sectionTitle = () => {
    if (showBookmarks) return `Saved (${savedArticles.length})`;
    if (searchQuery) return `Results for "${searchQuery}"`;
    if (activeRegion !== "all" && activeCategory !== "all") return `${activeRegion} · ${activeCategory}`;
    if (activeRegion !== "all") return activeRegion === "india" ? "India" : "Global";
    if (activeCategory !== "all") return activeCategory.charAt(0).toUpperCase() + activeCategory.slice(1);
    return "Latest";
  };

  if (selectedArticle) {
    return (
      <ArticleDetail
        article={selectedArticle}
        onBack={() => setSelectedArticle(null)}
        onSave={handleSave}
        onRemove={handleRemove}
        isSaved={isSaved(selectedArticle.id)}
      />
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <NewsHeader
        onSearchToggle={() => setShowSearch(!showSearch)}
        onBookmarksToggle={() => setShowBookmarks(!showBookmarks)}
        showBookmarks={showBookmarks}
      />

      <main className="max-w-7xl mx-auto px-5 py-7">
        {/* Search */}
        {showSearch && (
          <div className="mb-5 slide-up">
            <SearchBar onSearch={handleSearch} defaultValue={searchQuery} placeholder="Search headlines…" />
          </div>
        )}

        {/* Filters */}
        {!showBookmarks && (
          <div className="flex flex-wrap items-center gap-x-6 gap-y-3 mb-5">
            <RegionFilter regions={regions} activeRegion={activeRegion} onRegionChange={handleRegion} />
            <div className="w-px h-4 bg-border/50 hidden sm:block" />
            <CategoryFilter categories={categories} activeCategory={activeCategory} onCategoryChange={handleCategory} />
          </div>
        )}

        {/* Section header */}
        <div className="flex items-center justify-between mb-5">
          <div className="flex items-center gap-2.5">
            <h2 className="text-sm font-semibold text-foreground">{sectionTitle()}</h2>
            {!loading && (
              <span className="text-xs text-muted-foreground font-mono opacity-60">
                {displayArticles.length} articles
              </span>
            )}
          </div>
          {(searchQuery || activeRegion !== "all" || activeCategory !== "all") && !showBookmarks && (
            <button
              onClick={() => { setSearchQuery(""); setActiveRegion("all"); setActiveCategory("all"); }}
              className="text-xs text-muted-foreground hover:text-foreground transition-colors font-mono"
            >
              Clear ×
            </button>
          )}
        </div>

        {/* Loading */}
        {loading && !showBookmarks && (
          <div className="news-grid">
            {Array.from({ length: 6 }).map((_, i) => <LoadingCard key={i} />)}
          </div>
        )}

        {/* Empty */}
        {!loading && displayArticles.length === 0 && (
          <div className="text-center py-20">
            <p className="text-sm text-muted-foreground">
              {showBookmarks ? "No saved articles yet." : searchQuery ? `No results for "${searchQuery}".` : "No articles available."}
            </p>
          </div>
        )}

        {/* Grid */}
        {!loading && displayArticles.length > 0 && (
          <div className="news-grid fade-in">
            {displayArticles.map((article) => (
              <NewsCard
                key={article.id}
                article={article}
                onSave={handleSave}
                onRemove={handleRemove}
                isSaved={isSaved(article.id)}
                onClick={setSelectedArticle}
              />
            ))}
          </div>
        )}

        {/* Refresh */}
        {!loading && !showBookmarks && displayArticles.length > 0 && (
          <div className="text-center mt-10">
            <button onClick={loadArticles} className="btn-secondary">
              <RefreshCw className="h-3.5 w-3.5" />
              Refresh
            </button>
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="border-t border-border/40 mt-16" style={{ background: 'hsl(220 14% 9%)' }}>
        <div className="max-w-7xl mx-auto px-5 py-5 flex flex-col sm:flex-row items-center justify-between gap-2">
          <span className="text-xs text-muted-foreground font-mono opacity-60">Signal · News Aggregator</span>
          <a
            href="https://ek4nsh.in"
            target="_blank"
            rel="noopener noreferrer"
            className="text-xs text-muted-foreground font-mono opacity-60 hover:opacity-100 hover:text-foreground transition-all"
          >
            @lazyekansh · ek4nsh.in
          </a>
        </div>
      </footer>
    </div>
  );
};
