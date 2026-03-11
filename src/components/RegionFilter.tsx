interface RegionFilterProps {
  regions: string[];
  activeRegion: string;
  onRegionChange: (region: string) => void;
}

export const RegionFilter = ({ regions, activeRegion, onRegionChange }: RegionFilterProps) => {
  const label = (r: string) => {
    if (r === "all") return "🌐 All";
    if (r === "india") return "🇮🇳 India";
    if (r === "global") return "🌍 Global";
    return r;
  };
  return (
    <div className="flex flex-wrap gap-1.5">
      {regions.map((r) => (
        <button
          key={r}
          onClick={() => onRegionChange(r)}
          className={`category-pill ${activeRegion === r ? "active" : ""}`}
        >
          {label(r)}
        </button>
      ))}
    </div>
  );
};
