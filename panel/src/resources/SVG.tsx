import { Wrapper } from '../shared/helpers/ConditionalWrapper';

export interface SVGProps {
  viewbox?: string;
  className?: string;
  width: number;
  height: number;
}

export function createSVGResource(...children: JSX.Element[]) {
  return function (props: SVGProps) {
    return (
      <SVG {...props} className={'fill-current ' + props.className}>
        {children}
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
