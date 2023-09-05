/**
 * @param {number[][]} grid
 * @return {number}
 */
var minPathSum = function(grid) {
    
    let minSum = [...grid];

    for(let row = 0; row < grid.length; row++) {
        for(let col= 0; col < grid[row].length; col++) {
            if(row == 0 && col == 0){
                continue;
            }
            
            let leftSumVal = col > 0 ? minSum[row][col-1] : Infinity;
            let topSumVal = row > 0 ?  minSum[row - 1][col] : Infinity
            minSum[row][col] = grid[row][col] + Math.min(leftSumVal, topSumVal);
        }
    }

    return minSum[grid.length - 1][grid[0].length - 1];

};