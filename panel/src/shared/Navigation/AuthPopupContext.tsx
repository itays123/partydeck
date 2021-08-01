import { createContext, useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
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
  const location = useLocation();

  // on each redirect, set the popup to closed
  useEffect(() => {
    setOpen(false);
  }, [location.pathname]);

  return (
    <AuthPopupContext.Provider value={{ isOpen, setOpen }}>
      {children}
    </AuthPopupContext.Provider>
  );
}
