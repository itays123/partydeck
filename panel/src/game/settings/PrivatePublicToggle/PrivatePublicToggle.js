import { useGameEditorContext } from '../../GameEditorContext';
import './PrivatePublicToggle.css';

const PrivatePublicToggle = () => {
  const { isPrivate, setPrivate } = useGameEditorContext();
  return (
    <div className="mt-3">
      <label
        htmlFor="toogleA"
        className="flex items-center cursor-pointer group checked:bg-blue-600"
      >
        <div className="mr-3 text-gray-700">Public</div>
        <div className="relative">
          <input
            id="toogleA"
            type="checkbox"
            className="hidden"
            checked={isPrivate}
            onChange={() => setPrivate(bool => !bool)}
          />
          <div className="toggle__line w-10 h-4 bg-gray-400 rounded-full shadow-inner"></div>
          <div className="toggle__dot absolute w-6 h-6 bg-white rounded-full shadow inset-y-0 left-0 -left-1 -top-1 transition-all duration-500 ease-in-out"></div>
        </div>
        <div className="ml-3 text-gray-700">Private</div>
      </label>
    </div>
  );
};

export default PrivatePublicToggle;
