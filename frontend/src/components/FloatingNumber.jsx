const FloatingNumber = ({ startPos, endPos, onComplete }) => {
  const translateX = endPos.x - startPos.x;
  const translateY = endPos.y - startPos.y;

  return (
    <div
      className="fixed z-50 animate-float-to-cart text-blue-400 font-black text-3xl"
      style={{
        top: startPos.y,
        left: startPos.x,
        '--translate-x': `${translateX}px`,
        '--translate-y': `${translateY}px`,
        textShadow: '0 0 10px rgba(59, 130, 246, 0.5)'
      }}
      onAnimationEnd={onComplete}
    >
      +1
    </div>
  );
};

export default FloatingNumber;
