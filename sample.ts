function sample(val: number): number {
  return val * 2;
}

console.log(sample(5));

import { stddev } from './main';
console.log('stddev' + stddev([1, 5, 7]));
