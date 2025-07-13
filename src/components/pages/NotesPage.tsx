import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  FileText, 
  Plus, 
  Search,
  Folder,
  BookOpen,
  Download,
  Edit3,
  Star,
  Clock,
  Tag
} from 'lucide-react';
import { Input } from '@/components/ui/input';

export function NotesPage() {
  const [notes] = useState([
    { 
      id: 1, 
      title: 'Calculus Fundamentals', 
      subject: 'Mathematics', 
      content: 'Derivatives, integrals, limits...', 
      lastModified: '2 hours ago',
      starred: true,
      color: 'study-purple'
    },
    { 
      id: 2, 
      title: 'Organic Chemistry Basics', 
      subject: 'Chemistry', 
      content: 'Hydrocarbons, functional groups...', 
      lastModified: '1 day ago',
      starred: false,
      color: 'study-mint'
    },
    { 
      id: 3, 
      title: 'Wave Properties', 
      subject: 'Physics', 
      content: 'Frequency, wavelength, amplitude...', 
      lastModified: '3 days ago',
      starred: true,
      color: 'study-peach'
    },
    { 
      id: 4, 
      title: 'Essay Writing Tips', 
      subject: 'English', 
      content: 'Structure, thesis statement...', 
      lastModified: '1 week ago',
      starred: false,
      color: 'study-sky'
    },
  ]);

  const [searchTerm, setSearchTerm] = useState('');
  const filteredNotes = notes.filter(note => 
    note.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    note.subject.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const starredNotes = notes.filter(note => note.starred);
  const recentNotes = [...notes].sort((a, b) => {
    const timeOrder = { '2 hours ago': 1, '1 day ago': 2, '3 days ago': 3, '1 week ago': 4 };
    return (timeOrder[a.lastModified as keyof typeof timeOrder] || 5) - 
           (timeOrder[b.lastModified as keyof typeof timeOrder] || 5);
  });

  return (
    <div className="p-4 space-y-6 animate-fade-in">
      {/* Header */}
      <div className="text-center space-y-2 pt-4">
        <div className="text-2xl font-display font-bold text-foreground flex items-center justify-center gap-2">
          <FileText className="w-6 h-6 text-primary" />
          Smart Notes
        </div>
        <p className="text-sm text-muted-foreground">
          Capture knowledge, create understanding 📝
        </p>
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-2 gap-4">
        <Button variant="hero" size="lg" className="h-16 flex-col gap-2">
          <Plus className="w-6 h-6" />
          <span className="text-sm">New Note</span>
        </Button>
        
        <Button variant="floating" size="lg" className="h-16 flex-col gap-2">
          <Download className="w-6 h-6" />
          <span className="text-sm">Export PDF</span>
        </Button>
      </div>

      {/* Search */}
      <div className="relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
        <Input 
          placeholder="Search notes..." 
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="pl-10 bg-card border-0 shadow-card"
        />
      </div>

      <Tabs defaultValue="all" className="space-y-4">
        <TabsList className="grid w-full grid-cols-3 bg-muted/50">
          <TabsTrigger value="all" className="flex items-center gap-2">
            <FileText className="w-4 h-4" />
            All Notes
          </TabsTrigger>
          <TabsTrigger value="starred" className="flex items-center gap-2">
            <Star className="w-4 h-4" />
            Starred
          </TabsTrigger>
          <TabsTrigger value="recent" className="flex items-center gap-2">
            <Clock className="w-4 h-4" />
            Recent
          </TabsTrigger>
        </TabsList>

        <TabsContent value="all" className="space-y-4">
          {/* Stats */}
          <div className="grid grid-cols-3 gap-3">
            <Card className="bg-gradient-card border-0 shadow-card">
              <CardContent className="p-4 text-center">
                <div className="text-lg font-bold text-primary">{notes.length}</div>
                <div className="text-xs text-muted-foreground">Total Notes</div>
              </CardContent>
            </Card>
            
            <Card className="bg-gradient-card border-0 shadow-card">
              <CardContent className="p-4 text-center">
                <div className="text-lg font-bold text-warning">{starredNotes.length}</div>
                <div className="text-xs text-muted-foreground">Starred</div>
              </CardContent>
            </Card>
            
            <Card className="bg-gradient-card border-0 shadow-card">
              <CardContent className="p-4 text-center">
                <div className="text-lg font-bold text-success">4</div>
                <div className="text-xs text-muted-foreground">Subjects</div>
              </CardContent>
            </Card>
          </div>

          {/* Notes Grid */}
          <div className="space-y-3">
            {filteredNotes.map((note) => (
              <Card key={note.id} className="bg-gradient-card border-0 shadow-card hover:shadow-float transition-all duration-200">
                <CardContent className="p-4">
                  <div className="flex items-start gap-3">
                    <div className={`w-1 h-16 bg-${note.color} rounded-full flex-shrink-0`}></div>
                    
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between mb-2">
                        <h3 className="font-semibold text-foreground truncate">{note.title}</h3>
                        <div className="flex items-center gap-2 flex-shrink-0">
                          {note.starred && <Star className="w-4 h-4 text-warning fill-warning" />}
                          <Button size="icon-sm" variant="ghost">
                            <Edit3 className="w-3 h-3" />
                          </Button>
                        </div>
                      </div>
                      
                      <p className="text-sm text-muted-foreground mb-3 line-clamp-2">
                        {note.content}
                      </p>
                      
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <Badge variant="outline" className="text-xs">
                            <Tag className="w-3 h-3 mr-1" />
                            {note.subject}
                          </Badge>
                        </div>
                        <span className="text-xs text-muted-foreground flex items-center gap-1">
                          <Clock className="w-3 h-3" />
                          {note.lastModified}
                        </span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="starred" className="space-y-4">
          <div className="space-y-3">
            {starredNotes.map((note) => (
              <Card key={note.id} className="bg-gradient-card border-0 shadow-card">
                <CardContent className="p-4">
                  <div className="flex items-start gap-3">
                    <div className={`w-1 h-16 bg-${note.color} rounded-full flex-shrink-0`}></div>
                    <div className="flex-1">
                      <div className="flex items-center justify-between mb-2">
                        <h3 className="font-semibold text-foreground">{note.title}</h3>
                        <Star className="w-4 h-4 text-warning fill-warning" />
                      </div>
                      <p className="text-sm text-muted-foreground mb-3">{note.content}</p>
                      <Badge variant="outline" className="text-xs">
                        {note.subject}
                      </Badge>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="recent" className="space-y-4">
          <div className="space-y-3">
            {recentNotes.slice(0, 3).map((note) => (
              <Card key={note.id} className="bg-gradient-card border-0 shadow-card">
                <CardContent className="p-4">
                  <div className="flex items-start gap-3">
                    <div className={`w-1 h-16 bg-${note.color} rounded-full flex-shrink-0`}></div>
                    <div className="flex-1">
                      <div className="flex items-center justify-between mb-2">
                        <h3 className="font-semibold text-foreground">{note.title}</h3>
                        <span className="text-xs text-muted-foreground">{note.lastModified}</span>
                      </div>
                      <p className="text-sm text-muted-foreground mb-3">{note.content}</p>
                      <Badge variant="outline" className="text-xs">
                        {note.subject}
                      </Badge>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>
      </Tabs>

      {/* Subject Categories */}
      <Card className="bg-gradient-card border-0 shadow-card">
        <CardHeader className="pb-3">
          <CardTitle className="text-lg flex items-center gap-2">
            <Folder className="w-5 h-5 text-primary" />
            Categories
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 gap-3">
            {['Mathematics', 'Chemistry', 'Physics', 'English'].map((subject, index) => {
              const colors = ['study-purple', 'study-mint', 'study-peach', 'study-sky'];
              const noteCount = notes.filter(n => n.subject === subject).length;
              
              return (
                <div key={subject} className="flex items-center gap-3 p-3 bg-background rounded-lg hover:shadow-card transition-all duration-200">
                  <div className={`w-10 h-10 bg-${colors[index]}/20 rounded-lg flex items-center justify-center`}>
                    <BookOpen className={`w-5 h-5 text-${colors[index]}`} />
                  </div>
                  <div>
                    <div className="font-medium text-sm">{subject}</div>
                    <div className="text-xs text-muted-foreground">{noteCount} notes</div>
                  </div>
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}