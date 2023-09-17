/**
 * @param {number} num
 * @return {string}
 */
var intToRoman = function(num) {

    let romanMap = {
      1 : 'I',
      5 : 'V',
      10: 'X',
      50: 'L',
      100: 'C',
      500: 'D',
      1000 : 'M',
      4: 'IV',
      9: 'IX',
      40: 'XL',
      90: 'XC',
      400: 'CD',
      900: 'CM'
    };


    let digitArr = new Array(7).fill(0);
    let dividerArr = [1,5,10,50,100,500,1000];

    let remNum = num;
    for(let index=dividerArr.length - 1; index >=0;index--) {
      digitArr[index] = Math.floor(remNum/dividerArr[index]);
      remNum = remNum%dividerArr[index];
    }
    
    let romanNumStack = [];
    for(let index=digitArr.length - 1; index >=0;index--) {
      if(digitArr[index] > 0){
        let romanNumEq = dividerArr[index];
        if([1,10,100].includes(romanNumEq) && digitArr[index] == 4) {
          if(digitArr[index + 1] == 1) {
            romanNumStack[romanNumStack.length - 1] = romanMap[4*romanNumEq + dividerArr[index + 1]];
          } else {
            romanNumStack.push(romanMap[4*romanNumEq]);
          }
        } else {
          let rNum = romanMap[romanNumEq].repeat(digitArr[index]);
          romanNumStack.push(rNum);
        }
      }
    }

    return romanNumStack.join('');

};