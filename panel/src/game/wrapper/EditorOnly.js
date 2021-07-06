import { useGameEditorContext } from '../GameEditorContext';

const EditorOnly = ({ children, shouldNotBeEditor = false }) => {
  const { isEditable } = useGameEditorContext();
  return isEditable !== shouldNotBeEditor ? children : null;
};

export default EditorOnly;
