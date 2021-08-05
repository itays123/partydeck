import languages from '../../shared/helpers/languages';
import {
  EditButton,
  GameActionsProvider,
  LinkableGameName,
  PlayButton,
  RemoveButton,
} from './GameActionsProvider';
import { GameAuthor } from './GameAuthor';
import { IsAuthor } from './GameAuthorProvider';
import { GamePrivateIcon } from './GamePrivateIcon';
import { Game } from './types';

export default function GameListItem({
  _id,
  name,
  questionCount,
  answerCount,
  lng,
  author,
  isPrivate,
}: Game) {
  return (
    <GameActionsProvider gameId={_id}>
      <div className="game-item p-4 bg-theme-100 rounded border-b-4 border-theme-100 hover:border-theme-500">
        <div className="details flex items-center space-x-4 font-roboto text-theme-600 font-medium text-sm md:text-lg">
          <span className="text-theme-700">
            {questionCount + answerCount} cards
          </span>
          <span>{languages[lng] && languages[lng].nativeName}</span>
          <GameAuthor
            author={author}
            className="hover:text-gray-700 focus:outline-none"
          />
          <GamePrivateIcon isPrivate={isPrivate} width={20} height={20} />
        </div>
        <div className="title-actions flex items-center justify-between">
          <h2 className="text-2xl md:text-5xl text-theme-700 mb-0">
            <LinkableGameName name={name} className="font-bold" />
          </h2>
          <div className="space-x-2 mt-2 md:mt-0">
            <IsAuthor>
              <EditButton className="w-8 md:w-14" />
              <RemoveButton className="w-8 md:w-14" />
            </IsAuthor>
            <PlayButton className="w-8 md:w-14" />
          </div>
        </div>
      </div>
    </GameActionsProvider>
  );
}
