import { Link } from 'react-router-dom';
import languages from '../../shared/helpers/languages';
import GameLanguageSelect from './GameLanguageSelect';
import NewGamesOnly, { ExistingGamesOnly } from '../wrapper/NewGamesOnly';
import EditorOnly, { ViewerOnly } from '../wrapper/EditorOnly';
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
        <ExistingGamesOnly>
          {languages[lng] && <span>{languages[lng].nativeName}</span>}
        </ExistingGamesOnly>
        <ViewerOnly>
          &middot;
          {isPrivate ? 'Private' : 'Public'}
        </ViewerOnly>
        <EditorOnly>
          <PrivatePublicToggle />
        </EditorOnly>
      </h3>
    </>
  );
};

export default GameSettingsViewEdit;
