import { useState } from "react";
import { Search, X } from "lucide-react";

interface SearchBarProps {
  onSearch: (query: string) => void;
  defaultValue?: string;
  placeholder?: string;
}

export const SearchBar = ({ onSearch, defaultValue = "", placeholder = "Search…" }: SearchBarProps) => {
  const [query, setQuery] = useState(defaultValue);

  const handleSubmit = (e: React.FormEvent) => { e.preventDefault(); onSearch(query.trim()); };
  const handleClear = () => { setQuery(""); onSearch(""); };

  return (
    <form onSubmit={handleSubmit}>
      <div className="flex items-center gap-2 bg-card border border-border/60 rounded px-3.5 py-2.5 focus-within:border-primary/40 transition-colors">
        <Search className="h-3.5 w-3.5 text-muted-foreground shrink-0" />
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder={placeholder}
          className="flex-1 bg-transparent text-sm text-foreground placeholder:text-muted-foreground outline-none"
        />
        {query && (
          <button type="button" onClick={handleClear} className="text-muted-foreground hover:text-foreground transition-colors">
            <X className="h-3.5 w-3.5" />
          </button>
        )}
        <button
          type="submit"
          className="text-xs px-2.5 py-1 rounded border border-border/60 text-muted-foreground hover:text-foreground hover:border-primary/30 transition-all shrink-0"
          style={{ fontFamily: 'var(--font-mono)' }}
        >
          Search
        </button>
      </div>
    </form>
  );
};
