import Spinner from '../../shared/Spinner';
import { useGameEditorContext } from '../GameEditorContext';
import { IGameEditorContext } from '../types';

type Props = {
  action(context: IGameEditorContext): Promise<any> | void;
  disabled(context: IGameEditorContext): boolean;
  children: JSX.Element | JSX.Element[];
  label: string;
  loadingLabel?: string;
  isLoading?: boolean;
  onActionComplete?(): any;
};

export default function GameAction({
  action,
  disabled,
  isLoading = false,
  children,
  label,
  loadingLabel = 'Loading',
  onActionComplete = () => {},
}: Props) {
  const context = useGameEditorContext();

  const clickHandler = () => {
    if (!isLoading) {
      const result = action(context);
      if (result instanceof Promise) {
        result.then(onActionComplete);
      }
    }
  };

  return (
    <button
      className="action-button"
      onClick={clickHandler}
      disabled={disabled(context)}
    >
      {!isLoading ? (
        <>
          {children}
          {label}
        </>
      ) : (
        <div className="flex items-center">
          <Spinner />
          {loadingLabel}
        </div>
      )}
    </button>
  );
}
