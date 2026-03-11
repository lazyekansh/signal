export const LoadingSpinner = () => (
  <div className="flex items-center justify-center py-16">
    <div className="w-6 h-6 rounded-full border-2 border-border border-t-primary animate-spin" />
  </div>
);

export const LoadingCard = () => (
  <div className="news-card animate-pulse">
    <div className="h-40 bg-muted/50" />
    <div className="p-4">
      <div className="flex justify-between mb-3">
        <div className="h-4 bg-muted/60 rounded-full w-24" />
        <div className="h-3 bg-muted/40 rounded w-12" />
      </div>
      <div className="h-3.5 bg-muted/60 rounded mb-2 w-full" />
      <div className="h-3.5 bg-muted/60 rounded mb-4 w-4/5" />
      <div className="h-3 bg-muted/40 rounded mb-1.5 w-full" />
      <div className="h-3 bg-muted/40 rounded mb-4 w-3/5" />
      <div className="pt-3 border-t border-border/40 flex justify-between">
        <div className="h-3 bg-muted/40 rounded w-14" />
        <div className="h-3 bg-muted/40 rounded w-10" />
      </div>
    </div>
  </div>
);
