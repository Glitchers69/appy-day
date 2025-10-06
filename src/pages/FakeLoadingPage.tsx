import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Heart, Sparkles, Zap, Coffee } from 'lucide-react';

const FakeLoadingPage = () => {
  const navigate = useNavigate();
  const [progress, setProgress] = useState(0);
  const [currentStepIndex, setCurrentStepIndex] = useState(0);
  const [currentImage, setCurrentImage] = useState('');

  // List of all images in loadimg folder
  const imageList = [
    'IMG_0463.png', 'IMG_0508.png', 'IMG_0509.png', 'IMG_0579.png', 'IMG_0581.png',
    'IMG_0860.png', 'IMG_0882.png', 'IMG_0906.png', 'IMG_0913.png', 'IMG_1019.png',
    'IMG_1021.png', 'IMG_1022.png', 'IMG_1083.png', 'IMG_1085.png', 'IMG_1111.png',
    'IMG_1136.png', 'IMG_1139.png', 'IMG_4423.png', 'IMG_6508.png', 'IMG_6784.png',
    'IMG_7584.png', 'IMG_7950.png', 'IMG_8759.png', 'IMG_8867.png', 'IMG_9795.png',
    'IMG_9796.png'
  ];

  const loadingSteps = [
    { text: "Generating your dumbo score...", duration: 1500 },
    { text: "Loading warm cuddles...", duration: 1200 },
    { text: "Installing girlfriend.exe ", duration: 1000 },
    { text: "Calibrating drama levels...", duration: 800 },
    { text: "Downloading extra sass...", duration: 900 },
    { text: "Buffering your tiny pp...", duration: 700 },
    { text: "Stealing your heart...", duration: 1100 },
    { text: "Ready to proceed!", duration: 800 }
  ];

  // Function to get a random image
  const getRandomImage = () => {
    const randomIndex = Math.floor(Math.random() * imageList.length);
    return imageList[randomIndex];
  };

  useEffect(() => {
    const totalSteps = loadingSteps.length;
    let currentStep = 0;
    
    // Set initial image
    setCurrentImage(getRandomImage());
    
    // Image rotation interval - changes image every 2000ms (2 seconds)
    const imageInterval = setInterval(() => {
      setCurrentImage(getRandomImage());
    }, 2000);
    
    const stepInterval = setInterval(() => {
      if (currentStep < totalSteps - 1) {
        currentStep++;
        setCurrentStepIndex(currentStep);
        setProgress((currentStep / (totalSteps - 1)) * 100);
      } else {
        clearInterval(stepInterval);
        clearInterval(imageInterval);
        setTimeout(() => navigate('/things-i-love'), 1000);
      }
    }, 3000);

    return () => {
      clearInterval(stepInterval);
      clearInterval(imageInterval);
    };
  }, [navigate]);

  const getRandomIcon = () => {
    const icons = [Heart, Sparkles, Zap, Coffee];
    const Icon = icons[Math.floor(Math.random() * icons.length)];
    return <Icon className="w-6 h-6 text-amber-700 animate-spin" />;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 via-stone-100 to-amber-100 relative overflow-hidden flex items-center justify-center px-4">
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
          <div className="w-48 h-48 bg-gradient-to-r from-primary to-primary-glow rounded-full mx-auto mb-4 flex items-center justify-center overflow-hidden shadow-lg">
            {currentImage && (
              <img 
                src={`/src/img/loadimg/${currentImage}`}
                alt="Loading..."
                className="w-44 h-44 object-cover rounded-full transition-all duration-500 ease-in-out hover:scale-105"
                onError={(e) => {
                  // Fallback to a random image if the current one fails to load
                  setCurrentImage(getRandomImage());
                }}
              />
            )}
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