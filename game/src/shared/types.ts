export type Wrapper = { children: JSX.Element | JSX.Element[] | string };
export type ConditionalProps = Wrapper & { fallback: JSX.Element };
