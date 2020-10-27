import ShortUniqueId from 'https://cdn.jsdelivr.net/npm/short-unique-id/short_uuid/mod.ts';

const numericId = new ShortUniqueId({
  dictionary: ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'],
});

export const generate = () => Number(numericId());
