export interface Author {
  name: string;
  _id: string;
}

export interface Game {
  _id: string;
  name: string;
  lng: string;
  isPrivate: boolean;
  questionCount: number;
  answerCount: number;
  author?: Author;
}
