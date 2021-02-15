export function useSearch() {
  return {
    search(q) {
      return {
        result: [
          {
            lng: 'en',
            name: 'A Random Deck',
            isPrivate: false,
            questionCount: 12,
            answerCount: 54,
            author: { name: 'Itay' },
          },
          {
            lng: 'en',
            name: 'A Random Deck #2',
            isPrivate: true,
            questionCount: 43,
            answerCount: 183,
            author: { name: 'Itay' },
          },
        ],
      };
    },
  };
}
