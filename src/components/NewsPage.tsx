import React from 'react';
import { ArrowLeft, Calendar, MapPin, Clock, ExternalLink } from 'lucide-react';

interface NewsPageProps {
  onNavigate: (page: string) => void;
}

const NewsPage: React.FC<NewsPageProps> = ({ onNavigate }) => {
  const newsArticles = [
    {
      id: 1,
      title: 'Bantuan Darurat untuk Korban Gempa Cianjur Terus Berdatangan',
      excerpt: 'Tim relawan dan bantuan logistik terus mengalir ke daerah terdampak gempa di Cianjur. Lebih dari 500 keluarga telah menerima bantuan dasar.',
      image: 'https://images.pexels.com/photos/6995253/pexels-photo-6995253.jpeg?auto=compress&cs=tinysrgb&w=800',
      date: '2024-01-15',
      location: 'Cianjur, Indonesia',
      readTime: '3 menit',
      category: 'Bencana Alam'
    },
    {
      id: 2,
      title: 'Program Rehabilitasi Sekolah di Lombok Mencapai 80%',
      excerpt: 'Pembangunan kembali sekolah-sekolah yang rusak akibat gempa di Lombok mencapai progress 80%. Diharapkan selesai dalam 2 bulan ke depan.',
      image: 'https://images.pexels.com/photos/8197530/pexels-photo-8197530.jpeg?auto=compress&cs=tinysrgb&w=800',
      date: '2024-01-14',
      location: 'Lombok, Indonesia',
      readTime: '5 menit',
      category: 'Pendidikan'
    },
    {
      id: 3,
      title: 'Aksi Bersih-Bersih Sungai di Jakarta Libatkan 1000 Relawan',
      excerpt: 'Aksi gotong royong membersihkan sungai-sungai di Jakarta berhasil mengumpulkan 5 ton sampah. Partisipasi masyarakat sangat antusias.',
      image: 'https://images.pexels.com/photos/9324337/pexels-photo-9324337.jpeg?auto=compress&cs=tinysrgb&w=800',
      date: '2024-01-13',
      location: 'Jakarta, Indonesia',
      readTime: '4 menit',
      category: 'Lingkungan'
    },
    {
      id: 4,
      title: 'Bantuan Medis Gratis Untuk Anak-Anak di Daerah Terpencil',
      excerpt: 'Tim medis relawan memberikan pelayanan kesehatan gratis untuk anak-anak di daerah terpencil Papua. Lebih dari 200 anak telah diperiksa.',
      image: 'https://images.pexels.com/photos/6303773/pexels-photo-6303773.jpeg?auto=compress&cs=tinysrgb&w=800',
      date: '2024-01-12',
      location: 'Papua, Indonesia',
      readTime: '6 menit',
      category: 'Kesehatan'
    }
  ];

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('id-ID', {
      day: 'numeric',
      month: 'long',
      year: 'numeric'
    });
  };

  const getCategoryColor = (category: string) => {
    const colors = {
      'Bencana Alam': 'bg-red-500',
      'Pendidikan': 'bg-blue-500',
      'Lingkungan': 'bg-green-500',
      'Kesehatan': 'bg-purple-500'
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
              <span>Kembali</span>
            </button>
            
            <h1 className="text-xl font-bold text-gray-800">Berita & Update</h1>
            
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
                Baca Selengkapnya
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
                    Baca →
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Load More Button */}
        <div className="text-center mt-12">
          <button className="bg-white text-gray-700 px-8 py-3 rounded-full border border-gray-300 hover:bg-gray-50 transition-colors font-medium">
            Muat Lebih Banyak
          </button>
        </div>
      </div>
    </div>
  );
};

export default NewsPage;