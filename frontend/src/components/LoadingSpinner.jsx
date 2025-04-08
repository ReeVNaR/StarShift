const LoadingSpinner = () => {
  return (
    <div className="flex items-center justify-center">
      <div className="animate-spin-slow relative w-16 h-16">
        <div className="star absolute inset-0"></div>
        <div className="star-glow absolute inset-0"></div>
      </div>
      <style>{`
        .star {
          background: conic-gradient(
            from 0deg at 50% 50%, 
            rgba(255, 0, 0, 0) 0deg, 
            rgba(255, 0, 0, 0.8) 180deg, 
            rgba(255, 0, 0, 0) 360deg
          );
          clip-path: polygon(
            50% 0%, 61% 35%, 98% 35%, 68% 57%,
            79% 91%, 50% 70%, 21% 91%, 32% 57%,
            2% 35%, 39% 35%
          );
          animation: rogPulse 1.5s ease-in-out infinite;
          filter: drop-shadow(0 0 5px #ff0000);
        }
        .star-glow {
          background: rgba(255, 0, 0, 0.2);
          clip-path: polygon(
            50% 0%, 61% 35%, 98% 35%, 68% 57%,
            79% 91%, 50% 70%, 21% 91%, 32% 57%,
            2% 35%, 39% 35%
          );
          animation: rogGlow 1.5s ease-in-out infinite;
          filter: blur(8px);
        }
        @keyframes rogPulse {
          0% { transform: scale(1); opacity: 0.5; }
          50% { transform: scale(1.3); opacity: 1; }
          100% { transform: scale(1); opacity: 0.5; }
        }
        @keyframes rogGlow {
          0% { transform: scale(1.2); opacity: 0.2; }
          50% { transform: scale(1.5); opacity: 0.4; }
          100% { transform: scale(1.2); opacity: 0.2; }
        }
      `}</style>
    </div>
  );
};

export default LoadingSpinner;
