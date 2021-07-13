import SvgWrapper from '../../shared/SvgWrapper';
import { Editor } from '../types';
import EditorOnly from '../wrapper/EditorOnly';
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
    addCard,
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
            key={index + ':' + atom.getValue()}
            atom={atom}
            onTabPress={next}
            focused={focusedCardIndex === index}
            onFocus={() => setFocusedCardIndex(index)}
            canDelete={canDelete}
            onDeletePress={atom.remove}
          />
        ))}
        <EditorOnly>
          <button
            className="rounded text-center py-8 border-4 border-dashed border-gray-500 flex items-center justify-center focus:outline-none"
            onClick={() => addCard()}
          >
            <SvgWrapper w={48} h={48} className="text-gray-500">
              <path d="M0 0h24v24H0z" fill="none" />
              <path d="M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2z" />
            </SvgWrapper>
          </button>
        </EditorOnly>
      </div>
    </div>
  );
}

export default withEditor(DeckEditor);
