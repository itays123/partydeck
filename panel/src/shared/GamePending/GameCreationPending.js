import { useEffect } from 'react';
import { Redirect, useHistory } from 'react-router';
import { Link } from 'react-router-dom';
import Spinner from '../Spinner';
import { useGamePendingContext } from './GamePendingContext';

const { REACT_APP_GAME_URL } = process.env;

const GameCreationPending = () => {
  const {
    isPending,
    liveCode,
    gameId,
    hasError,
    setGameId,
  } = useGamePendingContext();

  useEffect(() => {
    return () => {
      setGameId(null);
    };
  });

  return gameId ? (
    <div className="container mx-auto flex flex-col items-center justify-center">
      <h1 className="text-purple-600 text-5xl my-8">
        {isPending ? 'Please Wait' : hasError ? 'Error' : 'Ready!'}
      </h1>
      {isPending ? (
        <div className="flex">
          <Spinner /> Your game is being created...
        </div>
      ) : hasError ? (
        <div className="flex flex-col items-center">
          <p>Error creating the live game</p>
          <Link
            className="colorful-button animation-scaleup bg-purple-800 mt-2"
            to="/"
          >
            Back to homepage
          </Link>
        </div>
      ) : (
        <a
          className="colorful-button animation-scaleup bg-purple-800"
          href={REACT_APP_GAME_URL + '?code=' + liveCode}
        >
          Enter the game
        </a>
      )}
    </div>
  ) : (
    <Redirect to="/" />
  );
};

export const useGamePending = gameId => {
  const history = useHistory();
  const { setGameId } = useGamePendingContext();
  return {
    redirectToPage: () => {
      setGameId(gameId);
      history.push('/pending');
    },
  };
};

export default GameCreationPending;
