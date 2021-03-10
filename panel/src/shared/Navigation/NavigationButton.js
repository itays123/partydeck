import { NavLink } from 'react-router-dom';

const NavigationButton = ({
  to = '/',
  children,
  external = false,
  hideOnSmallScreens = false,
}) => {
  const className = `items-center justify-center h-full px-2 md:px-3 hover:bg-gray-300 text-gray-700 text-sm md:text-md ${
    hideOnSmallScreens ? 'hidden md:flex' : 'flex'
  }`;
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
