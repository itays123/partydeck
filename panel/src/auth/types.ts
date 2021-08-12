import { Game } from '../components/GameList/types';

export interface User {
  _id: string;
  name: string;
  games: Game[];
}
