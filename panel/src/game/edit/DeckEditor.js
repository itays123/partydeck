import SvgWrapper from '../../shared/SvgWrapper';
import EditableCard from './EditableCard';
import EditorOnly from './EditorOnly';

/**
 *
 * @param {{ editor: { deck: Map<number,string>, addCard(value:string): void, modifyCard(key: number, value:string): void, deleteCard(key): void } }} props
 */
const DeckEditor = ({ editor }) => {
  const {
    deck,
    addCard,
    modifyCard,
    deleteCard,
    focusedCardIndex,
    setFocusedCardIndex,
    next,
  } = editor;
  return (
    <section className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4 mt-2 pb-6">
      {[...deck.keys()].map((key, index) => {
        const text = deck.get(key);
        return (
          <EditableCard
            key={key}
            text={text}
            focused={index === focusedCardIndex}
            onTextChange={value => modifyCard(key, value)}
            onDeletePress={() => deleteCard(key)}
            onFocus={() => setFocusedCardIndex(index)}
            onTabPress={() => next()}
          />
        );
      })}
      <EditorOnly>
        <button
          className="rounded text-center py-8 border-4 border-dashed border-gray-500 flex items-center justify-center focus:outline-none"
          onClick={() => addCard('')}
        >
          <SvgWrapper w={48} h={48} className="text-gray-500">
            <path d="M0 0h24v24H0z" fill="none" />
            <path d="M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2z" />
          </SvgWrapper>
        </button>
      </EditorOnly>
    </section>
  );
};

export default DeckEditor;
