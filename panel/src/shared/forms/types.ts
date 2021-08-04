export type NullableErrorMessage = null | string;
export type Validator<T> = (value: string, ctx: T) => NullableErrorMessage;
export type AsyncValidator<T> = (
  value: string,
  ctx: T
) => Promise<NullableErrorMessage>;

export interface IFormInputFactory<T> {
  name: string;
  label?: string;
  loadingLabel?: string;
  context: React.Context<T>;
  validator: Validator<T>;
  asyncValidator?: AsyncValidator<T>;
  hideErrors?: boolean;
  onChange: (value: string, ctx: T) => void;
  onBlur?: (ctx: T) => void;
  onKeyEnter: (ctx: T) => void;
}

export enum ValidatorState {
  INITIAL,
  VALIDATED,
  VALIDATING,
  INVALID,
}
