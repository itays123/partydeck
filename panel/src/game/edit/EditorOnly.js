import { useGameEditorContext } from './GameEditorContext';

const EditorOnly = ({ children }) => {
  const { isEditable } = useGameEditorContext();
  return isEditable ? children : null;
};

export default EditorOnly;
