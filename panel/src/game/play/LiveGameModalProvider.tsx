import { createContext, useCallback } from 'react';
import { action } from '../../components/buttonFactory';
import { createWrapper } from '../../components/logicalWrapeprFactory';
import { ModalHook } from '../../components/Modal/types';
import useModal from '../../components/Modal/useModal';
import { Wrapper } from '../../components/types';
import { useCreateLiveGame } from './useCreateLiveGame';
import Play from '../../components/glyphs/Play';
import { useContext } from 'react';

interface ILiveGameCreationProvider {
  liveGameCreationModal: ModalHook;
  liveCode: string;
  isLoading: boolean;
  createLiveGame(): void;
}

export const LiveGameCreationContext = createContext(
  {} as ILiveGameCreationProvider
);

export function useGameCreationContext() {
  return useContext(LiveGameCreationContext);
}

export const GameCreationLoading = createWrapper(
  LiveGameCreationContext,
  ctx => ctx.isLoading
);
export const GameCreationNotLoading = createWrapper(
  LiveGameCreationContext,
  ctx => !ctx.isLoading
);
export const LiveGameReady = createWrapper(
  LiveGameCreationContext,
  ctx => !!ctx.liveCode
);
export const ErrorInCreation = createWrapper(
  LiveGameCreationContext,
  ctx => !ctx.isLoading && !ctx.liveCode
);
export const CreateLiveGameButton = action(Play, LiveGameCreationContext, ctx =>
  ctx.createLiveGame()
);

export function CreateLiveGameProvider({
  children,
  gameId,
}: Wrapper & { gameId: string }) {
  const { isLoading, data, doFetch } = useCreateLiveGame(gameId);
  const liveGameCreationModal = useModal();
  const createLiveGame = useCallback(() => {
    liveGameCreationModal.open();
    doFetch();
  }, [doFetch, liveGameCreationModal]);
  return (
    <LiveGameCreationContext.Provider
      value={{
        liveCode: data.code,
        isLoading,
        liveGameCreationModal,
        createLiveGame,
      }}
    >
      {children}
    </LiveGameCreationContext.Provider>
  );
}
