import { LegacyRef } from 'react';

export interface AnswerCardProps {
  position: number;
  content?: string;
  innerRef?: React.ForwardedRef<HTMLDivElement>;
}

export function AnswerCard({ position, content, innerRef }: AnswerCardProps) {
  return (
    <div
      className={`rounded w-32 h-48 px-3 py-8 absolute inset-x-card-center answer-card-pos-${Math.abs(
        position
      )}`}
      ref={innerRef as LegacyRef<HTMLDivElement>}
    >
      <p className="text-theme-800 font-medium mx-auto text-center">
        {content}
      </p>
    </div>
  );
}
