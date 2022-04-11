import { Fragment } from 'react';
import { WrapperProps } from '../types';

export interface SVGProps {
  className?: string;
  viewbox?: string;
  width?: number;
  height?: number;
}

export type Icon = (props: SVGProps) => JSX.Element;

export function SVG({
  className = '',
  viewbox = '0 0 24 24',
  width,
  height,
  children,
}: SVGProps & WrapperProps) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox={viewbox}
      className={className}
      width={width}
      height={height}
    >
      {children}
    </svg>
  );
}

export default function createSVGResource(...children: JSX.Element[]): Icon {
  return function Resource(props: SVGProps) {
    return (
      <SVG {...props} className={'fill-current ' + props.className}>
        {children.map((child, i) => (
          <Fragment key={i}>{child}</Fragment>
        ))}
      </SVG>
    );
  };
}
