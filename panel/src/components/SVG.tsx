import { Fragment } from 'react';
import { SVGProps, Wrapper } from '../components/types';

export function createSVGResource(...children: JSX.Element[]) {
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

export default function SVG({
  className = '',
  viewbox = '0 0 24 24',
  width = 24,
  height = 24,
  children,
}: SVGProps & Wrapper) {
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
