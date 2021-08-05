import { createContext } from 'react';
import { User } from '../../auth/types';
import { action } from '../buttonFactory';
import { createWrapper } from '../logicalWrapeprFactory';
import { Wrapper } from '../types';
import Clear from '../icons/Clear';
import { useState } from 'react';
import { useFetch } from '../../shared/helpers/useAsyncFetch';
import { useEffect } from 'react';
import { useAuthContext } from '../../auth/AuthContext';
import { useMemo } from 'react';
import { useContext } from 'react';

interface IProfileBar extends User {
  isLoading: boolean;
  isSelf: boolean;
  status: number;
  isOpen: boolean;
  open(id: string): void;
  close(): void;
}

const ProfileBarContext = createContext({} as IProfileBar);

export function useProfile() {
  return useContext(ProfileBarContext);
}

export const ProfileBarOpener = (label: string, id: string) =>
  action(label, ProfileBarContext, ctx => ctx.open(id));
export const ProfileBarOpen = createWrapper(
  ProfileBarContext,
  ctx => ctx.isOpen
);
export const ProfileLoading = createWrapper(
  ProfileBarContext,
  ctx => ctx.isOpen && ctx.isLoading
);
export const ProfilePresent = createWrapper(
  ProfileBarContext,
  ctx => ctx.isOpen && !ctx.isLoading && ctx.status === 200
);

export const ProfileBarClose = action(Clear, ProfileBarContext, ctx =>
  ctx.close()
);

export default function SideProfileBarProvider({ children }: Wrapper) {
  const [id, setId] = useState<string>();
  const { doFetch, data, isLoading, status } = useFetch('/' + id, 'GET', false);
  const { user } = useAuthContext();
  const isSelf = useMemo(() => user?._id === id, [id, user]);

  useEffect(() => {
    // @ts-ignore
    if (id !== data.user?._id && !isLoading && id) doFetch();
  }, [id, doFetch, data, isLoading]);

  return (
    <ProfileBarContext.Provider
      value={{
        // @ts-ignore
        ...(data.user as User),
        isLoading,
        status: status || 0,
        isOpen: Boolean(id),
        isSelf,
        open: id => setId(id),
        close: () => setId(undefined),
      }}
    >
      {children}
    </ProfileBarContext.Provider>
  );
}
