/**
 * @param {number[]} nums
 * @param {number} target
 * @return {number[][]}
 */
var fourSum = function(nums, target) {
    
    if(nums.length < 4){
        return [];
    }

    if(nums.length === 4){
        let sum = nums.reduce((total, num) => total + num, 0);
        if(sum === target){
            return [[...nums]];
        }
        return [];
    }

    let results = new Map();
    
    const findQuad = (startIndex, currSum, result) => {

        for(let i = startIndex; i < nums.length; i++) {
            let total = currSum + nums[i];
            let quad = [...result, nums[i]];

            if(quad.length === 4) {
                if(total === target) {
                    let key = quad.sort().join("");
                    if(!results.has(key)) {
                        results.set(key, quad);    
                    }
                    break;
                }
            } else {
                findQuad(i+1, currSum + nums[i], quad);
            }
            
        }
        return;
    }

    findQuad(0, 0, []);
    return [...results.values()]
    
};