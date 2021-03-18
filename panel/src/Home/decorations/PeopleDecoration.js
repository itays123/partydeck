const VideoChatWindow = ({ selected }) => {
  return (
    <div
      className={`flex rounded-sm ring-gray-100 ${
        selected ? 'ring-4' : 'ring-1'
      }`}
    ></div>
  );
};

const PeopleDecoration = () => {
  return (
    <div className="flex-grow grid grid-cols-3 grid-rows-3 gap-4 p-4">
      <VideoChatWindow />
      <VideoChatWindow />
      <VideoChatWindow />
      <VideoChatWindow selected />
      <VideoChatWindow />
      <VideoChatWindow />
      <VideoChatWindow />
      <VideoChatWindow />
      <VideoChatWindow />
    </div>
  );
};

export default PeopleDecoration;
