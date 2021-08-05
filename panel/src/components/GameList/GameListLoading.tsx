import Spinner from '../../shared/Spinner';

export function GameListLoading({ isLoading }: { isLoading?: boolean }) {
  return (
    <>
      {isLoading && (
        <div className="flex justify-center items-center">
          <Spinner />
          <span>Loading decks....</span>
        </div>
      )}
    </>
  );
}
