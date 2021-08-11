import { useCallback, useMemo } from 'react';
import Next from '../../components/icons/Next';
import Prev from '../../components/icons/Prev';
import { Editor } from '../types';
import { CardLikeAddCardButton } from './CardLikeAddCardButton';
import { AnimatedEditableCard } from './EditableCard/AnimatedEditableCard';
import { FocusEntity } from './FocusProvider';
import { useCards } from './useCards';
import { useSwipes } from './useSwipes';
import { withEditor } from './withEditor';

export type DeckEditorProps = {
  editor: Editor;
  label: string;
  focusProvider: FocusEntity;
};

function DeckEditor({
  editor,
  label,
  focusProvider,
}: DeckEditorProps): JSX.Element {
  const { deck, canDelete, minDeckSize, addCard, changeValue, deleteCard } =
    editor;
  const {
    selectedIndex,
    swipeLeftAllowed,
    swipeLeft,
    swipeRightAllowed,
    swipeRight,
    swipeDir,
    swipeWhenRemoved,
  } = useSwipes(deck, addCard);
  const { previousCard, currentCard, nextCard } = useCards(deck, selectedIndex);
  const uniqueInstanceId = useMemo(() => {
    return (selectedIndex + 1) * Math.floor(Math.random() * 100000) * swipeDir;
  }, [selectedIndex, swipeDir]);
  const updateSelectedCard = useCallback(
    (value: string) => changeValue(selectedIndex, value),
    [selectedIndex, changeValue]
  );
  const deleteSelectedCard = useCallback(() => {
    deleteCard(selectedIndex);
    swipeWhenRemoved();
  }, [selectedIndex, deleteCard, swipeWhenRemoved]);

  return (
    <div className="card-list mt-4 flex flex-col items-start">
      <h3 className="font-medium text-2xl text-theme-800 px-8 md:px-0">
        {label}
        <span className="text-sm text-theme-600 ml-3">
          {deck.length}
          {!canDelete && '/' + minDeckSize} cards
        </span>
      </h3>
      <div className="flex justify-center items-center mt-8">
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
            id={uniqueInstanceId + ':' + (selectedIndex - 1)}
            position={-1}
            swipeDir={swipeDir}
            onFocus={swipeLeft}
            value={previousCard}
          />
          <AnimatedEditableCard
            key={selectedIndex}
            id={uniqueInstanceId + ':' + selectedIndex}
            position={0}
            focused={focusProvider.isFocused}
            onFocus={focusProvider.focus}
            swipeDir={swipeDir}
            swipeLeft={swipeLeft}
            swipeRight={swipeRight}
            canDelete={canDelete}
            onDeletePress={deleteSelectedCard}
            value={currentCard}
            setValue={updateSelectedCard}
          />
          <AnimatedEditableCard
            key={selectedIndex + 1}
            id={uniqueInstanceId + ':' + (selectedIndex + 1)}
            position={1}
            swipeDir={swipeDir}
            onFocus={swipeRight}
            value={nextCard}
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
