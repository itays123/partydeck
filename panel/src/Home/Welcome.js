import SignedOutActions from './SignedOutActions';

const Welcome = () => {
  return (
    <div className="welcome">
      <header className="homepage-actions mt-8 px-8 md:px-0">
        <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-purple-900">
          Partydeck
        </h1>
        <p className="my-6 text-lg w-full md:w-3/4 lg:w-2/3 max-w-lg">
          Partydeck is a cool online card game you can play with friends online
          or together. <br />
          You can create your own custom decks or play with decks created by
          others if they decide to make them public. <br />
          In order to create your own decks, create an account or log in to your
          existing one. <br />
          Have fun playing and partying!
        </p>
        <div className="grid grid gird-cols-1 md:grid-cols-3 w-full md:w-3/4 lg:w-2/3 max-w-lg mt-4 gap-4">
          <SignedOutActions />
        </div>
      </header>
    </div>
  );
};

export default Welcome;
