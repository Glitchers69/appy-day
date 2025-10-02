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
  image?: string;
}

interface PoppedImage {
  id: number;
  x: number;
  y: number;
  image: string;
  timestamp: number;
}

const BalloonGamePage = () => {
  const navigate = useNavigate();
  const [balloons, setBalloons] = useState<Balloon[]>([]);
  const [score, setScore] = useState(0);
  const [gameComplete, setGameComplete] = useState(false);
  const [poppedImages, setPoppedImages] = useState<PoppedImage[]>([]);
  const [usedImages, setUsedImages] = useState<Set<string>>(new Set());

  // List of all images from mainimg folder
  const mainImages = [
    'IMG_9813.png', 'IMG_9812.png', 'IMG_9804.png', 'IMG_9502.png', 'IMG_9495.png',
    'IMG_7911.png', 'IMG_7600.png', 'IMG_7587.png', 'IMG_7489.png', 'IMG_6803.png',
    'IMG_6616.png', 'IMG_6435 2.png', 'IMG_4439.png', 'IMG_3630.png', 'IMG_3304.png',
    'IMG_1411.png', 'IMG_1090.png', 'IMG_1089.png', 'IMG_1034.png', 'IMG_0766.png',
    'IMG_0534.png', 'IMG_0436.png', 'd4ea8844-ff88-4597-b139-24a7a7853bd5.png',
    'c48ca748-32bd-4a01-8549-a42d7af1ebbf.png', 'B095E8C8-E6A2-4B07-B163-453628AD2B75.png',
    'a59cbdc6-e573-44f1-b4d3-c68a104f3f6b.png', '581615dc-e33e-44a2-a705-2afad13e05e5.png',
    '5730e9bb-0a25-4649-9ea7-b2e318ac2878.png', '409dabcc-a094-4eac-8b09-be892d035c8b.png',
    '78a280b3-7850-4c2f-a8bc-efac8f63c40d.png', '39F80E75-5B7C-435E-A729-A0438F6C8568.png',
    '6A398D56-6E6D-441F-8623-C0501C6AA7B0.png', '4f255b94-251d-4006-b7a7-8763fd8c56b2.png',
    '1F5294FD-910B-4274-AE0A-9DE176BD1EB6.png', '01b44ace-f7cf-4c8c-be48-5ac9e08462b9.png',
    '0b7ecbba-87e7-4c32-bf90-b55f8199cb77.png'
  ];

  const colors = [
    'bg-primary',
    'bg-secondary', 
    'bg-accent',
    'bg-celebration',
    'bg-muted'
  ];

  // Function to get a random unused image
  const getRandomUnusedImage = () => {
    const availableImages = mainImages.filter(img => !usedImages.has(img));
    if (availableImages.length === 0) {
      // If all images have been used, reset the used images set
      setUsedImages(new Set());
      return mainImages[Math.floor(Math.random() * mainImages.length)];
    }
    const randomIndex = Math.floor(Math.random() * availableImages.length);
    return availableImages[randomIndex];
  };

  useEffect(() => {
    // Generate initial balloons - increased from 12 to 20
    const initialBalloons: Balloon[] = Array.from({ length: 20 }, (_, i) => ({
      id: i,
      x: 8 + (i % 5) * 18 + Math.random() * 8,
      y: 15 + Math.floor(i / 5) * 20 + Math.random() * 8,
      color: colors[i % colors.length],
      size: 50 + Math.random() * 25,
      popped: false,
      image: getRandomUnusedImage()
    }));
    setBalloons(initialBalloons);
  }, []);

  const popBalloon = (balloonId: number) => {
    const balloon = balloons.find(b => b.id === balloonId);
    if (!balloon) return;

    setBalloons(prev => 
      prev.map(balloon => 
        balloon.id === balloonId 
          ? { ...balloon, popped: true }
          : balloon
      )
    );
    setScore(prev => prev + 10);

    // Add popped image to display
    if (balloon.image) {
      // Mark this image as used
      setUsedImages(prev => new Set([...prev, balloon.image!]));
      
      const newPoppedImage: PoppedImage = {
        id: Date.now() + Math.random(),
        x: balloon.x,
        y: balloon.y,
        image: balloon.image,
        timestamp: Date.now()
      };
      setPoppedImages(prev => [...prev, newPoppedImage]);

      // Remove the popped image after 3 seconds
      setTimeout(() => {
        setPoppedImages(prev => prev.filter(img => img.id !== newPoppedImage.id));
      }, 3000);
    }

    // Check if all balloons are popped
    const updatedBalloons = balloons.map(balloon => 
      balloon.id === balloonId ? { ...balloon, popped: true } : balloon
    );
    
    if (updatedBalloons.every(balloon => balloon.popped)) {
      setTimeout(() => setGameComplete(true), 500);
    }
  };

  const handleContinue = () => {
    navigate('/final-love');
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

        {/* Popped Images Display */}
        {poppedImages.map((poppedImage) => (
          <div
            key={poppedImage.id}
            className="absolute transform transition-all duration-500 ease-out animate-scale-in"
            style={{
              left: `${poppedImage.x}%`,
              top: `${poppedImage.y}%`,
              transform: 'translate(-50%, -50%)',
            }}
          >
            <div className="relative">
              {/* Cute frame around the image */}
              <div className="w-32 h-32 bg-white rounded-2xl shadow-2xl border-4 border-pink-200 p-2 animate-bounce">
                <img
                  src={`/src/img/mainimg/${poppedImage.image}`}
                  alt="Surprise!"
                  className="w-full h-full object-cover rounded-xl"
                  onError={(e) => {
                    // Hide the image if it fails to load
                    e.currentTarget.style.display = 'none';
                  }}
                />
                {/* Sparkle effects */}
                <div className="absolute -top-2 -right-2 w-4 h-4 bg-yellow-300 rounded-full animate-ping"></div>
                <div className="absolute -bottom-2 -left-2 w-3 h-3 bg-pink-300 rounded-full animate-ping" style={{ animationDelay: '0.5s' }}></div>
                <div className="absolute top-1/2 -right-3 w-2 h-2 bg-blue-300 rounded-full animate-ping" style={{ animationDelay: '1s' }}></div>
              </div>
              {/* Heart floating above */}
              <div className="absolute -top-8 left-1/2 transform -translate-x-1/2">
                <Heart className="w-6 h-6 text-red-400 animate-bounce" />
              </div>
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