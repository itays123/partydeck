import Spinner from '../../shared/Spinner';
import SvgWrapper from '../../shared/SvgWrapper';
import EditorOnly from '../edit/EditorOnly';
import { useGameEditorContext } from '../edit/GameEditorContext';

const Save = ({ isLoading, onClick = async () => {}, callback }) => {
  const {
    isGameNew,
    isChanged,
    name,
    lng,
    isPrivate,
    questions,
    answers,
  } = useGameEditorContext();

  const saveClickHandler = () => {
    let arg;
    if (isGameNew) {
      arg = {
        name,
        lng,
        isPrivate,
        questions: [...questions.added.values()],
        answers: [...answers.added.values()],
      };
    } else {
      arg = {
        questions: {
          added: [...questions.added.values()],
          modified: [...questions.modified.entries()],
          deleted: [...questions.deleted.values()],
        },
        answers: {
          added: [...answers.added.values()],
          modified: [...answers.modified.entries()],
          deleted: [...answers.deleted.values()],
        },
        isPrivate,
      };
    }
    if (callback) {
      onClick(arg).then(callback);
    } else onClick(arg);
  };

  return (
    <EditorOnly>
      <button
        className="save action-button"
        onClick={isLoading ? undefined : saveClickHandler}
        disabled={!isChanged}
      >
        {!isLoading ? (
          <>
            <SvgWrapper>
              <path d="M0 0h24v24H0z" fill="none" />
              <path d="M9 16.2L4.8 12l-1.4 1.4L9 19 21 7l-1.4-1.4L9 16.2z" />
            </SvgWrapper>
            Save
          </>
        ) : (
          <div className="flex items-center">
            <Spinner />
            Saving...
          </div>
        )}
      </button>
    </EditorOnly>
  );
};

export default Save;
