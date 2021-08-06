import { AuthContext } from '../../auth/AuthContext';
import { action, externalLink, link } from '../buttonFactory';
import { GameWebsiteLink } from '../../shared/helpers/GameWebsiteLink';
import { LoginModalOpener } from '../../auth/LoginModal';
import { RegisterModalOpener } from '../../auth/RegisterModal';

export const LinkablePartydeck = link('Partydeck', '/');
export const MyDecks = link('My Decks', '/my');
export const NewDeck = link('New Deck', '/create');
export const Logout = action('Log Out', AuthContext, ctx => ctx.logout());
export const Login = LoginModalOpener;
export const Register = RegisterModalOpener;
export const JoinGameLink = externalLink('Join Game', GameWebsiteLink!);
