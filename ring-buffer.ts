/** A basic TypeScript RingBuffer implementation */
class RingBuffer<T> {
  public length = 0;

  private first = 0;
  private last = 0;
  private value: T[];

  constructor(size = 10) {
    this.value = new Array(size);
  }

  // Add to end of array
  push(item: T): void {
    // Update length
    this.length++;

    // Check for resize
    if (this.length > this.value.length) {
      // Need to clone into new array
      this.resize();
    }

    if (this.length > 1) {
      // Increment last index
      this.last++;
      if (this.last >= this.value.length) this.last = 0;
    }

    // Set last index
    this.value[this.last] = item;
  }

  // Remove and return last element
  pop(): T | undefined {
    if (!this.length) return undefined;

    // Update length
    this.length--;

    // Get last element and remove from value
    const val = this.value[this.last];
    delete this.value[this.last];

    // Increment last index
    this.last--;
    if (this.last < 0) this.last = this.value.length;

    return val;
  }

  // Add to beginning of array
  unshift(item: T): void {
    // Update length
    this.length++;

    // Check for resize
    if (this.length > this.value.length) {
      // Need to clone into new array
      this.resize();
    }

    // Increment first index
    this.first--;
    if (this.first < 0) this.first = this.value.length;

    // Set first index
    this.value[this.first] = item;
  }

  // Remove and return first element
  shift(): T | undefined {
    if (!this.length) return undefined;

    // Update length
    this.length--;

    // Get first element and remove from value
    const val = this.value[this.first];
    delete this.value[this.first];

    // Increment first index
    this.first++;
    if (this.first >= this.value.length) this.first = 0;

    return val;
  }

  // Get element at specified index
  get(idx: number): T | undefined {
    if (idx < 0 || idx >= this.value.length) return undefined;
    idx = (this.first + idx) % this.value.length;
    return this.value[idx];
  }

  private resize(): void {
    const value = new Array(this.value.length * 2);
    for (let idx = 0; idx < this.length; idx++) {
      const i = (this.first + idx) % this.value.length;
      value[idx] = this.value[i];
    }

    this.first = 0;
    this.last = this.value.length - 1;
    this.value = value;
  }
}

// Simple performance test
const checkRing: number[] = [];
const checkArr: number[] = [];
const count = 1000000;

console.time('RingBuffer');
const testRing = new RingBuffer<number>();
for (let i = 0; i < count; i++) {
  testRing.push(i);
  testRing.unshift(i);
  const idx = Math.floor(i / 2);
  checkRing.push(testRing.get(idx)!);
}
for (let i = 0; i < count; i++) {
  testRing.pop();
  testRing.shift();
}
console.timeEnd('RingBuffer');

console.time('Array');
const testArr: number[] = [];
for (let i = 0; i < count; i++) {
  testArr.push(i);
  testArr.unshift(i);
  const idx = Math.floor(i / 2);
  checkArr.push(testArr[idx]);
}
for (let i = 0; i < count; i++) {
  testArr.pop();
  testArr.shift();
}
console.timeEnd('Array');

console.log(
  JSON.stringify(checkRing) === JSON.stringify(checkArr)
    ? 'consistent'
    : 'error'
);
