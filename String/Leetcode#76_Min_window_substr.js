/**
 * @param {string} s
 * @param {string} t
 * @return {string}
 */
var minWindow = function(s, t) {
    
    let tDic = new Map();
    for(let index= 0; index < t.length; index++) {
       let count = tDic.has(t[index]) ? tDic.get(t[index]) + 1 : 1;
       tDic.set(t[index], count);
    } 
   
    let totalUniqueChars = tDic.size;
   
    let left = 0;
    let right = 0;
    let windowStrDic = new Map();
    let charsFound  = 0;
    let resultStr = s;
    let matchFound = false;
    
    while(right < s.length) {
        if(tDic.has(s[right])) {
            let count = windowStrDic.has(s[right]) ? windowStrDic.get(s[right]) + 1: 1;
            windowStrDic.set(s[right], count);
            if(tDic.get(s[right]) == count) {
                charsFound++;
            }
        }

        while(left <= right && charsFound == totalUniqueChars) {
            // mound match;
            matchFound = true;
            let windowStr = s.substring(left, right + 1)
            resultStr = resultStr.length > windowStr.length ? windowStr : resultStr;

            // increase left pointer
            if(tDic.has(s[left])) {
                let count = windowStrDic.get(s[left]) - 1;
                windowStrDic.set(s[left], count);

                if(tDic.get(s[left]) > count) {
                    charsFound--;
                }
            }
            left++;
        }
        right++;
    }
    return matchFound ? resultStr : "";
};