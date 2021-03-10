import { useEffect, useRef } from 'react';
import SvgWrapper from '../../../shared/SvgWrapper';
import EditorOnly from '../EditorOnly';
import { useGameEditorContext } from '../GameEditorContext';
import './EditableCard.css';

const EditableCard = ({
  text,
  focused,
  onTextChange = () => {},
  onDeletePress = () => {},
  onTabPress = () => {},
  onFocus = () => {},
}) => {
  const { isEditable } = useGameEditorContext();
  const ref = useRef();

  useEffect(() => {
    if (focused) ref.current.focus();
  }, [focused]);

  return (
    <div
      className="card rounded shadow bg-gray-100 text-center py-8 md:py-16 relative group"
      onClick={onFocus}
    >
      <input
        className="focus:outline-none bg-transparent text-center"
        type="text"
        placeholder="An Empty Card"
        value={text}
        ref={ref}
        readOnly={!isEditable}
        onKeyDown={e => e.key === 'Tab' && onTabPress()}
        onChange={e => {
          const { value } = e.target;
          console.log(value.length);
          if (value.length <= 50) onTextChange(value);
        }}
      />
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
      <EditorOnly>
        <div className="length-display absolute bottom-0 right-0 mb-2 mr-4 text-sm text-gray-600">
          {text.length}/50
        </div>
      </EditorOnly>
    </div>
  );
};

export default EditableCard;
