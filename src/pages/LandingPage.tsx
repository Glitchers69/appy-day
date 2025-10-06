import { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Eye, MousePointer, Sparkles } from 'lucide-react';
import introWebm from '@/img/intro/Untitled.webm';

const LandingPage = () => {
  const navigate = useNavigate();
  const [phase, setPhase] = useState('nonchalant'); // nonchalant, reveal, celebration
  const [showConfetti, setShowConfetti] = useState(false);
  const [muted, setMuted] = useState(true);
  const [rotationDeg, setRotationDeg] = useState(0);
  const videoRef = useRef<HTMLVideoElement | null>(null);

  useEffect(() => {
    const timer1 = setTimeout(() => setPhase('reveal'), 3000);
    const timer2 = setTimeout(() => {
      setPhase('celebration');
      setShowConfetti(true);
    }, 5000);
    
    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
    };
  }, []);

  const handleContinue = () => {
    navigate('/love-question');
  };

  const getNonchalantContent = () => (
    <div className="text-center">
      <Eye className="w-12 h-12 text-amber-700/70 mx-auto mb-4 animate-pulse" />
      <h1 className="text-3xl md:text-4xl font-bold text-amber-800 mb-4 font-mono">
        Oh... hey, you found this page 👀
      </h1>
      <p className="text-amber-700 text-lg mb-4">
        Nothing special here... definitely not about you 🙄
      </p>
      <p className="text-sm text-amber-600/60 animate-pulse">
        Just a random website... move along...
      </p>
    </div>
  );

  const getRevealContent = () => (
    <div className="text-center animate-fade-in">
      <MousePointer className="w-16 h-16 text-amber-600 mx-auto mb-4 animate-bounce" />
      <h1 className="text-3xl md:text-4xl font-bold text-amber-700 mb-4 font-mono animate-scale-in">
        Okay fine... it's YOUR birthday 🎉
      </h1>
      <p className="text-amber-800 text-lg mb-4 animate-fade-in">
        I couldn't keep pretending... 😅
      </p>
    </div>
  );

  const getCelebrationContent = () => (
    <div className="text-center">
      <Sparkles className="w-20 h-20 text-amber-600 mx-auto mb-6 animate-spin" style={{animationDuration: '3s'}} />
      <h1 className="text-4xl md:text-5xl font-bold text-amber-800 mb-2 font-mono animate-scale-in">
        Happy Birthday
      </h1>
      <h2 className="text-2xl md:text-3xl font-semibold text-amber-700 mb-6 font-mono">
        Beautiful! ✨
      </h2>
      <p className="text-amber-700/90 mb-8 text-lg leading-relaxed">
        Ready for a silly little adventure I made just for you? 💕
      </p>
      <Button 
        onClick={handleContinue}
        className="btn-bouncy bg-gradient-to-r from-amber-700 to-amber-600 text-amber-50 px-8 py-6 text-xl font-semibold rounded-2xl w-full animate-bounce"
        size="lg"
      >
        Let's Go! ☕
      </Button>
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 via-stone-100 to-amber-100 relative overflow-hidden flex items-center justify-center px-4">
      {/* Intro looping video */}
      <div className="absolute top-8 left-1/2 -translate-x-1/2 z-10 text-center select-none">
        <div className="relative mx-auto w-40 h-40 md:w-56 md:h-56 rounded-full overflow-hidden shadow-2xl ring-4 ring-amber-600/30">
        <video
          ref={videoRef}
          autoPlay
          muted={muted}
          loop
          playsInline
          preload="auto"
          controls={!muted}
          className="w-full h-full object-cover"
          style={{ transform: rotationDeg ? `rotate(${rotationDeg}deg) scale(1.08)` : undefined }}
          onLoadedMetadata={() => {
            const v = videoRef.current;
            if (!v) return;
            const isLandscape = v.videoWidth > v.videoHeight;
            setRotationDeg(isLandscape ? -90 : 0);
          }}
>       
          {/* Prefer WebM (VP9/Opus) for Chrome/Android */}
          <source src="/intro/Untitled.webm" type="video/webm" />

          {/* Fallback to MP4 (H.264/AAC) for Safari/iPhone */}
          <source src="/intro/Untitled.mp4" type="video/mp4" />

          {/* Optional message if video can't load */}
          Your browser does not support the video tag.
        </video>

          {muted && (
            <button
              onClick={() => {
                setMuted(false);
                if (videoRef.current) {
                  videoRef.current.muted = false;
                  videoRef.current.volume = 1;
                  videoRef.current.play().catch(() => {});
                }
              }}
              className="absolute inset-x-6 bottom-4 rounded-full bg-amber-900/60 text-amber-50 text-xs md:text-sm px-3 py-2 shadow-lg backdrop-blur-sm"
            >
              Tap for sound 🔊
            </button>
          )}
        </div>
        <p className="mt-3 text-sm md:text-base text-amber-800 font-mono">
          Someone says hello…
        </p>
      </div>
      {/* Confetti Animation */}
      {showConfetti && (
        <div className="fixed inset-0 pointer-events-none z-10">
          {[...Array(25)].map((_, i) => (
            <div
              key={i}
              className="confetti"
              style={{
                left: `${Math.random() * 100}%`,
                backgroundColor: ['#d4a574', '#e8c39e', '#a68a7b', '#8B5A2B'][i % 4],
                animationDelay: `${Math.random() * 2}s`,
                animationDuration: `${2 + Math.random() * 2}s`
              }}
            />
          ))}
        </div>
      )}

      {/* Main Content */}
      <Card className={`bg-white/95 backdrop-blur-sm p-8 md:p-12 rounded-3xl shadow-xl max-w-lg border-0 relative transition-all duration-1000 pt-28 md:pt-36 ${
        phase === 'nonchalant' ? 'bg-white/60 border-amber-200' : 
        phase === 'reveal' ? 'bg-white/80 border-amber-400/20' : 
        'bg-white/95 border-amber-600/20'
      }`}>
        {phase === 'nonchalant' && getNonchalantContent()}
        {phase === 'reveal' && getRevealContent()}
        {phase === 'celebration' && getCelebrationContent()}
      </Card>
    </div>
  );
};

export default LandingPage;