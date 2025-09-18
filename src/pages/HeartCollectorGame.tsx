import { useEffect, useState, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Heart, Star } from 'lucide-react';

interface FallingHeart {
  id: number;
  x: number;
  y: number;
  message: string;
  emoji: string;
}

const HeartCollectorGame = () => {
  const navigate = useNavigate();
  const [hearts, setHearts] = useState<FallingHeart[]>([]);
  const [score, setScore] = useState(0);
  const [gameStarted, setGameStarted] = useState(false);
  const [gameEnded, setGameEnded] = useState(false);
  const [collectedMessages, setCollectedMessages] = useState<string[]>([]);
  const [timeLeft, setTimeLeft] = useState(30);

  const sweetMessages = [
    "You're the snack AND the meal 😏",
    "My heart skips for you 💕",
    "You make my day brighter ☀️",
    "Perfect in every way ✨",
    "My favorite person ever 🥰",
    "You're absolutely adorable 💖",
    "My heart belongs to you 💝",
    "You're my happy place 🌈",
    "Cuddle champion 🏆",
    "Sweet like candy 🍭",
    "You're my everything 💫",
    "Beautiful inside and out 🌸"
  ];

  const createHeart = useCallback(() => {
    const newHeart: FallingHeart = {
      id: Date.now() + Math.random(),
      x: Math.random() * (window.innerWidth - 60),
      y: -50,
      message: sweetMessages[Math.floor(Math.random() * sweetMessages.length)],
      emoji: ['💖', '💕', '💝', '💗', '💘'][Math.floor(Math.random() * 5)]
    };
    setHearts(prev => [...prev, newHeart]);
  }, []);

  useEffect(() => {
    let gameInterval: NodeJS.Timeout;
    let heartInterval: NodeJS.Timeout;
    let timerInterval: NodeJS.Timeout;

    if (gameStarted && !gameEnded) {
      // Create hearts every 800ms
      heartInterval = setInterval(createHeart, 800);
      
      // Move hearts down every 50ms
      gameInterval = setInterval(() => {
        setHearts(prev => prev.map(heart => ({
          ...heart,
          y: heart.y + 3
        })).filter(heart => heart.y < window.innerHeight));
      }, 50);

      // Timer countdown
      timerInterval = setInterval(() => {
        setTimeLeft(prev => {
          if (prev <= 1) {
            setGameEnded(true);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }

    return () => {
      clearInterval(gameInterval);
      clearInterval(heartInterval);
      clearInterval(timerInterval);
    };
  }, [gameStarted, gameEnded, createHeart]);

  const catchHeart = (heartId: number) => {
    const heart = hearts.find(h => h.id === heartId);
    if (heart) {
      setScore(prev => prev + 1);
      setCollectedMessages(prev => [...prev, heart.message]);
      setHearts(prev => prev.filter(h => h.id !== heartId));
    }
  };

  const startGame = () => {
    setGameStarted(true);
    setScore(0);
    setCollectedMessages([]);
    setTimeLeft(30);
  };

  const handleFinish = () => {
    navigate('/final-love');
  };

  if (!gameStarted) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-primary/30 via-celebration/20 to-accent/30 flex items-center justify-center px-4">
        <Card className="bg-white/95 backdrop-blur-sm p-8 md:p-12 rounded-3xl shadow-2xl max-w-lg text-center border-0">
          <div className="mb-6">
            <Heart className="w-20 h-20 text-celebration mx-auto mb-4 animate-pulse" />
          </div>
          
          <h1 className="text-3xl md:text-4xl font-bold text-primary mb-4 font-fredoka">
            Catch the Hearts! 💕
          </h1>
          
          <p className="text-secondary-foreground text-lg mb-6 leading-relaxed">
            Hearts will fall from the sky, each carrying a sweet message! 
            Catch as many as you can in 30 seconds! ⏰
          </p>
          
          <Button 
            onClick={startGame}
            className="btn-bouncy bg-gradient-to-r from-celebration to-celebration-glow text-white px-8 py-6 text-xl font-semibold rounded-2xl w-full"
            size="lg"
          >
            Start Catching! 🎮
          </Button>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/30 via-celebration/20 to-accent/30 relative overflow-hidden">
      {/* Game UI */}
      <div className="fixed top-4 left-4 right-4 z-20 flex justify-between">
        <Card className="bg-white/90 backdrop-blur-sm px-4 py-2 rounded-2xl border-0">
          <div className="flex items-center space-x-2">
            <Star className="w-5 h-5 text-celebration" />
            <span className="font-bold text-primary">Score: {score}</span>
          </div>
        </Card>
        
        <Card className="bg-white/90 backdrop-blur-sm px-4 py-2 rounded-2xl border-0">
          <div className="flex items-center space-x-2">
            <span className="font-bold text-primary">⏰ {timeLeft}s</span>
          </div>
        </Card>
      </div>

      {/* Falling Hearts */}
      {hearts.map(heart => (
        <button
          key={heart.id}
          onClick={() => catchHeart(heart.id)}
          className="absolute z-10 text-4xl animate-bounce cursor-pointer hover:scale-110 transition-transform"
          style={{
            left: `${heart.x}px`,
            top: `${heart.y}px`,
            filter: 'drop-shadow(0 2px 4px rgba(0,0,0,0.2))'
          }}
        >
          {heart.emoji}
        </button>
      ))}

      {/* Latest Message Display */}
      {collectedMessages.length > 0 && (
        <div className="fixed bottom-4 left-4 right-4 z-20">
          <Card className="bg-white/95 backdrop-blur-sm p-4 rounded-2xl border-0 animate-fade-in">
            <p className="text-center text-lg font-medium text-primary font-caveat">
              {collectedMessages[collectedMessages.length - 1]}
            </p>
          </Card>
        </div>
      )}

      {/* Game Over Screen */}
      {gameEnded && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-30 px-4">
          <Card className="bg-white/95 backdrop-blur-sm p-8 md:p-12 rounded-3xl shadow-2xl max-w-lg text-center border-0">
            <div className="mb-6">
              <div className="text-6xl mb-4">🎉</div>
              <h2 className="text-3xl font-bold text-primary mb-4 font-fredoka">
                Amazing Job!
              </h2>
              <p className="text-xl text-secondary-foreground mb-6">
                You caught <span className="font-bold text-celebration">{score}</span> hearts! 💕
              </p>
            </div>

            {collectedMessages.length > 0 && (
              <div className="mb-6 max-h-40 overflow-y-auto">
                <h3 className="text-lg font-semibold mb-3 text-primary">Your Messages:</h3>
                <div className="space-y-2">
                  {collectedMessages.slice(-3).map((message, index) => (
                    <p key={index} className="text-sm bg-celebration/10 p-2 rounded-lg font-caveat">
                      {message}
                    </p>
                  ))}
                </div>
              </div>
            )}
            
            <Button 
              onClick={handleFinish}
              className="btn-bouncy bg-gradient-to-r from-primary to-primary-glow text-white px-8 py-4 text-lg font-semibold rounded-2xl w-full"
            >
              Continue to Final Surprise! 🎁
            </Button>
          </Card>
        </div>
      )}
    </div>
  );
};

export default HeartCollectorGame;