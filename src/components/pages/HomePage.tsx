import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { 
  BookOpen, 
  Timer, 
  Brain, 
  Target, 
  TrendingUp, 
  Calendar,
  Flame,
  Award,
  Coffee,
  Heart,
  Star,
  Zap,
  Trophy,
  Camera,
  Music,
  Gamepad2,
  FileText,
  Briefcase
} from 'lucide-react';

interface HomePageProps {
  onNavigate: (tab: string) => void;
}

export function HomePage({ onNavigate }: HomePageProps) {
  const [userName] = useState('Aarya');
  const [currentQuote, setCurrentQuote] = useState(0);
  const [xp] = useState(2847);
  const [level] = useState(4);
  const [streak] = useState(12);
  
  const motivationalQuotes = [
    "Success is the sum of small efforts repeated day in and day out. - Robert Collier",
    "The future depends on what you do today. - Mahatma Gandhi", 
    "Education is the most powerful weapon which you can use to change the world. - Nelson Mandela",
    "The expert in anything was once a beginner. - Helen Hayes",
    "Don't watch the clock; do what it does. Keep going. - Sam Levenson"
  ];

  const currentHour = new Date().getHours();
  const greeting = currentHour < 12 ? 'Good Morning' : currentHour < 17 ? 'Good Afternoon' : 'Good Evening';
  
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentQuote((prev) => (prev + 1) % motivationalQuotes.length);
    }, 10000);
    return () => clearInterval(interval);
  }, []);

  const xpToNext = 1000;
  const xpProgress = (xp % 1000) / 10;
  
  return (
    <div className="p-4 space-y-6 animate-fade-in">
      {/* Header */}
      <div className="text-center space-y-3 pt-4">
        <div className="text-3xl font-display font-bold bg-gradient-hero bg-clip-text text-transparent">
          StudyVerse
        </div>
        <div className="space-y-1">
          <p className="text-xl text-foreground font-semibold">
            Hey {userName}, let's win today! 🎯
          </p>
          <p className="text-sm text-muted-foreground">
            {greeting} • Ready to unlock your potential?
          </p>
        </div>
        
        {/* XP Progress Bar */}
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
            <div className="w-full bg-white/20 rounded-full h-2">
              <div 
                className="bg-white h-2 rounded-full transition-all duration-500" 
                style={{ width: `${xpProgress}%` }}
              ></div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-2 gap-4">
        <Card className="bg-gradient-card border-0 shadow-card animate-bounce-gentle">
          <CardContent className="p-4 text-center">
            <div className="flex items-center justify-center w-12 h-12 bg-study-peach/20 rounded-full mx-auto mb-2">
              <Flame className="w-6 h-6 text-study-peach animate-pulse" />
            </div>
            <div className="text-2xl font-bold text-study-peach">{streak}</div>
            <div className="text-xs text-muted-foreground">Day Streak 🔥</div>
          </CardContent>
        </Card>
        
        <Card className="bg-gradient-card border-0 shadow-card">
          <CardContent className="p-4 text-center">
            <div className="flex items-center justify-center w-12 h-12 bg-study-mint/20 rounded-full mx-auto mb-2">
              <Timer className="w-6 h-6 text-study-mint" />
            </div>
            <div className="text-2xl font-bold text-study-mint">6h 45m</div>
            <div className="text-xs text-muted-foreground">Today 📚</div>
          </CardContent>
        </Card>
      </div>

      {/* Today's Progress */}
      <Card className="bg-gradient-card border-0 shadow-card">
        <CardHeader className="pb-3">
          <CardTitle className="text-lg flex items-center gap-2">
            <Target className="w-5 h-5 text-primary" />
            Today's Progress
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-sm text-muted-foreground">Study Goals</span>
            <Badge variant="secondary" className="bg-success/10 text-success">3/5 Complete</Badge>
          </div>
          <div className="w-full bg-muted rounded-full h-2">
            <div className="bg-gradient-hero h-2 rounded-full w-3/5 animate-pulse-gentle"></div>
          </div>
          <div className="text-xs text-muted-foreground text-center">
            Keep going! You're doing amazing! 🎯
          </div>
        </CardContent>
      </Card>

      {/* Today's Mission */}
      <Card className="bg-gradient-focus border-0 shadow-float">
        <CardContent className="p-6 text-center">
          <div className="flex items-center justify-center w-16 h-16 bg-white/20 rounded-full mx-auto mb-4">
            <Target className="w-8 h-8 text-white animate-bounce-gentle" />
          </div>
          <h3 className="text-xl font-bold text-white mb-2">Today's Mission</h3>
          <p className="text-white/90 mb-4">Complete 3 focus sessions and review Chemistry notes</p>
          <Button variant="secondary" size="lg" className="bg-white text-primary hover:bg-white/90">
            Start Mission 🚀
          </Button>
        </CardContent>
      </Card>

      {/* Quick Actions */}
      <Card className="bg-gradient-card border-0 shadow-card">
        <CardHeader className="pb-3">
          <CardTitle className="text-lg flex items-center gap-2">
            <Zap className="w-5 h-5 text-primary animate-pulse" />
            Quick Launch
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-2 gap-3">
            <Button 
              variant="focus" 
              size="lg" 
              onClick={() => onNavigate('focus')}
              className="h-16 flex-col gap-1 group hover:scale-105 transition-transform"
            >
              <Timer className="w-5 h-5 group-hover:animate-spin" />
              <span className="text-xs">Focus Timer</span>
            </Button>
            
            <Button 
              variant="mint" 
              size="lg" 
              onClick={() => onNavigate('study')}
              className="h-16 flex-col gap-1 group hover:scale-105 transition-transform"
            >
              <BookOpen className="w-5 h-5 group-hover:animate-bounce" />
              <span className="text-xs">Study Planner</span>
            </Button>

            <Button 
              variant="peach" 
              size="lg" 
              onClick={() => onNavigate('notes')}
              className="h-16 flex-col gap-1 group hover:scale-105 transition-transform"
            >
              <Brain className="w-5 h-5 group-hover:animate-pulse" />
              <span className="text-xs">Smart Notes</span>
            </Button>
            
            <Button 
              variant="purple" 
              size="lg" 
              onClick={() => onNavigate('profile')}
              className="h-16 flex-col gap-1 group hover:scale-105 transition-transform"
            >
              <Award className="w-5 h-5 group-hover:animate-bounce" />
              <span className="text-xs">Profile</span>
            </Button>
          </div>
          
          {/* Additional Features Row */}
          <div className="grid grid-cols-4 gap-2 pt-2">
            <Button variant="outline" size="sm" className="h-12 flex-col gap-1 text-xs">
              <Camera className="w-4 h-4" />
              Snap Study
            </Button>
            <Button variant="outline" size="sm" className="h-12 flex-col gap-1 text-xs">
              <Music className="w-4 h-4" />
              Study Mood
            </Button>
            <Button variant="outline" size="sm" className="h-12 flex-col gap-1 text-xs">
              <Gamepad2 className="w-4 h-4" />
              Brain Games
            </Button>
            <Button variant="outline" size="sm" className="h-12 flex-col gap-1 text-xs">
              <Briefcase className="w-4 h-4" />
              Career Builder
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Daily Motivation */}
      <Card className="bg-gradient-hero border-0 shadow-float text-white overflow-hidden relative">
        <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -mr-16 -mt-16"></div>
        <div className="absolute bottom-0 left-0 w-24 h-24 bg-white/10 rounded-full -ml-12 -mb-12"></div>
        <CardContent className="p-6 text-center relative z-10">
          <div className="flex items-center justify-center gap-2 mb-4">
            <Heart className="w-6 h-6 animate-pulse text-pink-200" />
            <Star className="w-5 h-5 animate-bounce text-yellow-200" />
            <Heart className="w-6 h-6 animate-pulse text-pink-200" />
          </div>
          <p className="font-medium mb-3 text-lg leading-relaxed">
            "{motivationalQuotes[currentQuote].split(' - ')[0]}"
          </p>
          <p className="text-sm text-white/80 font-medium">
            - {motivationalQuotes[currentQuote].split(' - ')[1]}
          </p>
          <div className="flex justify-center mt-4 space-x-1">
            {motivationalQuotes.map((_, index) => (
              <div 
                key={index} 
                className={`w-2 h-2 rounded-full transition-all duration-300 ${
                  index === currentQuote ? 'bg-white' : 'bg-white/40'
                }`}
              />
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Upcoming Tasks Preview */}
      <Card className="bg-gradient-card border-0 shadow-card">
        <CardHeader className="pb-3">
          <CardTitle className="text-lg flex items-center gap-2">
            <Calendar className="w-5 h-5 text-primary" />
            Next Up
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <div className="space-y-2">
            <div className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
              <div className="flex items-center gap-3">
                <div className="w-3 h-3 bg-study-purple rounded-full"></div>
                <div>
                  <div className="text-sm font-medium">Mathematics Review</div>
                  <div className="text-xs text-muted-foreground">Due in 2 hours</div>
                </div>
              </div>
              <Badge variant="outline" className="text-xs">High</Badge>
            </div>
            
            <div className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
              <div className="flex items-center gap-3">
                <div className="w-3 h-3 bg-study-mint rounded-full"></div>
                <div>
                  <div className="text-sm font-medium">Chemistry Notes</div>
                  <div className="text-xs text-muted-foreground">Due tomorrow</div>
                </div>
              </div>
              <Badge variant="outline" className="text-xs">Medium</Badge>
            </div>
          </div>
          
          <Button 
            variant="outline" 
            size="sm" 
            onClick={() => onNavigate('study')}
            className="w-full"
          >
            View All Tasks
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}