/**
 * @param {string} haystack
 * @param {string} needle
 * @return {number}
 */
var strStr = function(haystack, needle) {
    
    let hsIndex = 0;
    let found = false;

    if(needle.length > haystack.length) {
        return -1;
    }
    
    const isNeedleString = (index1, index2) => {
        while(haystack[index1] === needle[index2] && index2 < needle.length ){
            index1++;
            index2++;
        }

        return index2 === needle.length ? true : false;
    }

    while(hsIndex < haystack.length) {
        if(haystack[hsIndex] === needle[0]) {
            found = isNeedleString(hsIndex, 0);
            if(found){
                break;
            }
        }
        hsIndex++;
    }
    
    return found ? hsIndex : -1;

};