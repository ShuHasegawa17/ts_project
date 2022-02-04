'use strict';
function sample(val) {
  return val * 2;
}
console.log(sample(5));

let a1 = [(x) => x * x, 20];
const fun = a1[0];
console.log(fun(10));

function factorial(n) {
  if (Number.isInteger(n) && n > 0) {
    if (!(n in factorial)) {
      factorial[n] = n * factorial(n - 1);
    }
    return factorial[n];
  } else {
    return NaN;
  }
}
factorial[1] = 1;

import { stddev } from './main';
console.log(stddev([1, 5, 7]));
