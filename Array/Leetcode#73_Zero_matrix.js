/**
 * @param {number[][]} matrix
 * @return {void} Do not return anything, modify matrix in-place instead.
 */
// Algo:
// iterate throught matrix
// when found zero mark rowStart & colStart with X
// Iterate through col 1 to n; when found X = replace whole col with zero
// Iterate through row 1 to n; when found X = replace whole col with zero
// If [0][0] element ismarked x = replace row[0] and col[0] with zero

var setZeroes = function(matrix) {
    
    let firstColMarked = false;

    for(let row = 0; row < matrix.length; row++) {
      for(let col= 0; col < matrix[0].length; col++) {
        if(matrix[row][col] === 0) {
          matrix[row][0] = "X";
          col == 0 ? firstColMarked = true : matrix[0][col] = "X";
        }
      }
    }

    for(let row = matrix.length - 1; row >= 0 ;row--) {
      for(let col = matrix[row].length - 1; col > 0 ; col--) {
        if(matrix[row][0] == "X" || matrix[0][col] == "X") {
            matrix[row][col] = 0;
        }
      }
    }

    for(let row = 0; row < matrix.length; row++) {
      matrix[row][0] = firstColMarked || matrix[row][0] == "X" ? 0 :  matrix[row][0];
    }
};