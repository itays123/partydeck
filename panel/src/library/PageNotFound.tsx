import { link } from '../components/buttonFactory';

const HompageLink = link('Back To Homepage', '/');

export default function PageNotFound() {
  return (
    <div className="page-not-found p-4 text-center mt-8">
      <h1 className="text-7xl md:text-9xl font-bold my-2 text-pink">404</h1>
      <h2 className="text-xl mb-4">
        The page you were trying to find does not exist
      </h2>
      <HompageLink className="underline text-lg text-theme-800 hover:text-theme-500" />
    </div>
  );
}
