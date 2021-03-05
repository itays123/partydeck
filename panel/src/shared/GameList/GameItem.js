import { Link } from 'react-router-dom';
import languages from '../helpers/languages';
import { useAuthor } from './useAuthor';

const GameItem = ({
  _id,
  name,
  lng,
  isPrivate,
  questionCount,
  answerCount,
  author,
}) => {
  const { authorName, profileLink } = useAuthor(author);
  return (
    <div className="game-item bg-gray-100 rounded shadowed px-8 py-6">
      <h3 className="title text-xl md:text-2xl text-purple-600 font-medium">
        <Link to={'/game/' + _id}>{name}</Link>
      </h3>
      <p>
        <span>
          Created by <Link to={profileLink}>{authorName}</Link>
        </span>
        {languages[lng] && <span> &middot; {languages[lng].nativeName}</span>}
        {isPrivate ? <span> &middot; private</span> : null}
      </p>
      <p>
        <span>{questionCount} </span>
        <span>Questions </span>
        <span> &middot; </span>
        <span>{answerCount} </span>
        <span>Answers.</span>
      </p>
    </div>
  );
};

export default GameItem;
