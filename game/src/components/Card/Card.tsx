import { Wrapper } from '../types';

const Dimensions = {
  default: 'w-32 h-48',
  small: 'w-24 h-36',
};

const Background = {
  white: 'bg-white',
  secondary: 'bg-transparent-theme',
};

interface Specs {
  background?: keyof typeof Background;
  dimensions?: keyof typeof Dimensions;
}

export default function Card({
  children,
  background = 'white',
  dimensions = 'default',
}: Wrapper & Specs) {
  return (
    <div className={'rounded px-3 py-2 ' + background + ' ' + dimensions}>
      {children}
    </div>
  );
}
