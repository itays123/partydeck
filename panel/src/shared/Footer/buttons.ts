import GitHub from '../../resources/github/GitHub';
import { externalLink, link } from '../../components/buttonFactory';
import { GameWebsiteLink } from '../helpers/GameWebsiteLink';

export const About = link('About', '/about');
export const HowToCreateDecks = link('Creating Decks Guide', '/about/decks');
export const GameLibrary = link('Game Library', '/search');
export const DeckEditor = link('Deck Editor', '/create');
export const DataCookiePolicy = link(
  'Cookies & Personal Data',
  '/about/privacy'
);
export const PartydeckLive = externalLink('Partydeck Live', GameWebsiteLink!);
export const GitHubLinkable = externalLink(
  GitHub,
  'https://github.com/itays123/partydeck'
);
