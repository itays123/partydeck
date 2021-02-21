import { useEffect, useState } from 'react';

const sampleDecklist = [
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
];

export function useSearch(query) {
  const [result, setResult] = useState([]);
  const [isLoading, setLoading] = useState(false);

  useEffect(() => {
    setResult([]);
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setResult(sampleDecklist);
    }, 1000);
  }, [query]);

  return {
    result,
    isLoading,
    loadMore() {
      setLoading(true);
      setTimeout(() => {
        setLoading(false);
        setResult(list => {
          return [...list, ...sampleDecklist];
        });
      }, 1000);
    },
  };
}
