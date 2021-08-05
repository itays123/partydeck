import { LegacyRef, useRef } from 'react';
import {
  useAuthContext,
  Authenticated,
  NotAuthenticated,
} from '../../auth/AuthContext';
import AuthPopupProvider, {
  PopupOpenButton,
  PopupVisibleWrapper,
} from './AuthPopupProvider';
import { Logout, Login, Register, MyDecks, NewDeck } from './buttons';

export default function ResponsiveAuthPopup() {
  const { user } = useAuthContext();
  const popupRef = useRef(null as unknown as HTMLElement);
  return (
    <AuthPopupProvider popupRef={popupRef}>
      <div className="relative md:hidden">
        <PopupOpenButton
          className="nav-button focus:outline-none"
          width={32}
          height={32}
        />
        <PopupVisibleWrapper>
          <div
            className="dialog shadow bg-gray-50 rounded px-4 py-3 absolute top-0 mt-12 right-0 z-50  text-left font-roboto"
            ref={popupRef as LegacyRef<HTMLDivElement>}
          >
            <Authenticated>
              <div className="flex font-bold w-max space-x-3 items-center">
                <span>{user?.name}</span>
                <Logout className="text-gray-500 text-sm" />
              </div>
              <div className="flex flex-col pt-2">
                <MyDecks className="hover:text-gray-600" />
                <NewDeck className="hover:text-gray-600" />
              </div>
            </Authenticated>
            <NotAuthenticated>
              <div className="font-bold">Guest</div>
              <div className="w-max flex flex-col">
                <Login className="hover:text-gray-600" />
                <Register className="hover:text-gray-600" />
              </div>
            </NotAuthenticated>
          </div>
        </PopupVisibleWrapper>
      </div>
    </AuthPopupProvider>
  );
}
