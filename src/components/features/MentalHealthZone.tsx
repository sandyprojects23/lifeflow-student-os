import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Heart, 
  Smile, 
  Frown, 
  Meh, 
  Sun, 
  Cloud, 
  CloudRain,
  Wind,
  Sparkles,
  MessageCircle,
  Calendar,
  Brain,
  Flower
} from 'lucide-react';

export function MentalHealthZone() {
  const [currentMood, setCurrentMood] = useState<string>('');
  const [journalEntry, setJournalEntry] = useState('');
  const [breathingActive, setBreathingActive] = useState(false);
  const [breathingPhase, setBreathingPhase] = useState<'inhale' | 'hold' | 'exhale'>('inhale');

  const moods = [
    { id: 'amazing', label: 'Amazing', icon: Sun, color: 'text-yellow-500', bg: 'bg-yellow-100' },
    { id: 'good', label: 'Good', icon: Smile, color: 'text-green-500', bg: 'bg-green-100' },
    { id: 'okay', label: 'Okay', icon: Meh, color: 'text-blue-500', bg: 'bg-blue-100' },
    { id: 'down', label: 'Down', icon: Cloud, color: 'text-gray-500', bg: 'bg-gray-100' },
    { id: 'stressed', label: 'Stressed', icon: CloudRain, color: 'text-red-500', bg: 'bg-red-100' },
    { id: 'anxious', label: 'Anxious', icon: Wind, color: 'text-purple-500', bg: 'bg-purple-100' }
  ];

  const affirmations = [
    "You are capable of amazing things 🌟",
    "Every small step counts towards your goals 🚀", 
    "You are stronger than you know 💪",
    "Progress, not perfection, is what matters 🌱",
    "You deserve love and kindness, especially from yourself 💝",
    "This feeling is temporary, you will get through it 🌈"
  ];

  const startBreathing = () => {
    setBreathingActive(true);
    // Implement breathing exercise logic here
  };

  const saveJournalEntry = () => {
    if (journalEntry.trim()) {
      // Save to local storage or backend
      console.log('Journal entry saved:', journalEntry);
      setJournalEntry('');
      // Show success message
    }
  };

  const getCurrentAffirmation = () => {
    return affirmations[Math.floor(Math.random() * affirmations.length)];
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="text-center space-y-2">
        <div className="flex items-center justify-center gap-2 mb-2">
          <Heart className="w-8 h-8 text-pink-500 animate-pulse" />
          <Sparkles className="w-6 h-6 text-purple-500 animate-bounce" />
        </div>
        <h2 className="text-2xl font-display font-bold text-foreground">Mental Health Zone</h2>
        <p className="text-sm text-muted-foreground">Your safe space for emotional wellness</p>
      </div>

      <Tabs defaultValue="mood" className="space-y-4">
        <TabsList className="grid w-full grid-cols-4 bg-muted/50">
          <TabsTrigger value="mood" className="flex items-center gap-2">
            <Heart className="w-4 h-4" />
            Mood
          </TabsTrigger>
          <TabsTrigger value="breathing" className="flex items-center gap-2">
            <Wind className="w-4 h-4" />
            Breathe
          </TabsTrigger>
          <TabsTrigger value="journal" className="flex items-center gap-2">
            <MessageCircle className="w-4 h-4" />
            Journal
          </TabsTrigger>
          <TabsTrigger value="affirmations" className="flex items-center gap-2">
            <Sparkles className="w-4 h-4" />
            Affirm
          </TabsTrigger>
        </TabsList>

        <TabsContent value="mood" className="space-y-4">
          {/* Mood Check-in */}
          <Card className="bg-gradient-card border-0 shadow-card">
            <CardHeader className="pb-3">
              <CardTitle className="text-lg flex items-center gap-2">
                <Heart className="w-5 h-5 text-primary" />
                How are you feeling today?
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-3">
                {moods.map((mood) => {
                  const Icon = mood.icon;
                  return (
                    <Button
                      key={mood.id}
                      variant={currentMood === mood.id ? "default" : "outline"}
                      className={`h-16 flex-col gap-2 ${
                        currentMood === mood.id ? '' : 'hover:scale-105 transition-transform'
                      }`}
                      onClick={() => setCurrentMood(mood.id)}
                    >
                      <Icon className={`w-6 h-6 ${mood.color}`} />
                      <span className="text-xs">{mood.label}</span>
                    </Button>
                  );
                })}
              </div>
              
              {currentMood && (
                <div className="mt-4 p-4 bg-muted/50 rounded-lg">
                  <p className="text-sm text-muted-foreground mb-2">
                    You're feeling {moods.find(m => m.id === currentMood)?.label.toLowerCase()} today.
                  </p>
                  <p className="text-sm font-medium">
                    Remember: All feelings are valid, and this is just one moment in your journey. 💙
                  </p>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Mood History */}
          <Card className="bg-gradient-card border-0 shadow-card">
            <CardHeader className="pb-3">
              <CardTitle className="text-lg flex items-center gap-2">
                <Calendar className="w-5 h-5 text-primary" />
                This Week's Mood
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-7 gap-2">
                {['M', 'T', 'W', 'T', 'F', 'S', 'S'].map((day, index) => {
                  const moodIndex = Math.floor(Math.random() * moods.length);
                  const mood = moods[moodIndex];
                  const Icon = mood.icon;
                  
                  return (
                    <div key={day} className="text-center">
                      <div className="text-xs text-muted-foreground mb-2">{day}</div>
                      <div className={`w-10 h-10 rounded-lg ${mood.bg} flex items-center justify-center`}>
                        <Icon className={`w-5 h-5 ${mood.color}`} />
                      </div>
                    </div>
                  );
                })}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="breathing" className="space-y-4">
          {/* Breathing Exercise */}
          <Card className="bg-gradient-focus border-0 shadow-float text-white">
            <CardContent className="p-8 text-center">
              <div className="relative w-32 h-32 mx-auto mb-6">
                <div className={`w-32 h-32 rounded-full border-4 border-white/30 flex items-center justify-center transition-all duration-1000 ${
                  breathingActive ? 'scale-110 border-white/60' : 'scale-100'
                }`}>
                  <Wind className="w-12 h-12 text-white animate-pulse" />
                </div>
              </div>
              
              <h3 className="text-xl font-bold mb-2">2-Minute Breathing</h3>
              <p className="text-white/90 mb-6">
                Take a moment to center yourself with guided breathing
              </p>
              
              <Button
                onClick={startBreathing}
                variant="secondary"
                size="lg"
                className="bg-white text-primary hover:bg-white/90"
              >
                {breathingActive ? 'Breathe In... Breathe Out...' : 'Start Breathing Exercise'}
              </Button>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="journal" className="space-y-4">
          {/* Gratitude Journal */}
          <Card className="bg-gradient-card border-0 shadow-card">
            <CardHeader className="pb-3">
              <CardTitle className="text-lg flex items-center gap-2">
                <MessageCircle className="w-5 h-5 text-primary" />
                Your Private Journal
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <label className="text-sm font-medium text-foreground">
                  What's on your mind today? 💭
                </label>
                <Textarea
                  placeholder="Write about your thoughts, feelings, or things you're grateful for..."
                  value={journalEntry}
                  onChange={(e) => setJournalEntry(e.target.value)}
                  className="min-h-[120px]"
                />
              </div>
              
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Badge variant="secondary" className="text-xs">
                    <Brain className="w-3 h-3 mr-1" />
                    Private & Secure
                  </Badge>
                </div>
                <Button
                  onClick={saveJournalEntry}
                  disabled={!journalEntry.trim()}
                  className="gap-2"
                >
                  <Heart className="w-4 h-4" />
                  Save Entry
                </Button>
              </div>
              
              <div className="p-3 bg-muted/50 rounded-lg">
                <p className="text-xs text-muted-foreground">
                  💡 Tip: Regular journaling can help process emotions and reduce stress
                </p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="affirmations" className="space-y-4">
          {/* Daily Affirmations */}
          <Card className="bg-gradient-hero border-0 shadow-float text-white">
            <CardContent className="p-6 text-center">
              <Flower className="w-12 h-12 mx-auto mb-4 animate-bounce-gentle" />
              <h3 className="text-lg font-bold mb-4">Daily Affirmation</h3>
              <p className="text-lg font-medium mb-6 leading-relaxed">
                {getCurrentAffirmation()}
              </p>
              <Button
                variant="secondary"
                className="bg-white text-primary hover:bg-white/90"
                onClick={() => window.location.reload()} // Simple way to get new affirmation
              >
                New Affirmation ✨
              </Button>
            </CardContent>
          </Card>

          {/* Quick Wellness Actions */}
          <div className="grid grid-cols-2 gap-4">
            <Card className="bg-gradient-card border-0 shadow-card">
              <CardContent className="p-4 text-center">
                <Heart className="w-8 h-8 mx-auto mb-2 text-pink-500" />
                <div className="text-sm font-medium">Self-Care Reminder</div>
                <div className="text-xs text-muted-foreground">You matter! 💝</div>
              </CardContent>
            </Card>
            
            <Card className="bg-gradient-card border-0 shadow-card">
              <CardContent className="p-4 text-center">
                <Sun className="w-8 h-8 mx-auto mb-2 text-yellow-500" />
                <div className="text-sm font-medium">Positive Energy</div>
                <div className="text-xs text-muted-foreground">You've got this! ⚡</div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}