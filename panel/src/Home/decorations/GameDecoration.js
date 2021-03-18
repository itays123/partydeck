const GameSkeleton = () => {
  return (
    <div className="game-item rounded px-8 py-6 w-full ring-1 ring-green-400">
      <div className="h-6 w-24 bg-green-400 opacity-40 mb-2"></div>
      <div className="h-4 w-48 bg-green-700 opacity-20 mb-2"></div>
      <div className="h-4 w-40 bg-green-700 opacity-20"></div>
    </div>
  );
};

const GameDecoration = () => {
  return (
    <div className="game-list flex-grow flex flex-col items-stretch justify-center space-y-3 px-4">
      <GameSkeleton />
      <GameSkeleton />
    </div>
  );
};

export default GameDecoration;
