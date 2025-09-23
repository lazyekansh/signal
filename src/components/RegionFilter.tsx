interface RegionFilterProps {
  regions: string[];
  activeRegion: string;
  onRegionChange: (region: string) => void;
}

export const RegionFilter = ({
  regions,
  activeRegion,
  onRegionChange,
}: RegionFilterProps) => {
  const getRegionDisplay = (region: string) => {
    switch (region) {
      case "all":
        return "🌐 All News";
      case "india":
        return "🇮🇳 India";
      case "global":
        return "🌍 Global";
      default:
        return region.charAt(0).toUpperCase() + region.slice(1);
    }
  };

  const getRegionStyle = (region: string, isActive: boolean) => {
    const baseStyle = "category-pill transition-all duration-200";
    
    if (isActive) {
      switch (region) {
        case "india":
          return `${baseStyle} active bg-gradient-to-r from-orange-500 to-green-500 text-white shadow-lg transform scale-105`;
        case "global":
          return `${baseStyle} active bg-gradient-to-r from-blue-500 to-cyan-500 text-white shadow-lg transform scale-105`;
        default:
          return `${baseStyle} active`;
      }
    }
    
    return `${baseStyle} hover:shadow-md`;
  };

  return (
    <div className="flex flex-wrap gap-3 justify-center mb-6">
      {regions.map((region) => {
        const isActive = activeRegion === region;

        return (
          <button
            key={region}
            onClick={() => onRegionChange(region)}
            className={getRegionStyle(region, isActive)}
          >
            {getRegionDisplay(region)}
          </button>
        );
      })}
    </div>
  );
};