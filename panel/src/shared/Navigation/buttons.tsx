import { AuthContext } from '../../auth/AuthContext';
import Person from '../../resources/icons/Person';
import { action, externalLink, link } from '../buttonFactory';
import { GameWebsiteLink } from '../helpers/GameWebsiteLink';
import { AuthPopupContext } from './AuthPopupContext';

export const LinkablePartydeck = link('Partydeck', '/');
export const MyDecks = link('My Decks', '/my');
export const NewDeck = link('New Deck', '/create');
export const Logout = action('Log Out', AuthContext, ctx => ctx.logout());
export const Login = link('Log In', '/login');
export const Register = link('Get Started', '/start');
export const JoinGameLink = externalLink('Join Game', GameWebsiteLink!);
export const AuthPopupButton = action(Person, AuthPopupContext, ctx =>
  ctx.setOpen(b => !b)
);
