import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Play, Smile, Heart, Laugh, Sparkles, Camera } from "lucide-react";
import { useState, useRef, useEffect } from "react";

// Import video files
import artistVideo from "@/img/vids/artist.webm";
import eauauaVideo from "@/img/vids/eauaua.webm";
import everydayVideo from "@/img/vids/everyday.webm";
import eyeVideo from "@/img/vids/eye.webm";
import legVideo from "@/img/vids/leg.webm";
import noseVideo from "@/img/vids/nose.webm";
import pijjaVideo from "@/img/vids/pijja.webm";
import sigmaVideo from "@/img/vids/sigma.webm";
import zaVideo from "@/img/vids/home.webm";

const stories = [
  {
    id: 1,
    title: "That Face 😂",
    emoji: "🤪",
    gradient: "from-pink-500 via-purple-500 to-blue-500",
    placeholder: "Her goofiest moment",
    video: eauauaVideo
  },
  {
    id: 2,
    title: "Dance Moves",
    emoji: "💃",
    gradient: "from-orange-500 via-red-500 to-pink-500",
    placeholder: "Her 'unique' dancing",
    video: legVideo
  },
  {
    id: 3,
    title: "Artist Mode",
    emoji: "🎨",
    gradient: "from-blue-500 via-cyan-500 to-teal-500",
    placeholder: "Creative genius",
    video: artistVideo
  },
  {
    id: 4,
    title: "Food Drama",
    emoji: "🍕",
    gradient: "from-yellow-500 via-orange-500 to-red-500",
    placeholder: "Her eating faces",
    video: pijjaVideo
  },
  {
    id: 5,
    title: "Spy",
    emoji: "👀",
    gradient: "from-purple-500 via-pink-500 to-red-500",
    placeholder: "Peak comedy",
    video: eyeVideo
  },
  {
    id: 6,
    title: "Nosey",
    emoji: "👃",
    gradient: "from-green-500 via-emerald-500 to-teal-500",
    placeholder: "Boop!",
    video: noseVideo
  },
  {
    id: 7,
    title: "Sigma Chechi",
    emoji: "😎",
    gradient: "from-slate-500 via-gray-500 to-zinc-500",
    placeholder: "Boss energy",
    video: sigmaVideo
  },
  {
    id: 8,
    title: "Za Moment",
    emoji: "✨",
    gradient: "from-amber-500 via-yellow-500 to-orange-500",
    placeholder: "Special moment",
    video: zaVideo
  },
  {
    id: 9,
    title: "Everyday",
    emoji: "❤️",
    gradient: "from-red-500 via-rose-500 to-pink-500",
    placeholder: "Just being her",
    video: everydayVideo
  }
];

const VideoTimelinePage = () => {
  const navigate = useNavigate();
  const [selectedStory, setSelectedStory] = useState<number | null>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);

  // Handle video playback
  useEffect(() => {
    if (selectedStory && videoRef.current) {
      videoRef.current.load();
      videoRef.current.play().then(() => {
        setIsPlaying(true);
      }).catch(error => {
        console.error("Error playing video:", error);
        setIsPlaying(false);
      });
    }
  }, [selectedStory]);

  // Handle video end
  const handleVideoEnd = () => {
    setIsPlaying(false);
  };

  // Toggle play/pause
  const togglePlayPause = () => {
    if (videoRef.current) {
      if (videoRef.current.paused) {
        videoRef.current.play();
        setIsPlaying(true);
      } else {
        videoRef.current.pause();
        setIsPlaying(false);
      }
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 via-stone-100 to-amber-100 flex flex-col p-4 md:p-8">
      {/* Header */}
      <div className="text-center mb-8 animate-fade-in">
        <h1 className="text-4xl md:text-5xl font-bold mb-2 bg-gradient-to-r from-amber-800 via-amber-700 to-amber-800 bg-clip-text text-transparent font-mono">
          Her Greatest Hits 🎬
        </h1>
        <p className="text-amber-700/70 text-lg">
          A collection of your most iconic moments 😂
        </p>
      </div>

      {/* Story Bubbles */}
      <div className="flex gap-4 overflow-x-auto pb-4 px-2 mb-8 scrollbar-hide animate-fade-in">
        {stories.map((story) => (
          <div
            key={story.id}
            onClick={() => setSelectedStory(story.id)}
            className="flex flex-col items-center gap-2 cursor-pointer group flex-shrink-0"
          >
            {/* Story Circle */}
            <div className={`relative w-24 h-24 rounded-full bg-gradient-to-br ${story.gradient} p-1 hover:scale-110 transition-transform duration-300 ${selectedStory === story.id ? 'ring-2 ring-amber-700' : ''}`}>
              <div className="w-full h-full rounded-full bg-white flex items-center justify-center">
                <span className="text-4xl">{story.emoji}</span>
              </div>
              {/* Ring effect */}
              <div className="absolute inset-0 rounded-full bg-gradient-to-br from-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
            </div>
            {/* Story Title */}
            <p className="text-xs font-medium text-center w-24 truncate text-amber-800">{story.title}</p>
          </div>
        ))}
      </div>

      {/* Selected Story Display */}
      {selectedStory ? (
        <div className="flex-1 flex items-center justify-center animate-scale-in">
          <div className="w-full max-w-md">
            <div className="relative aspect-[9/16] bg-black rounded-3xl overflow-hidden border-2 border-amber-200/50 shadow-2xl">
              {/* Video Player */}
              <video
                ref={videoRef}
                className="absolute inset-0 w-full h-full object-cover"
                onClick={togglePlayPause}
                onEnded={handleVideoEnd}
              >
                <source src={stories.find(s => s.id === selectedStory)?.video} type="video/webm" />
                Your browser does not support the video tag.
              </video>
              
              {/* Play/Pause Overlay */}
              {!isPlaying && (
                <div className="absolute inset-0 flex items-center justify-center bg-black/30" onClick={togglePlayPause}>
                  <Play className="w-20 h-20 text-amber-50 opacity-80" />
                </div>
              )}
              
              {/* Story Info Overlay */}
              <div className="absolute top-0 left-0 right-0 p-4 bg-gradient-to-b from-black/70 to-transparent text-white">
                <p className="text-lg font-bold font-mono">
                  {stories.find(s => s.id === selectedStory)?.title}
                </p>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="flex-1 flex items-center justify-center">
          <div className="text-center space-y-4 animate-fade-in">
            <Sparkles className="w-16 h-16 text-amber-700 mx-auto animate-pulse" />
            <p className="text-xl text-amber-700/70 font-mono">
              Tap a story bubble to relive the moment! 👆
            </p>
          </div>
        </div>
      )}

      {/* Continue Button */}
      <div className="text-center mt-8 animate-fade-in">
        <Button
          onClick={() => navigate("/final-love")}
          size="lg"
          className="px-8 py-6 text-lg shadow-lg hover:shadow-xl transition-all"
        >
          Continue the Journey ❤️
        </Button>
      </div>

      <style>{`
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
        .scrollbar-hide {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
        
        @keyframes fade-in {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        
        @keyframes scale-in {
          from { transform: scale(0.9); opacity: 0; }
          to { transform: scale(1); opacity: 1; }
        }
        
        .animate-fade-in {
          animation: fade-in 0.5s ease-out forwards;
        }
        
        .animate-scale-in {
          animation: scale-in 0.3s ease-out forwards;
        }
      `}</style>
    </div>
  );
};

export default VideoTimelinePage;