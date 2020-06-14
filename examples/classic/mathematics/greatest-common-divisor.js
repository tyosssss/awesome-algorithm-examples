function greatestCommonDivisor(a, b) {
  const big = a > b ? a : b
  const small = a < b ? a : b

  if (big % small === 0) return small

  for (let i = small / 2; i > 1; i--) {
    if (small % i === 0 && big % i === 0) return i
  }

  return 1
}

/**
 * 辗转相除法(欧几里得算法)
 */
function greatestCommonDivisorV1(a, b) {
  if (a <= 0 || b <= 0) {
    throw new Error('a,b must be a positive integer.')
  }

  function gcd(a, b) {
    const big = a > b ? a : b
    const small = a < b ? a : b

    if (big % small === 0) return small

    return gcd(big % small, small)
  }

  return gcd(a, b)
}

/**
 * 更相减损术
 */
function greatestCommonDivisorV2(a, b) {
  if (a <= 0 || b <= 0) {
    throw new Error('a,b must be a positive integer.')
  }

  function gcd(a, b) {
    let big = a
    let small = b

    if (a < b) {
      big = b
      small = a
    }

    if (big % small === 0) return small
    else return gcd(big - small, small)
  }

  return gcd(a, b)
}

/**
 *
 * @param {*} a
 * @param {*} b
 */
function greatestCommonDivisorV3(a, b) {
  function gcd(a, b) {
    if (a === b) return a

    if ((a & 1) === 0 && (b & 1) === 0) return gcd(a >> 1, b >> 1) << 1
    else if ((a & 1) === 0) return gcd(a >> 1, b)
    else if ((b & 1) === 0) return gcd(a, b >> 1)
    else {
      let big = a
      let small = b

      if (a < b) {
        big = b
        small = a
      }

      return gcd(big - small, small)
    }
  }

  return gcd(a, b)
}

function main() {
  var a = 128
  var b = 36

  console.log(greatestCommonDivisor(a, b))
  console.log(greatestCommonDivisorV1(a, b))
  console.log(greatestCommonDivisorV2(a, b))
  console.log(greatestCommonDivisorV3(a, b))
}

main()
