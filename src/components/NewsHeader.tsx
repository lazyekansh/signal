import { Newspaper, Search, Bookmark } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ThemeToggle } from "./ThemeToggle";
import heroImage from "@/assets/news-hero.jpg";

interface NewsHeaderProps {
  onSearchToggle: () => void;
  onBookmarksToggle: () => void;
  showBookmarks: boolean;
}

export const NewsHeader = ({ 
  onSearchToggle, 
  onBookmarksToggle, 
  showBookmarks 
}: NewsHeaderProps) => {
  return (
    <header className="relative">
      {/* Hero Section */}
      <div className="relative h-96 overflow-hidden bg-gradient-subtle">
        <img 
          src={heroImage}
          alt="Professional newsroom"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-primary/80 to-primary/40" />
        
        {/* Navigation */}
        <nav className="absolute top-0 left-0 right-0 z-10">
          <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="bg-white/10 backdrop-blur-sm rounded-lg p-2">
                <Newspaper className="h-6 w-6 text-white" />
              </div>
              <h1 className="text-2xl font-bold text-white">NewsHub Pro</h1>
            </div>
            
            <div className="flex items-center space-x-2">
              <Button
                variant="ghost"
                size="sm"
                onClick={onSearchToggle}
                className="text-white hover:bg-white/20 h-9"
              >
                <Search className="h-4 w-4 mr-2" />
                Search
              </Button>
              
              <Button
                variant="ghost"
                size="sm"
                onClick={onBookmarksToggle}
                className={`text-white hover:bg-white/20 h-9 ${
                  showBookmarks ? "bg-white/20" : ""
                }`}
              >
                <Bookmark className="h-4 w-4 mr-2" />
                Bookmarks
              </Button>
              
              <div className="bg-white/10 backdrop-blur-sm rounded-lg p-1">
                <ThemeToggle />
              </div>
            </div>
          </div>
        </nav>

        {/* Hero Content */}
        <div className="absolute inset-0 flex items-center justify-center text-center z-5">
          <div className="max-w-4xl mx-auto px-4">
            <h2 className="text-4xl md:text-6xl font-bold text-white mb-4 leading-tight">
              Stay Informed with
              <span className="block text-transparent bg-clip-text bg-gradient-to-r from-white to-white/80">
                Breaking News
              </span>
            </h2>
            <p className="text-xl md:text-2xl text-white/90 mb-8 leading-relaxed">
              Professional news aggregation with intelligent filtering and personalization
            </p>
          </div>
        </div>
      </div>
    </header>
  );
};