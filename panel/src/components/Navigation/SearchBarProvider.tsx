import { Dispatch, SetStateAction } from 'react';
import { useState } from 'react';
import { createContext } from 'react';
import { action } from '../buttonFactory';
import Clear from '../icons/Clear';
import Search from '../icons/Search';
import { createWrapper } from '../logicalWrapeprFactory';
import { Wrapper } from '../types';

type ISearchVisible = {
  visible: boolean;
  setVisible: Dispatch<SetStateAction<boolean>>;
};

const SearchBarContext = createContext({} as ISearchVisible);

export const SearchBarOpener = action(Search, SearchBarContext, ctx =>
  ctx.setVisible(true)
);

export const SearchBarClose = action(Clear, SearchBarContext, ctx =>
  ctx.setVisible(false)
);

export const SearchBarVisibleWrapper = createWrapper(
  SearchBarContext,
  ctx => ctx.visible
);

export default function SearchBarProvider({ children }: Wrapper) {
  const [visible, setVisible] = useState(false);
  return (
    <SearchBarContext.Provider value={{ visible, setVisible }}>
      {children}
    </SearchBarContext.Provider>
  );
}
