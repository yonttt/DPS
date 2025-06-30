import React, { useState } from 'react';
import { ArrowLeft, Heart, MapPin, Calendar, Share2, Users, Target } from 'lucide-react';

interface DonationPageProps {
  onNavigate: (page: string) => void;
}

const DonationPage: React.FC<DonationPageProps> = ({ onNavigate }) => {
  const [donationAmount, setDonationAmount] = useState('');
  const [selectedAmount, setSelectedAmount] = useState<number | null>(null);

  const quickAmounts = [50000, 100000, 250000, 500000, 1000000];

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0
    }).format(amount);
  };

  const handleAmountSelect = (amount: number) => {
    setSelectedAmount(amount);
    setDonationAmount(amount.toString());
  };

  const handleDonate = () => {
    if (donationAmount) {
      // Navigate to payment page instead of showing alert
      onNavigate('payment');
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
              <span>Kembali</span>
            </button>
            
            <div className="flex items-center gap-4">
              <button className="p-2 text-gray-400 hover:text-gray-600 transition-colors">
                <Share2 className="w-6 h-6" />
              </button>
              <button className="p-2 text-gray-400 hover:text-gray-600 transition-colors">
                <Heart className="w-6 h-6" />
              </button>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Campaign Image */}
        <div className="relative rounded-2xl overflow-hidden mb-8">
          <img
            src="https://images.pexels.com/photos/6647039/pexels-photo-6647039.jpeg?auto=compress&cs=tinysrgb&w=1200"
            alt="Campaign"
            className="w-full h-64 md:h-80 object-cover"
          />
          <div className="absolute top-4 left-4">
            <span className="bg-red-500 text-white px-3 py-1 rounded-full text-sm font-medium">
              Darurat
            </span>
          </div>
        </div>

        {/* Campaign Info */}
        <div className="mb-8">
          <h1 className="text-2xl md:text-3xl font-bold text-gray-800 mb-4">
            Selamatkan Akses Air Bersih di Tambora
          </h1>
          
          <div className="flex flex-wrap items-center gap-4 text-gray-600 mb-6">
            <div className="flex items-center gap-1">
              <MapPin className="w-4 h-4" />
              <span>Jakarta, Indonesia</span>
            </div>
            <div className="flex items-center gap-1">
              <Calendar className="w-4 h-4" />
              <span>30 hari lagi</span>
            </div>
            <div className="flex items-center gap-1">
              <Users className="w-4 h-4" />
              <span>1,247 donatur</span>
            </div>
          </div>

          {/* Progress */}
          <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-200 mb-8">
            <div className="flex justify-between items-center mb-4">
              <div>
                <p className="text-2xl font-bold text-gray-800">Rp2.109.000</p>
                <p className="text-gray-600">terkumpul dari Rp5.000.000</p>
              </div>
              <div className="text-right">
                <p className="text-2xl font-bold text-green-500">42%</p>
                <p className="text-gray-600">tercapai</p>
              </div>
            </div>
            
            <div className="w-full bg-gray-200 rounded-full h-3 mb-4">
              <div className="bg-green-500 h-3 rounded-full transition-all duration-300" style={{ width: '42%' }}></div>
            </div>

            <div className="flex items-center gap-1 text-green-600">
              <Target className="w-4 h-4" />
              <span className="text-sm font-medium">Target: Rp5.000.000</span>
            </div>
          </div>
        </div>

        {/* Donation Form */}
        <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-200 mb-8">
          <h2 className="text-xl font-bold text-gray-800 mb-6">Donasi Sekarang</h2>
          
          {/* Quick Amount Buttons */}
          <div className="grid grid-cols-3 md:grid-cols-5 gap-3 mb-6">
            {quickAmounts.map((amount) => (
              <button
                key={amount}
                onClick={() => handleAmountSelect(amount)}
                className={`p-3 rounded-lg border text-sm font-medium transition-all duration-200 ${
                  selectedAmount === amount
                    ? 'bg-green-500 text-white border-green-500'
                    : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-50'
                }`}
              >
                {formatCurrency(amount)}
              </button>
            ))}
          </div>

          {/* Custom Amount */}
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Atau masukkan nominal lain
            </label>
            <div className="relative">
              <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500">
                Rp
              </span>
              <input
                type="number"
                value={donationAmount}
                onChange={(e) => {
                  setDonationAmount(e.target.value);
                  setSelectedAmount(null);
                }}
                placeholder="0"
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-200"
              />
            </div>
          </div>

          {/* Donate Button */}
          <button
            onClick={handleDonate}
            disabled={!donationAmount}
            className="w-full bg-green-500 text-white py-4 rounded-lg font-semibold hover:bg-green-600 disabled:bg-gray-300 disabled:cursor-not-allowed transition-all duration-200 hover:transform hover:scale-105"
          >
            Donasi {donationAmount ? formatCurrency(parseInt(donationAmount)) : ''}
          </button>
        </div>

        {/* Description */}
        <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-200">
          <h3 className="text-lg font-bold text-gray-800 mb-4">Deskripsi</h3>
          <div className="prose prose-gray max-w-none">
            <p className="text-gray-600 leading-relaxed mb-4">
              Di tengah-tengah hiruk pikuk kota Jakarta, masih banyak warga di daerah Tambora 
              yang kesulitan mendapatkan akses air bersih yang layak. Krisis air bersih ini 
              telah berlangsung bertahun-tahun dan semakin memburuk setiap harinya.
            </p>
            <p className="text-gray-600 leading-relaxed mb-4">
              Bantuan Anda sangat berarti untuk:
            </p>
            <ul className="list-disc list-inside text-gray-600 space-y-2 mb-4">
              <li>Penyediaan tanki air bersih di 10 titik strategis</li>
              <li>Pembangunan sistem filtrasi air sederhana</li>
              <li>Distribusi air bersih harian untuk 500 keluarga</li>
              <li>Edukasi kebersihan dan kesehatan lingkungan</li>
            </ul>
            <p className="text-gray-600 leading-relaxed">
              Setiap rupiah yang Anda donasikan akan langsung tersalurkan untuk membantu 
              saudara-saudara kita di Tambora mendapatkan haknya akan air bersih yang layak.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DonationPage;