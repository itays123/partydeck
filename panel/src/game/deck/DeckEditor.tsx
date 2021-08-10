import { useEffect } from 'react';
import Next from '../../components/icons/Next';
import Prev from '../../components/icons/Prev';
import { Editor } from '../types';
import { CardLikeAddCardButton } from './CardLikeAddCardButton';
import { AnimatedEditableCard } from './EditableCard/AnimatedEditableCard';
import { useCards } from './useCards';
import { useSwipes } from './useSwipes';
import { withEditor } from './withEditor';

type Props = {
  editor: Editor;
  label: string;
};

function DeckEditor({ editor, label }: Props): JSX.Element {
  const { cardAtomList, canDelete, addCard } = editor;
  const {
    selectedIndex,
    swipeLeftAllowed,
    swipeLeft,
    swipeRightAllowed,
    swipeRight,
    swipeDir,
  } = useSwipes(cardAtomList, addCard);
  const { previousCard, currentCard, nextCard } = useCards(
    cardAtomList,
    selectedIndex
  );

  return (
    <div className="card-list mt-4">
      <h3 className="font-medium text-2xl">{label}</h3>
      <div className="flex justify-center items-center w-full mt-8">
        <button
          onClick={swipeLeft}
          disabled={!swipeLeftAllowed}
          className="text-theme-800 disabled:opacity-50 focus:outline-none hidden-sm"
        >
          <Prev width={32} height={32} viewbox="0 0 60 60" />
        </button>
        <div className="relative h-52 w-cardpicker-md overflow-x-hidden">
          {!swipeRightAllowed && <CardLikeAddCardButton addCard={swipeRight} />}
          <AnimatedEditableCard
            key={selectedIndex - 1}
            id={previousCard?.getValue() + ':' + (selectedIndex - 1)}
            position={-1}
            swipeDir={swipeDir}
            atom={previousCard}
          />
          <AnimatedEditableCard
            key={selectedIndex}
            id={currentCard?.getValue() + ':' + selectedIndex}
            position={0}
            swipeDir={swipeDir}
            swipeLeft={swipeLeft}
            swipeRight={swipeRight}
            canDelete={canDelete}
            onDeletePress={() => {
              currentCard?.remove();
              if (
                !swipeRightAllowed ||
                selectedIndex + 2 === cardAtomList.length
              )
                // last element or the one before
                swipeLeft();
              else if (swipeLeftAllowed)
                // not first or last
                swipeRight();
            }}
            atom={currentCard}
          />
          <AnimatedEditableCard
            key={selectedIndex + 1}
            id={nextCard?.getValue() + ':' + (selectedIndex + 1)}
            position={1}
            swipeDir={swipeDir}
            atom={nextCard}
          />
        </div>
        <button
          onClick={swipeRight}
          className="text-theme-800 disabled:opacity-50 focus:outline-none hidden-sm"
        >
          <Next width={32} height={32} viewbox="0 0 60 60" />
        </button>
      </div>
    </div>
  );
}

export default withEditor(DeckEditor);
