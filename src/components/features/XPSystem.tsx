import React, { createContext, useContext, useState, useEffect } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Button } from '@/components/ui/button';
import { 
  Star, 
  Trophy, 
  Award, 
  Flame, 
  Crown, 
  Zap,
  Target,
  Brain,
  BookOpen,
  Timer,
  Heart,
  Sparkles,
  Gift
} from 'lucide-react';

interface XPContextType {
  xp: number;
  level: number;
  streak: number;
  badges: Badge[];
  addXP: (amount: number, activity: string) => void;
  incrementStreak: () => void;
  resetStreak: () => void;
  unlockBadge: (badgeId: string) => void;
}

interface Badge {
  id: string;
  name: string;
  description: string;
  icon: React.ReactNode;
  unlocked: boolean;
  unlockedAt?: Date;
  rarity: 'common' | 'rare' | 'epic' | 'legendary';
}

const XPContext = createContext<XPContextType | undefined>(undefined);

export const useXP = () => {
  const context = useContext(XPContext);
  if (!context) {
    throw new Error('useXP must be used within an XPProvider');
  }
  return context;
};

const allBadges: Badge[] = [
  {
    id: 'first_session',
    name: 'Getting Started',
    description: 'Complete your first focus session',
    icon: <Timer className="w-4 h-4" />,
    unlocked: false,
    rarity: 'common'
  },
  {
    id: 'note_master',
    name: 'Note Master',
    description: 'Create 10 notes',
    icon: <BookOpen className="w-4 h-4" />,
    unlocked: false,
    rarity: 'common'
  },
  {
    id: 'focus_warrior',
    name: 'Focus Warrior',
    description: 'Complete 25 focus sessions',
    icon: <Brain className="w-4 h-4" />,
    unlocked: false,
    rarity: 'rare'
  },
  {
    id: 'week_streak',
    name: 'Week Warrior',
    description: 'Maintain a 7-day streak',
    icon: <Flame className="w-4 h-4" />,
    unlocked: false,
    rarity: 'rare'
  },
  {
    id: 'scholar_supreme',
    name: 'Scholar Supreme',
    description: 'Reach level 10',
    icon: <Crown className="w-4 h-4" />,
    unlocked: false,
    rarity: 'epic'
  },
  {
    id: 'legend_learner',
    name: 'Legend Learner',
    description: 'Accumulate 10,000 XP',
    icon: <Trophy className="w-4 h-4" />,
    unlocked: false,
    rarity: 'legendary'
  }
];

export function XPProvider({ children }: { children: React.ReactNode }) {
  const [xp, setXP] = useState(2847);
  const [level, setLevel] = useState(4);
  const [streak, setStreak] = useState(12);
  const [badges, setBadges] = useState<Badge[]>(allBadges);
  const [recentActivity, setRecentActivity] = useState<string[]>([]);

  const calculateLevel = (totalXP: number) => {
    return Math.floor(totalXP / 1000) + 1;
  };

  const addXP = (amount: number, activity: string) => {
    const newXP = xp + amount;
    const newLevel = calculateLevel(newXP);
    
    setXP(newXP);
    
    if (newLevel > level) {
      setLevel(newLevel);
      // Show level up celebration
      setRecentActivity(prev => [`🎉 Level Up! You're now level ${newLevel}`, ...prev.slice(0, 4)]);
    }
    
    setRecentActivity(prev => [`+${amount} XP from ${activity}`, ...prev.slice(0, 4)]);
    
    // Check for badge unlocks
    checkBadgeUnlocks(newXP, newLevel);
  };

  const checkBadgeUnlocks = (currentXP: number, currentLevel: number) => {
    setBadges(prev => prev.map(badge => {
      if (badge.unlocked) return badge;
      
      let shouldUnlock = false;
      
      switch (badge.id) {
        case 'first_session':
          shouldUnlock = currentXP >= 25; // First session gives 25 XP
          break;
        case 'note_master':
          shouldUnlock = currentXP >= 500; // Assuming 50 XP per note
          break;
        case 'focus_warrior':
          shouldUnlock = currentXP >= 1250; // 25 sessions * 50 XP avg
          break;
        case 'week_streak':
          shouldUnlock = streak >= 7;
          break;
        case 'scholar_supreme':
          shouldUnlock = currentLevel >= 10;
          break;
        case 'legend_learner':
          shouldUnlock = currentXP >= 10000;
          break;
      }
      
      if (shouldUnlock) {
        setRecentActivity(prev => [`🏆 Badge Unlocked: ${badge.name}!`, ...prev.slice(0, 4)]);
        return { ...badge, unlocked: true, unlockedAt: new Date() };
      }
      
      return badge;
    }));
  };

  const incrementStreak = () => {
    setStreak(prev => prev + 1);
  };

  const resetStreak = () => {
    setStreak(0);
  };

  const unlockBadge = (badgeId: string) => {
    setBadges(prev => prev.map(badge => 
      badge.id === badgeId 
        ? { ...badge, unlocked: true, unlockedAt: new Date() }
        : badge
    ));
  };

  const value = {
    xp,
    level,
    streak,
    badges,
    addXP,
    incrementStreak,
    resetStreak,
    unlockBadge
  };

  return (
    <XPContext.Provider value={value}>
      {children}
      <XPNotifications activities={recentActivity} />
    </XPContext.Provider>
  );
}

function XPNotifications({ activities }: { activities: string[] }) {
  if (activities.length === 0) return null;

  return (
    <div className="fixed bottom-20 right-4 z-50 space-y-2">
      {activities.slice(0, 2).map((activity, index) => (
        <Card key={index} className="bg-gradient-hero border-0 shadow-float text-white animate-slide-up">
          <CardContent className="p-3">
            <div className="flex items-center gap-2 text-sm">
              <Sparkles className="w-4 h-4 animate-pulse" />
              {activity}
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}

export function XPDisplay() {
  const { xp, level, streak } = useXP();
  const xpToNext = 1000;
  const xpProgress = (xp % 1000) / 10;

  return (
    <Card className="bg-gradient-primary border-0 shadow-float text-white">
      <CardContent className="p-4">
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center gap-2">
            <Star className="w-5 h-5 text-yellow-300" />
            <span className="font-semibold">Level {level}</span>
          </div>
          <div className="text-sm">
            {xp % 1000} / {xpToNext} XP
          </div>
        </div>
        <div className="w-full bg-white/20 rounded-full h-2 mb-3">
          <div 
            className="bg-white h-2 rounded-full transition-all duration-500" 
            style={{ width: `${xpProgress}%` }}
          ></div>
        </div>
        <div className="flex items-center justify-between text-sm">
          <div className="flex items-center gap-1">
            <Flame className="w-4 h-4 text-orange-300" />
            <span>{streak} day streak</span>
          </div>
          <div className="flex items-center gap-1">
            <Zap className="w-4 h-4 text-yellow-300" />
            <span>{xp} total XP</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

export function BadgesDisplay() {
  const { badges } = useXP();
  const unlockedBadges = badges.filter(badge => badge.unlocked);
  const recentBadges = unlockedBadges
    .sort((a, b) => (b.unlockedAt?.getTime() || 0) - (a.unlockedAt?.getTime() || 0))
    .slice(0, 3);

  const getRarityColor = (rarity: string) => {
    switch (rarity) {
      case 'common': return 'bg-gray-500';
      case 'rare': return 'bg-blue-500';
      case 'epic': return 'bg-purple-500';
      case 'legendary': return 'bg-yellow-500';
      default: return 'bg-gray-500';
    }
  };

  return (
    <Card className="bg-gradient-card border-0 shadow-card">
      <CardContent className="p-4">
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-semibold flex items-center gap-2">
            <Trophy className="w-5 h-5 text-primary" />
            Recent Badges
          </h3>
          <Badge variant="outline">
            {unlockedBadges.length}/{badges.length}
          </Badge>
        </div>
        
        {recentBadges.length > 0 ? (
          <div className="space-y-3">
            {recentBadges.map((badge) => (
              <div key={badge.id} className="flex items-center gap-3 p-3 bg-background rounded-lg">
                <div className={`w-10 h-10 ${getRarityColor(badge.rarity)} rounded-full flex items-center justify-center text-white`}>
                  {badge.icon}
                </div>
                <div className="flex-1">
                  <div className="font-medium">{badge.name}</div>
                  <div className="text-xs text-muted-foreground">{badge.description}</div>
                </div>
                <Badge variant="outline" className="text-xs">
                  {badge.rarity}
                </Badge>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-6 text-muted-foreground">
            <Award className="w-12 h-12 mx-auto mb-3 opacity-50" />
            <p className="text-sm">Complete activities to unlock badges!</p>
          </div>
        )}
      </CardContent>
    </Card>
  );
}

export function XPLeaderboard() {
  const { xp, level } = useXP();
  
  const mockLeaderboard = [
    { name: 'You', xp, level, rank: 1, avatar: '🎯' },
    { name: 'Alex', xp: 3200, level: 5, rank: 2, avatar: '🧠' },
    { name: 'Sarah', xp: 2900, level: 4, rank: 3, avatar: '⭐' },
    { name: 'Mike', xp: 2650, level: 4, rank: 4, avatar: '🔥' },
    { name: 'Emma', xp: 2400, level: 3, rank: 5, avatar: '💎' },
  ].sort((a, b) => b.xp - a.xp);

  return (
    <Card className="bg-gradient-card border-0 shadow-card">
      <CardContent className="p-4">
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-semibold flex items-center gap-2">
            <Trophy className="w-5 h-5 text-primary" />
            Leaderboard
          </h3>
          <Badge variant="outline">This Week</Badge>
        </div>
        
        <div className="space-y-2">
          {mockLeaderboard.slice(0, 5).map((user, index) => (
            <div 
              key={user.name} 
              className={`flex items-center gap-3 p-3 rounded-lg transition-colors ${
                user.name === 'You' ? 'bg-primary/10 border border-primary/20' : 'bg-background'
              }`}
            >
              <div className="w-8 h-8 bg-primary/20 rounded-full flex items-center justify-center text-sm">
                {index < 3 ? ['🥇', '🥈', '🥉'][index] : user.avatar}
              </div>
              <div className="flex-1">
                <div className="font-medium">{user.name}</div>
                <div className="text-xs text-muted-foreground">Level {user.level}</div>
              </div>
              <div className="text-right">
                <div className="font-bold text-primary">{user.xp}</div>
                <div className="text-xs text-muted-foreground">XP</div>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}