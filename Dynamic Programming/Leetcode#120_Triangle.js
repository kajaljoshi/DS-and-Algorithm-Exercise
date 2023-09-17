/**
 * @param {number[][]} triangle
 * @return {number}
 */
// Algo :
// loop : from top to bottom row
// maintain sumofprevious rows with all possibilites
// so keep array where nextTriangleSum[col] = Math.min(triangleSum[col] + traingle[row][col], triangleSum[col + 1] + traingle[row][col])
// FinalResult= min value from nextTriangleSum array

var minimumTotal = function(triangle) {

    if(triangle.length == 1) {
        return triangle[0][0];
    }

    let prevRowSum = [...triangle[0]];

    for(let row=1; row < triangle.length; row++) {
        let posRowSum = [triangle[row][0] + prevRowSum[0]];
        for(let col = 1; col < triangle[row].length - 1; col++) {
            posRowSum[col] = triangle[row][col] + Math.min(prevRowSum[col],prevRowSum[col - 1]);
        }
        let lastCol = triangle[row].length - 1;
        posRowSum.push(triangle[row][lastCol] + prevRowSum[lastCol - 1]);
        prevRowSum = [...posRowSum];
    }

    let result = Math.min(...prevRowSum);
    return result;

};