import React, { useState } from 'react';
import { Home, BookOpen, FileText, Timer, User } from 'lucide-react';
import { cn } from '@/lib/utils';

interface MobileLayoutProps {
  children: React.ReactNode;
  activeTab: string;
  onTabChange: (tab: string) => void;
}

const tabs = [
  { id: 'home', icon: Home, label: 'Home', emoji: '🏠' },
  { id: 'study', icon: BookOpen, label: 'Study', emoji: '📚' },
  { id: 'notes', icon: FileText, label: 'Notes', emoji: '📝' },
  { id: 'focus', icon: Timer, label: 'Focus', emoji: '⏳' },
  { id: 'profile', icon: User, label: 'Profile', emoji: '👤' },
];

export function MobileLayout({ children, activeTab, onTabChange }: MobileLayoutProps) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted/20 flex flex-col">
      {/* Main Content Area */}
      <main className="flex-1 pb-20 overflow-hidden">
        {children}
      </main>

      {/* Bottom Navigation */}
      <nav className="fixed bottom-0 left-0 right-0 bg-card/95 backdrop-blur-lg border-t border-border/50 shadow-float">
        <div className="flex items-center justify-around px-2 py-2">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            
            return (
              <button
                key={tab.id}
                onClick={() => onTabChange(tab.id)}
                className={cn(
                  "flex flex-col items-center gap-1 px-3 py-2 rounded-xl transition-all duration-300",
                  isActive 
                    ? "bg-primary/10 text-primary scale-110" 
                    : "text-muted-foreground hover:text-foreground hover:bg-muted/50"
                )}
              >
                <div className="relative">
                  <Icon className={cn("w-5 h-5", isActive && "animate-bounce-gentle")} />
                  {isActive && (
                    <div className="absolute -top-1 -right-1 w-2 h-2 bg-primary rounded-full animate-pulse-gentle" />
                  )}
                </div>
                <span className="text-xs font-medium">{tab.label}</span>
              </button>
            );
          })}
        </div>
      </nav>
    </div>
  );
}