import { useState } from 'react';

export function useSaveGame() {
  const [isLoading, setLoading] = useState(false);
  return {
    isSaveLoading: isLoading,
    save(changes) {
      setLoading(true);
      return new Promise(resolve => {
        setTimeout(() => {
          setLoading(false);
          resolve({
            _id: '1',
            lng: 'en',
            name: 'A Random Deck',
            isPrivate: false,
            author: { name: 'Itay', _id: '1' },
            questions: [
              'question',
              'question',
              'question',
              'question',
              'question',
              'question',
              'question',
              'question',
              'question',
              'question',
              'question',
              'question',
              'question',
              'question',
              'question',
              'question',
              'question',
              'question',
              'question',
              'question',
              'question',
              'question',
              'question',
              'question',
            ],
            answers: [
              'answer',
              'answer',
              'answer',
              'answer',
              'answer',
              'answer',
              'answer',
              'answer',
              'answer',
              'answer',
              'answer',
              'answer',
              'answer',
              'answer',
              'answer',
              'answer',
              'answer',
              'answer',
              'answer',
              'answer',
              'answer',
              'answer',
              'answer',
              'answer',
              'answer',
            ],
          });
        }, 3000);
      });
    },
  };
}
