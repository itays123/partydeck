import { useGameEditorContext } from './GameEditorContext';

const EditableCard = ({ text, onTextChange = () => {} }) => {
  const { isEditable } = useGameEditorContext();
  return (
    <div className="card rounded shadow bg-gray-100 text-center py-8 md:py-16">
      <input
        className="focus:outline-none bg-transparent text-center"
        type="text"
        placeholder="An Empty Card"
        value={text}
        readOnly={!isEditable}
        onChange={e => onTextChange(e.target.value)}
      />
    </div>
  );
};

export default EditableCard;
