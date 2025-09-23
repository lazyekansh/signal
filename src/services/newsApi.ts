import { Article } from "@/components/NewsCard";

// Mock news data for demonstration
const mockArticles: Article[] = [
  {
    id: "1",
    title: "Revolutionary AI Technology Transforms Healthcare Industry",
    description: "New artificial intelligence systems are revolutionizing patient care and medical diagnosis, leading to better outcomes and reduced costs across the healthcare sector.",
    url: "https://example.com/ai-healthcare",
    urlToImage: "https://images.unsplash.com/photo-1559757148-5c350d0d3c56?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
    publishedAt: "2024-01-20T10:30:00Z",
    source: { name: "TechNews Today" },
    category: "technology"
  },
  {
    id: "2",
    title: "Global Climate Summit Reaches Landmark Agreement",
    description: "World leaders unite on comprehensive climate action plan, setting ambitious targets for carbon reduction and renewable energy adoption.",
    url: "https://example.com/climate-summit",
    urlToImage: "https://images.unsplash.com/photo-1569163139394-de4e4f43e4e5?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
    publishedAt: "2024-01-20T08:15:00Z",
    source: { name: "Global News Network" },
    category: "environment"
  },
  {
    id: "3",
    title: "Stock Markets Surge Following Economic Recovery Signals",
    description: "Major indices hit record highs as investors respond positively to strong employment data and corporate earnings reports.",
    url: "https://example.com/market-surge",
    urlToImage: "https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
    publishedAt: "2024-01-20T06:45:00Z",
    source: { name: "Financial Times" },
    category: "business"
  },
  {
    id: "4",
    title: "Breakthrough in Quantum Computing Achieved by Research Team",
    description: "Scientists demonstrate practical quantum computer capable of solving complex problems faster than traditional supercomputers.",
    url: "https://example.com/quantum-breakthrough",
    urlToImage: "https://images.unsplash.com/photo-1635070041078-e363dbe005cb?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
    publishedAt: "2024-01-19T22:30:00Z",
    source: { name: "Science Daily" },
    category: "technology"
  },
  {
    id: "5",
    title: "Olympic Games Set New Standards for Sustainability",
    description: "This year's Olympic Games showcase innovative green technologies and achieve carbon-neutral operations through renewable energy initiatives.",
    url: "https://example.com/olympic-sustainability",
    urlToImage: "https://images.unsplash.com/photo-1461896836934-ffe607ba8211?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
    publishedAt: "2024-01-19T18:20:00Z",
    source: { name: "Sports Illustrated" },
    category: "sports"
  },
  {
    id: "6",
    title: "New Medical Treatment Shows Promise for Alzheimer's Disease",
    description: "Clinical trials reveal significant improvement in cognitive function for patients treated with innovative gene therapy approach.",
    url: "https://example.com/alzheimers-treatment",
    urlToImage: "https://images.unsplash.com/photo-1559757175-0eb30cd8c063?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
    publishedAt: "2024-01-19T14:10:00Z",
    source: { name: "Medical Journal" },
    category: "health"
  }
];

const categories = ["technology", "business", "health", "sports", "environment"];

// Simulate API delay
const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

export const newsApi = {
  // Fetch latest news articles
  getTopHeadlines: async (category?: string, searchQuery?: string): Promise<Article[]> => {
    await delay(1000); // Simulate network delay
    
    let filteredArticles = [...mockArticles];
    
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
    
    return filteredArticles;
  },

  // Get available categories
  getCategories: (): string[] => {
    return categories;
  },

  // Search articles
  searchArticles: async (query: string): Promise<Article[]> => {
    await delay(800);
    
    const searchQuery = query.toLowerCase();
    return mockArticles.filter(
      article =>
        article.title.toLowerCase().includes(searchQuery) ||
        article.description.toLowerCase().includes(searchQuery) ||
        article.source.name.toLowerCase().includes(searchQuery)
    );
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