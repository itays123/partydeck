const SvgWrapper = ({
  children,
  w = 24,
  h = 24,
  className: propClasses = '',
  viewBox = '0 0 24 24',
}) => {
  const className = `fill-current ${propClasses}`;
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox={viewBox}
      className={className}
      width={w}
      height={h}
    >
      {children}
    </svg>
  );
};

export default SvgWrapper;
