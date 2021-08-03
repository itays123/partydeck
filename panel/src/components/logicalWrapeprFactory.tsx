import React from 'react';
import { useMemo } from 'react';
import { useContext } from 'react';
import { Wrapper } from './types';

interface Props {
  condition: boolean;
}

export function createWrapper<T extends object>(
  context: React.Context<T>,
  consumer: (context: T) => boolean
) {
  return function ({ children }: Wrapper) {
    const contextValue = useContext(context);
    const condition = useMemo(() => consumer(contextValue), [contextValue]);
    return (
      <ConditinalWrapper condition={condition}>{children}</ConditinalWrapper>
    );
  };
}

export default function ConditinalWrapper({
  children,
  condition,
}: Wrapper & Props) {
  return <>{condition ? children : null}</>;
}
