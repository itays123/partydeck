import { useEffect, useRef } from 'react';
import { useGameEditorContext } from '../GameEditorContext';

const GameNameForm = () => {
  const { name, setName } = useGameEditorContext();
  const ref = useRef();

  useEffect(() => {
    ref.current.focus();
  }, []);

  return (
    <input
      className="text-xl md:text-2xl lg:text-4xl font-bold text-purple-600 focus:outline-none bg-transparent leading-snug pb-4"
      value={name}
      placeholder="Untitled Partydeck"
      ref={ref}
      onChange={e => setName(e.target.value)}
    />
  );
};

export default GameNameForm;
