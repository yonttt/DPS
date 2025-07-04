import { useState } from 'react';
import LoginPage from './components/LoginPage';
import Hero from './components/Hero';
import DonationPage from './components/DonationPage';
import NewsPage from './components/NewsPage';
import StoriesPage from './components/StoriesPage';
import PaymentPage from './components/PaymentPage';
import Navbar from './components/Navbar';

type Page = 'login' | 'home' | 'donation' | 'news' | 'stories' | 'payment';

function App() {
  const [currentPage, setCurrentPage] = useState<Page>('login');
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [selectedCampaign, setSelectedCampaign] = useState<any>(null);

  const handleLogin = () => {
    setIsLoggedIn(true);
    setCurrentPage('home');
  };

  // Future logout functionality
  // const handleLogout = () => {
  //   setIsLoggedIn(false);
  //   setCurrentPage('login');
  // };

  // Create a wrapper function to handle the type conversion
  const handleNavigate = (page: string, campaignData?: any) => {
    setCurrentPage(page as Page);
    if (campaignData) {
      setSelectedCampaign(campaignData);
    }
  };

  const renderPage = () => {
    switch (currentPage) {
      case 'login':
        return <LoginPage onLogin={handleLogin} />;
      case 'home':
        return <Hero onNavigate={handleNavigate} />;
      case 'donation':
        return <DonationPage onNavigate={handleNavigate} campaignData={selectedCampaign} />;
      case 'news':
        return <NewsPage onNavigate={handleNavigate} />;
      case 'stories':
        return <StoriesPage onNavigate={handleNavigate} />;
      case 'payment':
        return <PaymentPage onNavigate={handleNavigate} />;
    }
  };

  if (!isLoggedIn && currentPage !== 'login') {
    return <LoginPage onLogin={handleLogin} />;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Main content with bottom padding to account for fixed navbar */}
      <div className="pb-20">
        {renderPage()}
      </div>
      
      {/* Show navbar only when logged in and not on login page */}
      {isLoggedIn && currentPage !== 'login' && (
        <Navbar currentPage={currentPage} onNavigate={handleNavigate} />
      )}
    </div>
  );
}

export default App;