import { Article } from "@/components/NewsCard";

// Professional news data with comprehensive Indian and international coverage
const mockArticles: Article[] = [
  // Indian Technology News
  {
    id: "in-1",
    title: "India's UPI Transactions Cross 10 Billion Monthly Mark, Revolutionizing Digital Payments",
    description: "The Unified Payments Interface processes record-breaking transactions, cementing India's position as a global leader in digital payment innovation with over 350 million active users.",
    url: "https://example.com/upi-milestone",
    urlToImage: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
    publishedAt: "2024-01-23T09:30:00Z",
    source: { name: "Economic Times" },
    category: "technology",
    region: "india"
  },
  {
    id: "in-2",
    title: "IIT Bombay Develops Revolutionary Solar Cell Technology with 40% Efficiency",
    description: "Indian researchers achieve breakthrough in perovskite solar cell technology, potentially transforming renewable energy landscape with commercial applications expected by 2025.",
    url: "https://example.com/iit-solar-breakthrough",
    urlToImage: "https://images.unsplash.com/photo-1509391366360-2e959784a276?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
    publishedAt: "2024-01-23T08:15:00Z",
    source: { name: "The Hindu" },
    category: "technology",
    region: "india"
  },
  
  // Indian Business News
  {
    id: "in-3",
    title: "Tata Group Announces ₹1.2 Lakh Crore Investment in Green Energy and Electric Vehicles",
    description: "India's largest conglomerate commits massive investment towards sustainable technology, including battery manufacturing facilities and charging infrastructure across the country.",
    url: "https://example.com/tata-green-investment",
    urlToImage: "https://images.unsplash.com/photo-1617788138017-80ad40651399?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
    publishedAt: "2024-01-23T07:45:00Z",
    source: { name: "Business Standard" },
    category: "business",
    region: "india"
  },
  {
    id: "in-4",
    title: "India Becomes World's 5th Largest Economy, GDP Crosses $3.7 Trillion",
    description: "Strong domestic consumption and manufacturing growth propel India ahead of UK, with projections to become 3rd largest economy by 2030 amid robust policy reforms.",
    url: "https://example.com/india-5th-economy",
    urlToImage: "https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
    publishedAt: "2024-01-23T06:30:00Z",
    source: { name: "Mint" },
    category: "business",
    region: "india"
  },
  
  // Indian Sports News
  {
    id: "in-5",
    title: "India Clinches Historic Series Victory Against Australia in Cricket World Championship",
    description: "Team India's exceptional bowling performance and captain's leadership secure decisive win in Adelaide, marking the team's dominance in international cricket.",
    url: "https://example.com/india-cricket-victory",
    urlToImage: "https://images.unsplash.com/photo-1540747913346-19e32dc3e97e?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
    publishedAt: "2024-01-22T22:20:00Z",
    source: { name: "Cricbuzz" },
    category: "sports",
    region: "india"
  },
  {
    id: "in-6",
    title: "Neeraj Chopra Breaks Asian Record at Diamond League, Eyes Paris Olympics Gold",
    description: "India's javelin champion achieves personal best of 89.94m at Brussels Diamond League, setting new Asian record and building momentum for upcoming Olympics.",
    url: "https://example.com/neeraj-record",
    urlToImage: "https://images.unsplash.com/photo-1461896836934-ffe607ba8211?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
    publishedAt: "2024-01-22T20:15:00Z",
    source: { name: "Times of India Sports" },
    category: "sports",
    region: "india"
  },
  
  // Indian Health News
  {
    id: "in-7",
    title: "AIIMS Delhi Pioneers Gene Therapy Treatment for Sickle Cell Disease",
    description: "All India Institute of Medical Sciences successfully treats 50 patients using indigenous gene editing technology, offering hope to millions affected by genetic disorders.",
    url: "https://example.com/aiims-gene-therapy",
    urlToImage: "https://images.unsplash.com/photo-1559757175-0eb30cd8c063?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
    publishedAt: "2024-01-22T18:30:00Z",
    source: { name: "Indian Express" },
    category: "health",
    region: "india"
  },
  {
    id: "in-8",
    title: "India Launches National Digital Health Mission, 600 Million Citizens Enrolled",
    description: "Ayushman Bharat Digital Mission achieves milestone enrollment, creating world's largest digital health ecosystem with unified health records and telemedicine access.",
    url: "https://example.com/digital-health-mission",
    urlToImage: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1f?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
    publishedAt: "2024-01-22T16:45:00Z",
    source: { name: "NDTV Health" },
    category: "health",
    region: "india"
  },
  
  // Indian Environment News
  {
    id: "in-9",
    title: "India Achieves 40% Renewable Energy Target Ahead of 2030 Deadline",
    description: "National Solar Mission and wind energy projects propel India to early achievement of climate goals, with 180 GW renewable capacity now operational across the country.",
    url: "https://example.com/renewable-target",
    urlToImage: "https://images.unsplash.com/photo-1569163139394-de4e4f43e4e5?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
    publishedAt: "2024-01-22T14:20:00Z",
    source: { name: "Down To Earth" },
    category: "environment",
    region: "india"
  },
  {
    id: "in-10",
    title: "Mumbai's Coastal Road Project Incorporates Mangrove Restoration Initiative",
    description: "Maharashtra government's ambitious infrastructure project successfully integrates environmental conservation, planting 100,000 mangroves while creating modern transport corridor.",
    url: "https://example.com/mumbai-mangroves",
    urlToImage: "https://images.unsplash.com/photo-1518837695005-2083093ee35b?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
    publishedAt: "2024-01-22T12:10:00Z",
    source: { name: "Mumbai Mirror" },
    category: "environment",
    region: "india"
  },
  
  // International News
  {
    id: "global-1",
    title: "Revolutionary AI Technology Transforms Global Healthcare Industry",
    description: "New artificial intelligence systems are revolutionizing patient care and medical diagnosis worldwide, leading to better outcomes and reduced costs across the healthcare sector.",
    url: "https://example.com/ai-healthcare",
    urlToImage: "https://images.unsplash.com/photo-1559757148-5c350d0d3c56?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
    publishedAt: "2024-01-20T10:30:00Z",
    source: { name: "TechCrunch" },
    category: "technology",
    region: "global"
  },
  {
    id: "global-2",
    title: "European Union Announces €1 Trillion Green Deal Investment Package",
    description: "Comprehensive climate action plan sets ambitious targets for carbon reduction and renewable energy adoption across 27 member nations by 2030.",
    url: "https://example.com/eu-green-deal",
    urlToImage: "https://images.unsplash.com/photo-1569163139394-de4e4f43e4e5?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
    publishedAt: "2024-01-20T08:15:00Z",
    source: { name: "Reuters" },
    category: "environment",
    region: "global"
  },
  {
    id: "global-3",
    title: "Wall Street Reaches New Heights as Tech Stocks Drive Market Rally",
    description: "Major US indices hit record highs as investors respond positively to strong quarterly earnings from technology giants and improved economic indicators.",
    url: "https://example.com/wall-street-rally",
    urlToImage: "https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
    publishedAt: "2024-01-20T06:45:00Z",
    source: { name: "Financial Times" },
    category: "business",
    region: "global"
  },
  {
    id: "global-4",
    title: "Breakthrough in Quantum Computing Achieved by MIT Research Team",
    description: "Scientists demonstrate practical quantum computer capable of solving complex problems 1000x faster than traditional supercomputers, opening new possibilities in drug discovery.",
    url: "https://example.com/quantum-breakthrough",
    urlToImage: "https://images.unsplash.com/photo-1635070041078-e363dbe005cb?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
    publishedAt: "2024-01-19T22:30:00Z",
    source: { name: "Nature" },
    category: "technology",
    region: "global"
  },
  {
    id: "global-5",
    title: "FIFA World Cup 2026 Preparations Showcase Sustainable Stadium Innovations",
    description: "North American host cities unveil eco-friendly venues powered by renewable energy, setting new standards for major sporting events with zero-waste operations.",
    url: "https://example.com/fifa-sustainability",
    urlToImage: "https://images.unsplash.com/photo-1461896836934-ffe607ba8211?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
    publishedAt: "2024-01-19T18:20:00Z",
    source: { name: "ESPN" },
    category: "sports",
    region: "global"
  },
  {
    id: "global-6",
    title: "WHO Approves Universal Malaria Vaccine After Successful African Trials",
    description: "World Health Organization endorses revolutionary vaccine showing 85% efficacy in preventing malaria, potentially saving 500,000 lives annually in endemic regions.",
    url: "https://example.com/malaria-vaccine",
    urlToImage: "https://images.unsplash.com/photo-1559757175-0eb30cd8c063?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
    publishedAt: "2024-01-19T14:10:00Z",
    source: { name: "The Lancet" },
    category: "health",
    region: "global"
  }
];

const categories = ["technology", "business", "health", "sports", "environment"];
const regions = ["all", "india", "global"];

// Simulate API delay
const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

export const newsApi = {
  // Fetch latest news articles with region and category filtering
  getTopHeadlines: async (category?: string, searchQuery?: string, region?: string): Promise<Article[]> => {
    await delay(1000); // Simulate network delay
    
    let filteredArticles = [...mockArticles];
    
    // Filter by region
    if (region && region !== "all") {
      filteredArticles = filteredArticles.filter(
        article => (article as any).region === region
      );
    }
    
    // Filter by category
    if (category && category !== "all") {
      filteredArticles = filteredArticles.filter(
        article => article.category === category
      );
    }
    
    // Filter by search query
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      filteredArticles = filteredArticles.filter(
        article =>
          article.title.toLowerCase().includes(query) ||
          article.description.toLowerCase().includes(query) ||
          article.source.name.toLowerCase().includes(query)
      );
    }
    
    // Sort by publication date (newest first)
    filteredArticles.sort((a, b) => 
      new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime()
    );
    
    return filteredArticles;
  },

  // Get available categories
  getCategories: (): string[] => {
    return categories;
  },

  // Get available regions
  getRegions: (): string[] => {
    return regions;
  },

  // Search articles with region support
  searchArticles: async (query: string, region?: string): Promise<Article[]> => {
    await delay(800);
    
    let searchResults = [...mockArticles];
    
    // Filter by region first if specified
    if (region && region !== "all") {
      searchResults = searchResults.filter(
        article => (article as any).region === region
      );
    }
    
    // Then filter by search query
    const searchQuery = query.toLowerCase();
    searchResults = searchResults.filter(
      article =>
        article.title.toLowerCase().includes(searchQuery) ||
        article.description.toLowerCase().includes(searchQuery) ||
        article.source.name.toLowerCase().includes(searchQuery)
    );
    
    // Sort by relevance and date
    return searchResults.sort((a, b) => 
      new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime()
    );
  },

  // Get Indian news specifically
  getIndianNews: async (category?: string): Promise<Article[]> => {
    return newsApi.getTopHeadlines(category, undefined, "india");
  },

  // Get global news specifically  
  getGlobalNews: async (category?: string): Promise<Article[]> => {
    return newsApi.getTopHeadlines(category, undefined, "global");
  }
};

// Instructions for connecting to real News API:
/*
To connect to a real News API (like NewsAPI.org):

1. Get API key from https://newsapi.org/
2. Store it in Supabase secrets or localStorage
3. Replace mock implementation with real API calls:

const API_KEY = 'your-api-key-here';
const BASE_URL = 'https://newsapi.org/v2';

export const newsApi = {
  getTopHeadlines: async (category?: string, searchQuery?: string) => {
    const params = new URLSearchParams({
      apiKey: API_KEY,
      country: 'us',
      pageSize: '20'
    });
    
    if (category && category !== 'all') {
      params.append('category', category);
    }
    
    if (searchQuery) {
      params.append('q', searchQuery);
    }
    
    const response = await fetch(`${BASE_URL}/top-headlines?${params}`);
    const data = await response.json();
    
    return data.articles.map((article: any, index: number) => ({
      id: `${Date.now()}-${index}`,
      title: article.title,
      description: article.description,
      url: article.url,
      urlToImage: article.urlToImage,
      publishedAt: article.publishedAt,
      source: article.source,
      category: category || 'general'
    }));
  }
};
*/