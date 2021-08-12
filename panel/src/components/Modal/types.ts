export interface ModalHook {
  isOpen: boolean;
  open(): void;
  close(): void;
}
