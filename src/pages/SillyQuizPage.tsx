import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { AlertDialog, AlertDialogContent, AlertDialogHeader, AlertDialogTitle, AlertDialogDescription, AlertDialogFooter, AlertDialogAction } from '@/components/ui/alert-dialog';
import { Heart, X, CheckCircle } from 'lucide-react';

const SillyQuizPage = () => {
  const navigate = useNavigate();
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [showWrongAnswer, setShowWrongAnswer] = useState(false);
  const [wrongAnswerText, setWrongAnswerText] = useState('');
  const [score, setScore] = useState(0);

  const questions = [
    {
      question: "Who is the most dramatic one in this relationship?",
      options: ["You", "You again", "Still you"],
      correctAnswer: 2,
      wrongResponses: [
        "Excuse me?? Try again! 😂",
        "Are you kidding me right now? 🙄",
        "The audacity! Pick option C! 😤"
      ]
    },
    {
      question: "Who always wins our silly arguments?",
      options: ["Obviously you", "Definitely you", "100% you"],
      correctAnswer: 1,
      wrongResponses: [
        "Nope! I always let you win 😏",
        "Wrong! You know you always get your way 😘",
        "Try again! We both know the truth 🤭"
      ]
    },
    {
      question: "Who gives the best cuddles?",
      options: ["Me (wrong)", "You (correct!)", "Both but mostly you"],
      correctAnswer: 1,
      wrongResponses: [
        "Haha no way! You're the cuddle master! 🤗",
        "Nice try but you're the cuddle champion! 💕"
      ]
    },
    {
      question: "Who is the cutest person ever?",
      options: ["Some random person", "Definitely not you", "YOU! ❤️"],
      correctAnswer: 2,
      wrongResponses: [
        "WRONG! It's obviously you! 😍",
        "Are you blind?? Look in a mirror! 🥰",
        "The correct answer is YOU, beautiful! ✨"
      ]
    }
  ];

  const handleAnswer = (answerIndex: number) => {
    const question = questions[currentQuestion];
    
    if (answerIndex === question.correctAnswer) {
      setScore(score + 1);
      
      if (currentQuestion < questions.length - 1) {
        setTimeout(() => setCurrentQuestion(currentQuestion + 1), 1000);
      } else {
        setTimeout(() => navigate('/balloon-game'), 1500);
      }
    } else {
      const randomResponse = question.wrongResponses[Math.floor(Math.random() * question.wrongResponses.length)];
      setWrongAnswerText(randomResponse);
      setShowWrongAnswer(true);
    }
  };

  const currentQ = questions[currentQuestion];
  const progress = ((currentQuestion + 1) / questions.length) * 100;

  return (
    <div className="min-h-screen bg-gradient-to-br from-celebration/30 via-secondary/20 to-primary/30 relative overflow-hidden flex items-center justify-center px-4">
      {/* Floating Hearts */}
      <div className="absolute inset-0 pointer-events-none">
        {[...Array(10)].map((_, i) => (
          <Heart
            key={i}
            className="absolute text-primary/20 animate-pulse"
            size={20 + (i % 4) * 8}
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${i * 0.3}s`,
              animationDuration: `${2 + (i % 2)}s`
            }}
          />
        ))}
      </div>

      <Card className="bg-white/95 backdrop-blur-sm p-8 md:p-12 rounded-3xl shadow-2xl max-w-2xl text-center border-0 relative z-10">
        {/* Progress Bar */}
        <div className="w-full bg-muted rounded-full h-2 mb-8">
          <div 
            className="bg-gradient-to-r from-primary to-celebration h-2 rounded-full transition-all duration-500"
            style={{ width: `${progress}%` }}
          />
        </div>

        <div className="mb-6">
          <div className="text-4xl mb-4">🤔</div>
          <h1 className="text-2xl md:text-3xl font-bold text-primary mb-2 font-fredoka">
            Quiz Time!
          </h1>
          <p className="text-muted-foreground">
            Question {currentQuestion + 1} of {questions.length}
          </p>
        </div>
        
        <h2 className="text-xl md:text-2xl font-semibold text-secondary-foreground mb-8 font-caveat leading-relaxed">
          {currentQ.question}
        </h2>
        
        <div className="space-y-4 mb-8">
          {currentQ.options.map((option, index) => (
            <Button
              key={index}
              onClick={() => handleAnswer(index)}
              className={`w-full p-6 text-lg font-medium rounded-2xl transition-all duration-300 ${
                index === currentQ.correctAnswer 
                  ? 'bg-gradient-to-r from-celebration to-celebration-glow text-white hover:shadow-lg' 
                  : 'bg-gradient-to-r from-muted to-muted-foreground/20 text-muted-foreground hover:from-muted-foreground/30'
              }`}
              variant="outline"
            >
              <span className="mr-3 text-xl">
                {String.fromCharCode(65 + index)}.
              </span>
              {option}
            </Button>
          ))}
        </div>

        <div className="flex items-center justify-center space-x-2">
          <CheckCircle className="w-5 h-5 text-celebration" />
          <span className="text-sm text-muted-foreground font-caveat">
            Score: {score}/{questions.length}
          </span>
        </div>
      </Card>

      {/* Wrong Answer Dialog */}
      <AlertDialog open={showWrongAnswer} onOpenChange={setShowWrongAnswer}>
        <AlertDialogContent className="max-w-md">
          <AlertDialogHeader>
            <div className="text-center mb-4">
              <X className="w-16 h-16 text-destructive mx-auto animate-bounce" />
            </div>
            <AlertDialogTitle className="text-center text-2xl font-fredoka">
              Nope! 😂
            </AlertDialogTitle>
            <AlertDialogDescription className="text-center text-lg font-medium">
              {wrongAnswerText}
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogAction 
              className="w-full bg-gradient-to-r from-primary to-primary-glow text-white"
              onClick={() => setShowWrongAnswer(false)}
            >
              Try Again! 😅
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};

export default SillyQuizPage;