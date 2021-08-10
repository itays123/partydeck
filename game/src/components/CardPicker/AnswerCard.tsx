import { LegacyRef } from 'react';

export interface AnswerCardProps {
  position: number;
  content?: string;
  innerRef?: React.ForwardedRef<HTMLDivElement>;
}

export function AnswerCard({ position, content, innerRef }: AnswerCardProps) {
  return (
    <div
      className={`rounded w-32 h-48 px-3 py-2 absolute inset-x-card-center answer-card-pos-${Math.abs(
        position
      )}`}
      ref={innerRef as LegacyRef<HTMLDivElement>}
    >
      <div className="h-full w-full flex flex-col justify-between items-center text-theme-800 font-medium py-8">
        <p>{content}</p>
      </div>
    </div>
  );
}
