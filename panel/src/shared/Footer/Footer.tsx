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
      <div className="links flex space-x-3 text-white pb-4">
        <About className="hover:underline" />
        <HowToCreateDecks />
        <GameLibrary />
        <DeckEditor />
        <DataCookiePolicy />
        <PartydeckLive />
      </div>
      <div className="credits flex justify-between text-white py-4 border-t-2 border-white">
        <span>Project Partydeck 2020-2021</span>
        <GitHubLinkable className="w-6 h-6" />
      </div>
    </footer>
  );
}
