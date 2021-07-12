import Spinner from '../../shared/Spinner';
import { useGameEditorContext } from '../GameEditorContext';
import { IGameEditorContext } from '../types';

type Props = {
  action(context: IGameEditorContext): Promise<any> | void;
  disabled(context: IGameEditorContext): boolean;
  children: JSX.Element | JSX.Element[];
  label: string;
  loadingLabel: string;
  isLoading: boolean;
};

export default function GameAction({
  action,
  disabled,
  isLoading,
  children,
  label,
  loadingLabel,
}: Props) {
  const context = useGameEditorContext();
  return (
    <button
      className="action-button"
      onClick={() => !isLoading && action(context)}
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
