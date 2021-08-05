import { AuthContext } from '../../auth/AuthContext';
import { action, externalLink, link } from '../buttonFactory';
import { GameWebsiteLink } from '../../shared/helpers/GameWebsiteLink';
import { LoginModalOpener } from '../../auth/LoginModal';

export const LinkablePartydeck = link('Partydeck', '/');
export const MyDecks = link('My Decks', '/my');
export const NewDeck = link('New Deck', '/create');
export const Logout = action('Log Out', AuthContext, ctx => ctx.logout());
export const Login = LoginModalOpener;
export const Register = link('Get Started', '/start');
export const JoinGameLink = externalLink('Join Game', GameWebsiteLink!);
