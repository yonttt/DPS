import React, { useState, useEffect } from 'react';

interface Story {
  id: number;
  title: string;
  author: string;
  content: string;
  date: string;
  image: string;
  category: string;
  likes: number;
  shares: number;
}

const StoriesPage: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [sortBy, setSortBy] = useState('date');
  const [stories] = useState<Story[]>([
    {
      id: 1,
      title: 'A Community Unites for Clean Water',
      author: 'Rina S.',
      content: 'Residents of Tambora came together to build a new well, providing clean water for hundreds of families.',
      date: '2024-01-10',
      image: 'https://images.pexels.com/photos/6647039/pexels-photo-6647039.jpeg?auto=compress&cs=tinysrgb&w=800',
      category: 'Environment',
      likes: 32,
      shares: 12
    },
    {
      id: 2,
      title: 'Flood Relief: Stories of Hope',
      author: 'Budi P.',
      content: 'Volunteers share their experiences helping families during the Jakarta floods.',
      date: '2024-01-12',
      image: 'https://images.unsplash.com/photo-1594736797933-d0f02d8f1eab?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      category: 'Emergency',
      likes: 21,
      shares: 8
    },
    {
      id: 3,
      title: 'Health Outreach in Bandung',
      author: 'Dr. Sari',
      content: 'Medical teams provided free checkups and vaccinations for children in rural Bandung.',
      date: '2024-01-15',
      image: 'https://images.pexels.com/photos/3952234/pexels-photo-3952234.jpeg?auto=compress&cs=tinysrgb&w=800',
      category: 'Health',
      likes: 15,
      shares: 5
    },
    {
      id: 4,
      title: 'Education for All: A Teacher’s Journey',
      author: 'Pak Agus',
      content: 'A teacher shares his story of bringing books and hope to children in Surabaya.',
      date: '2024-01-18',
      image: 'https://images.pexels.com/photos/3992949/pexels-photo-3992949.jpeg?auto=compress&cs=tinysrgb&w=800',
      category: 'Education',
      likes: 18,
      shares: 7
    }
  ]);

  const filteredStories = stories.filter(story => 
    selectedCategory === 'all' || story.category === selectedCategory
  );

  const sortedStories = [...filteredStories].sort((a, b) => {
    if (sortBy === 'date') {
      return new Date(b.date).getTime() - new Date(a.date).getTime();
    }
    if (sortBy === 'likes') {
      return b.likes - a.likes;
    }
    if (sortBy === 'title') {
      return a.title.localeCompare(b.title);
    }
    return 0;
  });

  const categories = ['all', ...Array.from(new Set(stories.map(story => story.category)))];

  const handleLike = (storyId: number) => {
    // Demo: no-op for static data
  };

  const handleShare = (storyId: number) => {
    // Demo: no-op for static data
  };

  // Stories are always loaded instantly

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="text-center">
            <h1 className="text-4xl font-bold text-gray-900 mb-2">Impact Stories</h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Real stories from people whose lives have been changed through your donations
            </p>
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="bg-white rounded-lg shadow-sm p-6 mb-8">
          <div className="flex flex-col sm:flex-row gap-4 items-center justify-between">
            <div className="flex flex-wrap gap-2">
              <span className="text-sm font-medium text-gray-700 mr-2">Category:</span>
              {categories.map(category => (
                <button
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                    selectedCategory === category
                      ? 'bg-blue-600 text-white'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  {category === 'all' ? 'All Stories' : category.charAt(0).toUpperCase() + category.slice(1)}
                </button>
              ))}
            </div>
            
            <div className="flex items-center gap-2">
              <span className="text-sm font-medium text-gray-700">Sort by:</span>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="date">Latest</option>
                <option value="likes">Most Liked</option>
                <option value="title">Title</option>
              </select>
            </div>
          </div>
        </div>

        {/* Stories Grid */}
        {sortedStories.length === 0 ? (
          <div className="text-center py-12">
            <div className="text-gray-400 mb-4">
              <svg className="mx-auto h-12 w-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
            </div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">No stories found</h3>
            <p className="text-gray-500">Try adjusting your filters or check back later for new stories.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {sortedStories.map((story) => (
              <div key={story.id} className="bg-white rounded-lg shadow-sm overflow-hidden hover:shadow-md transition-shadow">
                <div className="relative h-48 bg-gray-200">
                  <img
                    src={story.image}
                    alt={story.title}
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      const target = e.target as HTMLImageElement;
                      target.src = `https://images.unsplash.com/photo-1531482615713-2afd69097998?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80`;
                    }}
                  />
                  <div className="absolute top-4 left-4">
                    <span className="bg-white bg-opacity-90 text-xs font-medium px-3 py-1 rounded-full text-gray-700">
                      {story.category}
                    </span>
                  </div>
                </div>
                
                <div className="p-6">
                  <h3 className="text-xl font-semibold text-gray-900 mb-2 line-clamp-2">
                    {story.title}
                  </h3>
                  
                  <div className="flex items-center text-sm text-gray-500 mb-3">
                    <span>By {story.author}</span>
                    <span className="mx-2">•</span>
                    <span>{new Date(story.date).toLocaleDateString()}</span>
                  </div>
                  
                  <p className="text-gray-600 mb-4 line-clamp-3">
                    {story.content}
                  </p>
                  
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <button
                        onClick={() => handleLike(story.id)}
                        className="flex items-center gap-1 text-gray-500 hover:text-red-500 transition-colors"
                      >
                        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" clipRule="evenodd" />
                        </svg>
                        <span className="text-sm">{story.likes}</span>
                      </button>
                      
                      <button
                        onClick={() => handleShare(story.id)}
                        className="flex items-center gap-1 text-gray-500 hover:text-blue-500 transition-colors"
                      >
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.367 2.684 3 3 0 00-5.367-2.684z" />
                        </svg>
                        <span className="text-sm">{story.shares}</span>
                      </button>
                    </div>
                    
                    <button className="text-blue-600 hover:text-blue-700 text-sm font-medium">
                      Read More
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Call to Action */}
      <div className="bg-blue-600 mt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="text-center">
            <h2 className="text-3xl font-bold text-white mb-4">
              Want to Create Your Own Impact Story?
            </h2>
            <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
              Join thousands of donors who are making a difference in communities around the world.
            </p>
            <button className="bg-white text-blue-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors">
              Start Donating Today
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StoriesPage;
