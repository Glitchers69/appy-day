import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Coffee, Heart, Sparkles, PenTool, Music, Moon, Stars } from 'lucide-react';

const ThingsILovePage = () => {
  const navigate = useNavigate();
  const [showContinueButton, setShowContinueButton] = useState(false);
  const [isLetterVisible, setIsLetterVisible] = useState(false);

  // Show continue button after a delay
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLetterVisible(true);
    }, 800);

    const buttonTimer = setTimeout(() => {
      setShowContinueButton(true);
    }, 5000);

    return () => {
      clearTimeout(timer);
      clearTimeout(buttonTimer);
    };
  }, []);

  const handleContinue = () => {
    navigate('/silly-quiz');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 via-stone-100 to-amber-100 relative overflow-hidden">
      {/* Ambient Background */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(180,140,100,0.08)_0%,transparent_70%)] animate-pulse" style={{ animationDuration: '8s' }}></div>
      
      {/* Floating Elements */}
      <div className="absolute inset-0 pointer-events-none">
        {[...Array(15)].map((_, i) => {
          const icons = [Coffee, PenTool, Heart, Music, Moon, Stars];
          const Icon = icons[i % icons.length];
          return (
            <Icon
              key={i}
              className="absolute animate-float"
              size={14 + (i % 4) * 6}
              style={{
                left: `${5 + (i * 6.5)}%`,
                top: `${10 + (i % 5) * 18}%`,
                animationDelay: `${i * 0.4}s`,
                animationDuration: `${4 + (i % 3)}s`,
                opacity: 0.4,
                color: i % 3 === 0 ? '#8B5A2B' : 
                       i % 3 === 1 ? '#A67C52' : '#D4A76A'
              }}
            />
          );
        })}
      </div>

      <div className="flex flex-col items-center justify-center min-h-screen px-4 py-8">
        <Card className="bg-white/90 backdrop-blur-sm p-6 md:p-10 rounded-3xl shadow-[0_8px_30px_rgba(139,90,43,0.15)] max-w-2xl border-0 relative overflow-hidden">
          {/* Decorative Elements */}
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-amber-700/30 via-amber-500/40 to-amber-700/30"></div>
          <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-amber-700/30 via-amber-500/40 to-amber-700/30"></div>
          
          <div className="text-center mb-8">
            <Coffee className="w-16 h-16 text-amber-700/80 mx-auto mb-4 animate-pulse" style={{ animationDuration: '3s' }} />
            <h1 className="text-3xl md:text-4xl font-normal text-amber-800 mb-2 font-mono">
              A Letter For You
            </h1>
            <p className="text-amber-700/70 text-lg font-mono">
              something special to read ☕
            </p>
          </div>

          <div className={`mb-6 transition-opacity duration-1000 ${isLetterVisible ? 'opacity-100' : 'opacity-0'}`}>
            <div className="min-h-[300px] p-6 text-lg leading-relaxed bg-amber-50/80 border border-amber-200 rounded-xl font-mono text-amber-900">
              <p className="mb-4">Hey bbg,</p>
              
              <p className="mb-4">
                This is your day, and I want to let you know how glad I am to have you in my life. Essentially how glad  I am that you were born 🙄🫰🏾. You may not realise but every day since meeting you has been one of the best parts of my life and I wouldn't trade that for anything else. You genuinely are one of the most amazing people I have met and I maybe look upto you a tiny bit (only little).
              </p>
              
              <p className="mb-4">
                I know there's something wrong with you and I like whatever is wrong with you 😝. You turn every ordinary moment into something extraordinary , that's why I hang out with you (obviously 🙄). Also thanks for always being there even if it was the small things, it mattered a lot to me (ily 😘). See there's a lot of things I want to mention but there's only so much space okay.
              </p>
              
              <p className="mb-4">
                Thank you for being the way you are. For the late night conversations, for the shared cups of coffee, for the comfortable silences, and for all the memories we've created together. I couldn't ask for a better person to do this with ❤️.
              </p>
              
              <p className="mb-4">
                You are appreciated more than words can express, but I hope this small note gives you a glimpse of how much you matter.I hope everyday forward is filled with joy, laughter and happiness. I know you'll do great things in life and make a lot of money (waiting for that) but yes my blessings go out to you 😎. 
              </p>
              
              <p className="mt-8">
                All the best here on for the rest of your life. 
              </p>
              <p>I love you</p>
              <p>Your Dory ig 🙄💤</p>
            </div>
          </div>

          {showContinueButton && (
            <div className="text-center mt-8 animate-fade-in">
              <Button 
                onClick={handleContinue}
                className="bg-gradient-to-r from-amber-600/90 to-amber-500/90 text-amber-50 px-6 py-3 text-base font-mono rounded-md hover:opacity-90 transition-opacity"
              >
                Continue the journey
                <Coffee className="ml-2 w-4 h-4" />
              </Button>
            </div>
          )}

          <div className="mt-8 text-center">
            <p className="text-amber-700/60 font-mono text-sm italic">
              "To many more coffee dates my cutest.."
            </p>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default ThingsILovePage;