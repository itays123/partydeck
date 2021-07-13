import ConditionalWrapper, {
  Wrapper,
} from '../../shared/helpers/ConditionalWrapper';
import { useGameEditorContext } from '../GameEditorContext';

export const ExistingGamesOnly = ({ children }: Wrapper) => {
  const { isGameNew } = useGameEditorContext();
  return (
    <ConditionalWrapper condition={!isGameNew}>{children}</ConditionalWrapper>
  );
};

const NewGamesOnly = ({ children }: Wrapper) => {
  const { isGameNew } = useGameEditorContext();
  return (
    <ConditionalWrapper condition={isGameNew}>{children}</ConditionalWrapper>
  );
};

export default NewGamesOnly;
