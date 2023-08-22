/**
 * @param {number[]} nums
 * @param {number} target
 * @return {number[]}
 */
var twoSum = function(nums, target) {
    
    let requiredNumSet = new Map();
    let pair = [];
    for(let i = 0; i < nums.length; i++){
    
        if(requiredNumSet.has(nums[i])) {
            // we found our pair
            pair = [requiredNumSet.get(nums[i]), i];
            break;
        } else {
            // add reqNum in map with index
            requiredNumSet.set(target - nums[i], i);
        }
    }

    return pair;

};