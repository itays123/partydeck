export type withClass = { className: string };
export type Wrapper = { children: JSX.Element | JSX.Element[] | string };
export type FallbackedWrapper = Wrapper & { fallback?: () => JSX.Element };
