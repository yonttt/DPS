import React from 'react';
import { ArrowLeft, MapPin, Calendar, Users, Target } from 'lucide-react';

interface DonationPageProps {
  onNavigate: (page: string) => void;
  campaignData?: any;
}

const DonationPage: React.FC<DonationPageProps> = ({ onNavigate, campaignData }) => {
  // Default campaign data if none is provided
  const defaultCampaign = {
    id: 'default',
    title: 'Save Clean Water Access in Tambora',
    location: 'Jakarta, Indonesia',
    raised: 2109000,
    target: 5000000,
    daysLeft: 30,
    image: 'https://images.pexels.com/photos/6647039/pexels-photo-6647039.jpeg?auto=compress&cs=tinysrgb&w=1200',
    category: 'Environment',
    description: 'In the midst of Jakarta\'s bustling city life, many residents in the Tambora area still struggle to access proper clean water. This clean water crisis has been ongoing for years and continues to worsen each day. Your support will help provide clean water tanks at strategic locations, build simple water filtration systems, provide daily clean water distribution for 500 families, and environmental health and hygiene education.',
    impact: 'Provides clean water access for 500 families in need'
  };

  // Use the passed campaign data or fall back to default
  const campaign = campaignData || defaultCampaign;

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

  // Get category color for the emergency badge
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
            
            <div className="w-8"></div> {/* Spacer for balance */}
          </div>
        </div>
      </header>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Campaign Image */}
        <div className="relative rounded-2xl overflow-hidden mb-8">
          <img
            src={campaign.image}
            alt="Campaign"
            className="w-full h-64 md:h-80 object-cover"
          />
          <div className="absolute top-4 left-4">
            <span className={`${getCategoryColor(campaign.category)} px-3 py-1 rounded-full text-sm font-medium`}>
              {campaign.category}
            </span>
          </div>
        </div>

        {/* Campaign Info */}
        <div className="mb-8">
          <h1 className="text-2xl md:text-3xl font-bold text-gray-800 mb-4">
            {campaign.title}
          </h1>
          
          <div className="flex flex-wrap items-center gap-4 text-gray-600 mb-6">
            <div className="flex items-center gap-1">
              <MapPin className="w-4 h-4" />
              <span>{campaign.location}</span>
            </div>
            <div className="flex items-center gap-1">
              <Calendar className="w-4 h-4" />
              <span>{campaign.daysLeft} days left</span>
            </div>
            <div className="flex items-center gap-1">
              <Users className="w-4 h-4" />
              <span>1,247 donors</span>
            </div>
          </div>

          {/* Progress */}
          <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-200 mb-8">
            <div className="flex justify-between items-center mb-4">
              <div>
                <p className="text-2xl font-bold text-gray-800">{formatCurrency(campaign.raised)}</p>
                <p className="text-gray-600">collected from {formatCurrency(campaign.target)}</p>
              </div>
              <div className="text-right">
                <p className="text-2xl font-bold text-green-500">{getProgressPercentage(campaign.raised, campaign.target).toFixed(0)}%</p>
                <p className="text-gray-600">achieved</p>
              </div>
            </div>
            
            <div className="w-full bg-gray-200 rounded-full h-3 mb-4">
              <div 
                className="bg-green-500 h-3 rounded-full transition-all duration-300" 
                style={{ width: `${getProgressPercentage(campaign.raised, campaign.target)}%` }}
              ></div>
            </div>

            <div className="flex items-center gap-1 text-green-600">
              <Target className="w-4 h-4" />
              <span className="text-sm font-medium">Target: {formatCurrency(campaign.target)}</span>
            </div>
          </div>
        </div>

        {/* Simple Donation Button */}
        <div className="mb-8">
          <button
            onClick={() => onNavigate('payment')}
            className="w-full bg-green-500 text-white py-4 rounded-lg font-semibold hover:bg-green-600 transition-all duration-200 hover:transform hover:scale-105"
          >
            Donate Now
          </button>
        </div>

        {/* Description */}
        <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-200">
          <h3 className="text-lg font-bold text-gray-800 mb-4">About This Campaign</h3>
          <div className="prose prose-gray max-w-none">
            <p className="text-gray-600 leading-relaxed mb-4">
              {campaign.description}
            </p>
            <div className="bg-green-50 p-4 rounded-lg mb-4">
              <h4 className="font-semibold text-green-800 mb-2">Impact of Your Donation:</h4>
              <p className="text-green-700">{campaign.impact}</p>
            </div>
            <p className="text-gray-600 leading-relaxed">
              Every rupiah you donate will be directly channeled to help 
              achieve the goals of this campaign and make a meaningful difference 
              in the lives of those who need it most.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DonationPage;