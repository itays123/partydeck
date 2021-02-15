export function useProfile(userId) {
  return {
    _id: userId,
    name: 'Itay',
    games: [
      {
        lng: 'en',
        name: 'A Random Deck',
        isPrivate: false,
        questionCount: 12,
        answerCount: 54,
      },
      {
        lng: 'en',
        name: 'A Random Deck #2',
        isPrivate: true,
        questionCount: 43,
        answerCount: 183,
      },
    ],
  };
}
