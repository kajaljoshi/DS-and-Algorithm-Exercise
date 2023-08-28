/**
 * @param {string} s
 * @param {string} t
 * @return {boolean}
 */
var isAnagram = function(s, t) {
    
    if(s.length !== t.length){
        return false;
    }

    let mapS = {};
    let mapT = {};

    for(let index=0; index < s.length; index++) {
        mapS[s[index]] = mapS[s[index]]? mapS[s[index]] + 1: 1;
        mapT[t[index]] = mapT[t[index]]? mapT[t[index]] + 1: 1;
    }

    let isAna = true;
    for(let char in mapS) {
        if(mapS[char] !== mapT[char]) {
           isAna =false;
           break; 
        }
    }

    return isAna;
};