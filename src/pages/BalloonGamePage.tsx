import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Heart, ArrowRight, Trophy } from 'lucide-react';

interface Balloon {
  id: number;
  x: number;
  y: number;
  color: string;
  size: number;
  popped: boolean;
}

const BalloonGamePage = () => {
  const navigate = useNavigate();
  const [balloons, setBalloons] = useState<Balloon[]>([]);
  const [score, setScore] = useState(0);
  const [gameComplete, setGameComplete] = useState(false);

  const colors = [
    'bg-primary',
    'bg-secondary', 
    'bg-accent',
    'bg-celebration',
    'bg-muted'
  ];

  useEffect(() => {
    // Generate initial balloons
    const initialBalloons: Balloon[] = Array.from({ length: 12 }, (_, i) => ({
      id: i,
      x: 10 + (i % 4) * 22 + Math.random() * 10,
      y: 15 + Math.floor(i / 4) * 25 + Math.random() * 10,
      color: colors[i % colors.length],
      size: 60 + Math.random() * 30,
      popped: false
    }));
    setBalloons(initialBalloons);
  }, []);

  const popBalloon = (balloonId: number) => {
    setBalloons(prev => 
      prev.map(balloon => 
        balloon.id === balloonId 
          ? { ...balloon, popped: true }
          : balloon
      )
    );
    setScore(prev => prev + 10);

    // Check if all balloons are popped
    const updatedBalloons = balloons.map(balloon => 
      balloon.id === balloonId ? { ...balloon, popped: true } : balloon
    );
    
    if (updatedBalloons.every(balloon => balloon.popped)) {
      setTimeout(() => setGameComplete(true), 500);
    }
  };

  const handleContinue = () => {
    navigate('/heart-collector');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-celebration/20 via-accent/30 to-primary/20 relative overflow-hidden">
      {/* Game Header */}
      <div className="absolute top-6 left-6 right-6 z-10">
        <Card className="bg-white/90 backdrop-blur-sm p-4 rounded-2xl border-0 shadow-lg">
          <div className="flex items-center justify-between">
            <h1 className="text-2xl font-bold text-primary font-caveat">
              Pop the Balloons! 🎈
            </h1>
            <div className="flex items-center gap-2">
              <Trophy className="w-6 h-6 text-celebration" />
              <span className="text-xl font-bold text-celebration">{score}</span>
            </div>
          </div>
        </Card>
      </div>

      {/* Balloons Game Area */}
      <div className="absolute inset-0 pt-24 pb-6">
        {balloons.map((balloon) => (
          <div
            key={balloon.id}
            className={`absolute cursor-pointer transform transition-all duration-300 ${
              balloon.popped ? 'scale-0 opacity-0' : 'hover:scale-110'
            }`}
            style={{
              left: `${balloon.x}%`,
              top: `${balloon.y}%`,
              width: `${balloon.size}px`,
              height: `${balloon.size * 1.2}px`,
            }}
            onClick={() => !balloon.popped && popBalloon(balloon.id)}
          >
            <div
              className={`w-full h-full rounded-full ${balloon.color} opacity-80 shadow-lg flex items-center justify-center relative`}
            >
              <Heart className="w-6 h-6 text-white animate-pulse" />
              {/* Balloon string */}
              <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-0.5 h-8 bg-gray-400"></div>
            </div>
          </div>
        ))}
      </div>

      {/* Game Complete Modal */}
      {gameComplete && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-20 p-4">
          <Card className="bg-white p-8 md:p-12 rounded-3xl shadow-2xl max-w-md text-center border-0 animate-scale-in">
            <Trophy className="w-16 h-16 text-celebration mx-auto mb-4 animate-bounce" />
            <h2 className="text-3xl font-bold text-primary mb-4 font-caveat">
              Amazing! 🎉
            </h2>
            <p className="text-muted-foreground text-lg mb-2">
              You popped all the balloons!
            </p>
            <p className="text-celebration text-2xl font-bold mb-6">
              Final Score: {score}
            </p>
            <p className="text-primary font-caveat text-xl mb-8">
              You're ready for the final surprise! 💕
            </p>
            <Button 
              onClick={handleContinue}
              className="btn-bouncy bg-gradient-to-r from-primary to-celebration text-white px-8 py-4 text-xl font-semibold rounded-2xl w-full"
              size="lg"
            >
              Show Me! 
              <ArrowRight className="ml-2 w-5 h-5" />
            </Button>
          </Card>
        </div>
      )}

      {/* Instructions */}
      {!gameComplete && score === 0 && (
        <div className="absolute bottom-6 left-6 right-6">
          <Card className="bg-white/90 backdrop-blur-sm p-4 rounded-2xl border-0 shadow-lg text-center">
            <p className="text-muted-foreground font-caveat text-lg">
              Tap the balloons to pop them and earn points! 💖
            </p>
          </Card>
        </div>
      )}
    </div>
  );
};

export default BalloonGamePage;