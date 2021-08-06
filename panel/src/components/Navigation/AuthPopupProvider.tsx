import { createContext, useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { useAuthContext } from '../../auth/AuthContext';
import useClickOutside from '../../shared/helpers/useClickOutside';
import { action } from '../buttonFactory';
import Person from '../icons/Person';
import { createWrapper } from '../logicalWrapeprFactory';
import { Wrapper } from '../types';

type IsOpenToggle = {
  isOpen: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

type withPopupRef = {
  popupRef: React.RefObject<HTMLElement>;
};

export const AuthPopupContext = createContext<IsOpenToggle>(
  null as unknown as IsOpenToggle
);

export const PopupVisibleWrapper = createWrapper(
  AuthPopupContext,
  ctx => ctx.isOpen
);

export const PopupOpenButton = action(Person, AuthPopupContext, ctx =>
  ctx.setOpen(true)
);

export default function AuthPopupProvider({
  children,
  popupRef,
}: Wrapper & withPopupRef) {
  const [isOpen, setOpen] = useState(false);
  const location = useLocation();
  const { loginModal, registerModal } = useAuthContext();

  // on each redirect, set the popup to closed
  useEffect(() => {
    setOpen(false);
  }, [location.pathname]);

  // when modals open, close the popup
  useEffect(() => {
    if (loginModal.isOpen || registerModal.isOpen) setOpen(false);
  }, [loginModal.isOpen, registerModal.isOpen]);

  useClickOutside(popupRef, () => setOpen(false));

  return (
    <AuthPopupContext.Provider value={{ isOpen, setOpen }}>
      {children}
    </AuthPopupContext.Provider>
  );
}
