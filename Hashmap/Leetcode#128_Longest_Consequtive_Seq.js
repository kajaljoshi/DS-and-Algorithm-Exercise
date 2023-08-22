/**
 * @param {number[]} nums
 * @return {number}
 */
var longestConsecutive = function(nums) {

    let hashMap = new Set(nums); 
    let maxCount  = 0;


    for(let num of nums) {
        if(hashMap.has(num - 1)) {
            continue;
        }
        let seqCount = 1;
        let start = num + 1;
        while(hashMap.has(start)) {
            start++;
            seqCount++;
        }
        maxCount = Math.max(maxCount, seqCount);
    }

    return maxCount;
};