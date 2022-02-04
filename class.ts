class AbstractSet<T> {
  has(x: T): boolean {
    throw new Error('Abstact method');
  }
}

class NotSet<T> extends AbstractSet<T> {
  private set;

  constructor(set: Set<T>) {
    super();
    this.set = set;
  }

  has(x: T) {
    return !this.set.has(x);
  }
  toString() {
    return `{x| x -> ${this.set.toString()}}`;
  }
}

class RangeSet<Number> extends AbstractSet<Number> {
  private from: Number;
  private to: Number;
  constructor(from: Number, to: Number) {
    super();
    this.from = from;
    this.to = to;
  }

  has(x: Number) {
    return x >= this.from && x <= this.to;
  }
  toString() {
    return `{x| ${this.from} <= x <= ${this.to} }`;
  }
}

let r = new RangeSet(10, 20);
console.log(r.has(15));
console.log(r.has(5));
console.log(r.toString());

class AbstractEnumerableSet<T> extends AbstractSet<T> {
  get size(): Number {
    throw new Error('Abstract Method');
  }
  [Symbol.iterator](): any {
    throw new Error('Abstract Method');
  }

  isEmpth() {
    return this.size === 0;
  }
  toString() {
    return `{${Array.from(this).join(', ')}}`;
  }
  equals(set: AbstractSet<T>) {
    if (!(set instanceof AbstractEnumerableSet)) {
      return false;
    }

    if (this.size !== set.size) {
      return false;
    }

    for (let ele of this) {
      if (!set.has(ele)) {
        return false;
      }
    }
    return true;
  }
}

class SingletonSet<T> extends AbstractEnumerableSet<T> {
  private member: T;
  constructor(member: T) {
    super();
    this.member = member;
  }

  has(x: T) {
    return x === this.member;
  }
  get size() {
    return 1;
  }
  *[Symbol.iterator]() {
    yield this.member;
  }
}

//遅延実行
import('./main').then((a) => {
  let test = a.stddev([1, 2]);
  console.log('promise' + test);
});

const single = new SingletonSet('single');
const single2 = new SingletonSet('single');
console.log(single.has('single'));
console.log(single.has('single2'));
console.log(single.size);
console.log(single.toString());
console.log(single.equals(single2));
for (let e of single) {
  console.log('for->' + e);
}
