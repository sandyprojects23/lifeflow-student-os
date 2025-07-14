import React, { useState } from 'react';
import { MobileLayout } from '@/components/MobileLayout';
import { HomePage } from '@/components/pages/HomePage';
import { StudyPage } from '@/components/pages/StudyPage';
import { NotesPage } from '@/components/pages/NotesPage';
import { FocusPage } from '@/components/pages/FocusPage';
import { ExamPage } from '@/components/pages/ExamPage';
import { ProfilePage } from '@/components/pages/ProfilePage';
import { XPProvider } from '@/components/features/XPSystem';

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
      case 'exam':
        return <ExamPage />;
      case 'profile':
        return <ProfilePage />;
      default:
        return <HomePage onNavigate={setActiveTab} />;
    }
  };

  return (
    <XPProvider>
      <MobileLayout activeTab={activeTab} onTabChange={setActiveTab}>
        {renderPage()}
      </MobileLayout>
    </XPProvider>
  );
};

export default Index;
