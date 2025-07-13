import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Briefcase, 
  User, 
  GraduationCap, 
  Award, 
  Target,
  TrendingUp,
  Download,
  Share,
  Star,
  Lightbulb,
  Rocket,
  Crown,
  FileText
} from 'lucide-react';

export function CareerBuilder() {
  const [profile, setProfile] = useState({
    name: '',
    email: '',
    phone: '',
    summary: '',
    skills: [] as string[],
    education: [] as any[],
    experience: [] as any[]
  });

  const [careerLevel] = useState('Explorer'); // Explorer → Leader → Legend
  const [skillInput, setSkillInput] = useState('');

  const careerSuggestions = [
    {
      title: 'Software Developer',
      match: '92%',
      reason: 'Based on your programming skills and logical thinking',
      skills: ['Python', 'JavaScript', 'Problem Solving'],
      color: 'bg-blue-500'
    },
    {
      title: 'Data Scientist',
      match: '87%',
      reason: 'Your math background and analytical skills are perfect',
      skills: ['Statistics', 'Python', 'Research'],
      color: 'bg-green-500'
    },
    {
      title: 'Product Manager',
      match: '79%',
      reason: 'Great communication and strategic thinking abilities',
      skills: ['Leadership', 'Strategy', 'Communication'],
      color: 'bg-purple-500'
    }
  ];

  const addSkill = () => {
    if (skillInput.trim() && !profile.skills.includes(skillInput.trim())) {
      setProfile(prev => ({
        ...prev,
        skills: [...prev.skills, skillInput.trim()]
      }));
      setSkillInput('');
    }
  };

  const removeSkill = (skill: string) => {
    setProfile(prev => ({
      ...prev,
      skills: prev.skills.filter(s => s !== skill)
    }));
  };

  const generateResume = () => {
    // Generate PDF resume logic here
    console.log('Generating resume...', profile);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="text-center space-y-2">
        <div className="flex items-center justify-center gap-2 mb-2">
          <Briefcase className="w-8 h-8 text-primary animate-pulse" />
          <Rocket className="w-6 h-6 text-primary animate-bounce" />
        </div>
        <h2 className="text-2xl font-display font-bold text-foreground">FutureMe Career Builder</h2>
        <p className="text-sm text-muted-foreground">Build your professional profile and discover your path</p>
      </div>

      {/* Career Level */}
      <Card className="bg-gradient-hero border-0 shadow-float text-white">
        <CardContent className="p-6 text-center">
          <div className="flex items-center justify-center gap-2 mb-4">
            <Crown className="w-8 h-8 text-yellow-300" />
            <Star className="w-6 h-6 text-yellow-200 animate-pulse" />
          </div>
          <h3 className="text-xl font-bold mb-2">Career Level: {careerLevel}</h3>
          <p className="text-white/90 mb-4">You're building your professional foundation</p>
          <div className="w-full bg-white/20 rounded-full h-2">
            <div className="bg-white h-2 rounded-full w-1/3 transition-all duration-500"></div>
          </div>
          <p className="text-sm text-white/80 mt-2">Complete your profile to level up!</p>
        </CardContent>
      </Card>

      <Tabs defaultValue="profile" className="space-y-4">
        <TabsList className="grid w-full grid-cols-4 bg-muted/50">
          <TabsTrigger value="profile" className="flex items-center gap-2">
            <User className="w-4 h-4" />
            Profile
          </TabsTrigger>
          <TabsTrigger value="suggestions" className="flex items-center gap-2">
            <Lightbulb className="w-4 h-4" />
            AI Suggestions
          </TabsTrigger>
          <TabsTrigger value="resume" className="flex items-center gap-2">
            <FileText className="w-4 h-4" />
            Resume
          </TabsTrigger>
          <TabsTrigger value="growth" className="flex items-center gap-2">
            <TrendingUp className="w-4 h-4" />
            Growth
          </TabsTrigger>
        </TabsList>

        <TabsContent value="profile" className="space-y-4">
          {/* Basic Info */}
          <Card className="bg-gradient-card border-0 shadow-card">
            <CardHeader className="pb-3">
              <CardTitle className="text-lg flex items-center gap-2">
                <User className="w-5 h-5 text-primary" />
                Personal Information
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 gap-4">
                <Input
                  placeholder="Full Name"
                  value={profile.name}
                  onChange={(e) => setProfile(prev => ({ ...prev, name: e.target.value }))}
                />
                <Input
                  placeholder="Email Address"
                  type="email"
                  value={profile.email}
                  onChange={(e) => setProfile(prev => ({ ...prev, email: e.target.value }))}
                />
                <Input
                  placeholder="Phone Number"
                  value={profile.phone}
                  onChange={(e) => setProfile(prev => ({ ...prev, phone: e.target.value }))}
                />
                <Textarea
                  placeholder="Professional Summary (What makes you unique?)"
                  value={profile.summary}
                  onChange={(e) => setProfile(prev => ({ ...prev, summary: e.target.value }))}
                  className="min-h-[100px]"
                />
              </div>
            </CardContent>
          </Card>

          {/* Skills */}
          <Card className="bg-gradient-card border-0 shadow-card">
            <CardHeader className="pb-3">
              <CardTitle className="text-lg flex items-center gap-2">
                <Award className="w-5 h-5 text-primary" />
                Skills & Abilities
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex gap-2">
                <Input
                  placeholder="Add a skill (e.g., Python, Leadership, Design)"
                  value={skillInput}
                  onChange={(e) => setSkillInput(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && addSkill()}
                />
                <Button onClick={addSkill} disabled={!skillInput.trim()}>
                  Add
                </Button>
              </div>
              
              <div className="flex flex-wrap gap-2">
                {profile.skills.map((skill, index) => (
                  <Badge
                    key={index}
                    variant="secondary"
                    className="cursor-pointer hover:bg-destructive hover:text-destructive-foreground"
                    onClick={() => removeSkill(skill)}
                  >
                    {skill} ×
                  </Badge>
                ))}
              </div>
              
              {profile.skills.length === 0 && (
                <p className="text-sm text-muted-foreground">
                  Add your skills to get personalized career suggestions
                </p>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="suggestions" className="space-y-4">
          {/* AI Career Suggestions */}
          <Card className="bg-gradient-card border-0 shadow-card">
            <CardHeader className="pb-3">
              <CardTitle className="text-lg flex items-center gap-2">
                <Lightbulb className="w-5 h-5 text-primary" />
                AI Career Recommendations
              </CardTitle>
            </CardHeader>
            <CardContent className="text-center py-6">
              <Lightbulb className="w-12 h-12 mx-auto mb-4 text-muted-foreground" />
              <p className="text-muted-foreground">
                Complete your profile to get personalized career suggestions powered by AI
              </p>
            </CardContent>
          </Card>

          {/* Sample Suggestions */}
          <div className="space-y-3">
            {careerSuggestions.map((suggestion, index) => (
              <Card key={index} className="bg-gradient-card border-0 shadow-card">
                <CardContent className="p-4">
                  <div className="flex items-center gap-4">
                    <div className={`w-12 h-12 ${suggestion.color} rounded-lg flex items-center justify-center`}>
                      <Briefcase className="w-6 h-6 text-white" />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <h3 className="font-semibold">{suggestion.title}</h3>
                        <Badge variant="secondary" className="bg-primary/10 text-primary">
                          {suggestion.match} Match
                        </Badge>
                      </div>
                      <p className="text-sm text-muted-foreground mb-2">{suggestion.reason}</p>
                      <div className="flex flex-wrap gap-1">
                        {suggestion.skills.map((skill, skillIndex) => (
                          <Badge key={skillIndex} variant="outline" className="text-xs">
                            {skill}
                          </Badge>
                        ))}
                      </div>
                    </div>
                    <Button variant="outline" size="sm">
                      Learn More
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="resume" className="space-y-4">
          {/* Resume Builder */}
          <Card className="bg-gradient-focus border-0 shadow-float text-white">
            <CardContent className="p-6 text-center">
              <FileText className="w-12 h-12 mx-auto mb-4 animate-bounce-gentle" />
              <h3 className="text-xl font-bold mb-2">Professional Resume</h3>
              <p className="text-white/90 mb-6">
                Generate a clean, ATS-friendly resume from your profile
              </p>
              <div className="flex gap-3 justify-center">
                <Button
                  variant="secondary"
                  className="bg-white text-primary hover:bg-white/90"
                  onClick={generateResume}
                >
                  <Download className="w-4 h-4 mr-2" />
                  Generate PDF
                </Button>
                <Button
                  variant="secondary"
                  className="bg-white/20 hover:bg-white/30 text-white"
                >
                  <Share className="w-4 h-4 mr-2" />
                  Share Link
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Resume Preview */}
          <Card className="bg-gradient-card border-0 shadow-card">
            <CardHeader className="pb-3">
              <CardTitle className="text-lg">Resume Preview</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="bg-white border rounded-lg p-6 text-black">
                <div className="text-center mb-6">
                  <h2 className="text-2xl font-bold">{profile.name || 'Your Name'}</h2>
                  <p className="text-gray-600">{profile.email || 'your.email@example.com'}</p>
                  <p className="text-gray-600">{profile.phone || 'Your Phone Number'}</p>
                </div>
                
                {profile.summary && (
                  <div className="mb-6">
                    <h3 className="text-lg font-bold border-b mb-2">Summary</h3>
                    <p className="text-gray-700">{profile.summary}</p>
                  </div>
                )}
                
                {profile.skills.length > 0 && (
                  <div className="mb-6">
                    <h3 className="text-lg font-bold border-b mb-2">Skills</h3>
                    <div className="flex flex-wrap gap-2">
                      {profile.skills.map((skill, index) => (
                        <span key={index} className="bg-gray-200 px-3 py-1 rounded text-sm">
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="growth" className="space-y-4">
          {/* Career Growth Path */}
          <Card className="bg-gradient-card border-0 shadow-card">
            <CardHeader className="pb-3">
              <CardTitle className="text-lg flex items-center gap-2">
                <TrendingUp className="w-5 h-5 text-primary" />
                Career Growth Path
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-4">
                {['Explorer', 'Leader', 'Legend'].map((level, index) => {
                  const isActive = level === careerLevel;
                  const isCompleted = ['Explorer'].includes(level);
                  
                  return (
                    <div key={level} className="flex items-center gap-4">
                      <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                        isCompleted ? 'bg-success text-success-foreground' :
                        isActive ? 'bg-primary text-primary-foreground' :
                        'bg-muted text-muted-foreground'
                      }`}>
                        {isCompleted ? '✓' : index + 1}
                      </div>
                      <div className="flex-1">
                        <h4 className="font-semibold">{level}</h4>
                        <p className="text-sm text-muted-foreground">
                          {level === 'Explorer' && 'Building foundation skills'}
                          {level === 'Leader' && 'Developing leadership abilities'}
                          {level === 'Legend' && 'Mastering your craft'}
                        </p>
                      </div>
                      {isActive && (
                        <Badge variant="secondary" className="bg-primary/10 text-primary">
                          Current
                        </Badge>
                      )}
                    </div>
                  );
                })}
              </div>
            </CardContent>
          </Card>

          {/* Next Steps */}
          <Card className="bg-gradient-hero border-0 shadow-float text-white">
            <CardContent className="p-6">
              <Target className="w-8 h-8 mb-4 animate-bounce-gentle" />
              <h3 className="text-lg font-bold mb-2">Next Steps to Level Up</h3>
              <ul className="space-y-2 text-sm">
                <li>• Complete your profile information</li>
                <li>• Add 5+ relevant skills</li>
                <li>• Generate your first resume</li>
                <li>• Explore career suggestions</li>
              </ul>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}