import { useGameEditorContext } from '../GameEditorContext';
import { DeckEditorProps } from './DeckEditor';
import { useFocus } from './FocusProvider';

export function withEditor(
  ComponentToRender: React.ComponentType<DeckEditorProps>
) {
  return function DeckEditorWithEditorAndFocus({
    of,
    label,
  }: {
    of: 'questions' | 'answers';
    label: string;
  }) {
    const { [of]: editor } = useGameEditorContext();
    const { [of]: focusProvider } = useFocus();
    return (
      <ComponentToRender
        label={label}
        editor={editor}
        focusProvider={focusProvider}
      />
    );
  };
}
