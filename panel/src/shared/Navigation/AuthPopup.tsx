import { useContext, useRef } from 'react';
import useClickOutside from '../helpers/useClickOutside';
import { AuthPopupContext } from './AuthPopupContext';

export default function ResponsiveAuthPopup() {
  const { isOpen, setOpen } = useContext(AuthPopupContext);
  const popupRef = useRef(null as unknown as HTMLElement);

  useClickOutside(popupRef, () => setOpen(false));

  return isOpen ? <>open</> : <>close</>;
}
