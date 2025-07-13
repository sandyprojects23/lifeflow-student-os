import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Slider } from '@/components/ui/slider';
import { 
  Music, 
  Volume2, 
  VolumeX, 
  Play, 
  Pause,
  CloudRain,
  Waves,
  Wind,
  Sun,
  Moon,
  Coffee,
  Headphones,
  Radio
} from 'lucide-react';

export function StudyMoodSelector() {
  const [currentMood, setCurrentMood] = useState<string>('');
  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolume] = useState([65]);
  const [isMuted, setIsMuted] = useState(false);

  const studyMoods = [
    {
      id: 'lofi',
      name: 'Lo-Fi Chill',
      description: 'Relaxed beats for deep focus',
      icon: Coffee,
      color: 'bg-gradient-to-br from-amber-400 to-orange-500',
      textColor: 'text-white',
      tracks: ['Lofi Study Session', 'Peaceful Piano', 'Coffee Shop Vibes']
    },
    {
      id: 'phonk',
      name: 'Phonk Energy',
      description: 'High-energy beats for motivation',
      icon: Radio,
      color: 'bg-gradient-to-br from-purple-600 to-pink-600',
      textColor: 'text-white',
      tracks: ['Night Drive', 'Sigma Grindset', 'Phonk Workout']
    },
    {
      id: 'classical',
      name: 'Classical Focus',
      description: 'Timeless compositions for concentration',
      icon: Music,
      color: 'bg-gradient-to-br from-blue-500 to-indigo-600',
      textColor: 'text-white',
      tracks: ['Bach - Air on G String', 'Mozart - Piano Sonata', 'Chopin - Nocturnes']
    },
    {
      id: 'nature',
      name: 'Nature Sounds',
      description: 'Peaceful environmental audio',
      icon: CloudRain,
      color: 'bg-gradient-to-br from-green-500 to-emerald-600',
      textColor: 'text-white',
      tracks: ['Rain on Leaves', 'Ocean Waves', 'Forest Ambience']
    },
    {
      id: 'ambient',
      name: 'Ambient Space',
      description: 'Ethereal soundscapes',
      icon: Moon,
      color: 'bg-gradient-to-br from-slate-600 to-slate-800',
      textColor: 'text-white',
      tracks: ['Deep Space', 'Floating Dreams', 'Cosmic Meditation']
    },
    {
      id: 'upbeat',
      name: 'Upbeat Focus',
      description: 'Energetic tunes to stay motivated',
      icon: Sun,
      color: 'bg-gradient-to-br from-yellow-500 to-orange-500',
      textColor: 'text-white',
      tracks: ['Morning Energy', 'Positive Vibes', 'Motivation Mix']
    }
  ];

  const togglePlay = () => {
    setIsPlaying(!isPlaying);
  };

  const toggleMute = () => {
    setIsMuted(!isMuted);
  };

  const currentMoodData = studyMoods.find(mood => mood.id === currentMood);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="text-center space-y-2">
        <div className="flex items-center justify-center gap-2 mb-2">
          <Music className="w-8 h-8 text-primary animate-pulse" />
          <Headphones className="w-6 h-6 text-primary animate-bounce" />
        </div>
        <h2 className="text-2xl font-display font-bold text-foreground">Study Mood Selector</h2>
        <p className="text-sm text-muted-foreground">Set the perfect atmosphere for your learning</p>
      </div>

      {/* Current Playing */}
      {currentMood && (
        <Card className={`border-0 shadow-float ${currentMoodData?.color}`}>
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center">
                  {currentMoodData?.icon && <currentMoodData.icon className="w-6 h-6 text-white" />}
                </div>
                <div>
                  <h3 className="font-bold text-white">{currentMoodData?.name}</h3>
                  <p className="text-sm text-white/80">
                    {isPlaying ? 'Now Playing' : 'Paused'} • {currentMoodData?.tracks[0]}
                  </p>
                </div>
              </div>
              <Badge variant="secondary" className="bg-white/20 text-white">
                <Waves className="w-3 h-3 mr-1" />
                Live
              </Badge>
            </div>

            {/* Player Controls */}
            <div className="space-y-4">
              <div className="flex items-center justify-center gap-4">
                <Button
                  variant="secondary"
                  size="lg"
                  onClick={togglePlay}
                  className="w-16 h-16 rounded-full bg-white/20 hover:bg-white/30 text-white"
                >
                  {isPlaying ? <Pause className="w-6 h-6" /> : <Play className="w-6 h-6" />}
                </Button>
              </div>

              {/* Volume Control */}
              <div className="flex items-center gap-3">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={toggleMute}
                  className="text-white hover:bg-white/20"
                >
                  {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
                </Button>
                <div className="flex-1">
                  <Slider
                    value={isMuted ? [0] : volume}
                    onValueChange={setVolume}
                    max={100}
                    step={1}
                    className="w-full"
                  />
                </div>
                <span className="text-sm text-white/80 min-w-[3ch]">
                  {isMuted ? 0 : volume[0]}
                </span>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Mood Selection */}
      <Card className="bg-gradient-card border-0 shadow-card">
        <CardHeader className="pb-3">
          <CardTitle className="text-lg flex items-center gap-2">
            <Music className="w-5 h-5 text-primary" />
            Choose Your Study Vibe
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 gap-3">
            {studyMoods.map((mood) => {
              const Icon = mood.icon;
              const isActive = currentMood === mood.id;
              
              return (
                <div
                  key={mood.id}
                  className={`relative overflow-hidden rounded-lg transition-all duration-300 ${
                    isActive ? 'ring-2 ring-primary shadow-lg scale-[1.02]' : 'hover:scale-[1.01]'
                  }`}
                >
                  <Button
                    variant="ghost"
                    className={`w-full h-auto p-0 ${mood.color}`}
                    onClick={() => setCurrentMood(mood.id)}
                  >
                    <div className="flex items-center gap-4 p-4 w-full">
                      <div className="w-12 h-12 bg-white/20 rounded-lg flex items-center justify-center">
                        <Icon className="w-6 h-6 text-white" />
                      </div>
                      <div className="flex-1 text-left">
                        <h3 className="font-semibold text-white">{mood.name}</h3>
                        <p className="text-sm text-white/80">{mood.description}</p>
                      </div>
                      <div className="text-right">
                        {isActive && isPlaying ? (
                          <div className="flex items-center gap-1">
                            <div className="w-1 h-4 bg-white rounded-full animate-pulse"></div>
                            <div className="w-1 h-3 bg-white/70 rounded-full animate-pulse delay-75"></div>
                            <div className="w-1 h-5 bg-white rounded-full animate-pulse delay-150"></div>
                          </div>
                        ) : (
                          <Play className="w-5 h-5 text-white/70" />
                        )}
                      </div>
                    </div>
                  </Button>
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>

      {/* Track List */}
      {currentMood && (
        <Card className="bg-gradient-card border-0 shadow-card">
          <CardHeader className="pb-3">
            <CardTitle className="text-lg flex items-center gap-2">
              <Radio className="w-5 h-5 text-primary" />
              Playlist
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            {currentMoodData?.tracks.map((track, index) => (
              <div
                key={index}
                className={`flex items-center gap-3 p-3 rounded-lg transition-colors ${
                  index === 0 && isPlaying 
                    ? 'bg-primary/10 text-primary' 
                    : 'bg-muted/50 hover:bg-muted'
                }`}
              >
                <div className="w-8 h-8 bg-primary/20 rounded-full flex items-center justify-center">
                  {index === 0 && isPlaying ? (
                    <Pause className="w-4 h-4 text-primary" />
                  ) : (
                    <Play className="w-4 h-4 text-primary" />
                  )}
                </div>
                <div className="flex-1">
                  <div className="font-medium">{track}</div>
                  <div className="text-xs text-muted-foreground">
                    {Math.floor(Math.random() * 40 + 20)}:00
                  </div>
                </div>
                {index === 0 && isPlaying && (
                  <Badge variant="secondary" className="text-xs">
                    Playing
                  </Badge>
                )}
              </div>
            ))}
          </CardContent>
        </Card>
      )}

      {/* Quick Tips */}
      <Card className="bg-gradient-hero border-0 shadow-float text-white">
        <CardContent className="p-4">
          <div className="flex items-center gap-3">
            <Headphones className="w-6 h-6 animate-bounce-gentle" />
            <div>
              <h3 className="font-semibold">Pro Tip</h3>
              <p className="text-sm text-white/90">
                Music can boost focus by up to 65%! Find your perfect study rhythm.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}