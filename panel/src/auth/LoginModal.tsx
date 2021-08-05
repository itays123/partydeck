import { createModal } from '../components/Modal/modalFactory';
import { ModalWrapper } from '../components/Modal/ModalWrapper';
import { AuthContext } from './AuthContext';

const ModalProvider = createModal(AuthContext, 'loginModal', 'Log In');

export const LoginModalOpener = ModalProvider.Opener;

export default function LoginModal() {
  return (
    <ModalProvider.Visible>
      <ModalWrapper>
        <div className="flex justify-between items-start">
          <h1>Log In</h1>
          <ModalProvider.Closer
            width={32}
            height={32}
            className="p-2 text-theme-800 -m-8"
          />
        </div>
      </ModalWrapper>
    </ModalProvider.Visible>
  );
}
