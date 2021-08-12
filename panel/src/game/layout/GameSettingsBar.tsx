import { Link } from 'react-router-dom';
import languages from '../../helpers/languages';
import {
  ExistingGamesOnly,
  NewGamesOnly,
  useGameEditorContext,
} from '../GameEditorContext';
import GameLanguageSelect from '../settings/GameLanguageSelect';
import PrivatePublicTickbox from '../settings/PrivatePublicTickBox/PrivatePublicTickbox';

export default function GameSettingsBar() {
  const { author, lng } = useGameEditorContext();
  return (
    <div className="flex md:space-x-8 flex-col md:flex-row md:items-center">
      <Link to={'/user/' + author._id} className="text-xl font-medium">
        {author.name}
      </Link>
      <ExistingGamesOnly>
        <div className="text-base">{languages[lng].name}</div>
      </ExistingGamesOnly>
      <NewGamesOnly>
        <GameLanguageSelect />
      </NewGamesOnly>
      <PrivatePublicTickbox />
    </div>
  );
}
