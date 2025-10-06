import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { AlertDialog, AlertDialogContent, AlertDialogHeader, AlertDialogTitle, AlertDialogDescription, AlertDialogFooter, AlertDialogAction } from '@/components/ui/alert-dialog';
import { Heart, X, CheckCircle, Star, Sparkles, Music, Coffee, Cake, Gift } from 'lucide-react';

const SillyQuizPage = () => {
  const navigate = useNavigate();
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [showWrongAnswer, setShowWrongAnswer] = useState(false);
  const [wrongAnswerText, setWrongAnswerText] = useState('');
  const [score, setScore] = useState(0);
  const [showCorrectAnimation, setShowCorrectAnimation] = useState(false);
  const [emoji, setEmoji] = useState('🤔');

  // Emoji that changes based on the question
  const questionEmojis = ['🥰', '🤣', '🤗', '🌟', '🍕', '🦄', '💤'];

  useEffect(() => {
    setEmoji(questionEmojis[currentQuestion % questionEmojis.length]);
  }, [currentQuestion]);

  const questions = [
    {
      question: "What’s your ultimate guilty pleasure?",
      options: [
        "A scoop (or five) of ice cream 🍦",
        "Running marathons 🏃",
        "Driving fast cars 🚗"
      ],
      correctAnswer: 0,
      wrongResponses: [
        "Nope, you only run to the freezer! 🥶",
        "Try again—you prefer scoops over speed! 🍨",
        "Close, but horsepower can’t beat sprinkles! ✨"
      ],
      correctResponse: "Correct! Ice cream is basically your love language. 🍦💕"
    },
    {
      question: "If you were a Disney character, who would you be?",
      options: [
        "Sleeping Beauty (but only the sleeping part) 😴",
        "Dory (because you forget everything) 🐠",
        "Olaf (weirdly obsessed with warm hugs) ☃️"
      ],
      correctAnswer: 0,
      wrongResponses: [
        "You wish you could sleep that much! 😴",
        "Nope, you remember every embarrassing thing ever done! 🫣",
        "Almost, but your hugs come with punches, not snowflakes! 🥊☃️"
      ],
      correctResponse: "Correct! You *are* Sleeping Beauty — and the sleeping part suits you perfectly. 🙄💤"
    },
    {
      question: "What’s your perfect morning combo?",
      options: [
        "Krispy Kreme donuts + coffee ☕🍩",
        "Banana cake and tea 🍌🍰",
        "Skipping breakfast altogether 🙅"
      ],
      correctAnswer: 0,
      wrongResponses: [
        "Almost—but banana cake is more of a treat than your daily ritual! 🎂",
        "Nope, skipping breakfast? You’d rather power through leg day first! 🏋️‍♀️",
        "Not quite, donuts and coffee are your true morning power-up! ⚡"
      ],
      correctResponse: "Yes! Donuts and coffee = instant happiness for you. ☕🍩✨"
    },
    {
      question: "What’s your idea of the best date night?",
      options: [
        "Going on long drives 🚗",
        "Movie + chill at home 🎬",
        "Riding bikes around the city 🚴"
      ],
      correctAnswer: 1,
      wrongResponses: [
        "Close, you do enjoy long drives, but nothing beats a cozy movie night at home! 🍿💖",
        "Haha, bikes aren’t your vibe—give you a couch and snacks any day! 🚲❌",
      "Almost, long drives are fun, but your heart belongs to movie + chill. 🎬❤️"
      ],
      correctResponse: "Exactly! Movie nights at home, snacks, and cuddles = your ultimate date night. 🎬🍫🥰"
    },
    {
      question: "Your favorite sport is…",
      options: [
        "Beating your boyfriend (me) 🥊",
        "Collecting shiny earrings 💎",
        "Out-drinking with everyone at the bar 🍷"
      ],
      correctAnswer: 1,
      wrongResponses: [
        "Close, only if it weren't for earrings 💎",
        "Natural-born drinker, accidental earring collector. 🍷✨",
        "Almost, but your sparkle comes from earrings, not empty wine glasses! 🍷✨"
      ],
      correctResponse: "Correct! Your earring collection deserves its own trophy case — one sparkle for every mood. 💎👑"
    }


  ];

  const handleAnswer = (answerIndex: number) => {
    const question = questions[currentQuestion];
    
    if (answerIndex === question.correctAnswer) {
      setScore(score + 1);
      setShowCorrectAnimation(true);
      
      setTimeout(() => {
        setShowCorrectAnimation(false);
        if (currentQuestion < questions.length - 1) {
          setCurrentQuestion(currentQuestion + 1);
        } else {
          navigate('/balloon-game');
        }
      }, 1500);
    } else {
      const randomResponse = question.wrongResponses[Math.floor(Math.random() * question.wrongResponses.length)];
      setWrongAnswerText(randomResponse);
      setShowWrongAnswer(true);
    }
  };

  const currentQ = questions[currentQuestion];
  const progress = ((currentQuestion + 1) / questions.length) * 100;

  // Random floating icons
  const floatingIcons = [Heart, Star, Sparkles, Music, Coffee, Cake, Gift];

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 via-stone-100 to-amber-100 relative overflow-hidden flex items-center justify-center px-4">
      {/* Floating Icons */}
      <div className="absolute inset-0 pointer-events-none">
        {[...Array(15)].map((_, i) => {
          const IconComponent = floatingIcons[i % floatingIcons.length];
          return (
            <IconComponent
              key={i}
              className="absolute text-amber-700/20 animate-float"
              size={15 + (i % 5) * 8}
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animationDelay: `${i * 0.4}s`,
                animationDuration: `${3 + (i % 3)}s`,
                opacity: 0.7,
                color: i % 3 === 0 ? '#d4a574' : i % 3 === 1 ? '#a68a7b' : '#e8c39e'
              }}
            />
          );
        })}
      </div>

      <Card className="bg-white/95 backdrop-blur-sm p-8 md:p-12 rounded-3xl shadow-2xl max-w-2xl text-center border-0 relative z-10 transform transition-all duration-500 hover:shadow-amber-700/20 hover:shadow-xl border border-amber-200/50">
        {/* Progress Bar */}
        <div className="w-full bg-stone-200 rounded-full h-3 mb-8 overflow-hidden">
          <div 
            className="bg-gradient-to-r from-amber-700 via-amber-600 to-amber-500 h-3 rounded-full transition-all duration-700 ease-out"
            style={{ width: `${progress}%` }}
          />
        </div>

        <div className="mb-8 transform transition-all duration-300">
          <div className="text-5xl mb-4 animate-bounce">{emoji}</div>
          <h1 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-amber-800 to-amber-600 bg-clip-text text-transparent mb-2 font-mono">
            The Silly Love Quiz!
          </h1>
          <p className="text-amber-700/70 text-lg">
            Question {currentQuestion + 1} of {questions.length}
          </p>
        </div>
        
        <h2 className="text-xl md:text-2xl font-semibold text-amber-800 mb-8 leading-relaxed bg-amber-50/70 p-4 rounded-xl font-mono">
          {currentQ.question}
        </h2>
        
        <div className="space-y-4 mb-8">
          {currentQ.options.map((option, index) => (
            <Button
              key={index}
              onClick={() => handleAnswer(index)}
              className={`w-full p-6 text-lg font-medium rounded-2xl transition-all duration-300 hover:scale-105 hover:shadow-lg ${
                index === currentQ.correctAnswer 
                  ? 'bg-gradient-to-r from-amber-700 to-amber-600 text-amber-50' 
                  : 'bg-gradient-to-r from-stone-200/70 to-stone-300/50 text-amber-800 hover:from-amber-100/70'
              }`}
              variant="outline"
            >
              <span className="mr-3 text-xl opacity-70">
                {String.fromCharCode(65 + index)}
              </span>
              {option}
            </Button>
          ))}
        </div>

        <div className="flex items-center justify-center space-x-2 bg-amber-50/50 p-3 rounded-full">
          <CheckCircle className="w-5 h-5 text-amber-700" />
          <span className="text-base text-amber-800 font-medium">
            Score: {score}/{questions.length}
          </span>
        </div>
      </Card>

      {/* Correct Answer Animation */}
      {showCorrectAnimation && (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-black/30 backdrop-blur-sm">
          <div className="bg-white p-8 rounded-3xl shadow-2xl max-w-md text-center animate-bounce-in border border-amber-200/50">
            <div className="text-6xl mb-4">🎉</div>
            <h2 className="text-2xl font-bold text-amber-700 mb-4 font-mono">Correct!</h2>
            <p className="text-lg text-amber-800">{currentQ.correctResponse}</p>
          </div>
        </div>
      )}

      {/* Wrong Answer Dialog */}
      <AlertDialog open={showWrongAnswer} onOpenChange={setShowWrongAnswer}>
        <AlertDialogContent className="max-w-md bg-white rounded-3xl p-6 border border-amber-200/50">
          <AlertDialogHeader>
            <div className="text-center mb-4">
              <div className="text-6xl mx-auto animate-wobble">😜</div>
            </div>
            <AlertDialogTitle className="text-center text-2xl font-bold text-amber-800 font-mono">
              Not quite!
            </AlertDialogTitle>
            <AlertDialogDescription className="text-center text-lg font-medium mt-2 text-amber-700">
              {wrongAnswerText}
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter className="mt-4">
            <AlertDialogAction 
              className="w-full bg-gradient-to-r from-amber-700 to-amber-600 text-amber-50 p-6 rounded-xl text-lg font-medium"
              onClick={() => setShowWrongAnswer(false)}
            >
              Try Again! 💕
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      <style jsx>{`
        @keyframes float {
          0%, 100% { transform: translateY(0) rotate(0deg); }
          50% { transform: translateY(-20px) rotate(5deg); }
        }
        @keyframes bounce-in {
          0% { transform: scale(0.8); opacity: 0; }
          50% { transform: scale(1.05); opacity: 1; }
          100% { transform: scale(1); opacity: 1; }
        }
        @keyframes wobble {
          0%, 100% { transform: rotate(0deg); }
          25% { transform: rotate(-10deg); }
          75% { transform: rotate(10deg); }
        }
        .animate-float {
          animation: float 3s ease-in-out infinite;
        }
        .animate-bounce-in {
          animation: bounce-in 0.6s ease-out forwards;
        }
        .animate-wobble {
          animation: wobble 0.5s ease-in-out infinite;
        }
      `}</style>
    </div>
  );
};

export default SillyQuizPage;