import languages from '../../helpers/languages';
import { useGameEditorContext } from '../GameEditorContext';

const GameLanguageSelect = () => {
  const { lng, setLng } = useGameEditorContext();
  return (
    <select
      value={lng}
      onChange={e => setLng(e.target.value)}
      className="bg-transparent focus:outline-none"
    >
      {Object.keys(languages).map(code => (
        <option value={code} key={code}>
          {languages[code].nativeName}
        </option>
      ))}
    </select>
  );
};

export default GameLanguageSelect;
