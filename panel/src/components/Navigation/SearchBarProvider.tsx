import { Dispatch, SetStateAction, useCallback } from 'react';
import { useState } from 'react';
import { createContext } from 'react';
import { useHistory } from 'react-router-dom';
import { createFormInput } from '../../shared/forms/formInputFactory';
import { action } from '../buttonFactory';
import Clear from '../icons/Clear';
import Search from '../icons/Search';
import { createWrapper } from '../logicalWrapeprFactory';
import { Wrapper } from '../types';

type ISearchProvider = {
  visible: boolean;
  setVisible: Dispatch<SetStateAction<boolean>>;
  query: string;
  setQuery: Dispatch<SetStateAction<string>>;
  search(): void;
  clear(): void;
};

const SearchBarContext = createContext({} as ISearchProvider);

export const SearchBarOpener = action(Search, SearchBarContext, ctx =>
  ctx.setVisible(true)
);

export const SearchBarClose = action(Clear, SearchBarContext, ctx =>
  ctx.clear()
);

export const SearchBarVisibleWrapper = createWrapper(
  SearchBarContext,
  ctx => ctx.visible
);

export const SearchBarInput = createFormInput({
  name: 'search',
  context: SearchBarContext,
  hideErrors: true,
  onChange: (value, ctx) => ctx.setQuery(value),
  onBlur: ctx => ctx.clear(),
  onKeyEnter: ctx => ctx.search(),
  validator: value => (value.trim().length === 0 ? 'Cannot search' : null),
});

export default function SearchBarProvider({ children }: Wrapper) {
  const [visible, setVisible] = useState(false);
  const [query, setQuery] = useState('');
  const { push } = useHistory();

  const clear = useCallback(() => {
    setVisible(false);
    setQuery('');
  }, []);
  const search = useCallback(() => {
    push(`/search?q=${query}`);
    clear();
  }, [push, query, clear]);

  return (
    <SearchBarContext.Provider
      value={{ visible, setVisible, query, setQuery, search, clear }}
    >
      {children}
    </SearchBarContext.Provider>
  );
}
