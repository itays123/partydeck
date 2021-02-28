import languages from '../../shared/helpers/languages';
import { useGameEditorContext } from '../edit/GameEditorContext';

const GameLanguageSelect = () => {
  const { lng, setLng } = useGameEditorContext();
  return (
    <select
      value={lng}
      onChange={e => setLng(e.target.value)}
      className="bg-transparent focus:outline-none"
    >
      {Object.keys(languages).map(code => (
        <option value={code}>{languages[code].nativeName}</option>
      ))}
    </select>
  );
};

export default GameLanguageSelect;
