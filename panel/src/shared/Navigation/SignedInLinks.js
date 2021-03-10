import { useEffect, useRef, useState } from 'react';
import AuthOnly from '../../auth/AuthOnly';
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
      <div className="relative">
        <button
          className="rounded h-10 w-10 active:outline-none focus:outline-none"
          onClick={() => setDialogOpen(bool => !bool)}
          ref={buttonRef}
        >
          Click me
          {isDialogOpen && <SignedInDialog />}
        </button>
      </div>
    </AuthOnly>
  );
};

export default SignedInLinks;
