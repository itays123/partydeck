import { useGameEditorContext } from '../GameEditorContext';

const NewGamesOnly = ({ children, gameShouldExist = false }) => {
  const { isGameNew } = useGameEditorContext();
  return isGameNew !== gameShouldExist ? children : null;
};

export default NewGamesOnly;
