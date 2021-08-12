import Private from '../icons/Private';
import { SVGProps } from '../types';

export const GamePrivateIcon = ({
  isPrivate,
  ...props
}: { isPrivate: boolean } & SVGProps) =>
  isPrivate ? Private(props as unknown as SVGProps) : <></>;
