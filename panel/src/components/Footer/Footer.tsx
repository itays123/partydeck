import {
  About,
  DataCookiePolicy,
  DeckEditor,
  GameLibrary,
  GitHubLinkable,
  HowToCreateDecks,
  PartydeckLive,
} from './buttons';

export default function Footer() {
  return (
    <footer className="bg-theme-700 px-8 pt-12">
      <div className="links flex flex-col md:flex-row md:space-x-3 text-white pb-4">
        <About className="hover:underline" />
        <HowToCreateDecks className="hover:underline" />
        <GameLibrary className="hover:underline" />
        <DeckEditor className="hover:underline" />
        <DataCookiePolicy className="hover:underline" />
        <PartydeckLive className="hover:underline" />
      </div>
      <div className="credits flex justify-between text-white py-4 border-t-2 border-white">
        <span>Project Partydeck 2020-2021</span>
        <GitHubLinkable className="w-6 h-6" />
      </div>
    </footer>
  );
}
