type ObjectOfStrings = { [key: string]: string };

export function useQuery() {
  let result: ObjectOfStrings = {};
  const params = new URLSearchParams(window.location.search);
  for (let [key, value] of params) {
    result[key] = value;
  }
  return result;
}
