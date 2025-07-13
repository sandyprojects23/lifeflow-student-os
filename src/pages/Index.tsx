import React, { useState } from 'react';
import { MobileLayout } from '@/components/MobileLayout';
import { HomePage } from '@/components/pages/HomePage';
import { StudyPage } from '@/components/pages/StudyPage';
import { NotesPage } from '@/components/pages/NotesPage';
import { FocusPage } from '@/components/pages/FocusPage';
import { ProfilePage } from '@/components/pages/ProfilePage';

const Index = () => {
  const [activeTab, setActiveTab] = useState('home');

  const renderPage = () => {
    switch (activeTab) {
      case 'home':
        return <HomePage onNavigate={setActiveTab} />;
      case 'study':
        return <StudyPage />;
      case 'notes':
        return <NotesPage />;
      case 'focus':
        return <FocusPage />;
      case 'profile':
        return <ProfilePage />;
      default:
        return <HomePage onNavigate={setActiveTab} />;
    }
  };

  return (
    <MobileLayout activeTab={activeTab} onTabChange={setActiveTab}>
      {renderPage()}
    </MobileLayout>
  );
};

export default Index;
