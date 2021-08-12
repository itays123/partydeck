import React from 'react';

export type NullableErrorMessage = null | string;
export type Validator<T> = (value: string, ctx: T) => NullableErrorMessage;
export type AsyncValidator<T> = (
  value: string,
  ctx: T
) => Promise<NullableErrorMessage>;

export interface Field {
  value: string;
  setter: React.Dispatch<React.SetStateAction<string>>;
  error: NullableErrorMessage;
  errorsVisible: boolean;
  showErrors(): void;
}

export interface IFormInputFactory<T extends {}> {
  name: keyof T;
  label?: string;
  hint?: string;
  type?: 'text' | 'email' | 'password' | 'number';
  context: React.Context<T>;
  hideErrors?: boolean;
  onBlur?: (ctx: T) => void;
  onKeyEnter: (ctx: T) => void;
}

export enum ValidatorState {
  INITIAL,
  VALIDATED,
  VALIDATING,
  INVALID,
}
