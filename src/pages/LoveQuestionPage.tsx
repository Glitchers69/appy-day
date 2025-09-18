import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Heart, X } from 'lucide-react';

const LoveQuestionPage = () => {
  const navigate = useNavigate();
  const [noButtonPosition, setNoButtonPosition] = useState({ x: 0, y: 0 });
  const [noButtonClicks, setNoButtonClicks] = useState(0);
  const [isWiggling, setIsWiggling] = useState(false);

  const handleYesClick = () => {
    navigate('/things-i-love');
  };

  const handleNoHover = () => {
    const newX = Math.random() * 200 - 100; // Random between -100 and 100
    const newY = Math.random() * 200 - 100;
    setNoButtonPosition({ x: newX, y: newY });
    setIsWiggling(true);
    setTimeout(() => setIsWiggling(false), 500);
  };

  const handleNoClick = () => {
    setNoButtonClicks(prev => prev + 1);
    handleNoHover();
  };

  const getNoButtonText = () => {
    if (noButtonClicks === 0) return "No";
    if (noButtonClicks < 3) return "Really? 🤔";
    if (noButtonClicks < 5) return "Come on... 😊";
    if (noButtonClicks < 8) return "Pretty please? 🥺";
    return "You know you do! 😘";
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-secondary/30 via-primary/20 to-accent/30 relative overflow-hidden flex items-center justify-center px-4">
      {/* Floating Hearts Background */}
      <div className="absolute inset-0 pointer-events-none">
        {[...Array(12)].map((_, i) => (
          <Heart
            key={i}
            className={`absolute text-primary/20 animate-pulse`}
            size={24 + (i % 3) * 16}
            style={{
              left: `${10 + (i * 8)}%`,
              top: `${15 + (i % 4) * 20}%`,
              animationDelay: `${i * 0.3}s`,
              animationDuration: `${2 + (i % 2)}s`
            }}
          />
        ))}
      </div>

      <Card className="bg-white/95 backdrop-blur-sm p-8 md:p-12 rounded-3xl shadow-2xl max-w-lg text-center border-0 relative">
        <div className="mb-8">
          <Heart className="w-20 h-20 text-primary mx-auto mb-6 heart-grow" />
        </div>
        
        <h1 className="text-3xl md:text-4xl font-bold text-primary mb-6 font-caveat">
          Before we continue...
        </h1>
        
        <h2 className="text-2xl md:text-3xl font-semibold text-secondary-foreground mb-8 font-caveat">
          Do you love me? 💕
        </h2>
        
        <div className="flex flex-col sm:flex-row gap-4 items-center justify-center relative min-h-[120px]">
          <Button 
            onClick={handleYesClick}
            className="btn-bouncy bg-gradient-to-r from-primary to-primary-glow text-white px-12 py-4 text-xl font-semibold rounded-2xl"
            size="lg"
          >
            Yes! 💖
          </Button>
          
          <div className="relative">
            <Button
              onMouseEnter={handleNoHover}
              onClick={handleNoClick}
              className={`btn-bouncy bg-gradient-to-r from-muted to-muted-foreground/20 text-muted-foreground px-12 py-4 text-xl font-semibold rounded-2xl transition-all duration-300 ${isWiggling ? 'wiggle' : ''}`}
              style={{
                transform: `translate(${noButtonPosition.x}px, ${noButtonPosition.y}px)`,
                transition: isWiggling ? 'none' : 'transform 0.3s ease-out'
              }}
              size="lg"
            >
              <X className="w-5 h-5 mr-2" />
              {getNoButtonText()}
            </Button>
          </div>
        </div>
        
        {noButtonClicks > 3 && (
          <p className="text-primary/70 mt-6 text-lg font-caveat animate-bounce">
            The "No" button seems to be running away from you! 😄
          </p>
        )}
      </Card>
    </div>
  );
};

export default LoveQuestionPage;