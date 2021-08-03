import { LegacyRef, useContext, useRef } from 'react';
import { useAuthContext } from '../../auth/AuthContext';
import { Authenticated, NotAuthenticated } from '../../auth/authFilters';
import { createWrapper } from '../../components/logicalWrapeprFactory';
import useClickOutside from '../helpers/useClickOutside';
import { AuthPopupContext } from './AuthPopupContext';
import { Logout, Login, Register, MyDecks, NewDeck } from './buttons';

const OpenOnly = createWrapper(AuthPopupContext, ctx => ctx.isOpen);

export default function ResponsiveAuthPopup() {
  const { setOpen } = useContext(AuthPopupContext);
  const { user } = useAuthContext();
  const popupRef = useRef(null as unknown as HTMLElement);

  useClickOutside(popupRef, () => setOpen(false));

  return (
    <div className="relative md:hidden">
      <OpenOnly>
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
      </OpenOnly>
    </div>
  );
}
