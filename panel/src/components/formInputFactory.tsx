import { HTMLProps } from 'react';
import { withClass } from './types';

interface IFormInputFactory extends HTMLProps<HTMLInputElement> {
  validator: (value: string) => boolean | Promise<boolean>;
  onKeyEnter: (value: string, validated: boolean) => void;
}

export function createFormInput({
  validator,
  onKeyEnter,
  ...props
}: IFormInputFactory) {
  return function Input({ className }: withClass) {
    return <input {...(props as unknown as HTMLProps<HTMLInputElement>)} />;
  };
}
