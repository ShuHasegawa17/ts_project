import { Iterator } from 'typescript';

let sum = 0;
for (let i of [1, 2, 3]) {
  sum += i;
}
console.log(sum);

console.log([...'abcd']);
let data: number[] = [1, 2, 3, 4, 5];
console.log(Math.max(...data));

let m = new Map([
  ['one', 1],
  ['two', 2],
]);
for (let [k, v] of m) console.log(k, v);
console.log([...m]);
console.log([...m.entries()]);
console.log([...m.keys()]);
console.log([...m.values()]);
console.table(m);
console.log('--------------------');
let iterable: number[] = [99];
let iterator = iterable[Symbol.iterator]();
for (
  let result: IteratorResult<number, boolean> = iterator.next();
  !result.done;
  result = iterator.next()
) {
  console.table(result.value);
}

let list = [1, 2, 3, 4, 5];
let iter = list[Symbol.iterator]();
let head = iter.next().value;
console.table([...iter]);

console.log('--------------------');
class Ranges {
  private from: number;
  private to: number;
  constructor(from: number, to: number) {
    this.from = from;
    this.to = to;
  }
  [Symbol.iterator]() {
    //このメソッドを実装する
    let n = Math.ceil(this.from);
    let l = this.to;
    return {
      next() {
        //nextメソッドを返す。その際、valueとdoneを設定する。
        return n <= l
          ? { value: n++, done: false } //doneは無くてよい
          : { value: undefined, done: true }; //valueは無くてよい
      },
    };
  }
}
console.table([...new Ranges(-2, 2)]); //スプレッド構文でイテレータが呼ばれる

function filterx(iterable: any, predicate: Function) {
  let iterator = iterable[Symbol.iterator]();
  return {
    //このオブジェクトはイテレータを返す
    [Symbol.iterator]() {
      return this;
    },
    //反復可能でもある
    next() {
      for (;;) {
        let v = iterator.next();
        if (v.done || predicate(v.value)) {
          return v;
        }
      }
    },
  };
}

console.table([...filterx(new Ranges(1, 10), (x: number) => x % 2 === 0)]);

console.log('--------------------------');
const seq = function* (from: number, to: number) {
  for (let i: number = from; i <= to; i++) {
    yield i;
  }
};
console.table([...seq(3, 6)]);

function* sequence(...iterables: any) {
  for (let ite of iterables) {
    // for(item of ite) { yield item }　と同じ
    yield* ite;
  }
}
console.table([...sequence('abc', seq(7, 10))]);

fetch('url')
  .then((res) => {})
  .then((response) => {})
  .then()
  .catch();
