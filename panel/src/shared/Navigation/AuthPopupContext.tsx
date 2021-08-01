import { createContext, useState } from 'react';
import { Wrapper } from '../Filters/ConditionalWrapper';

type IsOpenToggle = {
  isOpen: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

export const AuthPopupContext = createContext<IsOpenToggle>(
  null as unknown as IsOpenToggle
);

export default function PopupContextProvider({ children }: Wrapper) {
  const [isOpen, setOpen] = useState(false);
  return (
    <AuthPopupContext.Provider value={{ isOpen, setOpen }}>
      {children}
    </AuthPopupContext.Provider>
  );
}
