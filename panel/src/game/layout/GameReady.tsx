import Spinner from '../../components/Spinner/Spinner';
import { Wrapper } from '../../components/types';
import PageNotFound from '../../library/PageNotFound';

export default function GameReady({
  isLoading,
  status,
  children,
}: Wrapper & { isLoading: boolean; status: number }) {
  return (
    <>
      {isLoading ? (
        <div className="absolute inset-0 flex justify-center pt-20">
          <Spinner label="Loading your game..." />
        </div>
      ) : status === 404 ? (
        <PageNotFound />
      ) : (
        children
      )}
    </>
  );
}
