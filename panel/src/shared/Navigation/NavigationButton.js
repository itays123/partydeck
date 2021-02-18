import { NavLink } from 'react-router-dom';

const NavigationButton = ({ to = '/', children, external = false }) => {
  const className =
    'flex items-center justify-center h-full px-3 hover:bg-gray-300 dark:hover:bg-purple-700 text-gray-700 dark:text-purple-300';
  return !!!external ? (
    <NavLink to={to} className={className}>
      {children}
    </NavLink>
  ) : (
    <a className={className} href={to}>
      {children}
    </a>
  );
};

export default NavigationButton;
