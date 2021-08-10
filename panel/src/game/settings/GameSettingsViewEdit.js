import { Link } from 'react-router-dom';
import languages from '../../shared/helpers/languages';
import GameLanguageSelect from './GameLanguageSelect';
import {
  useGameEditorContext,
  NewGamesOnly,
  ExistingGamesOnly,
  ViewerOnly,
  EditorOnly,
} from '../GameEditorContext';
import PrivatePublicTickbox from './PrivatePublicTickBox/PrivatePublicTickbox';

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
          <PrivatePublicTickbox />
        </EditorOnly>
      </h3>
    </>
  );
};

export default GameSettingsViewEdit;
