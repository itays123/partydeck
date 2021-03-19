const VideoChatWindow = ({ selected, showOnXlOnly }) => {
  return (
    <div
      className={`rounded-sm ring-blue-600 ${selected ? 'ring-4' : 'ring-1'} ${
        showOnXlOnly ? 'hidden xl:flex' : 'flex'
      }`}
    ></div>
  );
};

const PeopleDecoration = () => {
  return (
    <div className="flex-grow grid grid-cols-3 grid-rows-3 gap-4 p-4 xl:grid-cols-5">
      <VideoChatWindow />
      <VideoChatWindow />
      <VideoChatWindow />
      <VideoChatWindow selected />
      <VideoChatWindow />
      <VideoChatWindow />
      <VideoChatWindow />
      <VideoChatWindow />
      <VideoChatWindow />
      <VideoChatWindow showOnXlOnly />
      <VideoChatWindow showOnXlOnly />
      <VideoChatWindow showOnXlOnly />
      <VideoChatWindow showOnXlOnly />
      <VideoChatWindow showOnXlOnly />
      <VideoChatWindow showOnXlOnly />
    </div>
  );
};

export default PeopleDecoration;
