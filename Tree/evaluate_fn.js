const isOperator = (char) => "+-*/".includes(char);

function buildPostFixExpr (expression, value) {
    let precedence = {
        '*' : 1,
        '/' : 1,
        '+' : 0,
        '-' : 0
    }
    let postFix= [];
    let opStack  = [];
     
    const addToOpStack = (op) => {
        while(opStack.length > 0 && precedence[op] < precedence[opStack[opStack.length -1]]){
            let stackOp = opStack.pop();
            postFix.push(stackOp);
        }
        opStack.push(op);
    }

    let currentNumber = '';
    for(let i = 0; i < expression.length;i++){
        if(isFinite(expression[i])) {
            currentNumber += expression[i];
            if(!isFinite(expression[i + 1])) {
                postFix.push(Number(currentNumber));
                currentNumber = '';
            }
        } else if(expression[i] === 'x') {
            postFix.push(value);
            addToOpStack('*');
        } else if(expression[i].charCodeAt(0) === 178) {
            postFix.push(value);
            addToOpStack('*');
        } else if(isOperator(expression[i])) {
            addToOpStack(expression[i]);
        }

    }

    while(opStack.length > 0){
        postFix.push(opStack.pop());
    }

    return postFix;
}

function evaluateFunc(func, value) {
    let expr = func.split('=')[1];
    let exprArr = expr.split('');
    let postfixExp = buildPostFixExpr(exprArr, value);
    let evalStack = [];

    const calculate = (op1,op2,opertor) => {
        let result = 0;
        switch(opertor) {
            case '+' : {
                result = op1 + op2;
                break;
            }
            case '-' : {
                result = op1 - op2;
                break;
            }
            case '*' : {
                result = op1 * op2;
                break;
            }
            case '/' : {
                result = op1 / op2;
                break;
            }
            default : {
                result = 0;
            } 
        }
        return result;
    }

    while(postfixExp.length > 0) {
        let val = postfixExp.shift();

        if(isFinite(val)) {
            evalStack.push(Number(val));
        } else if(isOperator(val)) {
            let rightOp = evalStack.pop();
            let leftOp = evalStack.pop() || 0;

            let calcVal = calculate(leftOp, rightOp, val);
            evalStack.push(calcVal);
        }
    }
    return evalStack.pop();
}

let funcEval = "g(x)=2x²";
let xValue = 5;

console.log(evaluateFunc(funcEval, xValue));