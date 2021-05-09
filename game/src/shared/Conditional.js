const Conditional = ({
  children,
  condition,
  fallback = null,
  inverted = false,
}) => {
  if ((!condition && !inverted) || (condition && inverted)) return fallback;
  return children;
};

export default Conditional;
