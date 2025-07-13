import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Timer, 
  Play, 
  Pause, 
  RotateCcw,
  Target,
  TrendingUp,
  Flame,
  Brain,
  Coffee,
  BookOpen,
  Settings
} from 'lucide-react';

export function FocusPage() {
  const [minutes, setMinutes] = useState(25);
  const [seconds, setSeconds] = useState(0);
  const [isActive, setIsActive] = useState(false);
  const [mode, setMode] = useState<'work' | 'break'>('work');
  const [sessions, setSessions] = useState(0);

  useEffect(() => {
    let interval: NodeJS.Timeout | null = null;
    
    if (isActive && (minutes > 0 || seconds > 0)) {
      interval = setInterval(() => {
        if (seconds > 0) {
          setSeconds(seconds - 1);
        } else if (minutes > 0) {
          setMinutes(minutes - 1);
          setSeconds(59);
        }
      }, 1000);
    } else if (isActive && minutes === 0 && seconds === 0) {
      // Timer completed
      setIsActive(false);
      if (mode === 'work') {
        setSessions(prev => prev + 1);
        setMode('break');
        setMinutes(5);
      } else {
        setMode('work');
        setMinutes(25);
      }
      setSeconds(0);
    }

    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isActive, minutes, seconds, mode]);

  const toggleTimer = () => {
    setIsActive(!isActive);
  };

  const resetTimer = () => {
    setIsActive(false);
    setMinutes(mode === 'work' ? 25 : 5);
    setSeconds(0);
  };

  const progressPercentage = mode === 'work' 
    ? ((25 * 60 - (minutes * 60 + seconds)) / (25 * 60)) * 100
    : ((5 * 60 - (minutes * 60 + seconds)) / (5 * 60)) * 100;

  return (
    <div className="p-4 space-y-6 animate-fade-in">
      {/* Header */}
      <div className="text-center space-y-2 pt-4">
        <div className="text-2xl font-display font-bold text-foreground flex items-center justify-center gap-2">
          <Timer className="w-6 h-6 text-primary" />
          Focus Timer
        </div>
        <p className="text-sm text-muted-foreground">
          Deep work mode activated 🎯
        </p>
      </div>

      {/* Timer Display */}
      <Card className="bg-gradient-focus border-0 shadow-float">
        <CardContent className="p-8 text-center">
          <div className="mb-4">
            <Badge 
              variant={mode === 'work' ? 'default' : 'secondary'} 
              className="text-sm px-4 py-1"
            >
              {mode === 'work' ? '🧠 Focus Time' : '☕ Break Time'}
            </Badge>
          </div>
          
          <div className="text-6xl font-display font-bold text-foreground mb-6">
            {String(minutes).padStart(2, '0')}:{String(seconds).padStart(2, '0')}
          </div>
          
          {/* Progress Ring */}
          <div className="relative w-32 h-32 mx-auto mb-6">
            <svg className="w-32 h-32 transform -rotate-90" viewBox="0 0 128 128">
              <circle
                cx="64"
                cy="64"
                r="56"
                stroke="currentColor"
                strokeWidth="8"
                fill="none"
                className="text-muted/20"
              />
              <circle
                cx="64"
                cy="64"
                r="56"
                stroke="currentColor"
                strokeWidth="8"
                fill="none"
                strokeDasharray={`${2 * Math.PI * 56}`}
                strokeDashoffset={`${2 * Math.PI * 56 * (1 - progressPercentage / 100)}`}
                className="text-primary transition-all duration-1000"
                strokeLinecap="round"
              />
            </svg>
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="text-lg font-semibold text-foreground">{Math.round(progressPercentage)}%</div>
            </div>
          </div>

          {/* Timer Controls */}
          <div className="flex items-center justify-center gap-4">
            <Button
              onClick={toggleTimer}
              size="lg"
              variant={isActive ? "secondary" : "hero"}
              className="w-16 h-16 rounded-full"
            >
              {isActive ? <Pause className="w-6 h-6" /> : <Play className="w-6 h-6" />}
            </Button>
            
            <Button
              onClick={resetTimer}
              size="lg"
              variant="outline"
              className="w-16 h-16 rounded-full"
            >
              <RotateCcw className="w-6 h-6" />
            </Button>
          </div>
        </CardContent>
      </Card>

      <Tabs defaultValue="stats" className="space-y-4">
        <TabsList className="grid w-full grid-cols-3 bg-muted/50">
          <TabsTrigger value="stats" className="flex items-center gap-2">
            <TrendingUp className="w-4 h-4" />
            Stats
          </TabsTrigger>
          <TabsTrigger value="sessions" className="flex items-center gap-2">
            <Target className="w-4 h-4" />
            Sessions
          </TabsTrigger>
          <TabsTrigger value="settings" className="flex items-center gap-2">
            <Settings className="w-4 h-4" />
            Settings
          </TabsTrigger>
        </TabsList>

        <TabsContent value="stats" className="space-y-4">
          {/* Today's Stats */}
          <div className="grid grid-cols-2 gap-4">
            <Card className="bg-gradient-card border-0 shadow-card">
              <CardContent className="p-4 text-center">
                <div className="flex items-center justify-center w-12 h-12 bg-study-purple/20 rounded-full mx-auto mb-2">
                  <Flame className="w-6 h-6 text-study-purple" />
                </div>
                <div className="text-2xl font-bold text-study-purple">{sessions}</div>
                <div className="text-xs text-muted-foreground">Today's Sessions</div>
              </CardContent>
            </Card>
            
            <Card className="bg-gradient-card border-0 shadow-card">
              <CardContent className="p-4 text-center">
                <div className="flex items-center justify-center w-12 h-12 bg-study-mint/20 rounded-full mx-auto mb-2">
                  <Timer className="w-6 h-6 text-study-mint" />
                </div>
                <div className="text-2xl font-bold text-study-mint">{sessions * 25}m</div>
                <div className="text-xs text-muted-foreground">Focus Time</div>
              </CardContent>
            </Card>
          </div>

          {/* Weekly Progress */}
          <Card className="bg-gradient-card border-0 shadow-card">
            <CardHeader className="pb-3">
              <CardTitle className="text-lg flex items-center gap-2">
                <TrendingUp className="w-5 h-5 text-primary" />
                This Week
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-7 gap-2">
                {['S', 'M', 'T', 'W', 'T', 'F', 'S'].map((day, index) => (
                  <div key={day} className="text-center">
                    <div className="text-xs text-muted-foreground mb-2">{day}</div>
                    <div 
                      className={`w-8 h-8 rounded-lg flex items-center justify-center text-xs font-medium ${
                        index === 3 ? 'bg-primary text-primary-foreground' : 'bg-muted text-muted-foreground'
                      }`}
                    >
                      {index === 3 ? sessions : Math.floor(Math.random() * 8)}
                    </div>
                  </div>
                ))}
              </div>
              <div className="text-center">
                <div className="text-sm text-muted-foreground">
                  Average: 4.2 sessions per day
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="sessions" className="space-y-4">
          <Card className="bg-gradient-card border-0 shadow-card">
            <CardHeader className="pb-3">
              <CardTitle className="text-lg flex items-center gap-2">
                <Target className="w-5 h-5 text-primary" />
                Today's Sessions
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {Array.from({ length: sessions }, (_, i) => (
                <div key={i} className="flex items-center gap-3 p-3 bg-background rounded-lg">
                  <div className="w-8 h-8 bg-success/20 rounded-full flex items-center justify-center">
                    <Brain className="w-4 h-4 text-success" />
                  </div>
                  <div>
                    <div className="text-sm font-medium">Focus Session #{i + 1}</div>
                    <div className="text-xs text-muted-foreground">25 minutes • Completed</div>
                  </div>
                </div>
              ))}
              
              {sessions === 0 && (
                <div className="text-center py-8 text-muted-foreground">
                  <Coffee className="w-12 h-12 mx-auto mb-3 opacity-50" />
                  <p>Start your first focus session!</p>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Motivational Card */}
          <Card className="bg-gradient-hero border-0 shadow-float text-white">
            <CardContent className="p-6 text-center">
              <Brain className="w-8 h-8 mx-auto mb-3 animate-bounce-gentle" />
              <p className="font-medium mb-2">
                "Focus is not about forcing concentration, but about removing distractions."
              </p>
              <p className="text-sm text-white/80">
                Keep up the great work! 🌟
              </p>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="settings" className="space-y-4">
          <Card className="bg-gradient-card border-0 shadow-card">
            <CardHeader className="pb-3">
              <CardTitle className="text-lg">Timer Settings</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-sm">Focus Time</span>
                  <div className="flex gap-2">
                    <Button size="sm" variant="outline" onClick={() => setMinutes(25)}>25m</Button>
                    <Button size="sm" variant="outline" onClick={() => setMinutes(45)}>45m</Button>
                    <Button size="sm" variant="outline" onClick={() => setMinutes(60)}>60m</Button>
                  </div>
                </div>
                
                <div className="flex items-center justify-between">
                  <span className="text-sm">Break Time</span>
                  <div className="flex gap-2">
                    <Button size="sm" variant="outline">5m</Button>
                    <Button size="sm" variant="outline">10m</Button>
                    <Button size="sm" variant="outline">15m</Button>
                  </div>
                </div>
                
                <div className="flex items-center justify-between">
                  <span className="text-sm">Sound Alerts</span>
                  <Button size="sm" variant="secondary">On</Button>
                </div>
                
                <div className="flex items-center justify-between">
                  <span className="text-sm">Auto Start Breaks</span>
                  <Button size="sm" variant="outline">Off</Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}