import { ArrowLeft, Clock, ExternalLink, Bookmark, BookmarkCheck, Share2 } from "lucide-react";
import { Article } from "./NewsCard";

interface ArticleDetailProps {
  article: Article;
  onBack: () => void;
  onSave: (article: Article) => void;
  onRemove: (articleId: string) => void;
  isSaved: boolean;
}

export const ArticleDetail = ({ article, onBack, onSave, onRemove, isSaved }: ArticleDetailProps) => {
  const formatDate = (d: string) =>
    new Date(d).toLocaleDateString("en-US", { weekday: "long", year: "numeric", month: "long", day: "numeric", hour: "2-digit", minute: "2-digit" });

  const handleSave = () => isSaved ? onRemove(article.id) : onSave(article);
  const handleShare = () =>
    navigator.share
      ? navigator.share({ title: article.title, url: article.url })
      : navigator.clipboard.writeText(article.url);

  return (
    <div className="max-w-2xl mx-auto px-4 py-8 fade-in">
      {/* Back */}
      <div className="flex items-center justify-between mb-6">
        <button
          onClick={onBack}
          className="flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to feed
        </button>

        <div className="flex items-center gap-2">
          <button
            onClick={handleSave}
            className="flex items-center gap-1.5 text-xs px-3 py-1.5 rounded border border-border/60 text-muted-foreground hover:text-foreground hover:border-border transition-all"
            style={{ fontFamily: 'var(--font-mono)' }}
          >
            {isSaved ? <BookmarkCheck className="h-3.5 w-3.5 text-primary" /> : <Bookmark className="h-3.5 w-3.5" />}
            {isSaved ? "Saved" : "Save"}
          </button>
          <button
            onClick={handleShare}
            className="flex items-center gap-1.5 text-xs px-3 py-1.5 rounded border border-border/60 text-muted-foreground hover:text-foreground hover:border-border transition-all"
            style={{ fontFamily: 'var(--font-mono)' }}
          >
            <Share2 className="h-3.5 w-3.5" />
            Share
          </button>
        </div>
      </div>

      {/* Card */}
      <div className="news-card">
        {/* Image */}
        {article.urlToImage && (
          <div className="relative h-52 md:h-72 overflow-hidden">
            <img
              src={article.urlToImage}
              alt={article.title}
              className="w-full h-full object-cover"
              style={{ filter: 'brightness(0.8) saturate(0.85)' }}
            />
            <div className="absolute inset-0" style={{ background: 'linear-gradient(to top, hsl(220 14% 13%) 0%, transparent 50%)' }} />
          </div>
        )}

        <div className="p-6">
          {/* Meta */}
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <span className="source-badge">{article.source.name}</span>
              {article.region && (
                <span className="text-xs px-2 py-0.5 rounded border border-border/50 text-muted-foreground" style={{ fontFamily: 'var(--font-mono)', fontSize: '0.7rem' }}>
                  {article.region === "india" ? "🇮🇳 India" : "🌍 Global"}
                </span>
              )}
            </div>
            <div className="flex items-center gap-1 text-muted-foreground" style={{ fontSize: '0.72rem', fontFamily: 'var(--font-mono)' }}>
              <Clock className="h-3 w-3" />
              {formatDate(article.publishedAt)}
            </div>
          </div>

          {/* Title */}
          <h1 className="headline-primary mb-4">{article.title}</h1>

          {/* Description */}
          {article.description && (
            <p className="text-sm text-muted-foreground leading-relaxed mb-6">{article.description}</p>
          )}

          {/* Category */}
          {article.category && (
            <div className="mb-5">
              <span className="category-pill">{article.category.charAt(0).toUpperCase() + article.category.slice(1)}</span>
            </div>
          )}

          {/* CTA */}
          <div className="pt-5 border-t border-border/50">
            <button
              onClick={() => window.open(article.url, "_blank", "noopener,noreferrer")}
              className="btn-primary"
            >
              Read on {article.source.name}
              <ExternalLink className="h-3.5 w-3.5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
