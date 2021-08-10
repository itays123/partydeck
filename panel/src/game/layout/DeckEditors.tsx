import DeckEditor from '../deck/DeckEditor';

export default function DeckEditors() {
  return (
    <div className="mt-4 mb-8 flex flex-col lg:flex-row items-center justify-center lg:space-x-16 lg:px-16">
      <DeckEditor label="Questions" of="questions" />
      <DeckEditor label="Answers" of="answers" />
    </div>
  );
}
