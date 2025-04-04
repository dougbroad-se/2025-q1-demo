let Listener: (() => void) | null = null;

function signal<T>(initialValue: T) {
  let value: T = initialValue;
  const subscribers = new Set<() => void>();

  function getValue() {
    if (Listener) subscribers.add(Listener);
    return value;
  }

  getValue.set = (newVal: T) => {
    value = newVal;
    subscribers.forEach((fn) => fn());
  };

  return getValue;
}

function computed<T>(fn: () => T) {
  let value!: T;
  Listener = () => (value = fn());

  value = fn();

  Listener = null;

  function getValue() {
    return value;
  }

  return getValue;
}

function effect(fn: () => void) {
  Listener = () => {
    fn();
  };

  fn();

  Listener = null;
}

// Demo time
const count = signal(0);
effect(() => {
  const value = count();
  console.log('eff', value);
});
const double = computed(() => count() * 2);
const eff = effect(() => console.log('effect', count()));
console.log('count', count(), double());
count.set(1);
console.log('count', count(), double());
