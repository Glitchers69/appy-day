import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Heart, Sparkles, Zap, Coffee } from 'lucide-react';

const FakeLoadingPage = () => {
  const navigate = useNavigate();
  const [progress, setProgress] = useState(0);
  const [currentStepIndex, setCurrentStepIndex] = useState(0);

  const loadingSteps = [
    { text: "Generating your cuteness score...", emoji: "🥰", duration: 1500 },
    { text: "Loading unlimited cuddles...", emoji: "🤗", duration: 1200 },
    { text: "Installing girlfriend.exe v∞", emoji: "💖", duration: 1000 },
    { text: "Calibrating drama levels...", emoji: "🎭", duration: 800 },
    { text: "Downloading extra sass...", emoji: "💁‍♀️", duration: 900 },
    { text: "Buffering your adorableness...", emoji: "✨", duration: 700 },
    { text: "Synchronizing heart frequencies...", emoji: "💕", duration: 1100 },
    { text: "Ready to proceed!", emoji: "🎉", duration: 800 }
  ];

  useEffect(() => {
    const totalSteps = loadingSteps.length;
    let currentStep = 0;
    
    const stepInterval = setInterval(() => {
      if (currentStep < totalSteps - 1) {
        currentStep++;
        setCurrentStepIndex(currentStep);
        setProgress((currentStep / (totalSteps - 1)) * 100);
      } else {
        clearInterval(stepInterval);
        setTimeout(() => navigate('/things-i-love'), 1000);
      }
    }, 1200);

    return () => clearInterval(stepInterval);
  }, [navigate]);

  const getRandomIcon = () => {
    const icons = [Heart, Sparkles, Zap, Coffee];
    const Icon = icons[Math.floor(Math.random() * icons.length)];
    return <Icon className="w-6 h-6 text-primary animate-spin" />;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/20 via-secondary/30 to-accent/20 relative overflow-hidden flex items-center justify-center px-4">
      {/* Floating Elements */}
      <div className="absolute inset-0 pointer-events-none">
        {[...Array(15)].map((_, i) => (
          <div
            key={i}
            className="absolute animate-pulse"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${i * 0.2}s`,
              animationDuration: `${2 + (i % 3)}s`
            }}
          >
            {getRandomIcon()}
          </div>
        ))}
      </div>

      <Card className="bg-white/95 backdrop-blur-sm p-8 md:p-12 rounded-3xl shadow-2xl max-w-md text-center border-0 relative z-10">
        <div className="mb-8">
          <div className="w-20 h-20 bg-gradient-to-r from-primary to-primary-glow rounded-full mx-auto mb-4 flex items-center justify-center animate-pulse">
            <span className="text-3xl animate-bounce">
              {loadingSteps[currentStepIndex]?.emoji}
            </span>
          </div>
        </div>
        
        <h1 className="text-2xl md:text-3xl font-bold text-primary mb-6 font-fredoka">
          Please Wait...
        </h1>
        
        <div className="mb-6">
          <Progress value={progress} className="h-3 mb-4" />
          <p className="text-lg text-secondary-foreground font-medium animate-fade-in">
            {loadingSteps[currentStepIndex]?.text}
          </p>
        </div>

        <div className="flex justify-center space-x-2 mb-4">
          {[...Array(3)].map((_, i) => (
            <div
              key={i}
              className="w-2 h-2 bg-primary rounded-full animate-bounce"
              style={{
                animationDelay: `${i * 0.2}s`,
                animationDuration: '1s'
              }}
            />
          ))}
        </div>
        
        <p className="text-sm text-muted-foreground font-caveat">
          {progress < 100 ? `${Math.round(progress)}% complete` : 'Almost ready! 🎉'}
        </p>
      </Card>
    </div>
  );
};

export default FakeLoadingPage;