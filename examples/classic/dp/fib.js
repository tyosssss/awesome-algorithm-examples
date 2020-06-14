function fib(n) {
  return doFib(n, []);
}

function doFib(n, fibs) {
  if (n <= 2) {
    return (fibs[n] = 1);
  } else {
    const f2 = fibs[n - 2] !== undefined ? fibs[n - 2] : doFib(n - 2, fibs);
    const f1 = fibs[n - 1] !== undefined ? fibs[n - 1] : doFib(n - 1, fibs);

    return (fibs[n] = f1 + f2);
  }
}

function main() {
  for (let i = 1; i <= 20; i++) {
    console.log(i, "=", fib(i));
  }
}

main();
