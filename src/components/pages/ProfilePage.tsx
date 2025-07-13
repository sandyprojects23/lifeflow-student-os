import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  User, 
  Trophy, 
  Target,
  TrendingUp,
  Calendar,
  Flame,
  Star,
  Award,
  BookOpen,
  Timer,
  Brain,
  Settings,
  Crown,
  Zap
} from 'lucide-react';

export function ProfilePage() {
  const achievements = [
    { id: 1, title: 'First Focus', description: 'Complete your first Pomodoro session', icon: Timer, unlocked: true, color: 'study-purple' },
    { id: 2, title: 'Note Taker', description: 'Create 10 notes', icon: BookOpen, unlocked: true, color: 'study-mint' },
    { id: 3, title: 'Week Warrior', description: '7 day study streak', icon: Flame, unlocked: true, color: 'study-peach' },
    { id: 4, title: 'Brain Power', description: 'Complete 50 study sessions', icon: Brain, unlocked: false, color: 'study-sky' },
    { id: 5, title: 'Master Student', description: 'Reach level 10', icon: Crown, unlocked: false, color: 'study-lavender' },
    { id: 6, title: 'Lightning Fast', description: 'Complete tasks in record time', icon: Zap, unlocked: false, color: 'warning' },
  ];

  const stats = {
    totalStudyTime: '89h 32m',
    focusSessions: 156,
    notesCreated: 42,
    tasksCompleted: 128,
    currentStreak: 7,
    level: 3,
    xp: 2340,
    xpToNext: 660
  };

  const subjects = [
    { name: 'Mathematics', progress: 85, color: 'study-purple' },
    { name: 'Chemistry', progress: 72, color: 'study-mint' },
    { name: 'Physics', progress: 68, color: 'study-peach' },
    { name: 'English', progress: 91, color: 'study-sky' },
  ];

  return (
    <div className="p-4 space-y-6 animate-fade-in">
      {/* Header */}
      <div className="text-center space-y-2 pt-4">
        <div className="text-2xl font-display font-bold text-foreground flex items-center justify-center gap-2">
          <User className="w-6 h-6 text-primary" />
          Your Profile
        </div>
        <p className="text-sm text-muted-foreground">
          Track your learning journey 🌟
        </p>
      </div>

      {/* Profile Header */}
      <Card className="bg-gradient-hero border-0 shadow-float text-white">
        <CardContent className="p-6 text-center">
          <div className="w-20 h-20 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4">
            <User className="w-10 h-10" />
          </div>
          <h2 className="text-xl font-display font-bold mb-1">Sarah Chen</h2>
          <p className="text-white/80 mb-4">Dedicated Scholar</p>
          
          <div className="flex items-center justify-center gap-4 mb-4">
            <div className="text-center">
              <div className="text-2xl font-bold">Level {stats.level}</div>
              <div className="text-xs text-white/80">Student</div>
            </div>
            <div className="w-px h-12 bg-white/20"></div>
            <div className="text-center">
              <div className="text-2xl font-bold">{stats.currentStreak}</div>
              <div className="text-xs text-white/80">Day Streak</div>
            </div>
          </div>
          
          {/* XP Progress */}
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span>XP: {stats.xp}</span>
              <span>{stats.xpToNext} to Level {stats.level + 1}</span>
            </div>
            <div className="w-full bg-white/20 rounded-full h-2">
              <div 
                className="bg-white h-2 rounded-full transition-all duration-500" 
                style={{ width: `${(stats.xp / (stats.xp + stats.xpToNext)) * 100}%` }}
              ></div>
            </div>
          </div>
        </CardContent>
      </Card>

      <Tabs defaultValue="overview" className="space-y-4">
        <TabsList className="grid w-full grid-cols-3 bg-muted/50">
          <TabsTrigger value="overview" className="flex items-center gap-2">
            <TrendingUp className="w-4 h-4" />
            Overview
          </TabsTrigger>
          <TabsTrigger value="achievements" className="flex items-center gap-2">
            <Trophy className="w-4 h-4" />
            Achievements
          </TabsTrigger>
          <TabsTrigger value="subjects" className="flex items-center gap-2">
            <BookOpen className="w-4 h-4" />
            Subjects
          </TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-4">
          {/* Quick Stats */}
          <div className="grid grid-cols-2 gap-4">
            <Card className="bg-gradient-card border-0 shadow-card">
              <CardContent className="p-4 text-center">
                <div className="flex items-center justify-center w-12 h-12 bg-study-purple/20 rounded-full mx-auto mb-2">
                  <Timer className="w-6 h-6 text-study-purple" />
                </div>
                <div className="text-lg font-bold text-study-purple">{stats.totalStudyTime}</div>
                <div className="text-xs text-muted-foreground">Total Study Time</div>
              </CardContent>
            </Card>
            
            <Card className="bg-gradient-card border-0 shadow-card">
              <CardContent className="p-4 text-center">
                <div className="flex items-center justify-center w-12 h-12 bg-study-mint/20 rounded-full mx-auto mb-2">
                  <Target className="w-6 h-6 text-study-mint" />
                </div>
                <div className="text-lg font-bold text-study-mint">{stats.focusSessions}</div>
                <div className="text-xs text-muted-foreground">Focus Sessions</div>
              </CardContent>
            </Card>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <Card className="bg-gradient-card border-0 shadow-card">
              <CardContent className="p-4 text-center">
                <div className="flex items-center justify-center w-12 h-12 bg-study-peach/20 rounded-full mx-auto mb-2">
                  <BookOpen className="w-6 h-6 text-study-peach" />
                </div>
                <div className="text-lg font-bold text-study-peach">{stats.notesCreated}</div>
                <div className="text-xs text-muted-foreground">Notes Created</div>
              </CardContent>
            </Card>
            
            <Card className="bg-gradient-card border-0 shadow-card">
              <CardContent className="p-4 text-center">
                <div className="flex items-center justify-center w-12 h-12 bg-study-sky/20 rounded-full mx-auto mb-2">
                  <Award className="w-6 h-6 text-study-sky" />
                </div>
                <div className="text-lg font-bold text-study-sky">{stats.tasksCompleted}</div>
                <div className="text-xs text-muted-foreground">Tasks Completed</div>
              </CardContent>
            </Card>
          </div>

          {/* Weekly Activity */}
          <Card className="bg-gradient-card border-0 shadow-card">
            <CardHeader className="pb-3">
              <CardTitle className="text-lg flex items-center gap-2">
                <Calendar className="w-5 h-5 text-primary" />
                Weekly Activity
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-7 gap-2">
                {['S', 'M', 'T', 'W', 'T', 'F', 'S'].map((day, index) => {
                  const activity = [3, 8, 5, 12, 9, 6, 4][index];
                  const intensity = Math.min(activity / 12, 1);
                  
                  return (
                    <div key={day} className="text-center">
                      <div className="text-xs text-muted-foreground mb-2">{day}</div>
                      <div 
                        className="w-full h-8 rounded-lg flex items-center justify-center text-xs font-medium transition-all duration-200"
                        style={{
                          backgroundColor: `hsl(var(--primary) / ${0.1 + intensity * 0.9})`,
                          color: intensity > 0.5 ? 'white' : 'hsl(var(--foreground))'
                        }}
                      >
                        {activity}
                      </div>
                    </div>
                  );
                })}
              </div>
              <div className="text-center mt-4">
                <div className="text-sm text-muted-foreground">
                  Sessions completed this week
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="achievements" className="space-y-4">
          <div className="grid gap-4">
            {achievements.map((achievement) => {
              const Icon = achievement.icon;
              return (
                <Card 
                  key={achievement.id} 
                  className={`border-0 shadow-card ${
                    achievement.unlocked 
                      ? 'bg-gradient-card' 
                      : 'bg-muted/30 opacity-60'
                  }`}
                >
                  <CardContent className="p-4">
                    <div className="flex items-center gap-4">
                      <div className={`w-12 h-12 rounded-full flex items-center justify-center ${
                        achievement.unlocked 
                          ? `bg-${achievement.color}/20` 
                          : 'bg-muted'
                      }`}>
                        <Icon className={`w-6 h-6 ${
                          achievement.unlocked 
                            ? `text-${achievement.color}` 
                            : 'text-muted-foreground'
                        }`} />
                      </div>
                      
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <h3 className="font-semibold">{achievement.title}</h3>
                          {achievement.unlocked && <Star className="w-4 h-4 text-warning fill-warning" />}
                        </div>
                        <p className="text-sm text-muted-foreground">{achievement.description}</p>
                      </div>
                      
                      {achievement.unlocked && (
                        <Badge variant="secondary" className="bg-success/10 text-success">
                          Unlocked
                        </Badge>
                      )}
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </TabsContent>

        <TabsContent value="subjects" className="space-y-4">
          <div className="space-y-4">
            {subjects.map((subject, index) => (
              <Card key={subject.name} className="bg-gradient-card border-0 shadow-card">
                <CardContent className="p-4">
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-3">
                      <div className={`w-10 h-10 bg-${subject.color}/20 rounded-lg flex items-center justify-center`}>
                        <BookOpen className={`w-5 h-5 text-${subject.color}`} />
                      </div>
                      <div>
                        <h3 className="font-semibold">{subject.name}</h3>
                        <p className="text-sm text-muted-foreground">
                          {Math.floor(Math.random() * 20) + 10} hours studied
                        </p>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-lg font-bold">{subject.progress}%</div>
                      <div className="text-xs text-muted-foreground">Complete</div>
                    </div>
                  </div>
                  
                  <div className="w-full bg-muted rounded-full h-2">
                    <div 
                      className={`bg-${subject.color} h-2 rounded-full transition-all duration-500`}
                      style={{ width: `${subject.progress}%` }}
                    ></div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Settings */}
          <Card className="bg-gradient-card border-0 shadow-card">
            <CardHeader className="pb-3">
              <CardTitle className="text-lg flex items-center gap-2">
                <Settings className="w-5 h-5 text-primary" />
                Settings
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <Button variant="outline" className="w-full justify-start">
                <User className="w-4 h-4 mr-2" />
                Edit Profile
              </Button>
              
              <Button variant="outline" className="w-full justify-start">
                <Settings className="w-4 h-4 mr-2" />
                Preferences
              </Button>
              
              <Button variant="outline" className="w-full justify-start">
                <Trophy className="w-4 h-4 mr-2" />
                Export Data
              </Button>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}