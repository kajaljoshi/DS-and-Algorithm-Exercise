/**
 * @param {number[]} nums
 * @return {number}
 */

// approach 1 : sort array n scan,but that will modify current array/use extra space ->not valid
// approach 2 : keep the bucket of some size, scan array,find bucket element n total count, if more than one, we found duplicate element or scan for next bucket items -> valid approach,but need to scan multiple times
// approach 3 :Binary search approach 
// 3.1 : pickany random number form range 1 to n :k
// 3.2 : scan through array, count of number less than k should be <= k
// 3.3 : if count is grater than that than find min number that match that condition -> that's th duplicate number
// 3.4 else try finding min number which exceed the count of numbers 

var findDuplicate = function(nums) {


    let start = 0;
    let end = nums.length - 1;
    let duplicate =-1; 

    while(start <= end) {
        let midNum = start + Math.floor((end - start)/2);
        let count = nums.reduce((count, num) => num <= midNum ? count + 1 :count, 0);
        if(count <= midNum){
            //duplicate number is part of [mindNum , end] range
            start = midNum + 1;
        } else {
            //duplicate number is part of [start , midNum] range
            duplicate = midNum;
            end = midNum - 1; 
        }
    }

    return duplicate;

};