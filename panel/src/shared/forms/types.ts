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
}

export interface IFormInputFactory<T extends {}> {
  name: keyof T;
  label?: string;
  hint?: string;
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
