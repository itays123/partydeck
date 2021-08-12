import { useState } from 'react';
import { ModalHook } from './types';

export default function useModal(): ModalHook {
  const [isOpen, setOpen] = useState(false);
  return {
    isOpen,
    open() {
      setOpen(true);
    },
    close() {
      setOpen(false);
    },
  };
}
