import NewGamesOnly from './create/NewGamesOnly';
import EditorOnly from './edit/EditorOnly';
import { useGameEditorContext } from './edit/GameEditorContext';

const GameActions = () => {
  const { play, remove } = useGameEditorContext();
  return (
    <section className="actions flex justify-start flex-row-reverse">
      <NewGamesOnly gameShouldExist>
        <button
          className="play px-3 py-1 ml-4 text-purple-900 font-medium flex focus:outline-none"
          onClick={play}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            className="fill-current"
            width={24}
            height={24}
          >
            <path d="M0 0h24v24H0z" fill="none" />
            <path d="M8 5v14l11-7z" />
          </svg>
          Play
        </button>
      </NewGamesOnly>
      <EditorOnly>
        <NewGamesOnly gameShouldExist>
          <button
            className="remove px-3 py-1 ml-4 text-purple-900 font-medium flex focus:outline-none"
            onClick={remove}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              className="fill-current"
              width={24}
              height={24}
            >
              <path d="M0 0h24v24H0V0z" fill="none" />
              <path d="M6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7H6v12zM8 9h8v10H8V9zm7.5-5l-1-1h-5l-1 1H5v2h14V4z" />
            </svg>
            Remove
          </button>
        </NewGamesOnly>
      </EditorOnly>
    </section>
  );
};

export default GameActions;
