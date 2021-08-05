import { createContext } from 'react';

interface IAuthFormContext {
  email: string;
  password: string;
  name: string;
  setEmail: React.Dispatch<React.SetStateAction<string>>;
  setPassword: React.Dispatch<React.SetStateAction<string>>;
  setName: React.Dispatch<React.SetStateAction<string>>;
}

export const AuthFormContext = createContext({} as IAuthFormContext);
