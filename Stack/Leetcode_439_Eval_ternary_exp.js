/**
 * @param {string} expression
 * @return {string}
 */


var parseTernary = function(expression) {
    
    let exArray = expression.split('');
    
    let opStack = [];

    for(let i = exArray.length - 1; i >= 0; i--) {
        if(exArray[i] === ':') {
            continue;
        }
        if(exArray[i] === '?') {
            let trueValue = opStack.pop();
            let falseValue = opStack.pop();

            let condition = exArray[i - 1];
            i = i - 1;
            let val = condition === 'T' ? trueValue : falseValue;
            opStack.push(val);
        } else {
            opStack.push(exArray[i])
        }
    }
    
    return opStack.pop();
};