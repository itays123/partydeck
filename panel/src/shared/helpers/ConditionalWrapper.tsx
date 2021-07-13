export interface Wrapper {
  children: JSX.Element | JSX.Element[];
}

interface Props {
  condition: boolean;
}

export default function ConditinalWrapper({
  children,
  condition,
}: Wrapper & Props) {
  return <>{condition ? children : null}</>;
}
