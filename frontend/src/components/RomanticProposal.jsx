import React, { useEffect, useState } from 'react';
import { Heart, Sparkles, Crown } from 'lucide-react';
import { Button } from './ui/button';

const RomanticProposal = ({ onClose }) => {
  const [hearts, setHearts] = useState([]);
  const [showMessage, setShowMessage] = useState(false);
  const [animationPhase, setAnimationPhase] = useState('entering');

  // Generate floating hearts
  useEffect(() => {
    const generateHearts = () => {
      const newHearts = [];
      for (let i = 0; i < 30; i++) {
        newHearts.push({
          id: i,
          left: Math.random() * 100,
          delay: Math.random() * 3,
          size: Math.random() * 20 + 20,
          opacity: Math.random() * 0.7 + 0.3,
          duration: Math.random() * 4 + 6
        });
      }
      setHearts(newHearts);
    };

    generateHearts();

    // Show message after entrance animation
    const messageTimer = setTimeout(() => {
      setShowMessage(true);
      setAnimationPhase('showing');
    }, 1000);

    return () => clearTimeout(messageTimer);
  }, []);

  const handleResponse = (accepted) => {
    setAnimationPhase('celebrating');
    
    setTimeout(() => {
      if (accepted) {
        // Additional celebration effects could be added here
        setTimeout(onClose, 3000);
      } else {
        onClose();
      }
    }, 2000);
  };

  return (
    <div className="fixed inset-0 bg-gradient-to-br from-pink-900 via-purple-900 to-red-900 z-50 flex items-center justify-center overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0 bg-black bg-opacity-50"></div>
      
      {/* Floating Hearts */}
      <div className="absolute inset-0 pointer-events-none">
        {hearts.map(heart => (
          <div
            key={heart.id}
            className="absolute animate-bounce"
            style={{
              left: `${heart.left}%`,
              animationDelay: `${heart.delay}s`,
              animationDuration: `${heart.duration}s`
            }}
          >
            <Heart
              size={heart.size}
              className="text-pink-400 opacity-80 animate-pulse"
              style={{ 
                opacity: heart.opacity,
                filter: 'drop-shadow(0 0 10px rgba(236, 72, 153, 0.5))'
              }}
              fill="currentColor"
            />
          </div>
        ))}
      </div>

      {/* Sparkles Effect */}
      <div className="absolute inset-0 pointer-events-none">
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className="absolute animate-ping"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 2}s`,
              animationDuration: '3s'
            }}
          >
            <Sparkles 
              size={16} 
              className="text-yellow-300 opacity-70"
              fill="currentColor"
            />
          </div>
        ))}
      </div>

      {/* Main Content */}
      <div className={`
        relative z-10 text-center max-w-4xl mx-auto px-8 transform transition-all duration-1000
        ${showMessage ? 'scale-100 opacity-100' : 'scale-75 opacity-0'}
      `}>
        
        {/* Crown Icon */}
        <div className="mb-8 animate-bounce">
          <div className="inline-block p-6 bg-gradient-to-r from-yellow-400 to-yellow-600 rounded-full shadow-2xl">
            <Crown size={80} className="text-white" fill="currentColor" />
          </div>
        </div>

        {/* Main Message */}
        <div className="bg-white bg-opacity-95 rounded-3xl p-12 shadow-2xl backdrop-blur-sm border-4 border-pink-300">
          <h1 className="text-6xl font-bold mb-8 bg-gradient-to-r from-pink-600 via-red-500 to-purple-600 bg-clip-text text-transparent animate-pulse">
            💕 XEQUE-MATE! 💕
          </h1>
          
          <div className="text-2xl leading-relaxed text-gray-800 font-medium mb-10 space-y-4">
            <p className="animate-fadeIn">
              "ahh nao voce me venceu,
            </p>
            <p className="animate-fadeIn animation-delay-500">
              quer se tornar minha rainha?
            </p>
            <p className="text-3xl font-bold text-pink-600 animate-fadeIn animation-delay-1000">
              quer namorar comigo leticia"
            </p>
          </div>

          {/* Response Buttons */}
          {animationPhase === 'showing' && (
            <div className="flex gap-6 justify-center animate-fadeIn animation-delay-1500">
              <Button
                onClick={() => handleResponse(true)}
                className="px-12 py-4 text-xl font-bold bg-gradient-to-r from-pink-500 to-red-500 hover:from-pink-600 hover:to-red-600 transform hover:scale-110 transition-all duration-300 shadow-xl"
                size="lg"
              >
                💕 Sim! Aceito! 💕
              </Button>
              
              <Button
                onClick={() => handleResponse(false)}
                variant="outline"
                className="px-12 py-4 text-xl font-bold border-2 border-gray-400 text-gray-600 hover:bg-gray-100 transform hover:scale-110 transition-all duration-300 shadow-xl"
                size="lg"
              >
                Deixa eu pensar...
              </Button>
            </div>
          )}

          {/* Celebration Message */}
          {animationPhase === 'celebrating' && (
            <div className="animate-fadeIn">
              <h2 className="text-4xl font-bold text-green-600 mb-4">
                🎉 PARABÉNS! 🎉
              </h2>
              <p className="text-xl text-gray-700">
                Que esse seja o início de uma linda história de amor! 💕
              </p>
            </div>
          )}
        </div>

        {/* Close Button */}
        <Button
          onClick={onClose}
          variant="ghost"
          className="mt-8 text-white hover:text-pink-200 text-lg"
        >
          ✨ Fechar ✨
        </Button>
      </div>

      {/* Additional Animated Elements */}
      <style jsx>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        
        .animate-fadeIn {
          animation: fadeIn 0.8s ease-out forwards;
        }
        
        .animation-delay-500 {
          animation-delay: 0.5s;
          opacity: 0;
        }
        
        .animation-delay-1000 {
          animation-delay: 1s;
          opacity: 0;
        }
        
        .animation-delay-1500 {
          animation-delay: 1.5s;
          opacity: 0;
        }
      `}</style>
    </div>
  );
};

export default RomanticProposal;