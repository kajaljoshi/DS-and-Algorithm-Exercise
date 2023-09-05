/**
 * @param {number} x
 * @return {boolean}
 */
var isPalindrome = function(x) {

    if(x < 0) {
        return false;
    }

    let reverseNum = 0;
    let num = x;
    let base = 10;
    
    while(num > 0) {
        let lastDigit = num % 10;
        reverseNum = (reverseNum*base) + lastDigit;
        num = Math.trunc(num/10);
    }

    return x === reverseNum;
};