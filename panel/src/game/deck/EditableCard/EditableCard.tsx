import { useEffect } from 'react';
import { LegacyRef, MouseEventHandler, RefObject } from 'react';
import { useFocusOnRender } from '../../../components/forms/useFocusOnRender';
import Clear from '../../../components/icons/Clear';
import { useGameEditorContext, EditorOnly } from '../../GameEditorContext';
import './EditableCard.css';

export type EditableCardProps = {
  value: string;
  setValue: (value: string) => void;
  focused: boolean;
  canDelete: boolean;
  onDeletePress: MouseEventHandler<HTMLButtonElement>;
  onFocus: Function;
  position?: number;
  innerRef?: RefObject<HTMLDivElement>;
};

const EditableCard = ({
  value,
  setValue,
  focused,
  canDelete,
  onDeletePress,
  onFocus,
  innerRef,
  position = 0,
}: EditableCardProps) => {
  const { isEditable } = useGameEditorContext();
  const ref = useFocusOnRender(focused);

  useEffect(() => {
    ref.current?.setSelectionRange(50, 50);
  }, [focused, ref]);

  return (
    <div
      className={`card editable-card-pos-${Math.abs(position)}`}
      ref={innerRef}
    >
      <div className="w-full h-full text-center px-3 py-8 relative group">
        <textarea
          rows={3}
          className="focus:outline-none bg-transparent text-center resize-none w-full"
          placeholder="An Empty Card"
          value={value}
          ref={ref as unknown as LegacyRef<HTMLTextAreaElement>}
          readOnly={!isEditable || position !== 0}
          onFocus={() => onFocus()}
          onChange={e => {
            const { value: newVal } = e.target;
            if (newVal.length <= 50) setValue(newVal);
          }}
        />

        {canDelete && (
          <EditorOnly>
            <button
              className="absolute -top-2 -right-2 opacity-0 group-hover:opacity-90 hover:opcaity-100 focus:outline-none rounded-full bg-theme-600 p-0.5"
              onClick={onDeletePress}
            >
              <Clear width={20} height={20} className="text-white" />
            </button>
          </EditorOnly>
        )}
        <EditorOnly>
          <div className="length-display absolute bottom-0 right-0 mb-2 mr-4 text-sm text-gray-600">
            {value && value.length}/50
          </div>
        </EditorOnly>
      </div>
    </div>
  );
};

export default EditableCard;
