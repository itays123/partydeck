import EditableCard from './EditableCard';
import EditorOnly from './EditorOnly';

/**
 *
 * @param {{ editor: { deck: Map<number,string>, addCard(value:string): void, modifyCard(key: number, value:string): void, deleteCard(key): void } }} props
 */
const DeckEditor = ({ editor }) => {
  const { deck, addCard, modifyCard } = editor;
  return (
    <section className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4 mt-2 pb-6">
      {[...deck.keys()].map((key, index) => {
        const text = deck.get(key);
        return (
          <EditableCard
            key={key}
            text={text}
            onTextChange={value => modifyCard(key, value)}
          />
        );
      })}
      <EditorOnly>
        <button
          className="rounded text-center py-8 border-4 border-dashed border-gray-500 flex items-center justify-center focus:outline-none"
          onClick={() => addCard('')}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            className="fill-dark"
            width={48}
            height={48}
          >
            <path d="M0 0h24v24H0z" fill="none" />
            <path d="M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2z" />
          </svg>
        </button>
      </EditorOnly>
    </section>
  );
};

export default DeckEditor;
