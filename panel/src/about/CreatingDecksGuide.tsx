import Check from '../components/glyphs/Check';
import Ingredients from '../components/glyphs/Ingredients';
import NewDeck from '../components/glyphs/NewDeck';
import { createDecoratedText } from '../components/decoratedTextFactory';
import ScrollablePageWrapper from '../components/Footer/ScrollablePageWrapper';
import { createList } from '../components/listFactory';
import { createLongText } from '../components/longTextFactory';
import PageTitle from '../components/PageTitle/PageTitle';

const ConsistenciesOfDecksSubtitle = createDecoratedText(
  Ingredients,
  'What Do Good Decks Consist of?'
);
const QuestionExplaination = createLongText(
  'Our reasearch shows that good Decks consist of personal “What” questions, combined with very specific answers\n' +
    'Peronal questions have a four major types that you should be aware of before creating a question card:'
);
const TypesOfQuestionsList = createList(
  'An opinion question, such as "What\'s a good name for a dog?"',
  'Questions regarding one of the player\'s habits and behaviors. For example: "What did Mike eat for breakfast this morning?", or "What’s something Alex can\'t live without?"',
  'A sentence completion card, i.e - "Bad boy, Rex! I told you not to eat ______"',
  'A story card, i.e - "George woke up at 3am to see Marni heating _____ in the microwave"'
);
const QuestionAnswersMatch = createLongText(
  'Good answers could be - “Eggplant cereal”, “Olivia’s dog”, and “Grandma’s Teeth”.\n' +
    'The reason your question deck should only consist of “what” questions, is because combining multiple types of questions will lead to a mismatch in the answer’s data type. If the deck above had the question “When did Ross go to bed last night?”, non of the answers would fit.\n' +
    'If you still want a deck that contains more WH words, we recommend adding enough answer cards that match the questions with this word. For example, we can add the answers “By the time you finally finished breakfast”, “After John left Hanna”, and “By the time your dad came back with the milk”.'
);
const CardCountSubtitle = createDecoratedText(
  NewDeck,
  'How Many Cards Should You Create'
);
const CardCountLongText = createLongText(
  'The number of questions in your deck determines the length of the game. The more questions you create, the longer the game will be.\n' +
    'Our research shows that the ideal number of questions is between 3 to 5 times the number of players expected to play. For example - a game of 8 players should contain between 24 and 40 questions, depending on how long you want it to be.\n' +
    'The amount of answers in the game is affected by the number of players expected to play, too.\n' +
    'The amount of cards in the  answer deck has to be at least 4 times the amount of players expected to play - 4 cards for every player in the game, but should be way above the minimal amount.\n' +
    'Our reasearch shows that a card should be used once in 6 to 12 rounds. Each round, every player uses a card, meaning we should have some extra answer cards in the answer deck, between 6 to 12 times the amount players, in addition to the cards given to the players before the game starts.'
);
const CheckListSubtitle = createDecoratedText(
  Check,
  'Ensure This Before Using Your Deck In Action'
);
const DeckChecklist = createList(
  'Do the answers match the questions’ question words?',
  'Are there enough cards?',
  'Is the game not too short? not too long?',
  'Is every player expected to play represented in the questions and answers?',
  'Are you sure non of the players would get hurt from what’s written about them?'
);

export default function CreatingDecksGuide() {
  return (
    <ScrollablePageWrapper>
      <PageTitle>How To Create Decks</PageTitle>
      <section className="content-section space-y-4">
        <ConsistenciesOfDecksSubtitle className="decorated-subtitle" />
        <QuestionExplaination />
        <TypesOfQuestionsList />
        <QuestionAnswersMatch />
        <p>
          <span className="font-bold">Bonus tip #1: </span>
          You can have “When” decks, dedicated enritely for time answers, or
          “Who” decks, dedicated entirely for people.
        </p>
        <p>
          <span className="font-bold">Bonus tip #2: </span>
          If you wish to combine two WH words in one deck, we recommend the
          minor question word will match as least 30% of the answer cards,
          providing a high statistical probability of one of the players having
          a matching card.
        </p>
      </section>
      <section className="content-section space-y-4">
        <CardCountSubtitle className="decorated-subtitle mt-8" />
        <CardCountLongText />
      </section>
      <section className="content-section space-y-4">
        <CheckListSubtitle className="decorated-subtitle mt-8" />
        <DeckChecklist />
      </section>
    </ScrollablePageWrapper>
  );
}
