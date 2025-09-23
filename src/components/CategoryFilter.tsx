interface CategoryFilterProps {
  categories: string[];
  activeCategory: string;
  onCategoryChange: (category: string) => void;
}

export const CategoryFilter = ({
  categories,
  activeCategory,
  onCategoryChange,
}: CategoryFilterProps) => {
  const allCategories = ["all", ...categories];

  return (
    <div className="flex flex-wrap gap-3 justify-center mb-8">
      {allCategories.map((category) => {
        const isActive = activeCategory === category;
        const displayName = category === "all" ? "All News" : 
          category.charAt(0).toUpperCase() + category.slice(1);

        return (
          <button
            key={category}
            onClick={() => onCategoryChange(category)}
            className={`category-pill ${isActive ? "active" : ""}`}
          >
            {displayName}
          </button>
        );
      })}
    </div>
  );
};