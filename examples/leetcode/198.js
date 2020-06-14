/**
 * @param {number[]} nums
 * @return {number}
 */
var rob = function (nums) {
  if (nums.length <= 0) {
    return 0;
  }

  // 缓存结果
  var opt = new Array(nums.length).fill(-1);

  return doRob(nums, nums.length - 1);

  function doRob(nums, k) {
    if (k < 0) return 0;
    else if (k == 0) return (opt[k] = nums[k]);
    else {
      var opt1_idx = k - 2;
      var otp2_idx = k - 1;

      var opt1 =
        opt1_idx > 0 && opt[opt1_idx] !== -1
          ? opt[opt1_idx]
          : (opt[opt1_idx] = doRob(nums, opt1_idx));
      var opt2 =
        otp2_idx > 0 && opt[otp2_idx] !== -1
          ? opt[otp2_idx]
          : (opt[otp2_idx] = doRob(nums, otp2_idx));

      return (opt[k] = Math.max(nums[k] + opt1, opt2))
    }
  }
};

function main() {
  console.log(
    rob([
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
    ])
  );
}

main();
