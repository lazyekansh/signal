import { useState } from "react";
import { Clock, ExternalLink, Bookmark, BookmarkCheck, Share2 } from "lucide-react";

export interface Article {
  id: string;
  title: string;
  description: string;
  url: string;
  urlToImage: string;
  publishedAt: string;
  source: { name: string };
  category?: string;
  region?: string;
}

interface NewsCardProps {
  article: Article;
  onSave: (article: Article) => void;
  onRemove: (articleId: string) => void;
  isSaved: boolean;
  onClick: (article: Article) => void;
}

export const NewsCard = ({ article, onSave, onRemove, isSaved, onClick }: NewsCardProps) => {
  const [imageError, setImageError] = useState(false);

  const formatDate = (d: string) => {
    const date = new Date(d);
    const h = Math.floor((Date.now() - date.getTime()) / 3600000);
    if (h < 1) return "Just now";
    if (h < 24) return `${h}h ago`;
    const days = Math.floor(h / 24);
    if (days < 7) return `${days}d ago`;
    return date.toLocaleDateString();
  };

  const handleSave = (e: React.MouseEvent) => {
    e.stopPropagation();
    isSaved ? onRemove(article.id) : onSave(article);
  };

  const handleShare = (e: React.MouseEvent) => {
    e.stopPropagation();
    navigator.share
      ? navigator.share({ title: article.title, url: article.url })
      : navigator.clipboard.writeText(article.url);
  };

  const handleOpen = (e: React.MouseEvent) => {
    e.stopPropagation();
    window.open(article.url, "_blank", "noopener,noreferrer");
  };

  const hasImage = article.urlToImage && !imageError;

  return (
    <div className="news-card cursor-pointer group flex flex-col" onClick={() => onClick(article)}>
      {/* Image */}
      {hasImage ? (
        <div className="relative overflow-hidden h-40 flex-shrink-0">
          <img
            src={article.urlToImage}
            alt={article.title}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-[1.03]"
            style={{ filter: 'brightness(0.85) saturate(0.9)' }}
            onError={() => setImageError(true)}
            loading="lazy"
          />
          <div className="absolute inset-0" style={{ background: 'linear-gradient(to top, hsl(220 14% 13%) 0%, transparent 55%)' }} />

          {/* Hover actions */}
          <div className="absolute top-2.5 right-2.5 flex gap-1.5 opacity-0 group-hover:opacity-100 transition-opacity">
            <button
              onClick={handleSave}
              className="w-7 h-7 flex items-center justify-center rounded border border-white/15 hover:border-white/30 transition-colors"
              style={{ background: 'hsl(220 14% 10% / 0.75)', backdropFilter: 'blur(8px)' }}
            >
              {isSaved
                ? <BookmarkCheck className="h-3.5 w-3.5 text-primary" />
                : <Bookmark className="h-3.5 w-3.5 text-white/80" />}
            </button>
            <button
              onClick={handleShare}
              className="w-7 h-7 flex items-center justify-center rounded border border-white/15 hover:border-white/30 transition-colors"
              style={{ background: 'hsl(220 14% 10% / 0.75)', backdropFilter: 'blur(8px)' }}
            >
              <Share2 className="h-3.5 w-3.5 text-white/80" />
            </button>
          </div>

          {/* Region badge on image */}
          {article.region && (
            <div className="absolute bottom-2.5 left-2.5">
              <span className="text-xs px-1.5 py-0.5 rounded font-mono border border-white/10 text-white/70"
                style={{ background: 'hsl(220 14% 10% / 0.7)', backdropFilter: 'blur(6px)', fontSize: '0.68rem' }}>
                {article.region === "india" ? "🇮🇳 India" : "🌍 Global"}
              </span>
            </div>
          )}
        </div>
      ) : (
        /* No image: just a thin accent line */
        <div className="h-px flex-shrink-0" style={{ background: 'hsl(var(--border))' }} />
      )}

      {/* Body */}
      <div className="p-4 flex flex-col flex-1">
        {/* Meta row */}
        <div className="flex items-center justify-between mb-2.5">
          <span className="source-badge truncate">{article.source.name}</span>
          <div className="flex items-center gap-1 text-muted-foreground shrink-0 ml-2" style={{ fontSize: '0.7rem', fontFamily: 'var(--font-mono)' }}>
            <Clock className="h-3 w-3" />
            {formatDate(article.publishedAt)}
          </div>
        </div>

        {/* Title */}
        <h3 className="headline-tertiary mb-2 line-clamp-2 group-hover:text-primary transition-colors duration-150">
          {article.title}
        </h3>

        {/* Description */}
        {article.description && (
          <p className="body-text line-clamp-2 flex-1 mb-3">{article.description}</p>
        )}

        {/* Footer */}
        <div className="flex items-center justify-between mt-auto pt-3 border-t border-border/50">
          <button
            onClick={handleOpen}
            className="flex items-center gap-1 text-xs text-muted-foreground hover:text-foreground transition-colors"
            style={{ fontFamily: 'var(--font-mono)' }}
          >
            Read full
            <ExternalLink className="h-2.5 w-2.5" />
          </button>

          <div className="flex items-center gap-2">
            {article.category && (
              <span style={{ fontSize: '0.68rem', fontFamily: 'var(--font-mono)', color: 'hsl(var(--muted-foreground))', opacity: 0.7 }}>
                {article.category}
              </span>
            )}
            {(!hasImage) && (
              <button onClick={handleSave} className="text-muted-foreground hover:text-primary transition-colors">
                {isSaved
                  ? <BookmarkCheck className="h-3.5 w-3.5 text-primary" />
                  : <Bookmark className="h-3.5 w-3.5" />}
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
