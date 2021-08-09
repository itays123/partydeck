import { createElement } from 'react';
import { withClass } from '../types';
import Logo from '../glyphs/Logo';

export default function BrandedLogo({
  className,
  as = 'h3',
  svg,
}: withClass & { as?: 'h1' | 'h2' | 'h3'; svg: string }) {
  const TitleElem = createElement(
    as,
    { className },
    <span className="text-white font-roboto font-bold">Partydeck</span>,
    <span className="text-theme-100 font-medium">LIVE!</span>
  );
  return (
    <div className="flex items-center space-x-1">
      <Logo className={svg} />
      {TitleElem}
    </div>
  );
}
