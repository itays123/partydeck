import { GameAuthorProvider } from './GameAuthorProvider';
import { GameListEmpty } from './GameListEmpty';
import GameListItem from './GameListItem';
import { GameListLoading } from './GameListLoading';
import { Author, Game } from './types';

type Props = { sharedAuthor?: Author; games: Game[]; isLoading?: boolean };

export default function GameList({ games, sharedAuthor, isLoading }: Props) {
  return (
    <GameAuthorProvider sharedAuthor={sharedAuthor}>
      <GameListEmpty games={games} isLoading={isLoading} />
      <GameListLoading isLoading={isLoading} />
      <div className="game-list p-4 space-y-4">
        {!isLoading &&
          games &&
          games.map(game => <GameListItem key={game._id} {...game} />)}
      </div>
    </GameAuthorProvider>
  );
}
