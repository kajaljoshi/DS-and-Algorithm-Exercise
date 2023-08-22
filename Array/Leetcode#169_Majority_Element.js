/**
 * @param {number[]} nums
 * @return {number}
 */

// Booyer-Moore voting Algorithm

var majorityElement = function(nums) {
    
    let ele = null;
    let count = 0;

    for(let i = 0; i < nums.length;i++){
        if(count == 0) {
            ele = nums[i];
        }

        if(nums[i] !== ele){
            count--;
        } else {
            count++;
        }
    }

    return ele;

};