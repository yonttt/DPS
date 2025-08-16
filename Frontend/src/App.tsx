import { useState } from 'react';
import LoginPage from './components/LoginPage';
import Hero from './components/Hero';
import DonationPage from './components/DonationPage';
import NewsPage from './components/NewsPage';
import StoriesPage from './components/StoriesPage';
import PaymentPage from './components/PaymentPage';
import Navbar from './components/Navbar';

type Page = 'login' | 'home' | 'donation' | 'news' | 'stories' | 'payment';

// ...existing code...

function App() {
  const [currentPage, setCurrentPage] = useState<Page>('login');
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [displayName, setDisplayName] = useState('');
  const [selectedCampaign, setSelectedCampaign] = useState<any>();
  


  // Demo login: just set logged in
  const handleLogin = (email: string) => {
    setDisplayName(email.split('@')[0]);
    setIsLoggedIn(true);
    setCurrentPage('home');
  };

  const handleSignup = (name: string) => {
    setDisplayName(name);
    setIsLoggedIn(true);
    setCurrentPage('home');
  };

  const handleDonation = () => true;

  const handleNavigate = (page: string, campaignData?: any) => {
    setCurrentPage(page as Page);
    if (campaignData) {
      setSelectedCampaign(campaignData);
    }
  };

  const renderPage = () => {
    switch (currentPage) {
      case 'login':
        return <LoginPage onLogin={handleLogin} onSignup={handleSignup} />;
      case 'home':
        return <Hero onNavigate={handleNavigate} displayName={displayName} />;
      case 'donation':
        return <DonationPage onNavigate={handleNavigate} campaignData={selectedCampaign} />;
      case 'news':
        return <NewsPage />;
      case 'stories':
        return <StoriesPage />;
      case 'payment':
  return <PaymentPage onNavigate={handleNavigate} />;
    }
  };

  if (!isLoggedIn && currentPage !== 'login') {
    return <LoginPage onLogin={handleLogin} onSignup={handleSignup} />;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Main content with bottom padding to account for fixed navbar */}
      <div className={currentPage == 'login' ? '' : "pb-20"}>
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