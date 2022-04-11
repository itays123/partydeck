import { Stylable, WrapperProps } from '../types';

export interface ExternalLinkProps extends Stylable, WrapperProps {
  href: string;
}

export default function ExternalLink({
  children,
  className,
  href,
}: ExternalLinkProps) {
  return (
    <a
      target="_blank"
      href={href}
      className={className}
      rel="noopener noreferrer"
    >
      {children}
    </a>
  );
}
