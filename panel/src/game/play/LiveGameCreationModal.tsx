import { createModal } from '../../components/Modal/modalFactory';
import { ModalWrapper } from '../../components/Modal/ModalWrapper';
import Spinner from '../../components/Spinner/Spinner';
import {
  ErrorInCreation,
  GameCreationLoading,
  GameCreationNotLoading,
  LiveGameCreationContext,
  LiveGameReady,
  useGameCreationContext,
} from './LiveGameModalProvider';

const ModalProvider = createModal(
  LiveGameCreationContext,
  'liveGameCreationModal',
  ''
);

const { REACT_APP_GAME_URL } = process.env;

export default function LiveGameCreationModal() {
  const { liveCode } = useGameCreationContext();
  return (
    <ModalProvider.Visible>
      <ModalWrapper>
        <div className="flex justify-end mb-2">
          <GameCreationNotLoading>
            <ModalProvider.Closer width={32} height={32} className="-m-8 p-2" />
          </GameCreationNotLoading>
        </div>
        <h1>Creating Your Live Game...</h1>
        <GameCreationLoading>
          <Spinner label="please wait as we create your game..." />
        </GameCreationLoading>
        <ErrorInCreation>
          <div className="text-pink dark text-lg">
            There was an error creating your game, please try again
          </div>
        </ErrorInCreation>
        <LiveGameReady>
          <a
            href={REACT_APP_GAME_URL + '?code=' + liveCode}
            className="accent-button text-center w-52 text-white"
          >
            Enter The Game
          </a>
        </LiveGameReady>
      </ModalWrapper>
    </ModalProvider.Visible>
  );
}
