interface CategoryFilterProps {
  categories: string[];
  activeCategory: string;
  onCategoryChange: (category: string) => void;
}

export const CategoryFilter = ({ categories, activeCategory, onCategoryChange }: CategoryFilterProps) => {
  const all = ["all", ...categories];
  return (
    <div className="flex flex-wrap gap-1.5">
      {all.map((cat) => (
        <button
          key={cat}
          onClick={() => onCategoryChange(cat)}
          className={`category-pill ${activeCategory === cat ? "active" : ""}`}
        >
          {cat === "all" ? "All" : cat.charAt(0).toUpperCase() + cat.slice(1)}
        </button>
      ))}
    </div>
  );
};
