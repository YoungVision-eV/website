export default class Tween<T> {
  current: T;
  target: T;

  constructor(initial: T) {
    this.current = initial;
    this.target = initial;
  }

  set(target: T) {
    this.current = target;
    this.target = target;
  }

  subscribe(callback: (value: T) => void) {
    callback(this.current);
    callback(this.target);
  }
}
