
import React, { useState, useEffect } from 'react';
import Sidebar from './components/Sidebar';
import Header from './components/Header';
import HomePage from './components/HomePage';
import Classroom from './components/Classroom';
import LandingPage from './components/LandingPage';
import AuthPage from './components/AuthPage';
import Profile from './components/Profile';
import TeacherDashboard from './components/TeacherDashboard';
import ContentUpload from './components/ContentUpload';
import AdminDashboard from './components/AdminDashboard';
import DoubtForum from './components/DoubtForum';
import StudentAnalytics from './components/StudentAnalytics';
import HelpCenter from './components/HelpCenter';
import Leaderboard from './components/Leaderboard';
import LiveStudio from './components/LiveStudio';
import UserManagement from './components/UserManagement';
import RevenueReports from './components/RevenueReports';
import AboutPage from './components/AboutPage';
import ContactPage from './components/ContactPage';
import PrivacyPolicy from './components/PrivacyPolicy';
import TermsOfService from './components/TermsOfService';
import BatchCatalog from './components/BatchCatalog';
import BatchDetails from './components/BatchDetails';
import TestCenter from './components/TestCenter';
import Scoreboard from './components/Scoreboard';
import AIVoiceAssistant from './components/AIVoiceAssistant';
import ProposalPopup from './components/ProposalPopup';
import FloatingBirds from './components/FloatingBirds';
import { ViewType, UserRole } from './types';

interface PublicWrapperProps {
  children: React.ReactNode;
  onLoginClick: () => void;
  onNavClick: (view: ViewType) => void;
}

const PublicWrapper: React.FC<PublicWrapperProps> = ({ children, onLoginClick, onNavClick }) => (
  <div className="min-h-screen bg-white">
    <LandingPage.Header onLoginClick={onLoginClick} onNavClick={onNavClick} />
    <div className="pt-20">{children}</div>
    <LandingPage.Footer onNavClick={onNavClick} />
  </div>
);

const App: React.FC = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userRole, setUserRole] = useState<UserRole>('student');
  const [currentView, setCurrentView] = useState<ViewType>('landing');
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  
  const [purchasedBatches, setPurchasedBatches] = useState<string[]>([]);
  const [selectedBatchId, setSelectedBatchId] = useState<string | null>(null);

  useEffect(() => {
    const handleRouting = () => {
      const path = window.location.pathname;
      if (path === '/editorsofweb') {
        if (!isAuthenticated) {
          setCurrentView('auth');
        } else if (userRole === 'admin') {
          setCurrentView('admin-dashboard');
        }
      } else if (['/admin', '/admin/login', '/dashboard'].includes(path)) {
        window.history.replaceState(null, '', '/');
        setCurrentView('landing');
      }
    };

    handleRouting();
    window.addEventListener('popstate', handleRouting);
    return () => window.removeEventListener('popstate', handleRouting);
  }, [isAuthenticated, userRole]);

  const handleLogin = (role: UserRole = 'student') => {
    setIsAuthenticated(true);
    setUserRole(role);
    if (role === 'teacher') setCurrentView('teacher-dashboard');
    else if (role === 'admin') setCurrentView('admin-dashboard');
    else setCurrentView('dashboard');
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    setCurrentView('landing');
    setPurchasedBatches([]);
    window.history.replaceState(null, '', '/');
  };

  const navigate = (view: ViewType) => {
    setCurrentView(view);
    setSelectedBatchId(null);
    window.scrollTo(0, 0);
  };

  const handleBatchSelect = (batchId: string) => {
    setSelectedBatchId(batchId);
    if (purchasedBatches.includes(batchId)) {
      navigate('classroom');
    }
  };

  const handlePurchase = (batchId: string) => {
    setPurchasedBatches(prev => [...prev, batchId]);
    navigate('classroom');
  };

  if (!isAuthenticated) {
    if (currentView === 'auth') return <AuthPage onLogin={handleLogin} onBack={() => navigate('landing')} />;
    
    const wrapperProps = {
      onLoginClick: () => navigate('auth'),
      onNavClick: navigate
    };

    return (
      <>
        {currentView === 'batches' ? <PublicWrapper {...wrapperProps}><BatchCatalog onBatchSelect={() => navigate('auth')} /></PublicWrapper> :
         currentView === 'about' ? <PublicWrapper {...wrapperProps}><AboutPage /></PublicWrapper> :
         currentView === 'contact' ? <PublicWrapper {...wrapperProps}><ContactPage /></PublicWrapper> :
         currentView === 'privacy' ? <PublicWrapper {...wrapperProps}><PrivacyPolicy /></PublicWrapper> :
         currentView === 'terms' ? <PublicWrapper {...wrapperProps}><TermsOfService /></PublicWrapper> :
         <LandingPage onGetStarted={() => navigate('auth')} onLoginClick={() => navigate('auth')} onNavClick={navigate} />}
        <ProposalPopup />
        <FloatingBirds />
      </>
    );
  }

  const renderMainContent = () => {
    if (selectedBatchId && !purchasedBatches.includes(selectedBatchId)) {
      return <BatchDetails onPurchase={() => handlePurchase(selectedBatchId)} onBack={() => setSelectedBatchId(null)} />;
    }

    switch (currentView) {
      case 'dashboard': return <HomePage onBatchClick={handleBatchSelect} />;
      case 'batches': return <BatchCatalog onBatchSelect={handleBatchSelect} />;
      case 'classroom': return <Classroom batchId={selectedBatchId || '1'} />;
      case 'teacher-dashboard': return <TeacherDashboard onUploadClick={() => navigate('content-upload')} />;
      case 'admin-dashboard': return <AdminDashboard />;
      case 'content-upload': return <ContentUpload />;
      case 'user-management': return <UserManagement />;
      case 'revenue': return <RevenueReports />;
      case 'doubt-forum': return <DoubtForum />;
      case 'analytics': return <StudentAnalytics />;
      case 'help-center': return <HelpCenter />;
      case 'leaderboard': return <Leaderboard />;
      case 'schedule': return <LiveStudio />;
      case 'tests': return <TestCenter />;
      case 'scoreboard': return <Scoreboard />;
      case 'profile': return <Profile />;
      default: return <HomePage onBatchClick={handleBatchSelect} />;
    }
  };

  return (
    <div className="flex h-screen bg-slate-50 overflow-hidden relative">
      <Sidebar 
        currentView={currentView} 
        onViewChange={navigate} 
        isOpen={isSidebarOpen}
        toggleSidebar={() => setIsSidebarOpen(!isSidebarOpen)}
        onLogout={handleLogout}
        userRole={userRole}
      />
      <div className="flex-1 flex flex-col min-w-0">
        <Header />
        <main className="flex-1 overflow-y-auto p-4 md:p-6 custom-scrollbar">
          <div className="max-w-[1600px] mx-auto w-full">
            {renderMainContent()}
          </div>
        </main>
      </div>
      <AIVoiceAssistant />
      <ProposalPopup />
      <FloatingBirds />
    </div>
  );
};

export default App;
