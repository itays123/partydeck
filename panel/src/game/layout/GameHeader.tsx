import Spinner from '../../components/Spinner/Spinner';
import { RemoveButton } from '../action/GameCrudProvider';
import {
  CancelButton,
  SaveButton,
  SaveNewGameLoading,
  SaveNewGameNotLoading,
} from '../action/NewGamesSaveProvider';
import {
  AllValuesValidated,
  Changed,
  EditorOnly,
  ExistingGamesOnly,
  NewGamesOnly,
  NotChanged,
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
          <Changed>
            <Spinner label="Saving..." />
          </Changed>
          <NotChanged>
            <CreateLiveGameButton className="w-10 h-10" />
            <EditorOnly>
              <RemoveButton className="w-10 h-10" />
            </EditorOnly>
          </NotChanged>
        </ExistingGamesOnly>
        <NewGamesOnly>
          <SaveNewGameLoading>
            <Spinner label="Saving..." />
          </SaveNewGameLoading>
          <SaveNewGameNotLoading>
            <AllValuesValidated>
              <SaveButton className="w-10 h-10" />
              <CancelButton className="w-10 h-10" />
            </AllValuesValidated>
          </SaveNewGameNotLoading>
        </NewGamesOnly>
      </section>
    </div>
  );
}
