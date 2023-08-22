/**
 * @param {number[]} nums
 * @return {number[]}
 */
// Algo :
// 1.max 2 element can appear for more than n/3 times
// 2. Apply Booyer-moore voting algo for potential candidate
// 3. verify count again forpotential candidate as it is not gauranteed that 2 candidates with n/3 is present.

var majorityElement = function(nums) {
    
    let cand1 = null;
    let count1 = 0;
    let cand2 = null;
    let count2 = 0;

    for(let i = 0; i < nums.length;i++){
        if(count1 == 0 && nums[i] !== cand2) {
            cand1 = nums[i];
        }
        if(count2 == 0 && nums[i] !== cand1) {
            cand2 = nums[i]
        }

        if(nums[i] === cand1){
            count1++;
        } else if(nums[i] === cand2){
            count2++;
        } else {
            count1--;
            count2--;
        }
    }

    count1 = 0;
    count2 = 0;
    let result= [];
    let maxCount = Math.floor(nums.length/3);
    for(let num of nums){
        if(num === cand1) count1++;
        if(num === cand2) count2++;
    }

    if(count1 > maxCount) result.push(cand1);
    if(count2 > maxCount) result.push(cand2);

    return result;

};