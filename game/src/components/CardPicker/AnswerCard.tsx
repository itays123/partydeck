import Card from '../Card/Card';

interface Props {
  selected?: boolean;
  picked?: boolean;
  content?: string;
  player?: string;
}

export function AnswerCard({
  selected = false,
  content,
  player = undefined,
  picked = false,
}: Props) {
  return (
    <Card small={!selected} inactive={!selected} hidden={!content}>
      <div className="h-full w-full flex flex-col justify-between items-center text-theme-800 font-medium py-8">
        <p>{content}</p>
        {picked && <p>{player}</p>}
      </div>
    </Card>
  );
}
