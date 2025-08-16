import React, { useState, useEffect } from 'react';
import { Search, Heart, MapPin, TrendingUp, User } from 'lucide-react';

interface HomePageProps {
  onNavigate: (page: string, campaignData?: any) => void;
  displayName: string;
}
interface Campaign {
  id: number;
  category: string;
  daysLeft: number;
  image: string;
  location: string;
  raised: number;
  target: number;
  title: string;
  description: string;
  impact: string;
}

const Hero: React.FC<HomePageProps> = ({ onNavigate, displayName }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeFilter, setActiveFilter] = useState('All');
  const [campaigns, setCampaigns] = useState<Campaign[]>([]);

  useEffect(() => {
    setCampaigns([
      {
        id: 1,
        title: 'Save Clean Water Access in Tambora',
        location: 'Jakarta, Indonesia',
        raised: 2109000,
        target: 5000000,
        daysLeft: 30,
        image: 'https://images.pexels.com/photos/6647039/pexels-photo-6647039.jpeg?auto=compress&cs=tinysrgb&w=1200',
        category: 'Environment',
        description: 'In the midst of Jakarta\'s bustling city life, many residents in the Tambora area still struggle to access proper clean water.',
        impact: 'Provides clean water access for 500 families in need'
      },
      {
        id: 2,
        title: "Emergency Relief for Flood Victims",
        description: "Help provide immediate relief to families affected by the devastating floods in Jakarta. Your donation will provide food, clean water, temporary shelter, and medical assistance to those in desperate need.",
        image: "https://images.unsplash.com/photo-1594736797933-d0f02d8f1eab?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
        category: "Emergency",
        location: "Jakarta, Indonesia",
        raised: 12500000,
        target: 25000000,
        daysLeft: 15,
        impact: "Provides emergency supplies for 100 families affected by floods"
      },
      {
        id: 3,
        title: 'Support Children’s Health in Rural Areas',
        location: 'Bandung, Indonesia',
        raised: 800000,
        target: 3000000,
        daysLeft: 25,
        image: 'https://images.pexels.com/photos/3952234/pexels-photo-3952234.jpeg?auto=compress&cs=tinysrgb&w=1200',
        category: 'Health',
        description: 'Help provide medical checkups and vaccinations for children in remote villages.',
        impact: 'Improves health for 200 children in rural communities'
      },
      {
        id: 4,
        title: 'Education for All: School Supplies Drive',
        location: 'Surabaya, Indonesia',
        raised: 1500000,
        target: 4000000,
        daysLeft: 20,
        image: 'https://images.pexels.com/photos/3992949/pexels-photo-3992949.jpeg?auto=compress&cs=tinysrgb&w=1200',
        category: 'Education',
        description: 'Donate to provide books, uniforms, and supplies for children in need.',
        impact: 'Supports education for 300 students in underserved areas'
      }
    ]);
  }, []);

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0
    }).format(amount);
  };

  const getProgressPercentage = (raised: number, target: number) => {
    return Math.min((raised / target) * 100, 100);
  };

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'Environment':
        return 'bg-green-500 text-white';
      case 'Emergency':
        return 'bg-red-500 text-white';
      case 'Education':
        return 'bg-blue-500 text-white';
      case 'Health':
        return 'bg-pink-500 text-white';
      default:
        return 'bg-gray-500 text-white';
    }
  };

  const getFilterActiveColor = (tag: string) => {
    switch (tag) {
      case 'Environment':
        return 'bg-green-500 text-white';
      case 'Emergency':
        return 'bg-red-500 text-white';
      case 'Education':
        return 'bg-blue-500 text-white';
      case 'Health':
        return 'bg-pink-500 text-white';
      default:
        return 'bg-gray-800 text-white';
    }
  };

  const handleFilterClick = (tag: string) => {
    setActiveFilter(tag);
  };

  const filteredCampaigns = campaigns.filter(campaign => {
    const matchesFilter = activeFilter === 'All' || campaign.category === activeFilter;
    const matchesSearch = campaign.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         campaign.location.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-green-500 rounded-full flex items-center justify-center">
                <Heart className="w-6 h-6 text-white fill-current" />
              </div>
              <h1 className="text-xl font-bold text-gray-800">Let's Help Them!</h1>
            </div>

            <div className="flex items-center gap-4">
              <p className="text-gray-700 font-medium">
                {displayName}
              </p>
              <button className="p-2 text-gray-400 hover:text-gray-600 transition-colors">
                <User className="w-6 h-6" />
              </button>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Search Bar */}
        <div className="mb-8">
          <div className="relative max-w-md">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search campaigns..."
              className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-full focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-200"
            />
          </div>
        </div>

        {/* Filter Tags */}
        <div className="flex flex-wrap gap-2 mb-8">
          {['All', 'Environment', 'Health', 'Education', 'Emergency'].map((tag) => (
            <button
              key={tag}
              onClick={() => handleFilterClick(tag)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
                tag === activeFilter
                  ? getFilterActiveColor(tag)
                  : 'bg-white text-gray-600 border border-gray-300 hover:bg-gray-50'
              }`}
            >
              {tag}
            </button>
          ))}
        </div>

        {/* Featured Campaign */}
        <div className="mb-8">
          <div className="bg-gradient-to-r from-green-500 to-green-600 rounded-2xl p-6 text-white relative overflow-hidden">
            <div className="relative z-10">
              <div className="flex items-center gap-2 mb-2">
                <TrendingUp className="w-5 h-5" />
                <span className="text-sm font-medium">Featured Campaign</span>
              </div>
              <h2 className="text-2xl font-bold mb-2">Help Jakarta Flood Victims</h2>
              <p className="text-green-100 mb-4">
                Together we help our brothers and sisters affected by floods in Jakarta
              </p>
              <div className="flex items-center gap-4">
                <div className="bg-white/20 px-4 py-2 rounded-full">
                  <span className="text-sm">60% achieved</span>
                </div>
                <button
                  onClick={() => onNavigate('donation', {
                    id: 'featured',
                    title: 'Help Jakarta Flood Victims',
                    location: 'Jakarta, Indonesia',
                    raised: 15000000,
                    target: 25000000,
                    daysLeft: 20,
                    image: 'https://images.pexels.com/photos/6995253/pexels-photo-6995253.jpeg?auto=compress&cs=tinysrgb&w=1200',
                    category: 'Emergency',
                    description: 'Jakarta is experiencing severe flooding that has affected thousands of families. Many have lost their homes and need immediate assistance for food, clean water, and temporary shelter. Your donation will help provide emergency relief supplies and support to help families get back on their feet.',
                    impact: 'Your support helps provide emergency aid to flood victims'
                  })}
                  className="bg-white text-green-600 px-6 py-2 rounded-full font-semibold hover:bg-gray-100 transition-colors"
                >
                  Donate Now
                </button>
              </div>
            </div>
            <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -mr-16 -mt-16"></div>
          </div>
        </div>

        {/* Campaign Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredCampaigns.length > 0 ? (
            filteredCampaigns.map((campaign) => (
              <div
                key={campaign.id}
                className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden hover:shadow-lg transition-all duration-300 hover:transform hover:scale-105 cursor-pointer"
                onClick={() => onNavigate('donation', campaign)}
              >
                <div className="relative">
                  <img
                    src={campaign.image}
                    alt={campaign.title}
                    className="w-full h-48 object-cover"
                  />
                  <div className="absolute top-4 left-4">
                    <span className={`${getCategoryColor(campaign.category)} px-3 py-1 rounded-full text-xs font-medium`}>
                      {campaign.category}
                    </span>
                  </div>
                </div>

                <div className="p-6">
                  <h3 className="font-bold text-lg text-gray-800 mb-2 line-clamp-2">
                    {campaign.title}
                  </h3>

                  <div className="flex items-center gap-1 text-gray-500 text-sm mb-4">
                    <MapPin className="w-4 h-4" />
                    <span>{campaign.location}</span>
                  </div>

                  <div className="mb-4">
                    <div className="flex justify-between text-sm mb-2">
                      <span className="text-gray-600">Collected</span>
                      <span className="font-semibold text-gray-800">
                        {getProgressPercentage(campaign.raised, campaign.target).toFixed(0)}%
                      </span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div
                        className="bg-green-500 h-2 rounded-full transition-all duration-300"
                        style={{ width: `${getProgressPercentage(campaign.raised, campaign.target)}%` }}
                      ></div>
                    </div>
                  </div>

                  <div className="flex justify-between items-center text-sm">
                    <div>
                      <p className="font-bold text-gray-800">
                        {formatCurrency(campaign.raised)}
                      </p>
                      <p className="text-gray-500">of {formatCurrency(campaign.target)}</p>
                    </div>
                    <div className="text-right">
                      <p className="font-bold text-gray-800">{campaign.daysLeft}</p>
                      <p className="text-gray-500">days left</p>
                    </div>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="col-span-full text-center py-12">
              <div className="text-gray-400 mb-2">
                <Search className="w-12 h-12 mx-auto mb-4" />
              </div>
              <h3 className="text-lg font-semibold text-gray-600 mb-2">
                No campaigns found
              </h3>
              <p className="text-gray-500">
                Try changing your filter or search keywords
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Hero;
