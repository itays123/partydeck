import { useEffect } from 'react';
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
        <div className="relative h-52 w-cardpicker-sm md:w-cardpicker-md overflow-x-hidden">
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
        {/*}
        <EditorOnly>
          <button
            className="rounded text-center py-8 border-4 border-dashed border-gray-500 flex items-center justify-center focus:outline-none"
            onClick={() => addCard()}
          >
            <SvgWrapper w={48} h={48} className="text-gray-500">
              <path d="M0 0h24v24H0z" fill="none" />
              <path d="M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2z" />
            </SvgWrapper>
          </button>
        </EditorOnly>
        {*/}
      </div>
    </div>
  );
}

export default withEditor(DeckEditor);
