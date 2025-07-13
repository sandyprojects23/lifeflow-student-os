import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { 
  Brain, 
  Send, 
  Sparkles, 
  MessageCircle, 
  BookOpen, 
  Clock, 
  Star,
  Lightbulb
} from 'lucide-react';

export function AiDoubtSolver() {
  const [question, setQuestion] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [chatHistory, setChatHistory] = useState([
    {
      type: 'ai',
      message: "Hi! I'm your AI study assistant. Ask me any question about Math, Science, History, or any subject. I'm here to help you learn! 🤖✨",
      timestamp: new Date().toLocaleTimeString()
    }
  ]);

  const handleAskQuestion = async () => {
    if (!question.trim()) return;

    const userMessage = {
      type: 'user',
      message: question,
      timestamp: new Date().toLocaleTimeString()
    };

    setChatHistory(prev => [...prev, userMessage]);
    setIsLoading(true);
    setQuestion('');

    // Simulate AI response
    setTimeout(() => {
      const aiResponse = {
        type: 'ai',
        message: generateAIResponse(question),
        timestamp: new Date().toLocaleTimeString()
      };
      setChatHistory(prev => [...prev, aiResponse]);
      setIsLoading(false);
    }, 1500);
  };

  const generateAIResponse = (query: string) => {
    const responses = [
      "Great question! Let me break this down for you step by step. The key concept here is understanding the fundamental principle behind this topic...",
      "I can help you with that! This is a common area where students need clarification. Here's a simple way to think about it...",
      "Excellent inquiry! This topic connects to several important concepts. Let me explain the relationship between these ideas...",
      "Perfect question for deeper learning! The answer involves understanding both the theoretical and practical aspects..."
    ];
    return responses[Math.floor(Math.random() * responses.length)];
  };

  const quickQuestions = [
    "How do I solve quadratic equations?",
    "What's the difference between speed and velocity?",
    "Explain photosynthesis simply",
    "Help with essay writing structure"
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="text-center space-y-2">
        <div className="flex items-center justify-center gap-2 mb-2">
          <Brain className="w-8 h-8 text-primary animate-pulse" />
          <Sparkles className="w-6 h-6 text-primary animate-bounce" />
        </div>
        <h2 className="text-2xl font-display font-bold text-foreground">AI Doubt Solver</h2>
        <p className="text-sm text-muted-foreground">Your personal study assistant, available 24/7</p>
      </div>

      {/* Quick Questions */}
      <Card className="bg-gradient-card border-0 shadow-card">
        <CardHeader className="pb-3">
          <CardTitle className="text-lg flex items-center gap-2">
            <Lightbulb className="w-5 h-5 text-primary" />
            Quick Questions
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-2">
          <div className="grid gap-2">
            {quickQuestions.map((q, index) => (
              <Button
                key={index}
                variant="outline"
                size="sm"
                className="justify-start h-auto p-3 text-left"
                onClick={() => setQuestion(q)}
              >
                <MessageCircle className="w-4 h-4 mr-2 flex-shrink-0" />
                <span className="text-sm">{q}</span>
              </Button>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Chat Interface */}
      <Card className="bg-gradient-card border-0 shadow-card">
        <CardHeader className="pb-3">
          <CardTitle className="text-lg flex items-center gap-2">
            <MessageCircle className="w-5 h-5 text-primary" />
            Study Chat
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {/* Chat History */}
          <div className="space-y-4 max-h-96 overflow-y-auto">
            {chatHistory.map((chat, index) => (
              <div
                key={index}
                className={`flex ${chat.type === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`max-w-[80%] rounded-lg p-3 ${
                    chat.type === 'user'
                      ? 'bg-primary text-primary-foreground'
                      : 'bg-muted text-foreground'
                  }`}
                >
                  <div className="text-sm">{chat.message}</div>
                  <div className={`text-xs mt-1 ${
                    chat.type === 'user' ? 'text-primary-foreground/70' : 'text-muted-foreground'
                  }`}>
                    {chat.timestamp}
                  </div>
                </div>
              </div>
            ))}
            
            {isLoading && (
              <div className="flex justify-start">
                <div className="bg-muted rounded-lg p-3">
                  <div className="flex items-center gap-2">
                    <div className="animate-spin w-4 h-4 border-2 border-primary border-t-transparent rounded-full"></div>
                    <span className="text-sm">AI is thinking...</span>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Input Area */}
          <div className="space-y-2">
            <Textarea
              placeholder="Ask me anything about your studies..."
              value={question}
              onChange={(e) => setQuestion(e.target.value)}
              className="min-h-[80px]"
              onKeyPress={(e) => {
                if (e.key === 'Enter' && !e.shiftKey) {
                  e.preventDefault();
                  handleAskQuestion();
                }
              }}
            />
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Badge variant="secondary" className="text-xs">
                  <Star className="w-3 h-3 mr-1" />
                  Pro AI
                </Badge>
                <span className="text-xs text-muted-foreground">Powered by advanced AI</span>
              </div>
              <Button
                onClick={handleAskQuestion}
                disabled={!question.trim() || isLoading}
                className="gap-2"
              >
                <Send className="w-4 h-4" />
                Ask AI
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* AI Features */}
      <div className="grid grid-cols-2 gap-4">
        <Card className="bg-gradient-focus border-0 shadow-card">
          <CardContent className="p-4 text-center">
            <BookOpen className="w-8 h-8 mx-auto mb-2 text-white" />
            <div className="text-sm font-medium text-white">Step-by-Step</div>
            <div className="text-xs text-white/80">Detailed explanations</div>
          </CardContent>
        </Card>
        
        <Card className="bg-gradient-primary border-0 shadow-card">
          <CardContent className="p-4 text-center">
            <Clock className="w-8 h-8 mx-auto mb-2 text-white" />
            <div className="text-sm font-medium text-white">Instant Help</div>
            <div className="text-xs text-white/80">24/7 availability</div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}