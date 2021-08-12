import { Wrapper } from '../types';

export default function PageTitle({ children }: Wrapper) {
  return (
    <h1 className="text-4xl md:text-6xl lg:text-8xl text-theme-700 font-medium text-left mt-4 p-4">
      {children}
    </h1>
  );
}
