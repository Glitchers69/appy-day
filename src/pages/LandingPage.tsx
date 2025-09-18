import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Heart, Sparkles } from 'lucide-react';
import confettiElements from '@/assets/confetti-elements.png';

const LandingPage = () => {
  const navigate = useNavigate();
  const [showConfetti, setShowConfetti] = useState(false);

  useEffect(() => {
    setShowConfetti(true);
    const timer = setTimeout(() => setShowConfetti(false), 4000);
    return () => clearTimeout(timer);
  }, []);

  const handleStartJourney = () => {
    navigate('/love-question');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/20 via-secondary/30 to-accent/20 relative overflow-hidden">
      {/* Floating Balloons Background */}
      <div className="floating-balloons">
        {[...Array(8)].map((_, i) => (
          <div
            key={i}
            className={`balloon w-16 h-20 rounded-full opacity-70 ${
              i % 4 === 0 ? 'bg-primary' : 
              i % 4 === 1 ? 'bg-secondary' : 
              i % 4 === 2 ? 'bg-accent' : 'bg-celebration'
            }`}
            style={{
              left: `${10 + (i * 12)}%`,
              animationDelay: `${i * 0.5}s`,
              animationDuration: `${4 + (i % 3)}s`
            }}
          />
        ))}
      </div>

      {/* Confetti Animation */}
      {showConfetti && (
        <div className="fixed inset-0 pointer-events-none z-10">
          {[...Array(20)].map((_, i) => (
            <div
              key={i}
              className="confetti"
              style={{
                left: `${Math.random() * 100}%`,
                backgroundColor: ['hsl(var(--primary))', 'hsl(var(--celebration))', 'hsl(var(--accent))'][i % 3],
                animationDelay: `${Math.random() * 2}s`,
                animationDuration: `${2 + Math.random() * 2}s`
              }}
            />
          ))}
        </div>
      )}

      {/* Main Content */}
      <div className="flex flex-col items-center justify-center min-h-screen px-4 relative z-20">
        <Card className="bg-white/90 backdrop-blur-sm p-8 md:p-12 rounded-3xl shadow-2xl max-w-md text-center border-0">
          <div className="mb-6">
            <Heart className="w-16 h-16 text-primary mx-auto mb-4 animate-pulse" />
            <Sparkles className="w-8 h-8 text-celebration absolute top-4 right-4 animate-bounce" />
          </div>
          
          <h1 className="text-4xl md:text-5xl font-bold text-primary mb-2 font-caveat">
            Happy Birthday
          </h1>
          
          <h2 className="text-2xl md:text-3xl font-semibold text-secondary-foreground mb-6 font-caveat">
            Beautiful! ✨
          </h2>
          
          <p className="text-muted-foreground mb-8 text-lg leading-relaxed">
            I've prepared something special for you... 
            Are you ready for a little adventure? 💕
          </p>
          
          <Button 
            onClick={handleStartJourney}
            className="btn-bouncy bg-gradient-to-r from-primary to-primary-glow text-white px-8 py-6 text-xl font-semibold rounded-2xl w-full"
            size="lg"
          >
            Let's Begin! 🎉
          </Button>
        </Card>
      </div>
    </div>
  );
};

export default LandingPage;