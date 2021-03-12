import { useHistory } from 'react-router';

const PageNotFound = () => {
  const history = useHistory();
  return (
    <div className="page-not-found scrollable text-center mt-8">
      <h1 className="text-9xl font-bold my-2">OOPS!</h1>
      <h2 className="text-lg mb-4">
        The page you were trying to find does not exist
      </h2>
      <button
        className="colorful-button bg-purple-600 animation-scaleup"
        onClick={() => history.push('/')}
      >
        Back to homepage
      </button>
    </div>
  );
};

export default PageNotFound;
