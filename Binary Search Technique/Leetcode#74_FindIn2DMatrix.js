/**
 * @param {number[][]} matrix
 * @param {number} target
 * @return {boolean}
 */

// Improved Algo:
// Consider sorted matrixas sorted array itself
// now once you find index imagining sorted array
// corresponding row :
// row = selectedIndex / n => n is col number here
// col = selectedIndex % n
// now apply BST

var searchMatrix = function(matrix, target) {

    let lastCol = matrix[0].length - 1;
    let lastRow = matrix.length - 1;
    if(target < matrix[0][0] || target > matrix[lastRow][lastCol]) {
        return false;
    }
    
    let start = 0;
    let end = matrix.length- 1;

    // Find nearest range of row for target
    while(start <= end) {
        let midRow = start + Math.floor((end - start)/2);

        let max = matrix[midRow][lastCol];
        let min = matrix[midRow][0];
        if(target > max) {
            start = midRow + 1;
        } else {
            if(target >= min){
                start = midRow;
                break;
            } else {
                end = midRow - 1;
            }
        }
    }

    // row in which we shuld search is captured in start
    let row = start;
    start = 0;
    end = matrix[row].length - 1;
    let found = false;
    while(start <= end) {
        let midCol = start + Math.floor((end - start)/2);

        if(matrix[row][midCol] === target){
            found = true;
            break;
        }

        if(target > matrix[row][midCol]){
            start = midCol + 1;
        } else {
            end = midCol - 1;
        }
    }

    return found;

};