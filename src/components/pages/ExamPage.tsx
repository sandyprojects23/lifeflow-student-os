import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Progress } from '@/components/ui/progress';
import { 
  GraduationCap, 
  Target, 
  Calendar,
  BookOpen,
  FileText,
  Trophy,
  Brain,
  Clock,
  TrendingUp,
  CheckCircle2,
  AlertCircle,
  Star,
  Award,
  Timer,
  BarChart3,
  Download,
  Upload,
  Zap
} from 'lucide-react';

export function ExamPage() {
  const [selectedExam, setSelectedExam] = useState('NEET');
  const [syllabusProgress, setSyllabusProgress] = useState(65);
  const [mockTestScore, setMockTestScore] = useState(78);
  
  const exams = ['NEET', 'JEE', 'UPSC', 'TNPSC', 'CBSE', 'ICSE'];
  
  const subjects = [
    { name: 'Physics', progress: 80, color: 'study-purple', topics: 45, completed: 36 },
    { name: 'Chemistry', progress: 70, color: 'study-mint', topics: 52, completed: 36 },
    { name: 'Biology', progress: 55, color: 'study-peach', topics: 60, completed: 33 },
    { name: 'Mathematics', progress: 45, color: 'study-sky', topics: 38, completed: 17 },
  ];

  const recentTests = [
    { id: 1, title: 'Physics Mock Test #5', score: 85, total: 100, date: '2 hours ago', difficulty: 'Medium' },
    { id: 2, title: 'Chemistry Quick Quiz', score: 92, total: 100, date: 'Yesterday', difficulty: 'Easy' },
    { id: 3, title: 'Biology Full Test', score: 76, total: 100, date: '2 days ago', difficulty: 'Hard' },
  ];

  return (
    <div className="p-4 space-y-6 animate-fade-in">
      {/* Header */}
      <div className="text-center space-y-2 pt-4">
        <div className="text-2xl font-display font-bold text-foreground flex items-center justify-center gap-2">
          <GraduationCap className="w-6 h-6 text-primary" />
          Exam Prep Zone
        </div>
        <p className="text-sm text-muted-foreground">
          Master your exams with AI-powered preparation 🎯
        </p>
      </div>

      {/* Exam Selection */}
      <Card className="bg-gradient-hero border-0 shadow-float text-white">
        <CardContent className="p-6">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="text-xl font-bold mb-1">Current Target</h3>
              <p className="text-white/80 text-sm">Your exam preparation journey</p>
            </div>
            <Trophy className="w-8 h-8 text-yellow-300 animate-bounce-gentle" />
          </div>
          
          <div className="grid grid-cols-3 gap-2 mb-4">
            {exams.map((exam) => (
              <Button
                key={exam}
                size="sm"
                variant={selectedExam === exam ? "secondary" : "outline"}
                className={selectedExam === exam ? "bg-white text-primary" : "bg-white/10 text-white border-white/20"}
                onClick={() => setSelectedExam(exam)}
              >
                {exam}
              </Button>
            ))}
          </div>
          
          <div className="text-center">
            <div className="text-3xl font-bold mb-1">{syllabusProgress}%</div>
            <div className="text-sm text-white/80">Syllabus Completed</div>
          </div>
        </CardContent>
      </Card>

      <Tabs defaultValue="syllabus" className="space-y-4">
        <TabsList className="grid w-full grid-cols-4 bg-muted/50">
          <TabsTrigger value="syllabus" className="flex items-center gap-1 text-xs">
            <BookOpen className="w-3 h-3" />
            Syllabus
          </TabsTrigger>
          <TabsTrigger value="tests" className="flex items-center gap-1 text-xs">
            <FileText className="w-3 h-3" />
            Mock Tests
          </TabsTrigger>
          <TabsTrigger value="questions" className="flex items-center gap-1 text-xs">
            <Brain className="w-3 h-3" />
            Questions
          </TabsTrigger>
          <TabsTrigger value="papers" className="flex items-center gap-1 text-xs">
            <Award className="w-3 h-3" />
            Papers
          </TabsTrigger>
        </TabsList>

        <TabsContent value="syllabus" className="space-y-4">
          {/* Study Plan Overview */}
          <Card className="bg-gradient-focus border-0 shadow-card">
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h3 className="text-lg font-bold text-foreground">AI Study Plan</h3>
                  <p className="text-sm text-muted-foreground">Personalized for {selectedExam}</p>
                </div>
                <Calendar className="w-6 h-6 text-primary" />
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div className="text-center">
                  <div className="text-2xl font-bold text-primary">45</div>
                  <div className="text-xs text-muted-foreground">Days Remaining</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-success">4.5h</div>
                  <div className="text-xs text-muted-foreground">Daily Target</div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Subject Progress */}
          <Card className="bg-gradient-card border-0 shadow-card">
            <CardHeader className="pb-3">
              <CardTitle className="text-lg flex items-center gap-2">
                <Target className="w-5 h-5 text-primary" />
                Subject Progress
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {subjects.map((subject) => (
                <div key={subject.name} className="space-y-2">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className={`w-3 h-3 rounded-full bg-${subject.color}`}></div>
                      <span className="font-medium">{subject.name}</span>
                    </div>
                    <div className="text-right">
                      <div className="text-sm font-medium">{subject.progress}%</div>
                      <div className="text-xs text-muted-foreground">
                        {subject.completed}/{subject.topics} topics
                      </div>
                    </div>
                  </div>
                  <Progress value={subject.progress} className="h-2" />
                </div>
              ))}
            </CardContent>
          </Card>

          {/* Today's Focus */}
          <Card className="bg-gradient-card border-0 shadow-card">
            <CardHeader className="pb-3">
              <CardTitle className="text-lg flex items-center gap-2">
                <Zap className="w-5 h-5 text-primary animate-pulse" />
                Today's Focus
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex items-center gap-3 p-3 bg-background rounded-lg border border-border/50">
                <CheckCircle2 className="w-5 h-5 text-success" />
                <div>
                  <div className="font-medium">Electromagnetic Waves</div>
                  <div className="text-xs text-muted-foreground">Physics • Completed</div>
                </div>
              </div>
              
              <div className="flex items-center gap-3 p-3 bg-background rounded-lg border border-border/50">
                <Clock className="w-5 h-5 text-warning" />
                <div>
                  <div className="font-medium">Organic Chemistry Reactions</div>
                  <div className="text-xs text-muted-foreground">Chemistry • In Progress</div>
                </div>
              </div>
              
              <div className="flex items-center gap-3 p-3 bg-background rounded-lg border border-border/50">
                <AlertCircle className="w-5 h-5 text-muted-foreground" />
                <div>
                  <div className="font-medium">Cell Division</div>
                  <div className="text-xs text-muted-foreground">Biology • Pending</div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="tests" className="space-y-4">
          {/* Test Stats */}
          <div className="grid grid-cols-3 gap-4">
            <Card className="bg-gradient-card border-0 shadow-card">
              <CardContent className="p-4 text-center">
                <div className="text-2xl font-bold text-primary">{recentTests.length}</div>
                <div className="text-xs text-muted-foreground">Tests Taken</div>
              </CardContent>
            </Card>
            
            <Card className="bg-gradient-card border-0 shadow-card">
              <CardContent className="p-4 text-center">
                <div className="text-2xl font-bold text-success">{mockTestScore}%</div>
                <div className="text-xs text-muted-foreground">Avg Score</div>
              </CardContent>
            </Card>
            
            <Card className="bg-gradient-card border-0 shadow-card">
              <CardContent className="p-4 text-center">
                <div className="text-2xl font-bold text-warning">+12</div>
                <div className="text-xs text-muted-foreground">Improvement</div>
              </CardContent>
            </Card>
          </div>

          {/* Quick Test Options */}
          <Card className="bg-gradient-focus border-0 shadow-card">
            <CardContent className="p-6">
              <h3 className="text-lg font-bold text-foreground mb-4 text-center">Quick Test</h3>
              
              <div className="grid grid-cols-3 gap-3">
                <Button variant="mint" className="h-16 flex-col gap-1">
                  <Timer className="w-5 h-5" />
                  <span className="text-xs">5 min</span>
                </Button>
                
                <Button variant="peach" className="h-16 flex-col gap-1">
                  <Timer className="w-5 h-5" />
                  <span className="text-xs">15 min</span>
                </Button>
                
                <Button variant="purple" className="h-16 flex-col gap-1">
                  <Timer className="w-5 h-5" />
                  <span className="text-xs">30 min</span>
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Recent Tests */}
          <Card className="bg-gradient-card border-0 shadow-card">
            <CardHeader className="pb-3">
              <CardTitle className="text-lg flex items-center gap-2">
                <BarChart3 className="w-5 h-5 text-primary" />
                Recent Tests
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {recentTests.map((test) => (
                <div key={test.id} className="flex items-center gap-3 p-3 bg-background rounded-lg">
                  <div className="w-12 h-12 bg-primary/20 rounded-full flex items-center justify-center">
                    <FileText className="w-6 h-6 text-primary" />
                  </div>
                  <div className="flex-1">
                    <div className="font-medium">{test.title}</div>
                    <div className="text-xs text-muted-foreground flex items-center gap-2">
                      <span>{test.date}</span>
                      <Badge variant="outline" className="text-xs">{test.difficulty}</Badge>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-lg font-bold text-success">{test.score}%</div>
                    <div className="text-xs text-muted-foreground">{test.score}/{test.total}</div>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="questions" className="space-y-4">
          {/* AI Question Generator */}
          <Card className="bg-gradient-hero border-0 shadow-float text-white">
            <CardContent className="p-6 text-center">
              <Brain className="w-12 h-12 mx-auto mb-4 animate-bounce-gentle" />
              <h3 className="text-xl font-bold mb-2">AI Question Bank</h3>
              <p className="text-white/80 mb-4 text-sm">Generate custom questions from any text or image</p>
              
              <div className="grid grid-cols-2 gap-3">
                <Button variant="secondary" className="bg-white text-primary gap-2">
                  <Upload className="w-4 h-4" />
                  Upload Text
                </Button>
                <Button variant="secondary" className="bg-white text-primary gap-2">
                  <FileText className="w-4 h-4" />
                  Scan Image
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Question Types */}
          <div className="grid grid-cols-2 gap-4">
            <Card className="bg-gradient-card border-0 shadow-card">
              <CardContent className="p-4 text-center">
                <div className="w-12 h-12 bg-study-purple/20 rounded-full flex items-center justify-center mx-auto mb-3">
                  <CheckCircle2 className="w-6 h-6 text-study-purple" />
                </div>
                <div className="font-medium mb-1">MCQs</div>
                <div className="text-xs text-muted-foreground">Multiple Choice</div>
              </CardContent>
            </Card>
            
            <Card className="bg-gradient-card border-0 shadow-card">
              <CardContent className="p-4 text-center">
                <div className="w-12 h-12 bg-study-mint/20 rounded-full flex items-center justify-center mx-auto mb-3">
                  <FileText className="w-6 h-6 text-study-mint" />
                </div>
                <div className="font-medium mb-1">Fill Blanks</div>
                <div className="text-xs text-muted-foreground">Complete Sentences</div>
              </CardContent>
            </Card>
            
            <Card className="bg-gradient-card border-0 shadow-card">
              <CardContent className="p-4 text-center">
                <div className="w-12 h-12 bg-study-peach/20 rounded-full flex items-center justify-center mx-auto mb-3">
                  <Brain className="w-6 h-6 text-study-peach" />
                </div>
                <div className="font-medium mb-1">Short Answer</div>
                <div className="text-xs text-muted-foreground">2-5 Mark Questions</div>
              </CardContent>
            </Card>
            
            <Card className="bg-gradient-card border-0 shadow-card">
              <CardContent className="p-4 text-center">
                <div className="w-12 h-12 bg-study-sky/20 rounded-full flex items-center justify-center mx-auto mb-3">
                  <Star className="w-6 h-6 text-study-sky" />
                </div>
                <div className="font-medium mb-1">Summary</div>
                <div className="text-xs text-muted-foreground">Key Points</div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="papers" className="space-y-4">
          {/* Previous Year Papers */}
          <Card className="bg-gradient-card border-0 shadow-card">
            <CardHeader className="pb-3">
              <CardTitle className="text-lg flex items-center gap-2">
                <Award className="w-5 h-5 text-primary" />
                Previous Year Papers
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {[2023, 2022, 2021, 2020].map((year) => (
                <div key={year} className="flex items-center justify-between p-3 bg-background rounded-lg">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-primary/20 rounded-lg flex items-center justify-center">
                      <span className="text-sm font-bold text-primary">{year}</span>
                    </div>
                    <div>
                      <div className="font-medium">{selectedExam} {year}</div>
                      <div className="text-xs text-muted-foreground">Complete Question Paper</div>
                    </div>
                  </div>
                  <Button size="sm" variant="outline" className="gap-2">
                    <Download className="w-3 h-3" />
                    Download
                  </Button>
                </div>
              ))}
            </CardContent>
          </Card>

          {/* Formula Sheets */}
          <Card className="bg-gradient-focus border-0 shadow-card">
            <CardContent className="p-6">
              <div className="text-center mb-4">
                <BookOpen className="w-12 h-12 mx-auto mb-3 text-foreground" />
                <h3 className="text-lg font-bold">Formula & Cheat Sheets</h3>
                <p className="text-sm text-muted-foreground">Quick reference materials</p>
              </div>
              
              <div className="grid grid-cols-2 gap-3">
                {['Physics', 'Chemistry', 'Biology', 'Math'].map((subject, index) => {
                  const colors = ['study-purple', 'study-mint', 'study-peach', 'study-sky'];
                  return (
                    <Button key={subject} variant="outline" className="h-12 flex-col gap-1">
                      <div className={`w-4 h-4 rounded bg-${colors[index]}`}></div>
                      <span className="text-xs">{subject}</span>
                    </Button>
                  );
                })}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}