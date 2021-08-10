import { LegacyRef } from 'react';

export interface AnswerCardProps {
  position: number;
  picked?: boolean;
  content?: string;
  player?: string;
  innerRef?: React.ForwardedRef<HTMLDivElement>;
}

export function AnswerCard({
  position,
  content,
  player = undefined,
  picked = false,
  innerRef,
}: AnswerCardProps) {
  return (
    <div
      className={`rounded w-32 h-48 px-3 py-2 answer-card-pos-${Math.abs(
        position
      )}`}
      style={{
        position: 'absolute',
        left: 'calc(50% - 64px)',
        right: 'calc(50% - 64px)',
      }}
      ref={innerRef as LegacyRef<HTMLDivElement>}
    >
      <div className="h-full w-full flex flex-col justify-between items-center text-theme-800 font-medium py-8">
        <p>{content}</p>
        {picked && <p>{player}</p>}
      </div>
    </div>
  );
}
