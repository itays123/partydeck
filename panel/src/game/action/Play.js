import SvgWrapper from '../../shared/SvgWrapper';
import NewGamesOnly from '../wrapper/NewGamesOnly';
import { useGameEditorContext } from '../GameEditorContext';

const Play = ({ onClick = () => {} }) => {
  const { isChanged } = useGameEditorContext();
  return (
    <NewGamesOnly gameShouldExist>
      <button
        className="play action-button"
        onClick={onClick}
        disabled={isChanged}
      >
        <SvgWrapper>
          <path d="M0 0h24v24H0z" fill="none" />
          <path d="M8 5v14l11-7z" />
        </SvgWrapper>
        Play
      </button>
    </NewGamesOnly>
  );
};

export default Play;
