/**
 * 找零问题
 * https://leetcode-cn.com/problems/coin-change/
 */

/**
 * @param {number[]} coins
 * @param {number} amount
 * @return {number}
 */
var coinChange = function (coins, amount) {
  if (!coins.length || amount < 0) {
    return -1
  }

  coins = coins.sort((a, b) => a - b)

  const opts = new Array(amount)

  function change(amount) {
    if (amount === 0) return 0

    if (opts[amount] != undefined) {
      return opts[amount]
    }

    let count = Infinity
    for (let i = 0, len = coins.length; i < len; i++) {
      const coin = coins[i]

      if (amount < coin) {
        break
      }

      const r_amount = amount - coin
      const r_amount_count =
        opts[r_amount] !== undefined
          ? opts[r_amount]
          : (opts[r_amount] = change(r_amount) + 1)

      count = Math.min(count, r_amount_count)

      // count = Math.min(count, change(amount - coin) + 1)
    }

    return (opts[amount] = count)
  }

  var result = change(amount, coins.length - 1)

  return isFinite(result) ? result : -1
}

function main() {
  console.log(
    coinChange([186, 419, 83, 408], 6249)
    // coinChange([1, 2, 5], 11)
    // coinChange([2], 3)
  )
}

main()
