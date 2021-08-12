import { Wrapper } from '../types';

export default function PageTitle({ children }: Wrapper) {
  return (
    <h1 className="text-center text-4xl md:text-6xl font-medium text-white w-full">
      {children}
    </h1>
  );
}
