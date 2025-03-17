const LoadingSpinner = () => {
  return (
    <div className="flex items-center justify-center">
      <div className="animate-spin-slow relative w-16 h-16">
        <div className="star absolute inset-0"></div>
      </div>
      <style jsx>{`
        .star {
          background: 
            conic-gradient(from 0deg at 50% 50%, 
              rgba(123, 97, 255, 0) 0deg, 
              rgba(123, 97, 255, 0.5) 180deg, 
              rgba(123, 97, 255, 0) 360deg);
          clip-path: polygon(
            50% 0%, 61% 35%, 98% 35%, 68% 57%,
            79% 91%, 50% 70%, 21% 91%, 32% 57%,
            2% 35%, 39% 35%
          );
          animation: pulse 2s ease-in-out infinite;
        }
        @keyframes pulse {
          0% { transform: scale(1); opacity: 0.5; }
          50% { transform: scale(1.2); opacity: 1; }
          100% { transform: scale(1); opacity: 0.5; }
        }
      `}</style>
    </div>
  );
};

export default LoadingSpinner;
