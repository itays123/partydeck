import { Wrapper } from '../../shared/types';
import Logo from '../glyphs/Logo';

export default function BrandWrapper({ children }: Wrapper) {
  return (
    <div className="app w-screen h-screen bg-theme-600 mx-0 overflow-y-hidden flex flex-col">
      <header className="flex items-center h-16 bg-transparent-dark space-x-1 px-8">
        <Logo className="w-8 h-8" />
        <h3 className="text-lg space-x-1">
          <span className="text-white font-roboto font-bold">Partydeck</span>
          <span className="text-theme-300 font-medium">Live!</span>
        </h3>
      </header>
      <div className="flex-grow relative">{children}</div>
    </div>
  );
}
