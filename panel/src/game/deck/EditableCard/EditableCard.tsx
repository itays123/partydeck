import { MouseEventHandler, useEffect, useRef } from 'react';
import SvgWrapper from '../../../shared/SvgWrapper';
import EditorOnly from '../../wrapper/EditorOnly';
import { useGameEditorContext } from '../../GameEditorContext';
import './EditableCard.css';
import { Atom, useAtom } from 'klyva';

type Props = {
  atom: Atom<string>;
  focused: boolean;
  canDelete: boolean;
  onTabPress: Function;
  onFocus: MouseEventHandler<HTMLDivElement>;
  onDeletePress: MouseEventHandler<HTMLButtonElement>;
};

const EditableCard = ({
  atom,
  focused,
  canDelete,
  onTabPress,
  onFocus,
  onDeletePress,
}: Props) => {
  const [value, setvalue] = useAtom(atom);
  const { isEditable } = useGameEditorContext();
  const ref = useRef<HTMLTextAreaElement | null>(null);

  useEffect(() => {
    if (focused && ref.current) {
      ref.current.focus();
      ref.current.setSelectionRange(50, 50);
    }
  }, [focused]);

  return (
    <div
      className="card rounded shadow bg-gray-100 text-center pt-8 md:pt-12 pb-12 relative group"
      onClick={onFocus}
    >
      <textarea
        rows={3}
        className="focus:outline-none bg-transparent text-center resize-none"
        placeholder="An Empty Card"
        value={value}
        ref={ref}
        readOnly={!isEditable}
        onKeyDown={e => e.key === 'Tab' && onTabPress()}
        onChange={e => {
          const { value: newVal } = e.target;
          if (newVal.length <= 50) setvalue(newVal);
        }}
      />

      {canDelete && (
        <EditorOnly>
          <button
            className="absolute -top-2 -right-2 opacity-0 group-hover:opacity-90 hover:opcaity-100 focus:outline-none"
            onClick={onDeletePress}
          >
            <SvgWrapper className="text-gray-500">
              <path d="M0 0h24v24H0z" fill="none" />
              <path d="M12 2C6.47 2 2 6.47 2 12s4.47 10 10 10 10-4.47 10-10S17.53 2 12 2zm5 13.59L15.59 17 12 13.41 8.41 17 7 15.59 10.59 12 7 8.41 8.41 7 12 10.59 15.59 7 17 8.41 13.41 12 17 15.59z" />
            </SvgWrapper>
          </button>
        </EditorOnly>
      )}
      <EditorOnly>
        <div className="length-display absolute bottom-0 right-0 mb-2 mr-4 text-sm text-gray-600">
          {value && value.length}/50
        </div>
      </EditorOnly>
    </div>
  );
};

export default EditableCard;
