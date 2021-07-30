import { MouseEventHandler } from 'react';
import { NavLink } from 'react-router-dom';
import { GameWebsiteLink } from '../helpers/GameWebsiteLink';

type withClass = { className: string };
type ActionProps = { onClick: MouseEventHandler<HTMLElement> };

function link(label: string, to: string) {
  return function ({ className }: withClass) {
    return (
      <NavLink to={to} className={className}>
        {label}
      </NavLink>
    );
  };
}

function externalLink(label: string, to: string) {
  return function ({ className }: withClass) {
    return (
      <a href={to} className={className}>
        {label}
      </a>
    );
  };
}

function action(label: string) {
  return function ({ className, onClick }: withClass & ActionProps) {
    return (
      <button onClick={onClick} className={className}>
        {label}
      </button>
    );
  };
}

export const JoinGameLink = externalLink('Join Game', GameWebsiteLink!);
export const LinkablePartydeck = link('Partydeck', '/');
export const signedInLinks = [
  link('My Decks', '/my'),
  link('New Deck', '/create'),
  link('Log Out', '/logout'),
];
export const signedOutActions = [action('Log In'), action('Get Started')];
