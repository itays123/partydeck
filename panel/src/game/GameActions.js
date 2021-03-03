import NewGamesOnly from './create/NewGamesOnly';
import EditorOnly from './edit/EditorOnly';
import { useGameEditorContext } from './edit/GameEditorContext';

const GameActions = () => {
  const { isChanged, save, play, remove, discard } = useGameEditorContext();
  return (
    <section className="actions flex justify-start flex-row-reverse">
      <NewGamesOnly gameShouldExist>
        <button
          className="play action-button"
          onClick={play}
          disabled={isChanged}
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
          <button className="remove action-button" onClick={remove}>
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
        <button
          className="save action-button"
          onClick={save}
          disabled={!isChanged}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            className="fill-current"
            width={24}
            height={24}
          >
            <path d="M0 0h24v24H0z" fill="none" />
            <path d="M9 16.2L4.8 12l-1.4 1.4L9 19 21 7l-1.4-1.4L9 16.2z" />
          </svg>
          Save
        </button>
        <button
          className="discard action-button"
          onClick={discard}
          disabled={!isChanged}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            className="fill-current"
            width={24}
            height={24}
          >
            <path d="M0 0h24v24H0z" fill="none" />
            <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z" />
          </svg>
          Discard
        </button>
      </EditorOnly>
    </section>
  );
};

export default GameActions;
