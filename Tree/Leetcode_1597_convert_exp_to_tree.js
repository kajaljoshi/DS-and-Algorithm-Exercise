/**
 * @param {string} s
 * @return {Node}
 */
function buildPostfix(expArr) {

    let postfix = [];
    let operatorStack = [];

    const opePriority  = {
        '(' : -1,
        ')' : -1,
        '*' : 1,
        '/' : 1,
        '+' : 0,
        '-' : 0
    }

    const addOptoStack = (op) => {
        while(operatorStack.length > 0 && opePriority[op] <=  opePriority[operatorStack[operatorStack.length - 1]]) {
            let lastOp = operatorStack.pop();
            postfix.push(lastOp);
        }

        operatorStack.push(op);
    }

    for(let i = 0; i < expArr.length; i++) {
        if(isFinite(expArr[i])) {
            postfix.push(expArr[i]);
        } else if(expArr[i] === '(') {
            operatorStack.push('(');
        } else if(expArr[i] === ')') {  
            while(operatorStack.length > 0 && operatorStack[operatorStack.length - 1] !== '(') {
                postfix.push(operatorStack.pop());
            }
            operatorStack.pop();
        } else {
            addOptoStack(expArr[i])
        }
    }

    while(operatorStack.length > 0){
        postfix.push(operatorStack.pop());
    }

    return postfix;

}

var expTree = function (s) {
  
    let postfix = buildPostfix(s.split(''));
    console.log(postfix);
    let valueStack = [];

    const isOperator = (char) => "+-/*".includes(char);

    for(let i=0; i < postfix.length; i++) {

        if(isOperator(postfix[i])) {
            let rightNode = valueStack.pop();
            let leftNode = valueStack.pop();

            let opNode = new Node();
            opNode.val = postfix[i];
            opNode.left = leftNode;
            opNode.right = rightNode;

            valueStack.push(opNode);
        } else{
            let node = new Node();
            node.val = postfix[i];
            valueStack.push(node);
        }
        console.log(valueStack);
    }

    return valueStack.pop();

};
