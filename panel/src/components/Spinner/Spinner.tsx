import { createSVGResource } from '../SVG';

const Circle = createSVGResource(
  <circle
    className="opacity-25"
    cx="12"
    cy="12"
    r="10"
    stroke="currentColor"
    strokeWidth="4"
  ></circle>,
  <path
    className="opacity-75"
    fill="currentColor"
    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
  ></path>
);

export default function Spinner({ label }: { label: string }) {
  return (
    <div className="flex space-x-3 items-center font-roboto text-md">
      <Circle className="animate-spin" width={20} height={20} />
      <span>{label}</span>
    </div>
  );
}
