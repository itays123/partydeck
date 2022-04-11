import Image from 'next/image';
import { Stylable } from '../types';

export type Glyph = (props: Stylable) => JSX.Element;

export default function createGlyph(src: string): Glyph {
  return function Glyph({ className }: Stylable) {
    return <Image src={src} alt="" className={className} />;
  };
}
