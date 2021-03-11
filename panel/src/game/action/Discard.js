import SvgWrapper from '../../shared/SvgWrapper';
import EditorOnly from '../edit/EditorOnly';
import { useGameEditorContext } from '../edit/GameEditorContext';

const Discard = ({ onClick = () => {}, isSaveLoading = false }) => {
  const { isChanged, clearState } = useGameEditorContext();
  return (
    <EditorOnly>
      <button
        className="discard action-button"
        onClick={() => {
          clearState();
          onClick();
        }}
        disabled={!isChanged || isSaveLoading}
      >
        <SvgWrapper>
          <path d="M0 0h24v24H0z" fill="none" />
          <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z" />
        </SvgWrapper>
        Discard
      </button>
    </EditorOnly>
  );
};

export default Discard;
