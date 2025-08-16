import React, { useState } from 'react';
import { ArrowLeft, Calendar, MapPin, Clock, ExternalLink } from 'lucide-react';

interface News {
  id: number;
  title: string;
  excerpt: string;
  image: string;
  date: string;
  location: string;
  readTime: string;
  category: string;
}

const NewsPage: React.FC = () => {
  const [newsArticles] = useState<News[]>([
    {
      id: 1,
      title: 'Emergency Aid for Cianjur Earthquake Victims Continues to Arrive',
      excerpt: 'Volunteer teams and logistical aid continue to flow to earthquake-affected areas in Cianjur.',
      image: 'https://images.pexels.com/photos/6995253/pexels-photo-6995253.jpeg?auto=compress&cs=tinysrgb&w=800',
      date: '2024-01-15',
      location: 'Cianjur, West Java',
      readTime: '3 min read',
      category: 'Emergency'
    },
    {
      id: 2,
      title: 'New Education Program Launched for Remote Areas',
      excerpt: 'A comprehensive education initiative brings quality learning opportunities to children in isolated regions.',
      image: 'https://images.pexels.com/photos/5212345/pexels-photo-5212345.jpeg?auto=compress&cs=tinysrgb&w=800',
      date: '2024-01-14',
      location: 'Papua, Indonesia',
      readTime: '5 min read',
      category: 'Education'
    },
    {
      id: 3,
      title: 'Clean Water Initiative Reaches 1000 Families',
      excerpt: 'Our water purification project has successfully provided clean drinking water to communities in need.',
      image: 'https://images.pexels.com/photos/4273459/pexels-photo-4273459.jpeg?auto=compress&cs=tinysrgb&w=800',
      date: '2024-01-13',
      location: 'Central Java',
      readTime: '4 min read',
      category: 'Health'
    }
  ]);

  // News loads instantly with static data

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'Emergency':
        return 'bg-red-500';
      case 'Education':
        return 'bg-blue-500';
      case 'Health':
        return 'bg-green-500';
      case 'Environment':
        return 'bg-emerald-500';
      default:
        return 'bg-gray-500';
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <button
              onClick={() => window.history.back()}
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
        {newsArticles[0] && (<div className="mb-8">
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
        </div>)}

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

                <button className="inline-flex items-center gap-1 text-green-600 hover:text-green-700 text-sm font-medium transition-colors">
                  Read More
                  <ExternalLink className="w-3 h-3" />
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Load More Button */}
        <div className="text-center mt-12">
          <button className="bg-white text-gray-700 px-8 py-3 rounded-full border border-gray-300 hover:bg-gray-50 transition-colors font-medium">
            Load More Articles
          </button>
        </div>

        {/* Newsletter Signup */}
        <div className="bg-green-600 rounded-2xl p-8 text-white text-center mt-12">
          <h2 className="text-2xl font-bold mb-2">Stay Updated</h2>
          <p className="text-green-100 mb-6">
            Get the latest news and updates about our humanitarian efforts delivered to your inbox.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
            <input
              type="email"
              placeholder="Enter your email"
              className="flex-1 px-4 py-3 rounded-full text-gray-900 focus:outline-none focus:ring-2 focus:ring-white"
            />
            <button className="bg-white text-green-600 px-6 py-3 rounded-full font-semibold hover:bg-gray-100 transition-colors">
              Subscribe
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NewsPage;
