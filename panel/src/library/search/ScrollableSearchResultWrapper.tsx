import { useCallback } from 'react';
import { withClass, Wrapper } from '../../components/types';
import { useSearchResult } from './SearchResultProvider';

export function ScrollableSearchResultsWrapper({
  children,
  className,
}: Wrapper & withClass) {
  const { loadMore, isMore, isLoading } = useSearchResult();
  const handleScroll = useCallback(
    (e: React.UIEvent<HTMLDivElement>) => {
      const bottom =
        e.currentTarget.scrollHeight - e.currentTarget.scrollTop ===
        e.currentTarget.clientHeight;
      if (bottom && isMore && !isLoading) loadMore();
    },
    [isMore, loadMore, isLoading]
  );
  return (
    <div className={className + ' overflow-y-scroll'} onScroll={handleScroll}>
      {children}
    </div>
  );
}
