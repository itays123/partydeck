import ConditinalWrapper, {
  Wrapper,
} from '../../shared/helpers/ConditionalWrapper';
import { useGameEditorContext } from '../GameEditorContext';

export function ViewerOnly({ children }: Wrapper) {
  const { isEditable } = useGameEditorContext();
  return (
    <ConditinalWrapper condition={!isEditable}>{children}</ConditinalWrapper>
  );
}

export default function EditorOnly({ children }: Wrapper) {
  const { isEditable } = useGameEditorContext();
  return (
    <ConditinalWrapper condition={isEditable}>{children}</ConditinalWrapper>
  );
}
