import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Heart, ArrowRight, Sparkles } from 'lucide-react';

const ThingsILovePage = () => {
  const navigate = useNavigate();
  const [visibleItems, setVisibleItems] = useState(0);
  const [showContinueButton, setShowContinueButton] = useState(false);

  const loveItems = [
    "Your beautiful smile that lights up my entire world ✨",
    "The way you laugh at my silly jokes (even the bad ones) 😄",
    "How you make every ordinary day feel like an adventure 🌟",
    "Your amazing hugs that make everything better 🤗",
    "The cute way you get excited about little things 🥰",
    "How you always believe in me, even when I don't 💪",
    "Your kindness and the way you care for everyone 💝",
    "Those moments when you sing while cooking 🎵",
    "How you make me want to be a better person 🌹",
    "Simply everything about you - you're perfect! 💕"
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setVisibleItems(prev => {
        if (prev < loveItems.length) {
          return prev + 1;
        } else {
          setShowContinueButton(true);
          return prev;
        }
      });
    }, 800);

    return () => clearInterval(timer);
  }, []);

  const handleContinue = () => {
    navigate('/silly-quiz');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-accent/20 via-primary/15 to-secondary/25 relative overflow-hidden">
      {/* Floating Sparkles */}
      <div className="absolute inset-0 pointer-events-none">
        {[...Array(15)].map((_, i) => (
          <Sparkles
            key={i}
            className="absolute text-celebration/30 animate-pulse"
            size={16 + (i % 3) * 8}
            style={{
              left: `${5 + (i * 6.5)}%`,
              top: `${10 + (i % 5) * 18}%`,
              animationDelay: `${i * 0.4}s`,
              animationDuration: `${1.5 + (i % 2) * 0.5}s`
            }}
          />
        ))}
      </div>

      <div className="flex flex-col items-center justify-center min-h-screen px-4 py-8">
        <Card className="bg-white/95 backdrop-blur-sm p-6 md:p-10 rounded-3xl shadow-2xl max-w-2xl border-0">
          <div className="text-center mb-8">
            <Heart className="w-16 h-16 text-primary mx-auto mb-4 animate-pulse" />
            <h1 className="text-3xl md:text-4xl font-bold text-primary mb-2 font-caveat">
              10 Things I Love About You
            </h1>
            <p className="text-muted-foreground text-lg">
              Here they come, one by one... 💖
            </p>
          </div>

          <div className="space-y-4 mb-8">
            {loveItems.slice(0, visibleItems).map((item, index) => (
              <div
                key={index}
                className="flex items-start gap-4 p-4 bg-gradient-to-r from-primary/5 to-secondary/10 rounded-xl animate-fade-in border border-primary/10"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="flex-shrink-0 w-8 h-8 bg-gradient-to-r from-primary to-primary-glow rounded-full flex items-center justify-center text-white font-bold">
                  {index + 1}
                </div>
                <p className="text-secondary-foreground text-lg leading-relaxed font-medium">
                  {item}
                </p>
              </div>
            ))}
          </div>

          {showContinueButton && (
            <div className="text-center animate-fade-in">
              <p className="text-primary font-caveat text-xl mb-6">
                Ready for some fun? 🎈
              </p>
              <Button 
                onClick={handleContinue}
                className="btn-bouncy bg-gradient-to-r from-celebration to-accent text-white px-8 py-4 text-xl font-semibold rounded-2xl"
                size="lg"
              >
                Let's Play! 
                <ArrowRight className="ml-2 w-5 h-5" />
              </Button>
            </div>
          )}
        </Card>
      </div>
    </div>
  );
};

export default ThingsILovePage;