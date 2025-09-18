import { useEffect, useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Heart, Sparkles } from 'lucide-react';

const FinalLovePage = () => {
  const [showFireworks, setShowFireworks] = useState(false);
  const [showMessage, setShowMessage] = useState(false);

  useEffect(() => {
    // Trigger entrance animations
    setTimeout(() => setShowMessage(true), 500);
    setTimeout(() => setShowFireworks(true), 1000);
    
    // Loop fireworks every 3 seconds
    const interval = setInterval(() => {
      setShowFireworks(false);
      setTimeout(() => setShowFireworks(true), 100);
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/30 via-celebration/20 to-accent/30 relative overflow-hidden flex items-center justify-center">
      {/* Continuous Floating Hearts */}
      <div className="absolute inset-0 pointer-events-none">
        {[...Array(20)].map((_, i) => (
          <Heart
            key={i}
            className="absolute text-primary/40 animate-pulse"
            size={20 + (i % 4) * 10}
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${i * 0.2}s`,
              animationDuration: `${2 + (i % 3)}s`
            }}
          />
        ))}
      </div>

      {/* Fireworks Effect */}
      {showFireworks && (
        <div className="fixed inset-0 pointer-events-none z-10">
          {[...Array(30)].map((_, i) => (
            <div
              key={i}
              className="absolute w-3 h-3 rounded-full animate-bounce"
              style={{
                left: `${20 + Math.random() * 60}%`,
                top: `${20 + Math.random() * 60}%`,
                backgroundColor: ['hsl(var(--primary))', 'hsl(var(--celebration))', 'hsl(var(--accent))', 'hsl(var(--secondary))'][i % 4],
                animationDelay: `${Math.random() * 2}s`,
                animationDuration: `${1 + Math.random()}s`
              }}
            />
          ))}
        </div>
      )}

      {/* Main Message */}
      <div className={`px-4 text-center transition-all duration-1000 ${showMessage ? 'animate-scale-in' : 'opacity-0 scale-50'}`}>
        <Card className="bg-white/95 backdrop-blur-sm p-8 md:p-16 rounded-3xl shadow-2xl max-w-2xl border-0 relative">
          {/* Decorative Elements */}
          <Sparkles className="absolute top-4 left-4 w-8 h-8 text-celebration animate-spin" style={{ animationDuration: '3s' }} />
          <Sparkles className="absolute top-4 right-4 w-8 h-8 text-accent animate-spin" style={{ animationDuration: '3s', animationDelay: '1s' }} />
          <Sparkles className="absolute bottom-4 left-4 w-8 h-8 text-secondary animate-spin" style={{ animationDuration: '3s', animationDelay: '2s' }} />
          <Sparkles className="absolute bottom-4 right-4 w-8 h-8 text-primary animate-spin" style={{ animationDuration: '3s', animationDelay: '0.5s' }} />

          <div className="mb-8">
            <Heart className="w-24 h-24 text-primary mx-auto mb-6 heart-grow" />
          </div>
          
          <h1 className="text-4xl md:text-6xl font-bold text-primary mb-6 font-caveat leading-tight">
            Fiiine... Happy Birthday! 🎂
          </h1>
          
          <h2 className="text-2xl md:text-3xl font-semibold text-celebration mb-8 font-caveat">
            I Love You ❤️
          </h2>
          
          <div className="space-y-6 text-lg md:text-xl text-secondary-foreground leading-relaxed">
            <p className="font-medium">
              Okay, okay... you caught me! 😅
            </p>
            <p>
              I couldn't keep pretending this wasn't all about celebrating the most amazing person ever... 
            </p>
            <p className="text-primary font-caveat text-2xl">
              You make my heart so full! 💕✨
            </p>
            
            <div className="mt-8">
              <Button 
                onClick={() => {
                  // Trigger infinite hug animation
                  const hugElements = document.querySelectorAll('.hug-spam');
                  hugElements.forEach(el => el.classList.add('animate-pulse'));
                }}
                className="btn-bouncy bg-gradient-to-r from-celebration to-celebration-glow text-white px-8 py-4 text-lg font-semibold rounded-2xl mb-4"
              >
                Press for Infinite Hugs! 🤗
              </Button>
            </div>
          </div>

          {/* Pulsing Heart Effect */}
          <div className="mt-10 relative">
            <div className="absolute inset-0 flex items-center justify-center">
              <Heart className="w-32 h-32 text-primary/20 animate-ping" />
            </div>
            <div className="relative flex items-center justify-center">
              <Heart className="w-20 h-20 text-primary animate-pulse" />
            </div>
          </div>

          <p className="text-muted-foreground font-caveat text-lg mt-8 italic">
            Hope you enjoyed our little birthday adventure! 🎈
          </p>
        </Card>
      </div>
    </div>
  );
};

export default FinalLovePage;