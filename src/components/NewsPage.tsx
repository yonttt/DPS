import React from 'react';
import { ArrowLeft, Calendar, MapPin, Clock, ExternalLink } from 'lucide-react';

interface NewsPageProps {
  onNavigate: (page: string) => void;
}

const NewsPage: React.FC<NewsPageProps> = ({ onNavigate }) => {
  const newsArticles = [
    {
      id: 1,
      title: 'Emergency Aid for Cianjur Earthquake Victims Continues to Arrive',
      excerpt: 'Volunteer teams and logistical aid continue to flow to earthquake-affected areas in Cianjur. More than 500 families have received basic assistance.',
      image: 'https://images.pexels.com/photos/6995253/pexels-photo-6995253.jpeg?auto=compress&cs=tinysrgb&w=800',
      date: '2024-01-15',
      location: 'Cianjur, Indonesia',
      readTime: '3 min',
      category: 'Natural Disaster'
    },
    {
      id: 2,
      title: 'School Rehabilitation Program in Lombok Reaches 80%',
      excerpt: 'Reconstruction of schools damaged by earthquakes in Lombok reaches 80% progress. Expected to be completed in the next 2 months.',
      image: 'https://images.pexels.com/photos/8197530/pexels-photo-8197530.jpeg?auto=compress&cs=tinysrgb&w=800',
      date: '2024-01-14',
      location: 'Lombok, Indonesia',
      readTime: '5 min',
      category: 'Education'
    },
    {
      id: 3,
      title: 'River Cleanup Action in Jakarta Involves 1000 Volunteers',
      excerpt: 'Community action to clean rivers in Jakarta successfully collected 5 tons of waste. Community participation was very enthusiastic.',
      image: 'https://images.pexels.com/photos/9324337/pexels-photo-9324337.jpeg?auto=compress&cs=tinysrgb&w=800',
      date: '2024-01-13',
      location: 'Jakarta, Indonesia',
      readTime: '4 min',
      category: 'Environment'
    },
    {
      id: 4,
      title: 'Free Medical Aid for Children in Remote Areas',
      excerpt: 'Volunteer medical teams provide free healthcare services for children in remote areas of Papua. More than 200 children have been examined.',
      image: 'https://images.pexels.com/photos/6303773/pexels-photo-6303773.jpeg?auto=compress&cs=tinysrgb&w=800',
      date: '2024-01-12',
      location: 'Papua, Indonesia',
      readTime: '6 min',
      category: 'Health'
    }
  ];

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      day: 'numeric',
      month: 'long',
      year: 'numeric'
    });
  };

  const getCategoryColor = (category: string) => {
    const colors = {
      'Natural Disaster': 'bg-red-500',
      'Education': 'bg-blue-500',
      'Environment': 'bg-green-500',
      'Health': 'bg-purple-500'
    };
    return colors[category as keyof typeof colors] || 'bg-gray-500';
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <button
              onClick={() => onNavigate('home')}
              className="flex items-center gap-2 text-gray-600 hover:text-gray-800 transition-colors"
            >
              <ArrowLeft className="w-5 h-5" />
              <span>Back</span>
            </button>
            
            <h1 className="text-xl font-bold text-gray-800">News & Updates</h1>
            
            <div className="w-20"></div> {/* Spacer for center alignment */}
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Featured Article */}
        <div className="mb-8">
          <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden">
            <div className="relative">
              <img
                src={newsArticles[0].image}
                alt={newsArticles[0].title}
                className="w-full h-64 md:h-80 object-cover"
              />
              <div className="absolute top-4 left-4">
                <span className={`${getCategoryColor(newsArticles[0].category)} text-white px-3 py-1 rounded-full text-sm font-medium`}>
                  Featured
                </span>
              </div>
            </div>
            
            <div className="p-6">
              <div className="flex items-center gap-4 text-gray-500 text-sm mb-3">
                <div className="flex items-center gap-1">
                  <Calendar className="w-4 h-4" />
                  <span>{formatDate(newsArticles[0].date)}</span>
                </div>
                <div className="flex items-center gap-1">
                  <MapPin className="w-4 h-4" />
                  <span>{newsArticles[0].location}</span>
                </div>
                <div className="flex items-center gap-1">
                  <Clock className="w-4 h-4" />
                  <span>{newsArticles[0].readTime}</span>
                </div>
              </div>
              
              <h2 className="text-2xl font-bold text-gray-800 mb-3">
                {newsArticles[0].title}
              </h2>
              
              <p className="text-gray-600 leading-relaxed mb-4">
                {newsArticles[0].excerpt}
              </p>
              
              <button className="inline-flex items-center gap-2 text-green-600 hover:text-green-700 font-medium transition-colors">
                Read More
                <ExternalLink className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>

        {/* News Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {newsArticles.slice(1).map((article) => (
            <div
              key={article.id}
              className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden hover:shadow-lg transition-all duration-300 hover:transform hover:scale-105 cursor-pointer"
            >
              <div className="relative">
                <img
                  src={article.image}
                  alt={article.title}
                  className="w-full h-48 object-cover"
                />
                <div className="absolute top-4 left-4">
                  <span className={`${getCategoryColor(article.category)} text-white px-3 py-1 rounded-full text-xs font-medium`}>
                    {article.category}
                  </span>
                </div>
              </div>
              
              <div className="p-6">
                <div className="flex items-center gap-4 text-gray-500 text-xs mb-3">
                  <div className="flex items-center gap-1">
                    <Calendar className="w-3 h-3" />
                    <span>{formatDate(article.date)}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Clock className="w-3 h-3" />
                    <span>{article.readTime}</span>
                  </div>
                </div>
                
                <h3 className="font-bold text-lg text-gray-800 mb-2 line-clamp-2">
                  {article.title}
                </h3>
                
                <p className="text-gray-600 text-sm leading-relaxed mb-4 line-clamp-3">
                  {article.excerpt}
                </p>
                
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1 text-gray-500 text-xs">
                    <MapPin className="w-3 h-3" />
                    <span>{article.location}</span>
                  </div>
                  
                  <button className="text-green-600 hover:text-green-700 text-sm font-medium transition-colors">
                    Read →
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Load More Button */}
        <div className="text-center mt-12">
          <button className="bg-white text-gray-700 px-8 py-3 rounded-full border border-gray-300 hover:bg-gray-50 transition-colors font-medium">
            Load More
          </button>
        </div>
      </div>
    </div>
  );
};

export default NewsPage;