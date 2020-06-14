var maxProfit = function (prices) {
  if (prices == null || prices.length == 1) {
    return 0
  }

  const n = prices.length

  // dp[i][0]: 表示前i天, k次交易前
  // dp[i][1]: 表示前i天, k次交易中
  // dp[i][2]: 表示第i天, k次交易后, k+1次交易前
  const k = 1
  const m = 2 * k + 1 + 1
  const dp = new Array(n + 1).fill(0).map(_ => new Array(m))

  for (let j = 1; j < m; j++) {
    dp[0][j] = 0
  }

  for (let i = 1; i <= n; i++) {
    // 交易前(未持有股票)
    for (let j = 1; j < m; j += 2) {
      if (i >= 2 && j > 1) {
        dp[i][j] = Math.max(
          // 空仓 --> 未持有: 今天的收益 = 截止到昨天的收益(空仓)
          dp[i - 1][j],

          // 卖出 --> 未持有: 今天的收益 = 截止到昨天的收益(持有) + 今天的收益(昨天的股价-今天的股价)
          dp[i - 1][j - 1] + (prices[i - 1] - prices[i - 2])
        )
      } else {
        dp[i][j] = dp[i - 1][j]
      }
    }

    // 交易中(已持有股票)
    for (let j = 2; j < m; j += 2) {
      if (i >= 2) {
        dp[i][j] = Math.max(
          // 持有 --> 已持有: 今天的收益 = 截止到昨天的收益(持有) + 今天的收益(昨天的股价-今天的股价)
          dp[i - 1][j] + (prices[i - 1] - prices[i - 2]),

          // 买入 --> 从空仓到持有: 今天的收益 = 截止到昨天的收益(空仓)
          dp[i - 1][j - 1]
        )
      } else {
        dp[i][j] = dp[i - 1][j - 1]
      }
    }
  }

  let maxProfit = 0
  for (let j = 1; j < m; j++) {
    maxProfit = Math.max(maxProfit, dp[n][j])
  }

  return maxProfit
}

function main() {
  console.log('maxProfit', maxProfit([7, 1, 5, 3, 6, 4]))
}

main()
