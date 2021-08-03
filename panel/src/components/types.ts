export type withClass = { className?: string };
export type JSXProvider<Props> = (props: Props) => JSX.Element;

export interface Wrapper {
  children: string | JSX.Element | JSX.Element[];
}
