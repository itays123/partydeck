import { LinkedList } from './LinkedList.ts';

export class Queue<T = any> {
  private linkedList: LinkedList<T>;

  constructor() {
    this.linkedList = new LinkedList();
  }

  isEmpty() {
    return !this.linkedList.head;
  }

  peek() {
    if (!this.linkedList.head) return null;
    return this.linkedList.head.value;
  }

  enqueue(value: T) {
    this.linkedList.append(value);
  }

  dequeue() {
    const removedHead = this.linkedList.deleteHead();
    return removedHead ? removedHead.value : null;
  }

  fromArray(array: T[]) {
    this.linkedList.fromArray(array);
  }

  toArray() {
    return this.linkedList.toArray();
  }
}
