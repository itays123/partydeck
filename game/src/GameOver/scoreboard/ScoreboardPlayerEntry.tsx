interface ScoreboardRow {
  score: number;
  nickname: string;
  relativeScore: number; // a number between 0 and 1
}

export function ScoreboardPlayerEntry({
  score,
  nickname,
  relativeScore,
}: ScoreboardRow) {
  return (
    <div
      className="bg-white flex flex-col items-between justify-center text-center px-2 md:px-4 py-2 text-theme-800"
      style={{ height: relativeScore * 160 }}
    >
      <span className="font-bold">{nickname}</span>
      <span className="text-sm">{score} rounds won</span>
    </div>
  );
}
