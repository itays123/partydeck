import {
  CheckButton,
  Checked,
  UncheckButton,
  Unchecked,
} from './PrivatePublicTickboxProvider';

export default function PrivatePublicTickbox() {
  return (
    <div className="flex items-center text-md font-medium space-x-2">
      <Unchecked>
        <CheckButton width={24} height={24} className="focus:outline-none" />
        <p>Only you can play</p>
      </Unchecked>
      <Checked>
        <UncheckButton className="w-6 h-6 focus:outline-none" />
        <p>Anyone can play</p>
      </Checked>
    </div>
  );
}
