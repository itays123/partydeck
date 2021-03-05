import { useState } from 'react';
import { useHistory } from 'react-router-dom';

const Search = ({ className = '' }) => {
  const { push } = useHistory();
  const [query, setQuery] = useState();
  return (
    <div className={className}>
      <div className="flex items-center h-full bg-gray-200 rounded px-2">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          className="stroke-1 fill-current text-gray-600"
          width={18}
          height={18}
        >
          <path d="M0 0h24v24H0z" fill="none" />
          <path d="M15.5 14h-.79l-.28-.27C15.41 12.59 16 11.11 16 9.5 16 5.91 13.09 3 9.5 3S3 5.91 3 9.5 5.91 16 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z" />
        </svg>
        <input
          type="text"
          placeholder="Search Games..."
          onChange={e => setQuery(e.target.value)}
          onKeyPress={e => {
            if (e.key === 'Enter') {
              push(`/search?q=${query}`);
            }
          }}
          className="flex-grow h-full pl-1 bg-transparent outline-none placeholder-gray-600"
        />
      </div>
    </div>
  );
};

export default Search;
