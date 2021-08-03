import { useLocation } from 'react-router-dom';

export function useQuery() {
  let result = {};
  const params = new URLSearchParams(useLocation().search);
  for (let [key, value] of params) {
    result[key] = value;
  }
  return result;
}
