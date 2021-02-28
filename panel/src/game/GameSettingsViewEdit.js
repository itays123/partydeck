import { Link } from 'react-router-dom';
import languages from '../shared/helpers/languages';
import EditorOnly from './edit/EditorOnly';
import { useGameEditorContext } from './edit/GameEditorContext';
import PrivatePublicToggle from './edit/PrivatePublicToggle/PrivatePublicToggle';

const GameSettingsViewEdit = () => {
  const { author, lng, isPrivate } = useGameEditorContext();
  return (
    <>
      <h2 className="text-lg md:text-xl">
        Made by <Link to={'/' + author._id}>{author.name}</Link>
      </h2>
      <h3 className="text-md">
        {languages[lng] && <span>{languages[lng].nativeName}</span>}
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
