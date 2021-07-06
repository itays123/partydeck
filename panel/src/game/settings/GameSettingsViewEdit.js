import { Link } from 'react-router-dom';
import languages from '../../shared/helpers/languages';
import GameLanguageSelect from './GameLanguageSelect';
import NewGamesOnly from '../wrapper/NewGamesOnly';
import EditorOnly from '../wrapper/EditorOnly';
import { useGameEditorContext } from '../GameEditorContext';
import PrivatePublicToggle from './PrivatePublicToggle/PrivatePublicToggle';

const GameSettingsViewEdit = () => {
  const { author, lng, isPrivate } = useGameEditorContext();
  return (
    <>
      <h2 className="text-lg md:text-xl">
        Made by <Link to={'/user/' + author._id}>{author.name}</Link>
      </h2>
      <NewGamesOnly>
        <GameLanguageSelect />
      </NewGamesOnly>
      <h3 className="text-md">
        <NewGamesOnly gameShouldExist>
          {languages[lng] && <span>{languages[lng].nativeName}</span>}
        </NewGamesOnly>
        <EditorOnly shouldNotBeEditor>
          &middot;
          {isPrivate ? 'Private' : 'Public'}
        </EditorOnly>
        <EditorOnly>
          <PrivatePublicToggle />
        </EditorOnly>
      </h3>
    </>
  );
};

export default GameSettingsViewEdit;
