import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  BookOpen, 
  Plus, 
  Calendar,
  Clock,
  Target,
  CheckCircle2,
  Circle,
  AlertCircle,
  TrendingUp,
  Brain
} from 'lucide-react';

export function StudyPage() {
  const [tasks, setTasks] = useState([
    { id: 1, title: 'Mathematics - Calculus Review', subject: 'Math', priority: 'high', dueTime: '2:00 PM', completed: false, color: 'study-purple' },
    { id: 2, title: 'Chemistry - Organic Compounds', subject: 'Chemistry', priority: 'medium', dueTime: '4:30 PM', completed: true, color: 'study-mint' },
    { id: 3, title: 'Physics - Wave Properties', subject: 'Physics', priority: 'high', dueTime: '6:00 PM', completed: false, color: 'study-peach' },
    { id: 4, title: 'English - Essay Writing', subject: 'English', priority: 'low', dueTime: 'Tomorrow', completed: false, color: 'study-sky' },
  ]);

  const toggleTask = (id: number) => {
    setTasks(tasks.map(task => 
      task.id === id ? { ...task, completed: !task.completed } : task
    ));
  };

  const completedCount = tasks.filter(task => task.completed).length;
  const totalCount = tasks.length;
  const progressPercentage = (completedCount / totalCount) * 100;

  return (
    <div className="p-4 space-y-6 animate-fade-in">
      {/* Header */}
      <div className="text-center space-y-2 pt-4">
        <div className="text-2xl font-display font-bold text-foreground flex items-center justify-center gap-2">
          <BookOpen className="w-6 h-6 text-primary" />
          Study Planner
        </div>
        <p className="text-sm text-muted-foreground">
          Organize your learning journey ✨
        </p>
      </div>

      {/* Progress Overview */}
      <Card className="bg-gradient-hero border-0 shadow-float text-white">
        <CardContent className="p-6">
          <div className="flex items-center justify-between mb-4">
            <div>
              <div className="text-2xl font-bold">{completedCount}/{totalCount}</div>
              <div className="text-sm text-white/80">Tasks Completed</div>
            </div>
            <div className="text-right">
              <div className="text-lg font-semibold">{Math.round(progressPercentage)}%</div>
              <div className="text-sm text-white/80">Progress</div>
            </div>
          </div>
          <div className="w-full bg-white/20 rounded-full h-2">
            <div 
              className="bg-white h-2 rounded-full transition-all duration-500" 
              style={{ width: `${progressPercentage}%` }}
            ></div>
          </div>
        </CardContent>
      </Card>

      <Tabs defaultValue="today" className="space-y-4">
        <TabsList className="grid w-full grid-cols-3 bg-muted/50">
          <TabsTrigger value="today" className="flex items-center gap-2">
            <Calendar className="w-4 h-4" />
            Today
          </TabsTrigger>
          <TabsTrigger value="week" className="flex items-center gap-2">
            <TrendingUp className="w-4 h-4" />
            This Week
          </TabsTrigger>
          <TabsTrigger value="subjects" className="flex items-center gap-2">
            <Brain className="w-4 h-4" />
            Subjects
          </TabsTrigger>
        </TabsList>

        <TabsContent value="today" className="space-y-4">
          {/* Quick Stats */}
          <div className="grid grid-cols-3 gap-3">
            <Card className="bg-gradient-card border-0 shadow-card">
              <CardContent className="p-4 text-center">
                <div className="text-lg font-bold text-primary">{tasks.filter(t => !t.completed).length}</div>
                <div className="text-xs text-muted-foreground">Pending</div>
              </CardContent>
            </Card>
            
            <Card className="bg-gradient-card border-0 shadow-card">
              <CardContent className="p-4 text-center">
                <div className="text-lg font-bold text-success">{completedCount}</div>
                <div className="text-xs text-muted-foreground">Completed</div>
              </CardContent>
            </Card>
            
            <Card className="bg-gradient-card border-0 shadow-card">
              <CardContent className="p-4 text-center">
                <div className="text-lg font-bold text-warning">{tasks.filter(t => t.priority === 'high').length}</div>
                <div className="text-xs text-muted-foreground">Priority</div>
              </CardContent>
            </Card>
          </div>

          {/* Task List */}
          <Card className="bg-gradient-card border-0 shadow-card">
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <CardTitle className="text-lg">Today's Tasks</CardTitle>
                <Button size="sm" variant="purple" className="gap-2">
                  <Plus className="w-4 h-4" />
                  Add Task
                </Button>
              </div>
            </CardHeader>
            <CardContent className="space-y-3">
              {tasks.map((task) => (
                <div 
                  key={task.id}
                  className="flex items-center gap-3 p-4 bg-background rounded-lg border border-border/50 hover:shadow-card transition-all duration-200"
                >
                  <button
                    onClick={() => toggleTask(task.id)}
                    className="flex-shrink-0"
                  >
                    {task.completed ? (
                      <CheckCircle2 className="w-5 h-5 text-success" />
                    ) : (
                      <Circle className="w-5 h-5 text-muted-foreground hover:text-primary transition-colors" />
                    )}
                  </button>
                  
                  <div className={`w-3 h-3 rounded-full bg-${task.color} flex-shrink-0`}></div>
                  
                  <div className="flex-1 min-w-0">
                    <div className={`font-medium ${task.completed ? 'line-through text-muted-foreground' : 'text-foreground'}`}>
                      {task.title}
                    </div>
                    <div className="flex items-center gap-2 mt-1">
                      <Badge variant="outline" className="text-xs">
                        {task.subject}
                      </Badge>
                      <span className="text-xs text-muted-foreground flex items-center gap-1">
                        <Clock className="w-3 h-3" />
                        {task.dueTime}
                      </span>
                    </div>
                  </div>
                  
                  <div className="flex-shrink-0">
                    {task.priority === 'high' && (
                      <AlertCircle className="w-4 h-4 text-destructive" />
                    )}
                    {task.priority === 'medium' && (
                      <AlertCircle className="w-4 h-4 text-warning" />
                    )}
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="week" className="space-y-4">
          <Card className="bg-gradient-card border-0 shadow-card">
            <CardContent className="p-6 text-center">
              <Calendar className="w-12 h-12 mx-auto mb-4 text-primary" />
              <h3 className="text-lg font-semibold mb-2">Weekly Overview</h3>
              <p className="text-muted-foreground text-sm">
                Coming soon! Plan your entire week and track progress across multiple days.
              </p>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="subjects" className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            {['Mathematics', 'Chemistry', 'Physics', 'English'].map((subject, index) => {
              const colors = ['study-purple', 'study-mint', 'study-peach', 'study-sky'];
              return (
                <Card key={subject} className="bg-gradient-card border-0 shadow-card">
                  <CardContent className="p-4 text-center">
                    <div className={`w-12 h-12 bg-${colors[index]}/20 rounded-full flex items-center justify-center mx-auto mb-3`}>
                      <BookOpen className={`w-6 h-6 text-${colors[index]}`} />
                    </div>
                    <div className="font-medium mb-1">{subject}</div>
                    <div className="text-xs text-muted-foreground">
                      {Math.floor(Math.random() * 5) + 1} tasks remaining
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}