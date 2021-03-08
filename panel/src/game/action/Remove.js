import SvgWrapper from '../../shared/SvgWrapper';
import NewGamesOnly from '../create/NewGamesOnly';
import EditorOnly from '../edit/EditorOnly';
import { useGameEditorContext } from '../edit/GameEditorContext';

const Remove = ({ onClick = () => {}, disabled }) => {
  const { isChanged } = useGameEditorContext();
  return (
    <EditorOnly>
      <NewGamesOnly gameShouldExist>
        <button
          className="remove action-button"
          onClick={onClick}
          disabled={disabled || isChanged}
        >
          <SvgWrapper>
            <path d="M0 0h24v24H0V0z" fill="none" />
            <path d="M6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7H6v12zM8 9h8v10H8V9zm7.5-5l-1-1h-5l-1 1H5v2h14V4z" />
          </SvgWrapper>
          Remove
        </button>
      </NewGamesOnly>
    </EditorOnly>
  );
};

export default Remove;
