/**
 * @param {number[]} nums
 * @return {boolean}
 */
var canJump = function(nums) {
    
    let nextReachableIndex = 0;
    let pos = 0;
    let isReachable = false;
    while(pos <= nextReachableIndex) {
      nextReachableIndex= Math.max(nums[pos] + pos, nextReachableIndex);
      if(nextReachableIndex >= nums.length - 1) {
        isReachable = true;
        break;
      }
      pos++;
    }
    return isReachable;
};