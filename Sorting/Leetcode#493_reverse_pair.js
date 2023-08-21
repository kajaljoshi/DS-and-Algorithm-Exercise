/**
 * @param {number[]} nums
 * @return {number}
 */
// Algorithm :

// 1. Reverse traverse array
//     1.1 compare with sorted array numbers
//         find min number > current number
//         all the number before that can be considered as reverse pair for current number 
//         add it into final count
//     1.2 store 2 * num in array in sorted array

// Another fast approach is use divide & conqure => merge sort & count

var reversePairs = function(nums) {

    let sortedPairNum = [];

    const findPosition = (num) => {
        let start = 0;
        let end = sortedPairNum.length - 1;

        while(start <= end){
            let mid = start + Math.floor((end - start) / 2);
            if(sortedPairNum[mid] >= num) {
                end = mid - 1;
            } else {
                start = mid + 1;
            }
        }

        return start;
    }

    const addNum = (num, pos) => {
        sortedPairNum.splice(pos, 0, num);
    }

    let count = 0;
    for(let i = nums.length - 1; i >=0; i--) {
        if(sortedPairNum.length > 0) {
            let minNumber =  findPosition(nums[i]);
            count += minNumber;
            let pos = findPosition(2 * nums[i]);
            addNum(2 * nums[i], pos);
        } else {
            addNum(2 * nums[i], 0);
        }
    }

    return count;
    
};