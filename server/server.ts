import { Timeout } from 'https://deno.land/x/timeout/mod.ts';

let count = 0;

setTimeout(() => count++, 1500);

for (let i = 0; i < 3; i++) {
  if (count > 0) break;
  console.log(i);
  const timeout = Timeout.wait(1000);
  await timeout;
}

console.log('I made it!');
