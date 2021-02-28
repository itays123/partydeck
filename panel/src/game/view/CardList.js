import DeckEditor from '../edit/DeckEditor';
import { useGameEditorContext } from '../edit/GameEditorContext';

const CardList = ({ title, contextEditor }) => {
  const context = useGameEditorContext();
  const editor = context[contextEditor];
  return (
    <div className="card-list container mx-auto overflow-y-visible mt-4 px-2">
      <h3>
        <span className="font-bold text-2xl">{title} </span>
        <span className="font-thin text-gray-700 text-sm">
          {editor.deck.size}
        </span>
      </h3>
      <DeckEditor editor={editor} />
    </div>
  );
};

export default CardList;
