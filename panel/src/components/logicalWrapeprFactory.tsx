import React from 'react';
import { useMemo } from 'react';
import { useContext } from 'react';
import { Wrapper } from './types';

export function createWrapper<T extends object>(
  context: React.Context<T>,
  consumer: (context: T) => boolean
) {
  return function ConditionalWrapper({ children }: Wrapper) {
    const contextValue = useContext(context);
    const condition = useMemo(() => consumer(contextValue), [contextValue]);
    return <>{condition ? children : null}</>;
  };
}
