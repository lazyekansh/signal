# 📰 NewsHub Pro - Professional News Aggregation Platform

A modern, professional news web application built with TypeScript, React, and cutting-edge web technologies. Featuring intelligent news aggregation, advanced filtering, bookmarking, and a beautiful responsive design inspired by Apple News and Google News.

![NewsHub Pro](src/assets/news-hero.jpg)

## ✨ Features

### 🔥 Core Features
- **Professional News Feed**: Elegant card-based layout with high-quality images
- **Smart Search**: Real-time search across headlines, descriptions, and sources
- **Category Filtering**: Technology, Business, Health, Sports, Environment, and more
- **Article Bookmarking**: Save articles locally with persistent storage
- **Detailed Article Views**: Full-screen reading experience with rich metadata
- **Responsive Design**: Perfect on mobile, tablet, and desktop

### 🎨 Design & UX
- **Apple News Inspired**: Clean typography and generous whitespace
- **Professional Color Palette**: Sophisticated blues and grays
- **Dark/Light Mode**: Seamless theme switching with system preference detection
- **Smooth Animations**: Fade-in effects, hover states, and micro-interactions
- **Loading States**: Beautiful skeleton screens and loading indicators

### ⚡ Performance & Tech
- **TypeScript**: Full type safety and developer experience
- **Modern React**: Hooks, context, and best practices
- **Tailwind CSS**: Utility-first styling with custom design system
- **Vite**: Lightning-fast development and optimized builds
- **Local Storage**: Persistent bookmarks and theme preferences

## 🚀 Quick Start

### Prerequisites
- Node.js 16+ and npm
- Modern web browser

### Installation & Development

```bash
# Make scripts executable
chmod +x install.sh dev.sh build.sh

# Install dependencies
./install.sh

# Start development server
./dev.sh

# Build for production
./build.sh
```

### Using Perl Log Parser
```bash
# Make executable
chmod +x log-parser.pl

# Basic usage
perl log-parser.pl

# With detailed API statistics
perl log-parser.pl --api-stats --verbose

# Custom log file
perl log-parser.pl --file=custom.log
```

## 📁 Project Structure

```
src/
├── components/           # React components
│   ├── NewsApp.tsx      # Main application component
│   ├── NewsCard.tsx     # Article card component
│   ├── NewsHeader.tsx   # Hero header with navigation
│   ├── SearchBar.tsx    # Search functionality
│   ├── CategoryFilter.tsx # Category filtering
│   ├── ArticleDetail.tsx # Full article view
│   ├── ThemeToggle.tsx  # Dark/light mode toggle
│   └── LoadingSpinner.tsx # Loading states
├── services/            # API and data services
│   └── newsApi.ts      # News API integration
├── hooks/              # Custom React hooks
│   ├── useLocalStorage.ts # Persistent storage
│   └── use-toast.ts    # Toast notifications
├── assets/             # Images and static files
└── pages/              # Route components

# Automation Scripts
install.sh              # Dependency installation
dev.sh                 # Development server
build.sh              # Production build
log-parser.pl         # Perl log analysis utility
```

## 🔧 Configuration

### News API Integration

The app currently uses mock data for demonstration. To connect to a real News API:

1. **Get API Key**: Sign up at [NewsAPI.org](https://newsapi.org/)
2. **Store Securely**: 
   - With Supabase: Use the secrets management feature
   - Frontend-only: Store in localStorage (not recommended for production)
3. **Update Service**: Replace mock implementation in `src/services/newsApi.ts`

```typescript
// Example real API integration
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
    
    const response = await fetch(`${BASE_URL}/top-headlines?${params}`);
    return response.json();
  }
};
```

### Customization

#### Design System
All colors, fonts, and styles are defined in `src/index.css` and `tailwind.config.ts`:

```css
/* Custom brand colors */
--primary: 214 100% 25%;        /* Professional blue */
--primary-hover: 214 100% 20%;  /* Darker blue for interactions */
--accent: 214 100% 70%;         /* Light accent for dark mode */
```

#### Categories
Update available news categories in `src/services/newsApi.ts`:

```typescript
const categories = ["technology", "business", "health", "sports", "science"];
```

## 🛠 Development Scripts

| Script | Purpose | Usage |
|--------|---------|-------|
| `install.sh` | Install all dependencies | `./install.sh` |
| `dev.sh` | Start development server | `./dev.sh` |
| `build.sh` | Build for production | `./build.sh` |
| `log-parser.pl` | Analyze server logs | `perl log-parser.pl --help` |

## 📊 Log Analysis with Perl

The included Perl script provides powerful log analysis:

- **API Call Tracking**: Count and categorize API requests
- **Status Code Analysis**: Monitor error rates and response patterns
- **IP Address Statistics**: Track user activity and potential issues
- **Endpoint Performance**: Identify popular features and bottlenecks

## 🎯 SEO & Performance

### Built-in SEO Features
- Semantic HTML structure with proper headings hierarchy
- Meta tags for social sharing (Open Graph, Twitter Cards)
- Descriptive alt text for all images
- Clean, crawlable URLs
- Mobile-optimized viewport settings
- Canonical URLs for duplicate content prevention

### Performance Optimizations
- Lazy loading for images
- Efficient React rendering with proper keys
- Tailwind CSS purging for minimal bundle size
- Vite's optimized build pipeline
- Local storage for reduced API calls

## 🚀 Deployment

### Build Output
```bash
./build.sh
# Creates ./dist/ folder ready for deployment
```

### Deployment Options
- **Static Hosting**: Netlify, Vercel, GitHub Pages
- **CDN**: AWS CloudFront, Cloudflare
- **Traditional Hosting**: Any web server with static file support

### Environment Variables
For production deployment with real APIs:
- `VITE_NEWS_API_KEY`: Your NewsAPI.org key
- `VITE_API_BASE_URL`: API base URL
- `VITE_APP_URL`: Your app's URL for canonical tags

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/amazing-feature`
3. Make your changes following the existing code style
4. Test thoroughly: `npm run build && npm run dev`
5. Commit with clear messages: `git commit -m 'Add amazing feature'`
6. Push and create a Pull Request

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

## 🏆 Technical Highlights

- **Type Safety**: 100% TypeScript with strict mode
- **Modern React**: Functional components with hooks
- **Design System**: Consistent, themeable design tokens
- **Accessibility**: Semantic HTML and ARIA labels
- **Performance**: Optimized images and efficient rendering
- **Cross-platform**: Shell scripts for Unix/Linux/macOS

## 📞 Support

Need help or have questions? 

- 📖 Check the inline code documentation
- 🐛 Report issues on GitHub
- 💡 Feature requests welcome
- 📧 Contact: developer@newshub-pro.dev

---

**Built with ❤️ using React, TypeScript, Tailwind CSS, and modern web standards.**