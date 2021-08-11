import Spinner from '../../components/Spinner/Spinner';
import {
  RemoveButton,
  SaveLoading,
  SaveNotLoading,
} from '../action/GameCrudProvider';
import {
  CancelButton,
  SaveButton,
  SaveNewGameLoading,
  SaveNewGameNotLoading,
} from '../action/NewGamesSaveProvider';
import {
  EditorOnly,
  ExistingGamesOnly,
  NewGamesOnly,
  useGameEditorContext,
} from '../GameEditorContext';
import { CreateLiveGameButton } from '../play/LiveGameModalProvider';
import GameNameForm from '../settings/GameNameForm';

export default function GameHeader() {
  const { name } = useGameEditorContext();
  return (
    <div className="flex justify-between items-center">
      <h1 className="text-left text-4xl md:text-6xl lg:text-8xl font-medium text-theme-600 mb-0">
        <ExistingGamesOnly>{name}</ExistingGamesOnly>
        <NewGamesOnly>
          <GameNameForm />
        </NewGamesOnly>
      </h1>
      <section className="actions flex justify-start flex-row-reverse mt-2 space-x-2">
        <ExistingGamesOnly>
          <SaveLoading>
            <Spinner label="Saving..." />
          </SaveLoading>
          <SaveNotLoading>
            <CreateLiveGameButton className="w-10 h-10" />
            <EditorOnly>
              <RemoveButton className="w-10 h-10" />
            </EditorOnly>
          </SaveNotLoading>
        </ExistingGamesOnly>
        <NewGamesOnly>
          <SaveNewGameLoading>
            <Spinner label="Saving..." />
          </SaveNewGameLoading>
          <SaveNewGameNotLoading>
            <SaveButton className="w-10 h-10" />
            <CancelButton className="w-10 h-10" />
          </SaveNewGameNotLoading>
        </NewGamesOnly>
      </section>
    </div>
  );
}
