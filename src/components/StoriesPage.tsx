import React from 'react';
import { ArrowLeft, Heart, MessageCircle, Share2, Calendar } from 'lucide-react';

interface StoriesPageProps {
  onNavigate: (page: string) => void;
}

const StoriesPage: React.FC<StoriesPageProps> = ({ onNavigate }) => {
  const stories = [
    {
      id: 1,
      author: 'Qurnia Ari Ruha and Wapnor Village',
      avatar: 'https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=100',
      date: '2024-01-15',
      content: 'Alhamdulillah, thanks to the help from all friends, now the residents of Wapnor Village can enjoy clean water every day. Thank you for all the incredible support! 🙏',
      image: 'https://images.pexels.com/photos/6647000/pexels-photo-6647000.jpeg?auto=compress&cs=tinysrgb&w=800',
      likes: 45,
      comments: 12,
      isLiked: false
    },
    {
      id: 2,
      author: 'Pulung Sulistiyo - Earthquake Volunteer',
      avatar: 'https://images.pexels.com/photos/1681010/pexels-photo-1681010.jpeg?auto=compress&cs=tinysrgb&w=100',
      date: '2024-01-14',
      content: 'Today we successfully distributed 200 aid packages for earthquake victims in Cianjur. Their spirit in facing this challenge is truly inspiring. Let\'s continue working for each other! ❤️',
      image: 'https://images.pexels.com/photos/6995470/pexels-photo-6995470.jpeg?auto=compress&cs=tinysrgb&w=800',
      likes: 78,
      comments: 25,
      isLiked: true
    },
    {
      id: 3,
      author: 'Elsa Indah Sari - Teacher at SDN 03',
      avatar: 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=100',
      date: '2024-01-13',
      content: 'Our school in Lombok is finally renovated! The children are very happy to be able to study in comfortable classrooms again. Thank you to all donors who helped make this happen 📚✨',
      image: 'https://images.pexels.com/photos/8197627/pexels-photo-8197627.jpeg?auto=compress&cs=tinysrgb&w=800',
      likes: 92,
      comments: 18,
      isLiked: true
    },
    {
      id: 4,
      author: 'Ahmad Supratman - RT 05 Chairman',
      avatar: 'https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?auto=compress&cs=tinysrgb&w=100',
      date: '2024-01-12',
      content: 'Yesterday\'s river cleanup successfully removed 5 tons of waste! Our environment is now cleaner and healthier. Proud of the incredible community spirit 🌱',
      image: 'https://images.pexels.com/photos/9324338/pexels-photo-9324338.jpeg?auto=compress&cs=tinysrgb&w=800',
      likes: 56,
      comments: 8,
      isLiked: false
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
            
            <h1 className="text-xl font-bold text-gray-800">Stories & Testimonials</h1>
            
            <div className="w-20"></div> {/* Spacer for center alignment */}
          </div>
        </div>
      </header>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Stories Feed */}
        <div className="space-y-6">
          {stories.map((story) => (
            <div
              key={story.id}
              className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden hover:shadow-md transition-shadow duration-200"
            >
              {/* Post Header */}
              <div className="p-6 pb-4">
                <div className="flex items-center gap-3">
                  <img
                    src={story.avatar}
                    alt={story.author}
                    className="w-12 h-12 rounded-full object-cover"
                  />
                  <div className="flex-1">
                    <h3 className="font-semibold text-gray-800">{story.author}</h3>
                    <div className="flex items-center gap-1 text-gray-500 text-sm">
                      <Calendar className="w-4 h-4" />
                      <span>{formatDate(story.date)}</span>
                    </div>
                  </div>
                  <button className="p-2 text-gray-400 hover:text-gray-600 transition-colors">
                    <Share2 className="w-5 h-5" />
                  </button>
                </div>
              </div>

              {/* Post Content */}
              <div className="px-6 pb-4">
                <p className="text-gray-700 leading-relaxed">{story.content}</p>
              </div>

              {/* Post Image */}
              {story.image && (
                <div className="px-6 pb-4">
                  <img
                    src={story.image}
                    alt="Story"
                    className="w-full h-64 md:h-80 object-cover rounded-xl"
                  />
                </div>
              )}

              {/* Post Actions */}
              <div className="px-6 py-4 border-t border-gray-100">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-6">
                    <button className="flex items-center gap-2 text-gray-500 hover:text-red-500 transition-colors">
                      <Heart 
                        className={`w-5 h-5 ${story.isLiked ? 'fill-red-500 text-red-500' : ''}`} 
                      />
                      <span className="text-sm font-medium">{story.likes}</span>
                    </button>
                    
                    <button className="flex items-center gap-2 text-gray-500 hover:text-blue-500 transition-colors">
                      <MessageCircle className="w-5 h-5" />
                      <span className="text-sm font-medium">{story.comments}</span>
                    </button>
                  </div>
                  
                  <button className="text-green-600 hover:text-green-700 text-sm font-medium transition-colors">
                    Read More
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Load More Button */}
        <div className="text-center mt-12">
          <button className="bg-white text-gray-700 px-8 py-3 rounded-full border border-gray-300 hover:bg-gray-50 transition-colors font-medium">
            Load More Stories
          </button>
        </div>

        {/* Share Your Story CTA */}
        <div className="bg-gradient-to-r from-green-500 to-green-600 rounded-2xl p-8 text-white text-center mt-12">
          <Heart className="w-12 h-12 mx-auto mb-4 fill-current" />
          <h2 className="text-2xl font-bold mb-2">Share Your Story</h2>
          <p className="text-green-100 mb-6">
            Your inspiring story can motivate others to do good deeds
          </p>
          <button className="bg-white text-green-600 px-8 py-3 rounded-full font-semibold hover:bg-gray-100 transition-colors">
            Write Story
          </button>
        </div>
      </div>
    </div>
  );
};

export default StoriesPage;