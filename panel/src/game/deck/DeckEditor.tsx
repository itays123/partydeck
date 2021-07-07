import EditableCard from './EditableCard/EditableCard';
import { Editor } from './useDeckEditor.tmp';

type Props = {
  editor: Editor;
};

export function DeckEditor({ editor }: Props): JSX.Element {
  const {
    cardAtomList,
    next,
    focusedCardIndex,
    setFocusedCardIndex,
    canDelete,
  } = editor;
  return (
    <div>
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
  );
}
