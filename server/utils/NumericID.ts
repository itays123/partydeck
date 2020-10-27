import { ShortUniqueId } from '../deps.ts';

const numericId = new ShortUniqueId({
  dictionary: ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'],
});

export const generate = () => Number(numericId());
