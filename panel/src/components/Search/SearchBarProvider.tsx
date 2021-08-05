import { Dispatch, SetStateAction, useCallback } from 'react';
import { useState } from 'react';
import { createContext } from 'react';
import { useHistory } from 'react-router-dom';
import { createFormInput } from '../../shared/forms/formInputFactory';
import { Field } from '../../shared/forms/types';
import { useField } from '../../shared/forms/useField';
import { action } from '../buttonFactory';
import Clear from '../icons/Clear';
import Search from '../icons/Search';
import { createWrapper } from '../logicalWrapeprFactory';
import { Wrapper } from '../types';

type ISearchProvider = {
  visible: boolean;
  setVisible: Dispatch<SetStateAction<boolean>>;
  query: Field;
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
  name: 'query',
  hint: 'Search...',
  context: SearchBarContext,
  hideErrors: true,
  onBlur: ctx => ctx.clear(),
  onKeyEnter: ctx => ctx.search(),
});

export default function SearchBarProvider({
  children,
  visibleOnRender = false,
}: Wrapper & { visibleOnRender?: boolean }) {
  const [visible, setVisible] = useState(visibleOnRender);
  const queryField = useField((value: string) =>
    value.trim().length === 0 ? 'Cannot search' : null
  );
  const { push } = useHistory();

  const clear = useCallback(() => {
    setVisible(visibleOnRender);
    queryField.setter('');
  }, [visibleOnRender, queryField]);
  const search = useCallback(() => {
    push(`/search?q=${queryField.value}`);
    clear();
  }, [push, queryField.value, clear]);

  return (
    <SearchBarContext.Provider
      value={{ visible, setVisible, query: queryField, search, clear }}
    >
      {children}
    </SearchBarContext.Provider>
  );
}
