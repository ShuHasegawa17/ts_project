class User {
  constructor(public name: string) {}
}

const u = new User('taro');
console.log(u.name);

function sum(list: Array<number>) {
  let total = 0;
  for (let num of list) {
    total += num;
  }
  return total;
}
console.log(sum([1, 2, 3]));

let a1: any = [(x: number) => x * x, 20];
console.log(a1[0](a1[1]));

function counter(n: number) {
  return {
    get count() {
      return n++;
    },
    set count(m) {
      if (m > n) n = m;
      else throw Error('count can only be set to a larger value');
    },
  };
}

let c = counter(10);
console.log(c.count);
console.log(c.count);
console.log((c.count = 20));
console.log(c.count);
//console.log((c.count = 20));

let cnt = 100;
let uniqueInteger = (() => {
  let cnt = 0; // ↓の関数のprivateな状態
  return () => cnt++; //この関数を返却する
})(); //定義して呼び出す
console.log(uniqueInteger()); //0
console.log(uniqueInteger()); //1

console.log(uniqueInteger.length);
console.log(counter.length);

const obj1: { x: number } = { x: 10 };
function sums(this: any, y: number, z: number) {
  return this.x + y - z;
}
let g = sums.bind({ x: 10 }, 2);
console.log(g(5));

function testA(this: any, y: number) {
  return this.x + y;
}
let ob: { x: number } = { x: 1 };
let bi = testA.bind(ob); //bindすると、bi(3)はob.bi(3)となる。
console.log(bi(3)); //4
let obob: { x: number; bi: Function } = { x: 100, bi }; // obobのxは100
console.log(obob.bi(3)); //biはobにバインドされているのでthis.xは1であるから、結果は4

const stats = (function () {
  //関数式
  //関数内private
  const sum = (x: number, y: number) => x + y;
  const square = (x: number) => x * x;

  function mean(data: number[]) {
    return data.reduce(sum) / data.length;
  }
  function stddev(data: number[]) {
    return data.map(square).reduce(sum) / data.length;
  }

  // return文のみエクスポート
  return { mean, stddev };
})(); //定義して直後に呼び出す

console.log(stats.mean([1, 3, 5, 7, 9]));
console.log(stats.stddev([1, 3, 5, 7, 9]));

const sumA = (x: number, y: number) => x + y;
const square = (x: number) => x * x;
function mean(data: number[]) {
  return data.reduce(sumA) / data.length;
}
function stddev(data: number[]) {
  return data.map(square).reduce(sumA) / data.length;
}

export { stddev };
