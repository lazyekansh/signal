export const LoadingSpinner = () => {
  return (
    <div className="flex items-center justify-center py-12">
      <div className="relative">
        <div className="w-12 h-12 rounded-full border-4 border-muted border-t-primary animate-spin"></div>
        <div className="absolute inset-0 w-12 h-12 rounded-full border-4 border-transparent border-t-accent animate-spin animate-reverse opacity-50"></div>
      </div>
    </div>
  );
};

export const LoadingCard = () => {
  return (
    <div className="news-card animate-pulse">
      <div className="h-48 bg-muted rounded-t-lg"></div>
      <div className="p-5">
        <div className="flex justify-between items-center mb-3">
          <div className="h-6 bg-muted rounded-full w-24"></div>
          <div className="h-4 bg-muted rounded w-16"></div>
        </div>
        <div className="h-6 bg-muted rounded mb-3 w-full"></div>
        <div className="h-6 bg-muted rounded mb-3 w-3/4"></div>
        <div className="h-4 bg-muted rounded mb-4 w-full"></div>
        <div className="h-4 bg-muted rounded mb-4 w-2/3"></div>
        <div className="flex justify-between items-center">
          <div className="h-8 bg-muted rounded w-32"></div>
          <div className="h-6 bg-muted rounded-full w-20"></div>
        </div>
      </div>
    </div>
  );
};