import { Wrapper } from './Filters/ConditionalWrapper';

export default function PageTitle({ children }: Wrapper) {
  return (
    <h1 className="text-3xl md:text-4xl lg:text-8xl text-theme-700 font-medium text-left mt-4 p-4">
      {children}
    </h1>
  );
}
