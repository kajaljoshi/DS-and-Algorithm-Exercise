/**
 * @param {string} s
 * @return {number}
 */
// Here optimization is keep map with char and it's index
// instead of increasing start little by little, using index map we can easily reach to index

var lengthOfLongestSubstring = function(s) {

    if(s.length === 0) {
        return 0;
    }
    
    let maxCount = 0;
    let start = 0;
    let end = 1;

    let windowSet = new Set();
    windowSet.add(s[0]);
    let windowCount = 1;
    while(start <= end && end < s.length) {

        if(!windowSet.has(s[end])){
            windowCount++;
            windowSet.add(s[end]);
            end++;
        } else {
            while(s[start] !== s[end]) {
                // console.log("inside", s[start],s[end]);
                windowCount--;
                windowSet.delete(s[start]);
                start++;
            }
            start++;
            end++;
        }
         maxCount = Math.max(maxCount, windowCount);
    }
    return maxCount;

};