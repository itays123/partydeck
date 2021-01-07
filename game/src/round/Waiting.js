import Spinner from '../shared/Spinner';

const Waiting = ({ text }) => {
  return (
    <div className="waiting flex items-center justify-center mt-4 text-gray-100">
      <Spinner />
      <span>{text}</span>
    </div>
  );
};

export default Waiting;
