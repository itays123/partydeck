import BrandedLogo from '../components/brand/BrandedLogo';
import SlidingDiv from '../components/SlidingDiv/SlidingDiv';
import Spinner from '../components/Spinner/Spinner';
import { CheckCodeButton, JoinGameButton } from './Actions';
import { GameCodeInput, NameInput } from './Inputs';
import { JoinFormProvider } from './JoinFormProvider';
import {
  JoiningGame,
  TypingCode,
  TypingName,
  ValidatingCode,
} from './Wrappers';

export default function JoinForm() {
  return (
    <div className="absolute inset-0 flex flex-col items-center justify-center space-y-8">
      <BrandedLogo className="text-4xl space-x-3" svg="w-12 h-12" as="h1" />
      <JoinFormProvider>
        <TypingCode>
          <SlidingDiv className="flex items-center space-x-2">
            <GameCodeInput className="joinform-input" />
            <CheckCodeButton className="w-12 h-12 shadow" />
          </SlidingDiv>
        </TypingCode>
        <ValidatingCode>
          <SlidingDiv className="text-white text-lg">
            <Spinner label="Finding your game..." />
          </SlidingDiv>
        </ValidatingCode>
        <TypingName>
          <SlidingDiv className="flex items-center space-x-2">
            <NameInput className="joinform-input" />
            <JoinGameButton className="w-12 h-12 shadow" />
          </SlidingDiv>
        </TypingName>
        <JoiningGame>
          <SlidingDiv className="text-white text-lg">
            <Spinner label="Getting you in..." />
          </SlidingDiv>
        </JoiningGame>
      </JoinFormProvider>
    </div>
  );
}
