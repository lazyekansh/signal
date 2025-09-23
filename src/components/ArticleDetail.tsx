import { ArrowLeft, Clock, ExternalLink, Bookmark, BookmarkCheck, Share2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Article } from "./NewsCard";

interface ArticleDetailProps {
  article: Article;
  onBack: () => void;
  onSave: (article: Article) => void;
  onRemove: (articleId: string) => void;
  isSaved: boolean;
}

export const ArticleDetail = ({ 
  article, 
  onBack, 
  onSave, 
  onRemove, 
  isSaved 
}: ArticleDetailProps) => {
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const handleSaveToggle = () => {
    if (isSaved) {
      onRemove(article.id);
    } else {
      onSave(article);
    }
  };

  const handleShare = () => {
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

  return (
    <div className="max-w-4xl mx-auto px-4 py-8 fade-in">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <Button
          variant="ghost"
          onClick={onBack}
          className="hover:bg-muted p-2"
        >
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to News
        </Button>
        
        <div className="flex items-center gap-2">
          <Button
            variant="ghost"
            size="sm"
            onClick={handleSaveToggle}
            className="hover:bg-muted"
          >
            {isSaved ? (
              <BookmarkCheck className="h-4 w-4 mr-2 text-primary" />
            ) : (
              <Bookmark className="h-4 w-4 mr-2" />
            )}
            {isSaved ? "Saved" : "Save"}
          </Button>
          
          <Button
            variant="ghost"
            size="sm"
            onClick={handleShare}
            className="hover:bg-muted"
          >
            <Share2 className="h-4 w-4 mr-2" />
            Share
          </Button>
        </div>
      </div>

      <Card className="overflow-hidden">
        <CardContent className="p-0">
          {/* Hero Image */}
          {article.urlToImage && (
            <div className="relative h-64 md:h-96 overflow-hidden">
              <img
                src={article.urlToImage}
                alt={article.title}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
            </div>
          )}

          <div className="p-6 md:p-8">
            {/* Source and Date */}
            <div className="flex items-center justify-between mb-6">
              <span className="text-sm font-medium text-primary bg-primary-light px-4 py-2 rounded-full">
                {article.source.name}
              </span>
              <div className="flex items-center text-muted-foreground">
                <Clock className="h-4 w-4 mr-2" />
                <span className="text-sm">{formatDate(article.publishedAt)}</span>
              </div>
            </div>

            {/* Title */}
            <h1 className="headline-primary mb-6">
              {article.title}
            </h1>

            {/* Description */}
            {article.description && (
              <div className="prose prose-lg max-w-none mb-8">
                <p className="text-lg text-muted-foreground leading-relaxed">
                  {article.description}
                </p>
              </div>
            )}

            {/* Category */}
            {article.category && (
              <div className="mb-6">
                <span className="category-pill">
                  {article.category.charAt(0).toUpperCase() + article.category.slice(1)}
                </span>
              </div>
            )}

            {/* Read More Action */}
            <div className="pt-6 border-t border-border">
              <Button
                onClick={() => window.open(article.url, '_blank', 'noopener,noreferrer')}
                className="btn-primary"
              >
                Read Full Article on {article.source.name}
                <ExternalLink className="h-4 w-4 ml-2" />
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};