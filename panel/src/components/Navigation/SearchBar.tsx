import SearchBarProvider, {
  SearchBarClose,
  SearchBarInput,
  SearchBarOpener,
  SearchBarVisibleWrapper,
} from '../Search/SearchBarProvider';

export default function SearchBar() {
  return (
    <SearchBarProvider>
      <div className="flex items-center rounded-full md:mr-4 bg-theme-500 focus-within:bg-white p-1 md:p-2 transition-all duration-500">
        <SearchBarOpener
          className="focus:outline-none text-theme-200"
          width={20}
          height={20}
        />
        <SearchBarVisibleWrapper>
          <div className="fixed md:static w-screen md:w-auto bg-white md:bg-transparent top-0 left-0 h-16 md:h-auto shadow-xl flex items-center px-8 md:px-1 justify-between z-50 ">
            <SearchBarInput focusOnRender />
            <SearchBarClose
              width={20}
              height={20}
              className="rounded-full bg-theme-800 text-theme-200"
            />
          </div>
        </SearchBarVisibleWrapper>
      </div>
    </SearchBarProvider>
  );
}
