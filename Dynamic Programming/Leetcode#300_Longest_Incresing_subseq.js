/**
 * @param {number[]} nums
 * @return {number}
 */
var lengthOfLIS = function(nums) {
    
    let lisMemo = new Array(nums.length).fill(0);
    let maxLIS = 0;
    
    for(let i = nums.length - 1; i >= 0; i--) {
        let lenghtForI = 1;
        for(let j = i+1; j < nums.length; j++) {
            if(nums[i] < nums[j]) {
                lenghtForI = Math.max(lenghtForI, lisMemo[j] + 1);
            }
        }
        lisMemo[i] = lenghtForI;
        maxLIS = Math.max(maxLIS, lenghtForI);
    }

    return maxLIS;

};