
function evaluateFunc(func, value) {
    let coords = ['', '', '']; //[a,b,c]
    

    const isSymbol = (char) => {
        return "+-".includes(char);
    }

    const findCords = (expArr) => {
        let ci = 2;
          
        for(let i = expArr.length - 1; i >= 0; i--) {
            if(!isNaN(expArr[i])){
                coords[ci] = expArr[i] + '' + coords[ci];
            } else if(isSymbol(expArr[i])) {
                coords[ci] = expArr[i] === "-" ? Number(-coords[ci]) : coords[ci];
            } else {
                ci = ci > 0 ? ci - 1: ci;
                if(expArr[i].charCodeAt(0) === 178){
                    ci = 0;
                }
            }
        }
    }

    let fn = func.split("=");
    findCords(fn[1].split(''));
    let [a,b,c] = coords.map((num) => Number(num));
    return a*(value*value)+(b*value)+c;
}

let funcEval = "g(x)=2x²+4x-1";
let xValue = 5;

console.log(evaluateFunc(funcEval, xValue));