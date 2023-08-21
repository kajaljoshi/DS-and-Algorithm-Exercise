/**
 * @param {number} x
 * @param {number} n
 * @return {number}
 */
var myPow = function(x, n) {
    
    let memoization = new Map(); // key = power, value =pow(x,key)

    const calcPow = (power) => {

        if(memoization.has(power)){
            return memoization.get(power);
        }

        if(power == 0) {
            return 1;
        }

        if(power == 1) {
            return x;
        }

        let value = 0;
        let halfPow = Math.floor(power/2);
        if(power%2 === 0) {
            value = calcPow(halfPow) * calcPow(halfPow);
        } else {
            value = x * calcPow(halfPow) * calcPow(halfPow);
        }

        memoization.set(power,value);
        return value;
    }

    if(n > 0){
        return calcPow(n);
    }
    else {
        return 1/calcPow(Math.abs(n));
    }

};