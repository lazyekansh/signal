import { Search, Bookmark, Rss, ExternalLink } from "lucide-react";
import { ThemeToggle } from "./ThemeToggle";

interface NewsHeaderProps {
  onSearchToggle: () => void;
  onBookmarksToggle: () => void;
  showBookmarks: boolean;
}

export const NewsHeader = ({
  onSearchToggle,
  onBookmarksToggle,
  showBookmarks,
}: NewsHeaderProps) => {
  return (
    <header className="border-b border-border/60">
      {/* Top utility bar */}
      <div className="border-b border-border/40" style={{ background: 'hsl(220 14% 9%)' }}>
        <div className="max-w-7xl mx-auto px-5 py-1.5 flex items-center justify-between">
          <span className="text-xs font-mono text-muted-foreground/60">
            {new Date().toLocaleDateString("en-US", { weekday: "short", month: "short", day: "numeric", year: "numeric" })}
          </span>
          <a
            href="https://ek4nsh.in"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1 text-xs font-mono text-muted-foreground/60 hover:text-muted-foreground transition-colors"
          >
            @lazyekansh
            <ExternalLink className="h-2.5 w-2.5" />
          </a>
        </div>
      </div>

      {/* Main nav */}
      <div style={{ background: 'hsl(220 14% 11%)' }}>
        <div className="max-w-7xl mx-auto px-5 py-3 flex items-center justify-between">
          {/* Logo */}
          <div className="flex items-center gap-2.5">
            <div className="w-7 h-7 rounded flex items-center justify-center border border-border/60" style={{ background: 'hsl(214 40% 14%)' }}>
              <Rss className="h-3.5 w-3.5 text-primary" />
            </div>
            <div>
              <span className="text-base font-semibold text-foreground tracking-tight">Signal</span>
              <span className="text-xs text-muted-foreground font-mono ml-2 opacity-60">news</span>
            </div>
          </div>

          {/* Actions */}
          <div className="flex items-center gap-1">
            <button
              onClick={onSearchToggle}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded text-xs text-muted-foreground hover:text-foreground hover:bg-secondary/60 transition-all border border-transparent hover:border-border/40"
            >
              <Search className="h-3.5 w-3.5" />
              Search
            </button>

            <button
              onClick={onBookmarksToggle}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded text-xs transition-all border ${
                showBookmarks
                  ? "text-primary bg-primary-light border-primary/20"
                  : "text-muted-foreground hover:text-foreground hover:bg-secondary/60 border-transparent hover:border-border/40"
              }`}
            >
              <Bookmark className="h-3.5 w-3.5" />
              Saved
            </button>

            <div className="w-px h-4 bg-border/60 mx-1" />
            <ThemeToggle />
          </div>
        </div>
      </div>

      {/* Hero — minimal, no hero image */}
      <div className="relative overflow-hidden" style={{ background: 'hsl(220 14% 11%)' }}>
        {/* Subtle background grid */}
        <div
          className="absolute inset-0 pointer-events-none opacity-[0.025]"
          style={{
            backgroundImage:
              "linear-gradient(hsl(214 60% 65%) 1px, transparent 1px), linear-gradient(90deg, hsl(214 60% 65%) 1px, transparent 1px)",
            backgroundSize: "48px 48px",
          }}
        />
        <div className="max-w-7xl mx-auto px-5 py-10 relative">
          <div className="max-w-xl">
            <div className="flex items-center gap-2 mb-3">
              <span className="inline-block w-1.5 h-1.5 rounded-full bg-green-500" />
              <span className="text-xs font-mono text-muted-foreground tracking-widest uppercase opacity-70">
                Live · Indian & Global
              </span>
            </div>
            <h1 className="text-3xl md:text-4xl font-bold text-foreground leading-tight mb-2" style={{ letterSpacing: '-0.025em' }}>
              Your daily news feed.
            </h1>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Curated from India's top sources and global publishers — filtered, fast, and clean.
            </p>
          </div>
        </div>
      </div>
    </header>
  );
};
