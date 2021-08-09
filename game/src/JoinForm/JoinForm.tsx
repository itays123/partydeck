import BrandedLogo from '../components/brand/BrandedLogo';
import SlidingDiv from './animations/SlidingDiv';
import Spinner from '../components/Spinner/Spinner';
import { CheckCodeButton, JoinGameButton } from './Actions';
import { GameCodeInput, NameInput } from './Inputs';
import { JoinFormProvider } from './JoinFormProvider';
import {
  DebouncedJoining,
  DebouncedTypingCode,
  DebouncedTypingName,
  DebouncedVlidatingCode,
} from './animations/DebouncedStageWrappers';

export default function JoinForm() {
  return (
    <div className="absolute inset-0 flex flex-col items-center space-y-8 mt-40">
      <BrandedLogo className="text-4xl space-x-2" svg="w-12 h-12" as="h1" />
      <JoinFormProvider>
        <SlidingDiv className="flex items-center space-x-2">
          <DebouncedTypingCode>
            <GameCodeInput focusOnRender className="joinform-input" />
            <CheckCodeButton className="w-12 h-12 shadow rounded-full" />
          </DebouncedTypingCode>
          <DebouncedVlidatingCode>
            <Spinner
              className="text-white text-lg capitalize"
              label="checking game code..."
            />
          </DebouncedVlidatingCode>
          <DebouncedTypingName>
            <NameInput focusOnRender className="joinform-input" />
            <JoinGameButton className="w-12 h-12 shadow rounded-full" />
          </DebouncedTypingName>
          <DebouncedJoining>
            <Spinner label="Getting you in..." />
          </DebouncedJoining>
        </SlidingDiv>
      </JoinFormProvider>
    </div>
  );
}
