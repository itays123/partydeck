import EditableCard from './EditableCard';

/**
 *
 * @param {{ editor: { deck: Map<number,string>, addCard(value:string): void, modifyCard(key: number, value:string): void, deleteCard(key): void } }} props
 */
const DeckEditor = ({ editor }) => {
  const { deck } = editor;
  return (
    <section className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4 mt-2 pb-6">
      {[...deck.keys()].map((key, index) => {
        const text = deck.get(key);
        return <EditableCard key={key} text={text} onTextChange={() => {}} />;
      })}
    </section>
  );
};

export default DeckEditor;
