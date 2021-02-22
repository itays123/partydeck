const UserDetails = ({ profile }) => {
  return (
    <header className="user-details mt-8 px-8 md:px-0">
      <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-purple-900">
        {profile.name}
      </h1>
      <h3 className="text-2xl mt-6 -mb-6">
        <span>Games Created </span>
        <span className="font-thin text-gray-700 text-sm">
          {profile.games.length}
        </span>
      </h3>
    </header>
  );
};

export default UserDetails;
