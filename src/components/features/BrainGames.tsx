import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { 
  Brain, 
  Gamepad2, 
  Trophy, 
  Target, 
  Zap, 
  Star,
  Timer,
  RefreshCw,
  CheckCircle2,
  X
} from 'lucide-react';

interface MemoryCard {
  id: number;
  value: string;
  isFlipped: boolean;
  isMatched: boolean;
}

export function BrainGames() {
  const [currentGame, setCurrentGame] = useState<'memory' | 'math' | 'pattern' | null>(null);
  const [gameScore, setGameScore] = useState(0);
  const [gameTime, setGameTime] = useState(0);
  const [isGameActive, setIsGameActive] = useState(false);
  
  // Memory Game State
  const [memoryCards, setMemoryCards] = useState<MemoryCard[]>([]);
  const [flippedCards, setFlippedCards] = useState<number[]>([]);
  const [matchedPairs, setMatchedPairs] = useState(0);
  
  // Math Game State
  const [mathQuestion, setMathQuestion] = useState<{question: string, answer: number, options: number[]}>({
    question: '', answer: 0, options: []
  });
  const [mathScore, setMathScore] = useState(0);
  
  // Pattern Game State
  const [pattern, setPattern] = useState<number[]>([]);
  const [userPattern, setUserPattern] = useState<number[]>([]);
  const [showingPattern, setShowingPattern] = useState(false);
  const [patternLevel, setPatternLevel] = useState(1);

  useEffect(() => {
    let interval: NodeJS.Timeout | null = null;
    if (isGameActive) {
      interval = setInterval(() => {
        setGameTime(prev => prev + 1);
      }, 1000);
    }
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isGameActive]);

  const initMemoryGame = () => {
    const emojis = ['🧠', '🎯', '⭐', '🔥', '💡', '🎨', '🎵', '🚀'];
    const cards: MemoryCard[] = [];
    
    emojis.forEach((emoji, index) => {
      cards.push(
        { id: index * 2, value: emoji, isFlipped: false, isMatched: false },
        { id: index * 2 + 1, value: emoji, isFlipped: false, isMatched: false }
      );
    });
    
    // Shuffle cards
    const shuffled = cards.sort(() => Math.random() - 0.5);
    setMemoryCards(shuffled);
    setMatchedPairs(0);
    setFlippedCards([]);
    setGameScore(0);
    setGameTime(0);
    setIsGameActive(true);
    setCurrentGame('memory');
  };

  const flipCard = (cardId: number) => {
    if (flippedCards.length === 2 || flippedCards.includes(cardId)) return;
    
    const newFlippedCards = [...flippedCards, cardId];
    setFlippedCards(newFlippedCards);
    
    setMemoryCards(prev => prev.map(card => 
      card.id === cardId ? { ...card, isFlipped: true } : card
    ));
    
    if (newFlippedCards.length === 2) {
      const [first, second] = newFlippedCards;
      const firstCard = memoryCards.find(c => c.id === first);
      const secondCard = memoryCards.find(c => c.id === second);
      
      setTimeout(() => {
        if (firstCard?.value === secondCard?.value) {
          setMemoryCards(prev => prev.map(card => 
            (card.id === first || card.id === second) 
              ? { ...card, isMatched: true } 
              : card
          ));
          setMatchedPairs(prev => prev + 1);
          setGameScore(prev => prev + 10);
          
          if (matchedPairs + 1 === 8) {
            setIsGameActive(false);
          }
        } else {
          setMemoryCards(prev => prev.map(card => 
            (card.id === first || card.id === second) 
              ? { ...card, isFlipped: false } 
              : card
          ));
        }
        setFlippedCards([]);
      }, 1000);
    }
  };

  const generateMathQuestion = () => {
    const num1 = Math.floor(Math.random() * 20) + 1;
    const num2 = Math.floor(Math.random() * 20) + 1;
    const operations = ['+', '-', '×'];
    const operation = operations[Math.floor(Math.random() * operations.length)];
    
    let answer: number;
    let question: string;
    
    switch (operation) {
      case '+':
        answer = num1 + num2;
        question = `${num1} + ${num2}`;
        break;
      case '-':
        answer = Math.max(num1, num2) - Math.min(num1, num2);
        question = `${Math.max(num1, num2)} - ${Math.min(num1, num2)}`;
        break;
      case '×':
        answer = num1 * num2;
        question = `${num1} × ${num2}`;
        break;
      default:
        answer = num1 + num2;
        question = `${num1} + ${num2}`;
    }
    
    const wrongAnswers = [
      answer + Math.floor(Math.random() * 5) + 1,
      answer - Math.floor(Math.random() * 5) - 1,
      answer + Math.floor(Math.random() * 10) + 5
    ];
    
    const options = [answer, ...wrongAnswers].sort(() => Math.random() - 0.5);
    
    setMathQuestion({ question, answer, options });
  };

  const initMathGame = () => {
    setCurrentGame('math');
    setMathScore(0);
    setGameTime(0);
    setIsGameActive(true);
    generateMathQuestion();
  };

  const answerMathQuestion = (selectedAnswer: number) => {
    if (selectedAnswer === mathQuestion.answer) {
      setMathScore(prev => prev + 1);
      setGameScore(prev => prev + 5);
    }
    generateMathQuestion();
  };

  const initPatternGame = () => {
    setCurrentGame('pattern');
    setPatternLevel(1);
    setGameScore(0);
    setGameTime(0);
    setIsGameActive(true);
    generatePattern();
  };

  const generatePattern = () => {
    const newPattern = Array.from({ length: patternLevel + 2 }, () => 
      Math.floor(Math.random() * 4)
    );
    setPattern(newPattern);
    setUserPattern([]);
    setShowingPattern(true);
    
    setTimeout(() => {
      setShowingPattern(false);
    }, (patternLevel + 2) * 800);
  };

  const addToUserPattern = (value: number) => {
    if (showingPattern) return;
    
    const newUserPattern = [...userPattern, value];
    setUserPattern(newUserPattern);
    
    if (newUserPattern.length === pattern.length) {
      const isCorrect = newUserPattern.every((val, idx) => val === pattern[idx]);
      
      if (isCorrect) {
        setGameScore(prev => prev + patternLevel * 5);
        setPatternLevel(prev => prev + 1);
        setTimeout(() => generatePattern(), 1000);
      } else {
        setIsGameActive(false);
      }
    }
  };

  const resetGame = () => {
    setCurrentGame(null);
    setIsGameActive(false);
    setGameScore(0);
    setGameTime(0);
    setMathScore(0);
    setMatchedPairs(0);
    setPatternLevel(1);
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  if (currentGame === null) {
    return (
      <div className="space-y-6">
        <div className="text-center space-y-2">
          <div className="text-2xl font-display font-bold text-foreground flex items-center justify-center gap-2">
            <Brain className="w-6 h-6 text-primary animate-pulse" />
            Brain Games
          </div>
          <p className="text-sm text-muted-foreground">
            Train your mind with fun puzzles 🧩
          </p>
        </div>

        <div className="grid grid-cols-1 gap-4">
          <Card className="bg-gradient-hero border-0 shadow-float text-white cursor-pointer hover:scale-105 transition-transform" onClick={initMemoryGame}>
            <CardContent className="p-6 text-center">
              <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <Brain className="w-8 h-8 animate-bounce-gentle" />
              </div>
              <h3 className="text-xl font-bold mb-2">Memory Match</h3>
              <p className="text-white/80 text-sm mb-4">Match pairs of cards to improve memory</p>
              <Badge variant="secondary" className="bg-white text-primary">
                +10 XP per match
              </Badge>
            </CardContent>
          </Card>

          <Card className="bg-gradient-focus border-0 shadow-float cursor-pointer hover:scale-105 transition-transform" onClick={initMathGame}>
            <CardContent className="p-6 text-center">
              <div className="w-16 h-16 bg-foreground/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <Target className="w-8 h-8 text-foreground animate-bounce-gentle" />
              </div>
              <h3 className="text-xl font-bold mb-2 text-foreground">Quick Math</h3>
              <p className="text-muted-foreground text-sm mb-4">Solve math problems as fast as you can</p>
              <Badge variant="outline" className="border-foreground/20">
                +5 XP per answer
              </Badge>
            </CardContent>
          </Card>

          <Card className="bg-gradient-card border-0 shadow-card cursor-pointer hover:scale-105 transition-transform" onClick={initPatternGame}>
            <CardContent className="p-6 text-center">
              <div className="w-16 h-16 bg-primary/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <Zap className="w-8 h-8 text-primary animate-pulse" />
              </div>
              <h3 className="text-xl font-bold mb-2">Pattern Memory</h3>
              <p className="text-muted-foreground text-sm mb-4">Remember and repeat color patterns</p>
              <Badge variant="outline">
                Progressive difficulty
              </Badge>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Game Header */}
      <div className="flex items-center justify-between">
        <Button variant="outline" size="sm" onClick={resetGame}>
          ← Back
        </Button>
        <div className="text-center">
          <div className="text-lg font-bold text-foreground">
            {currentGame === 'memory' && 'Memory Match'}
            {currentGame === 'math' && 'Quick Math'}
            {currentGame === 'pattern' && 'Pattern Memory'}
          </div>
        </div>
        <Button variant="outline" size="sm" onClick={resetGame}>
          <RefreshCw className="w-4 h-4" />
        </Button>
      </div>

      {/* Game Stats */}
      <div className="grid grid-cols-3 gap-4">
        <Card className="bg-gradient-card border-0 shadow-card">
          <CardContent className="p-3 text-center">
            <div className="text-lg font-bold text-primary">{gameScore}</div>
            <div className="text-xs text-muted-foreground">Score</div>
          </CardContent>
        </Card>
        
        <Card className="bg-gradient-card border-0 shadow-card">
          <CardContent className="p-3 text-center">
            <div className="text-lg font-bold text-success">{formatTime(gameTime)}</div>
            <div className="text-xs text-muted-foreground">Time</div>
          </CardContent>
        </Card>
        
        <Card className="bg-gradient-card border-0 shadow-card">
          <CardContent className="p-3 text-center">
            <div className="text-lg font-bold text-warning">
              {currentGame === 'memory' && matchedPairs}
              {currentGame === 'math' && mathScore}
              {currentGame === 'pattern' && patternLevel}
            </div>
            <div className="text-xs text-muted-foreground">
              {currentGame === 'memory' && 'Pairs'}
              {currentGame === 'math' && 'Correct'}
              {currentGame === 'pattern' && 'Level'}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Memory Game */}
      {currentGame === 'memory' && (
        <Card className="bg-gradient-card border-0 shadow-card">
          <CardContent className="p-4">
            <div className="grid grid-cols-4 gap-3">
              {memoryCards.map((card) => (
                <div
                  key={card.id}
                  className={`aspect-square rounded-lg border-2 border-border flex items-center justify-center text-2xl cursor-pointer transition-all duration-300 ${
                    card.isFlipped || card.isMatched 
                      ? 'bg-primary text-primary-foreground' 
                      : 'bg-muted hover:bg-muted/80'
                  }`}
                  onClick={() => flipCard(card.id)}
                >
                  {(card.isFlipped || card.isMatched) ? card.value : '?'}
                </div>
              ))}
            </div>
            
            {matchedPairs === 8 && (
              <div className="text-center mt-4 p-4 bg-success/10 rounded-lg">
                <Trophy className="w-8 h-8 mx-auto mb-2 text-success" />
                <p className="font-bold text-success">Congratulations! 🎉</p>
                <p className="text-sm text-muted-foreground">You completed the game in {formatTime(gameTime)}</p>
              </div>
            )}
          </CardContent>
        </Card>
      )}

      {/* Math Game */}
      {currentGame === 'math' && (
        <Card className="bg-gradient-focus border-0 shadow-card">
          <CardContent className="p-6 text-center">
            <div className="text-4xl font-bold text-foreground mb-6">
              {mathQuestion.question} = ?
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              {mathQuestion.options.map((option, index) => (
                <Button
                  key={index}
                  size="lg"
                  variant={option === mathQuestion.answer ? "hero" : "outline"}
                  className="h-16 text-xl"
                  onClick={() => answerMathQuestion(option)}
                >
                  {option}
                </Button>
              ))}
            </div>
            
            <div className="mt-6 text-sm text-muted-foreground">
              Score: {mathScore} correct answers
            </div>
          </CardContent>
        </Card>
      )}

      {/* Pattern Game */}
      {currentGame === 'pattern' && (
        <Card className="bg-gradient-card border-0 shadow-card">
          <CardContent className="p-6">
            <div className="text-center mb-6">
              <h3 className="text-lg font-bold mb-2">Level {patternLevel}</h3>
              <p className="text-sm text-muted-foreground">
                {showingPattern ? 'Watch the pattern...' : 'Repeat the pattern!'}
              </p>
            </div>
            
            <div className="grid grid-cols-2 gap-4 max-w-xs mx-auto">
              {[0, 1, 2, 3].map((colorIndex) => {
                const colors = ['bg-study-purple', 'bg-study-mint', 'bg-study-peach', 'bg-study-sky'];
                const isActive = showingPattern && pattern[userPattern.length] === colorIndex;
                const isInPattern = pattern.includes(colorIndex);
                
                return (
                  <div
                    key={colorIndex}
                    className={`aspect-square rounded-lg border-2 cursor-pointer transition-all duration-200 ${
                      colors[colorIndex]
                    } ${
                      isActive ? 'scale-110 shadow-lg' : 'hover:scale-105'
                    } ${
                      !showingPattern ? 'opacity-80 hover:opacity-100' : ''
                    }`}
                    onClick={() => addToUserPattern(colorIndex)}
                  />
                );
              })}
            </div>
            
            <div className="mt-6">
              <Progress 
                value={(userPattern.length / pattern.length) * 100} 
                className="h-2"
              />
              <div className="text-center mt-2 text-sm text-muted-foreground">
                {userPattern.length} / {pattern.length}
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}