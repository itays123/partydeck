import { useAuthContext } from '../AuthContext';

export function useProfile(userId) {
  const { user } = useAuthContext();
  if (!userId) return user;
  return {
    _id: userId,
    name: 'Itay',
    games: [
      {
        _id: 1,
        lng: 'en',
        name: 'A Random Deck',
        isPrivate: false,
        questionCount: 12,
        answerCount: 54,
      },
      {
        _id: 2,
        lng: 'en',
        name: 'A Random Deck #2',
        isPrivate: true,
        questionCount: 43,
        answerCount: 183,
      },
    ],
  };
}
