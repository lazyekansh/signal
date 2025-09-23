import { useState } from "react";
import { Clock, ExternalLink, Bookmark, BookmarkCheck, Share2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

export interface Article {
  id: string;
  title: string;
  description: string;
  url: string;
  urlToImage: string;
  publishedAt: string;
  source: {
    name: string;
  };
  category?: string;
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

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffInMs = now.getTime() - date.getTime();
    const diffInHours = Math.floor(diffInMs / (1000 * 60 * 60));
    const diffInDays = Math.floor(diffInHours / 24);

    if (diffInHours < 1) {
      return "Just now";
    } else if (diffInHours < 24) {
      return `${diffInHours}h ago`;
    } else if (diffInDays < 7) {
      return `${diffInDays}d ago`;
    } else {
      return date.toLocaleDateString();
    }
  };

  const handleSaveToggle = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (isSaved) {
      onRemove(article.id);
    } else {
      onSave(article);
    }
  };

  const handleShare = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (navigator.share) {
      navigator.share({
        title: article.title,
        text: article.description,
        url: article.url,
      });
    } else {
      navigator.clipboard.writeText(article.url);
    }
  };

  const handleExternalLink = (e: React.MouseEvent) => {
    e.stopPropagation();
    window.open(article.url, '_blank', 'noopener,noreferrer');
  };

  return (
    <Card 
      className="news-card cursor-pointer group"
      onClick={() => onClick(article)}
    >
      <CardContent className="p-0">
        {/* Image Section */}
        {article.urlToImage && !imageError && (
          <div className="relative overflow-hidden rounded-t-lg">
            <img
              src={article.urlToImage}
              alt={article.title}
              className="w-full h-48 object-cover transition-transform duration-300 group-hover:scale-105"
              onError={() => setImageError(true)}
              loading="lazy"
            />
            <div className="absolute top-3 right-3 flex gap-2">
              <Button
                variant="secondary"
                size="sm"
                className="h-8 w-8 p-0 bg-white/90 hover:bg-white shadow-sm"
                onClick={handleSaveToggle}
              >
                {isSaved ? (
                  <BookmarkCheck className="h-4 w-4 text-primary" />
                ) : (
                  <Bookmark className="h-4 w-4" />
                )}
              </Button>
              <Button
                variant="secondary"
                size="sm"
                className="h-8 w-8 p-0 bg-white/90 hover:bg-white shadow-sm"
                onClick={handleShare}
              >
                <Share2 className="h-4 w-4" />
              </Button>
            </div>
          </div>
        )}

        {/* Content Section */}
        <div className="p-5">
          {/* Source and Time */}
          <div className="flex items-center justify-between mb-3">
            <span className="text-sm font-medium text-primary bg-primary-light px-3 py-1 rounded-full">
              {article.source.name}
            </span>
            <div className="flex items-center text-muted-foreground caption-text">
              <Clock className="h-3 w-3 mr-1" />
              <span>{formatDate(article.publishedAt)}</span>
            </div>
          </div>

          {/* Title */}
          <h3 className="headline-tertiary mb-3 line-clamp-2 group-hover:text-primary transition-colors">
            {article.title}
          </h3>

          {/* Description */}
          {article.description && (
            <p className="body-text mb-4 line-clamp-2">
              {article.description}
            </p>
          )}

          {/* Actions */}
          <div className="flex items-center justify-between">
            <Button
              variant="ghost"
              size="sm"
              className="text-primary hover:text-primary-hover hover:bg-primary-light p-0"
              onClick={handleExternalLink}
            >
              Read Full Article
              <ExternalLink className="h-3 w-3 ml-1" />
            </Button>
            
            {article.category && (
              <span className="category-pill text-xs">
                {article.category}
              </span>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};