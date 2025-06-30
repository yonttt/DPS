import React, { useState } from 'react';
import { Search, Bell, User, Heart, MapPin, TrendingUp } from 'lucide-react';

interface HomePageProps {
  onNavigate: (page: string) => void;
}

const Hero: React.FC<HomePageProps> = ({ onNavigate }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeFilter, setActiveFilter] = useState('Semua');

  const campaigns = [
    {
      id: 1,
      title: 'Selamatkan Akses Air Bersih di Tambora',
      location: 'Jakarta, Indonesia',
      raised: 2109000,
      target: 5000000,
      daysLeft: 30,
      image: 'https://images.pexels.com/photos/6647039/pexels-photo-6647039.jpeg?auto=compress&cs=tinysrgb&w=800',
      category: 'Lingkungan'
    },
    {
      id: 2,
      title: 'Bantu Korban Gempa Cianjur',
      location: 'Cianjur, Indonesia',
      raised: 15000000,
      target: 25000000,
      daysLeft: 15,
      image: 'https://images.pexels.com/photos/6995253/pexels-photo-6995253.jpeg?auto=compress&cs=tinysrgb&w=800',
      category: 'Darurat'
    },
    {
      id: 3,
      title: 'Rehabilitasi Sekolah di Lombok',
      location: 'Lombok, Indonesia',
      raised: 8500000,
      target: 12000000,
      daysLeft: 45,
      image: 'https://images.pexels.com/photos/8197530/pexels-photo-8197530.jpeg?auto=compress&cs=tinysrgb&w=800',
      category: 'Pendidikan'
    },
    {
      id: 4,
      title: 'Operasi Jantung untuk Anak-Anak',
      location: 'Surabaya, Indonesia',
      raised: 5000000,
      target: 15000000,
      daysLeft: 20,
      image: 'https://images.pexels.com/photos/4167541/pexels-photo-4167541.jpeg?auto=compress&cs=tinysrgb&w=800',
      category: 'Kesehatan'
    },
    {
      id: 5,
      title: 'Reboisasi Hutan Kalimantan',
      location: 'Kalimantan, Indonesia',
      raised: 3500000,
      target: 10000000,
      daysLeft: 60,
      image: 'https://images.pexels.com/photos/1072179/pexels-photo-1072179.jpeg?auto=compress&cs=tinysrgb&w=800',
      category: 'Lingkungan'
    },
    {
      id: 6,
      title: 'Beasiswa untuk Anak Kurang Mampu',
      location: 'Yogyakarta, Indonesia',
      raised: 7200000,
      target: 20000000,
      daysLeft: 40,
      image: 'https://images.pexels.com/photos/289740/pexels-photo-289740.jpeg?auto=compress&cs=tinysrgb&w=800',
      category: 'Pendidikan'
    }
  ];

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

  // Filter campaigns based on active filter and search query
  const filteredCampaigns = campaigns.filter(campaign => {
    const matchesFilter = activeFilter === 'Semua' || campaign.category === activeFilter;
    const matchesSearch = campaign.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         campaign.location.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  const handleFilterClick = (filter: string) => {
    setActiveFilter(filter);
  };

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
              <h1 className="text-xl font-bold text-gray-800">Ayo Bantu Mereka!</h1>
            </div>
            
            <div className="flex items-center gap-4">
              <button className="p-2 text-gray-400 hover:text-gray-600 transition-colors">
                <Bell className="w-6 h-6" />
              </button>
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
              placeholder="Cari kampanye..."
              className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-full focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-200"
            />
          </div>
        </div>

        {/* Filter Tags */}
        <div className="flex flex-wrap gap-2 mb-8">
          {['Semua', 'Lingkungan', 'Kesehatan', 'Pendidikan', 'Darurat'].map((tag) => (
            <button
              key={tag}
              onClick={() => handleFilterClick(tag)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
                tag === activeFilter
                  ? 'bg-green-500 text-white'
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
                <span className="text-sm font-medium">Kampanye Unggulan</span>
              </div>
              <h2 className="text-2xl font-bold mb-2">Bantu Korban Banjir Jakarta</h2>
              <p className="text-green-100 mb-4">
                Bersama-sama kita bantu saudara kita yang terdampak banjir di Jakarta
              </p>
              <div className="flex items-center gap-4">
                <div className="bg-white/20 px-4 py-2 rounded-full">
                  <span className="text-sm">60% tercapai</span>
                </div>
                <button 
                  onClick={() => onNavigate('donation')}
                  className="bg-white text-green-600 px-6 py-2 rounded-full font-semibold hover:bg-gray-100 transition-colors"
                >
                  Donasi Sekarang
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
                onClick={() => onNavigate('donation')}
              >
                <div className="relative">
                  <img
                    src={campaign.image}
                    alt={campaign.title}
                    className="w-full h-48 object-cover"
                  />
                  <div className="absolute top-4 left-4">
                    <span className="bg-green-500 text-white px-3 py-1 rounded-full text-xs font-medium">
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
                      <span className="text-gray-600">Terkumpul</span>
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
                      <p className="text-gray-500">dari {formatCurrency(campaign.target)}</p>
                    </div>
                    <div className="text-right">
                      <p className="font-bold text-gray-800">{campaign.daysLeft}</p>
                      <p className="text-gray-500">hari lagi</p>
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
                Tidak ada kampanye ditemukan
              </h3>
              <p className="text-gray-500">
                Coba ubah filter atau kata kunci pencarian Anda
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Hero;