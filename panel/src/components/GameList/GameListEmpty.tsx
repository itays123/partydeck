import { Game } from './types';

export function GameListEmpty({
  games,
  isLoading,
}: {
  games: Game[];
  isLoading?: boolean;
}) {
  return (
    <>
      {games?.length === 0 && !isLoading && (
        <div className="flex items-center justify-center text-theme-600 text-lg h-full">
          Looks Empty here! ;)
        </div>
      )}
    </>
  );
}
