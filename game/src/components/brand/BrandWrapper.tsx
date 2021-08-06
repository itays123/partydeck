import { Wrapper } from '../../shared/types';
import BrandedLogo from './BrandedLogo';

export default function BrandWrapper({ children }: Wrapper) {
  return (
    <div className="app w-screen h-screen bg-theme-600 mx-0 overflow-y-hidden flex flex-col">
      <header className="h-16 bg-transparent-dark px-8">
        <BrandedLogo
          className="flex items-center h-16 space-x-1"
          svg="w-6 h-6"
        />
      </header>
      <div className="flex-grow relative">{children}</div>
    </div>
  );
}
