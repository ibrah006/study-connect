import React, { useState } from 'react';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import Header from './components/Layout/Header';
import LoginForm from './components/Auth/LoginForm';
import RegisterForm from './components/Auth/RegisterForm';
import DiscoverPage from './components/Discover/DiscoverPage';
import ConnectionsPage from './components/Connections/ConnectionsPage';
import StudyGroupsPage from './components/StudyGroups/StudyGroupsPage';
import CareersPage from './components/Careers/CareersPage';
import MessagesPage from './components/Messages/MessagesPage';
import ClubsPage from './components/Clubs/ClubsPage';
import EventsPage from './components/Events/EventsPage';
import DashboardPage from './components/Dashboard/DashboardPage';

const AppContent: React.FC = () => {
  const { isAuthenticated, isLoading } = useAuth();
  const [authMode, setAuthMode] = useState<'login' | 'register'>('login');
  const [activeTab, setActiveTab] = useState('dashboard');

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return authMode === 'login' ? (
      <LoginForm onSwitchToRegister={() => setAuthMode('register')} />
    ) : (
      <RegisterForm onSwitchToLogin={() => setAuthMode('login')} />
    );
  }

  const renderActiveTab = () => {
    switch (activeTab) {
      case 'dashboard':
        return <DashboarxdPage onNavigate={setActiveTab} />;
      case 'discover':
        return <DiscoverPage />;
      case 'connections':
        return <ConnectionsPage />;
      case 'groups':
        return <StudyGroupsPage />;
      case 'clubs':
        return <ClubsPage />;
      case 'events':
        return <EventsPage />;
      case 'careers':
        return <CareersPage />;
      case 'messages':
        return <MessagesPage />;
      default:
        return <DiscoverPage />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header activeTab={activeTab} onTabChange={setActiveTab} />
      <main>
        {renderActiveTab()}
      </main>
    </div>
  );
};

function App() {
  return (
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  );
}

export default App;