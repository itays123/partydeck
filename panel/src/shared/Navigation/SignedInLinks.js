import { useEffect, useRef, useState } from 'react';
import AuthOnly from '../../auth/AuthOnly';
import SvgWrapper from '../SvgWrapper';
import NavigationButton from './NavigationButton';
import SignedInDialog from './SignedInDialog';

function useOutsideAlerter(ref, callback = () => {}) {
  useEffect(() => {
    /**
     * Alert if clicked on outside of element
     */
    function handleClickOutside(event) {
      if (ref.current && !ref.current.contains(event.target)) {
        callback();
      }
    }

    // Bind the event listener
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      // Unbind the event listener on clean up
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [ref, callback]);
}

const SignedInLinks = () => {
  const [isDialogOpen, setDialogOpen] = useState(false);
  const buttonRef = useRef();

  useOutsideAlerter(buttonRef, () => setDialogOpen(false));

  return (
    <AuthOnly>
      <NavigationButton to="/create" hideOnSmallScreens>
        Create Game
      </NavigationButton>
      <div className="relative flex items-center">
        <button
          className="h-10 w-10 active:outline-none focus:outline-none"
          onClick={() => setDialogOpen(bool => !bool)}
          ref={buttonRef}
        >
          <SvgWrapper className="text-gray-500 " w={32} h={32}>
            <path d="M0 0h24v24H0z" fill="none" />
            <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 3c1.66 0 3 1.34 3 3s-1.34 3-3 3-3-1.34-3-3 1.34-3 3-3zm0 14.2c-2.5 0-4.71-1.28-6-3.22.03-1.99 4-3.08 6-3.08 1.99 0 5.97 1.09 6 3.08-1.29 1.94-3.5 3.22-6 3.22z" />
          </SvgWrapper>
          {isDialogOpen && <SignedInDialog />}
        </button>
      </div>
    </AuthOnly>
  );
};

export default SignedInLinks;
