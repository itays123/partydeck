export type NullableErrorMessage = null | string | Promise<string>;
export type Validator<T> = (value: string, ctx: T) => NullableErrorMessage;

export interface IFormInputFactory<T> {
  name: string;
  label: string | undefined;
  loadingLabel: string;
  context: React.Context<T>;
  validator: Validator<T>;
  onValueValidated: (value: string, ctx: T) => void;
  onKeyEnter: (ctx: T) => void;
}

export enum ValidatorState {
  INITIAL,
  VALIDATED,
  VALIDATING,
  INVALID,
}
