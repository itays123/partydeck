import { GameAuthorProvider } from './GameAuthorProvider';
import GameListItem from './GameListItem';
import { Author, Game } from './types';

type Props = { sharedAuthor?: Author; games: Game[] };

export default function GameList({ games, sharedAuthor }: Props) {
  return (
    <GameAuthorProvider sharedAuthor={sharedAuthor}>
      <div className="game-list p-4 space-y-4">
        {games.map(game => (
          <GameListItem key={game._id} {...game} />
        ))}
      </div>
    </GameAuthorProvider>
  );
}
