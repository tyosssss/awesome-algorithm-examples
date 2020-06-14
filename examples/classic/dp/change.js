var coinChange = function (coins, amount) {
  if (coins.length === 0) {
    return -1;
  }

  return doChange(amount, coins, coins.length - 1);
};

function doChange(amount, coins, s) {
  if (s < 0) {
    return -1;
  } else if (s === 0) {
    return amount % coins[s] === 0 ? amount / coins[s] : -1;
  } else {
    let r1, r2;

    if (amount % coins[s] === 0) {
      r1 = amount / coins[s];
    } else {
      r1 = doChange(amount % coins[s], coins, s - 1);
      if (r1 > 0) r1 += Math.floor(amount / coins[s]);
    }

    r2 = doChange(amount, coins, s - 1);

    if (r1 > 0 && r2 > 0) {
      return Math.min(r1, r2);
    } else {
      return r1 > 0 ? r1 : r2;
    }
  }
}

function main() {
  const n = 6249;
  const cells = [186,419,83,408];

  console.log("count", coinChange(cells, n));
}

main();
