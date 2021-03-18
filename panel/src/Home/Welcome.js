import { Link } from 'react-router-dom';
import { GameWebsiteLink } from '../shared/helpers/GameWebsiteLink';
import Search from '../shared/Search/Search';
import CardDecoration from './decorations/CardDecoration';
import GameDecoration from './decorations/GameDecoration';
import PeopleDecoration from './decorations/PeopleDecoration';
import HeartDecoration from './decorations/HeartDecoration';
import logo from '../partydeck.svg';

const Welcome = () => {
  return (
    <div className="welcome mt-10 px-8 md:px-0 space-y-20 pb-20">
      <header className="flex flex-col md:flex-row space-x-8">
        <div className="flex-1 p-4">
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-purple-900">
            Partydeck
          </h1>
          <p className="my-6 text-lg">
            Partydeck is a cool online card game you can play with friends
            online or together. <br />
            You can create your own custom decks or play with decks created by
            others if they decide to make them public. <br />
            In order to create your own decks, create an account or log in to
            your existing one. <br />
            Have fun playing and partying!
          </p>
          <div className="flex">
            <Link
              className="bg-purple-600 colorful-button animation-scaleup"
              to="/start"
            >
              Get Started For Free
            </Link>
          </div>
        </div>
        <div className="flex-1 hidden md:flex justify-center items-center">
          <img src={logo} width={256} height={256} alt="" />
        </div>
      </header>
      <section id="rules" className="flex flex-col md:flex-row space-x-8">
        <div className="flex-1 p-4">
          <h2 className="text-xl md:text-2xl lg:text-3xl font-bold text-yellow-700">
            Rules
          </h2>
          <p className="my-6 text-lg">
            Everyone gets 4 answer cards. <br />
            During each round, you can use one of those cards to answer a
            question in the most funny or clever way you have. <br />
            When everyone has answered, one of the players picks the best
            answer! <br />
            Nobody will know what was the card you used unless you win the
            round, so if you don't have a good answer just dump one of your
            cards.
          </p>
          <div className="flex">
            <a
              className="bg-yellow-500 colorful-button animation-scaleup"
              href={GameWebsiteLink}
            >
              Join a Game
            </a>
          </div>
        </div>
        <div className="flex-1 hidden md:flex">
          <CardDecoration />
        </div>
      </section>
      <section id="library" className="flex flex-col md:flex-row-reverse space">
        <div className="flex-1 md:ml-8 p-4">
          <h2 className="text-xl md:text-2xl lg:text-3xl font-bold text-green-600">
            The Game Library
          </h2>
          <p className="my-6 text-lg">
            You can create your own custom decks and set them public, so anyone
            in the world will be able to use them! <br />
            If you don't want your game to be visible in the game library,
            simply set it to private. <br />
            You can change your deck's visibility at any time.
          </p>
          <Search className="shadow-xl py-3 rounded-full ring-1 ring-gray-500 px-2" />
        </div>
        <div className="flex-1 hidden md:flex">
          <GameDecoration />
        </div>
      </section>
      <section
        id="inspiration"
        className="flex flex-col md:flex-row space-x-8 bg-blue-600"
      >
        <div className="flex-1 p-4">
          <h2 className="text-xl md:text-2xl lg:text-3xl font-bold text-gray-100">
            Inspiration
          </h2>
          <p className="my-6 text-lg text-gray-100">
            The COVID-19 pandemic is the inspiration for this app. <br />
            We want to keep people toghether in those challenging times, and
            this is why this game is playable from distance as well. <br />
            However, if it's possible for you to meet in person, this is a great
            party game to play as well.
          </p>
        </div>
        <div className="flex-1 hidden md:flex">
          <PeopleDecoration />
        </div>
      </section>
      <section id="feedback" className="flex flex-col md:flex-row space-x-8">
        <div className="flex-1 p-4">
          <h2 className="text-xl md:text-2xl lg:text-3xl font-bold text-pink-600">
            Always Getting Better
          </h2>
          <p className="my-6 text-lg">
            Partydeck is a cool online card game you can play with friends
            online or together. <br />
            You can create your own custom decks or play with decks created by
            others if they decide to make them public. <br />
            In order to create your own decks, create an account or log in to
            your existing one. <br />
            Have fun playing and partying!
          </p>
          <div className="flex">
            <a
              className="bg-pink-500 colorful-button animation-scaleup"
              href="https://github.com/itays123/partydeck"
            >
              Visit Our Github Page
            </a>
          </div>
        </div>
        <div className="flex-1 hidden md:flex">
          <HeartDecoration />
        </div>
      </section>
    </div>
  );
};

export default Welcome;
