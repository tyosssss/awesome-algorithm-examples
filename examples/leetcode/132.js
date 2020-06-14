/**
 * @param {string} s
 * @return {number}
 */
var minCut = function (s) {
  const n = s.length

  if (n < 1) return 0

  const palindromes = createPalindrome(s)

  // dp[i]: 前0..i个字符可以划分的最小回文串
  const dp = new Array(n + 1)

  // console.log('palindromes',palindromes)

  dp[0] = 0

  // O(n^2)
  for (let i = 1; i <= n; i++) {
    dp[i] = +Infinity

    for (let j = 0; j < i; j++) {
      if (palindromes[j][i - 1]) {
        dp[i] = Math.min(dp[i], dp[j] + 1)
      }
    }
  }

  // console.log('dp',dp)

  return dp[n] - 1
}

// O(n ^ 2)
function createPalindrome(str) {
  const n = str.length
  const palindromes = new Array(n).fill(0).map(_ => new Array(n).fill(false))

  for (let s = 0; s < n; s++) {
    for (let e = s; e < n; e++) {
      let i = s
      let j = e

      while (i <= j) {
        if (str[i] != str[j]) break
        i++
        j--
      }

      palindromes[s][e] = i > j
    }
  }

  return palindromes
}
