/**
 * @param {number[]} nums1
 * @param {number} m
 * @param {number[]} nums2
 * @param {number} n
 * @return {void} Do not return anything, modify nums1 in-place instead.
 */

var merge = function(nums1, m, nums2, n) {

    let p1 = m - 1;
    let p2 = n - 1;
    let currPosition = m + n - 1;

    while(p1 >= 0 && p2 >= 0) {
        if(nums1[p1] >= nums2[p2]){
            nums1[currPosition] = nums1[p1];
            p1--;
        } else {
            nums1[currPosition] = nums2[p2];
            p2--;
        }
        currPosition--;
    }

    if(currPosition >= 0){
        // if nums1 has some element left then keep it as it is, as they are in place
        // if num2 has eelemtn left than copy all elements t0 num1; 
        if(p2 >= 0){
            nums1.splice(0, currPosition + 1, ...nums2.slice(0, p2 + 1));
        }
    }    

    return nums1;

};