/**
 * @param {{ gameCode: string, playerCount: number, isAdmin: boolean }} props
 */
const Lobby = ({ gameCode, playerCount, isAdmin }) => {
  return (
    <div className="lobby container mx-auto">
      <div className="gamecode-display flex justify-center mt-4">
        {gameCode.split('').map((char, i) => (
          <div
            key={i}
            className="text-3xl md:text-6xl lg:text-9xl bg-gray-100 text-gray-800 mx-1 md:mx-2 rounded px-2 md:px-4 pb-4"
          >
            {char}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Lobby;
