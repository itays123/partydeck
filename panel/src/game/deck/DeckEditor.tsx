import { Editor } from '../types';
import EditableCard from './EditableCard/EditableCard';
import { withEditor } from './withEditor';

type Props = {
  editor: Editor;
  label: string;
};

function DeckEditor({ editor, label }: Props): JSX.Element {
  const {
    cardAtomList,
    next,
    focusedCardIndex,
    setFocusedCardIndex,
    canDelete,
  } = editor;
  return (
    <div className="card-list container mx-auto overflow-y-visible mt-4 px-8 md:px-2">
      <h3>
        <span className="font-medium text-2xl">{label} </span>
        <span className="font-thin text-gray-700 text-sm">
          {cardAtomList.length}
        </span>
      </h3>
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4 mt-2 pb-6">
        {cardAtomList.map((atom, index) => (
          <EditableCard
            atom={atom}
            onTabPress={next}
            focused={focusedCardIndex === index}
            onFocus={() => setFocusedCardIndex(index)}
            canDelete={canDelete}
            onDeletePress={atom.remove}
          />
        ))}
      </div>
    </div>
  );
}

export default withEditor(DeckEditor);
