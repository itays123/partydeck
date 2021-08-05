import { Wrapper } from '../types';

export function Modal({ children }: Wrapper) {
  return (
    <div className="fixed inset-0 bg-halfblack flex items-center justify-center z-50">
      <div className="mx-8 w-full max-w-2xl bg-white rounded shadow-xl p-8">
        {children}
      </div>
    </div>
  );
}
