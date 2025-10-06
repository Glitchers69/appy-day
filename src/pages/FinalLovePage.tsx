import { useEffect, useState, useRef } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Heart, Coffee, Popcorn, Film, Sofa, Moon, Tv } from 'lucide-react';

const FinalLovePage = () => {
  const [showFireworks, setShowFireworks] = useState(false);
  const [showMessage, setShowMessage] = useState(false);
  const [displayText, setDisplayText] = useState("Alright, alright... Happy Birthday 😎🎂");
  const [isTyping, setIsTyping] = useState(false);
  const [showCursor, setShowCursor] = useState(true);
  const typingTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const cursorIntervalRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    // Trigger entrance animations
    setTimeout(() => setShowMessage(true), 500);
    setTimeout(() => setShowFireworks(true), 1000);
    
    // Loop ambient effects every 4 seconds
    const ambientInterval = setInterval(() => {
      setShowFireworks(false);
      setTimeout(() => setShowFireworks(true), 100);
    }, 4000);

    // Blinking cursor effect
    cursorIntervalRef.current = setInterval(() => {
      setShowCursor(prev => !prev);
    }, 500);

    // Start typing effect after 5 seconds
    setTimeout(() => {
      startTypingEffect();
    }, 5000);

    return () => {
      clearInterval(ambientInterval);
      if (cursorIntervalRef.current) clearInterval(cursorIntervalRef.current);
      if (typingTimeoutRef.current) clearTimeout(typingTimeoutRef.current);
    };
  }, []);

  const startTypingEffect = () => {
    setIsTyping(true);
    let i = displayText.length;
    const deleteInterval = setInterval(() => {
      if (i <= 0) {
        clearInterval(deleteInterval);
        const newText = "ok that's it go to sleep ly";
        let j = 0;
        const typeInterval = setInterval(() => {
          if (j <= newText.length) {
            setDisplayText(newText.substring(0, j));
            j++;
          } else {
            clearInterval(typeInterval);
            setIsTyping(false);
          }
        }, 100);
      } else {
        setDisplayText(displayText.substring(0, i));
        i--;
      }
    }, 50);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 via-stone-100 to-amber-100 relative overflow-hidden flex items-center justify-center">
      {/* Ambient Background */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(180,140,100,0.08)_0%,transparent_70%)] animate-pulse" style={{ animationDuration: '6s' }}></div>
      
      {/* Soft Light Effect */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-1/3 h-1/3 bg-amber-500/10 blur-3xl rounded-full"></div>
      
      {/* Floating Elements */}
      <div className="absolute inset-0 pointer-events-none">
        {[...Array(20)].map((_, i) => {
          const icons = [Coffee, Popcorn, Film, Sofa, Moon, Tv];
          const Icon = icons[i % icons.length];
          return (
            <Icon
              key={i}
              className="absolute animate-float"
              size={15 + (i % 5) * 6}
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animationDelay: `${i * 0.4}s`,
                animationDuration: `${4 + (i % 3)}s`,
                opacity: 0.4,
                color: i % 3 === 0 ? '#d4a574' : 
                       i % 3 === 1 ? '#e8c39e' : '#a68a7b'
              }}
            />
          );
        })}
      </div>

      {/* Ambient Light Effects */}
      {showFireworks && (
        <div className="fixed inset-0 pointer-events-none z-10">
          {[...Array(15)].map((_, i) => (
            <div
              key={i}
              className="absolute rounded-full animate-firework"
              style={{
                width: `${2 + Math.random() * 4}px`,
                height: `${2 + Math.random() * 4}px`,
                left: `${20 + Math.random() * 60}%`,
                top: `${20 + Math.random() * 60}%`,
                backgroundColor: ['#d4a574', '#e8c39e', '#a68a7b'][i % 3],
                animationDelay: `${Math.random() * 3}s`,
                animationDuration: `${2 + Math.random() * 3}s`,
                boxShadow: `0 0 ${4 + Math.random() * 6}px ${['#d4a574', '#e8c39e', '#a68a7b'][i % 3]}`
              }}
            />
          ))}
        </div>
      )}

      {/* Main Message */}
      <div className={`px-4 text-center transition-all duration-1000 ${showMessage ? 'animate-scale-in' : 'opacity-0 scale-50'}`}>
        <Card className="bg-white/90 backdrop-blur-md p-8 md:p-12 rounded-xl shadow-[0_0_30px_rgba(212,165,116,0.2)] max-w-xl border-0 relative overflow-hidden">
          {/* Decorative Elements */}
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-amber-700/40 via-amber-500/60 to-amber-700/40"></div>
          <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-amber-700/40 via-amber-500/60 to-amber-700/40"></div>
          
          <Coffee className="absolute top-4 left-4 w-6 h-6 text-amber-500/60" />
          <Film className="absolute top-4 right-4 w-6 h-6 text-amber-500/60" />
          <Tv className="absolute bottom-4 left-4 w-6 h-6 text-amber-500/60" />
          <Sofa className="absolute bottom-4 right-4 w-6 h-6 text-amber-500/60" />

          <div className="mb-8">
            <Coffee className="w-16 h-16 text-amber-500/80 mx-auto mb-6 animate-pulse" style={{ animationDuration: '3s' }} />
          </div>
          
          <h1 className="text-3xl md:text-5xl font-normal text-amber-800 mb-6 font-mono leading-relaxed relative">
            {displayText}
            {isTyping && <span className={`ml-1 inline-block ${showCursor ? 'opacity-100' : 'opacity-0'}`}>|</span>}
          </h1>
          
          <h2 className="text-xl md:text-2xl font-normal text-amber-700 mb-8 font-mono">
            just chillin' with you ☕
          </h2>
          
          <div className="space-y-6 text-base md:text-lg text-amber-900/80 leading-relaxed font-mono">
            <p>
              chill day. cool vibes. solid birthday 🎉
            </p>
            <p>
              no emotional speech here
            </p>
            <p className="text-amber-700 text-lg">
              just know this - you're a whole vibe.
            </p>
            
            <div className="mt-8">
              <Button 
                onClick={() => {
                  // Trigger animation
                  const elements = document.querySelectorAll('.coffee-time');
                  elements.forEach(el => el.classList.add('animate-pulse'));
                }}
                className="bg-gradient-to-r from-amber-700 to-amber-600 text-amber-50 px-6 py-3 text-base font-mono rounded-md mb-4 hover:opacity-90 transition-opacity"
              >
                refill my coffee ☕
              </Button>
            </div>
          </div>

          {/* Ambient Effect */}
          <div className="mt-10 relative">
            <div className="absolute inset-0 flex items-center justify-center">
              <Coffee className="w-24 h-24 text-amber-700/10 animate-pulse" style={{ animationDuration: '4s' }} />
            </div>
            <div className="relative flex items-center justify-center">
              <Coffee className="w-16 h-16 text-amber-700/30 animate-pulse" style={{ animationDuration: '3s' }} />
            </div>
          </div>

          <p className="text-amber-700/70 font-mono text-sm mt-8">
            alright show's over. go chill now 🍿
          </p>
        </Card>
      </div>
    </div>
  );
};

export default FinalLovePage;
