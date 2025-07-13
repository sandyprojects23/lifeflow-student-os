import React from 'react';
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
  Heart
} from 'lucide-react';

interface HomePageProps {
  onNavigate: (tab: string) => void;
}

export function HomePage({ onNavigate }: HomePageProps) {
  const currentHour = new Date().getHours();
  const greeting = currentHour < 12 ? 'Good Morning' : currentHour < 17 ? 'Good Afternoon' : 'Good Evening';
  
  return (
    <div className="p-4 space-y-6 animate-fade-in">
      {/* Header */}
      <div className="text-center space-y-2 pt-4">
        <div className="text-3xl font-display font-bold bg-gradient-hero bg-clip-text text-transparent">
          StudyVerse
        </div>
        <p className="text-lg text-muted-foreground font-medium">
          {greeting}, Scholar! ✨
        </p>
        <p className="text-sm text-muted-foreground">
          Ready to conquer your learning goals today?
        </p>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-2 gap-4">
        <Card className="bg-gradient-card border-0 shadow-card">
          <CardContent className="p-4 text-center">
            <div className="flex items-center justify-center w-12 h-12 bg-study-purple/20 rounded-full mx-auto mb-2">
              <Flame className="w-6 h-6 text-study-purple" />
            </div>
            <div className="text-2xl font-bold text-study-purple">7</div>
            <div className="text-xs text-muted-foreground">Day Streak</div>
          </CardContent>
        </Card>
        
        <Card className="bg-gradient-card border-0 shadow-card">
          <CardContent className="p-4 text-center">
            <div className="flex items-center justify-center w-12 h-12 bg-study-mint/20 rounded-full mx-auto mb-2">
              <Timer className="w-6 h-6 text-study-mint" />
            </div>
            <div className="text-2xl font-bold text-study-mint">4h 20m</div>
            <div className="text-xs text-muted-foreground">Today</div>
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

      {/* Quick Actions */}
      <Card className="bg-gradient-card border-0 shadow-card">
        <CardHeader className="pb-3">
          <CardTitle className="text-lg flex items-center gap-2">
            <Coffee className="w-5 h-5 text-primary" />
            Quick Actions
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <div className="grid grid-cols-2 gap-3">
            <Button 
              variant="focus" 
              size="lg" 
              onClick={() => onNavigate('focus')}
              className="h-16 flex-col gap-1"
            >
              <Timer className="w-5 h-5" />
              <span className="text-xs">Start Focus</span>
            </Button>
            
            <Button 
              variant="mint" 
              size="lg" 
              onClick={() => onNavigate('study')}
              className="h-16 flex-col gap-1"
            >
              <BookOpen className="w-5 h-5" />
              <span className="text-xs">Study Plan</span>
            </Button>

            <Button 
              variant="peach" 
              size="lg" 
              onClick={() => onNavigate('notes')}
              className="h-16 flex-col gap-1"
            >
              <Brain className="w-5 h-5" />
              <span className="text-xs">Take Notes</span>
            </Button>
            
            <Button 
              variant="purple" 
              size="lg" 
              onClick={() => onNavigate('profile')}
              className="h-16 flex-col gap-1"
            >
              <Award className="w-5 h-5" />
              <span className="text-xs">Progress</span>
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Motivational Section */}
      <Card className="bg-gradient-hero border-0 shadow-float text-white">
        <CardContent className="p-6 text-center">
          <Heart className="w-8 h-8 mx-auto mb-3 animate-bounce-gentle" />
          <p className="font-medium mb-2">
            "Success is the sum of small efforts repeated day in and day out."
          </p>
          <p className="text-sm text-white/80">
            - Robert Collier
          </p>
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