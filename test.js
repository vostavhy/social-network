function once(fn) {
  let i = 0;
  return function (...args) {
    i++;
    if (i > 1) return;

    const result = fn.apply(this, args);
    return result;
  };
}

logOnce = once(console.log);
logOnce('foo'); // -> "foo"
logOnce('bar'); // -> no effect
