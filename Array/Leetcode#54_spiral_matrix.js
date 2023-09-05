/**
 * @param {number[][]} matrix
 * @return {number[]}
 */
// Algo :
// right -> down -> left -> up
// Circle till you reach the starting element
// 1. start with rowStart to midRow
//  1.1 start with colStart = rowNum && colEnd = TotalRows - rowNum
//  1.2 rowEnd = TotalRows - rowNum
//  1.3 change the direction as soon as reach colEnd / rowEnd

var spiralOrder = function(matrix) {
    
    let spiralRead = [];
    let midRow = Math.floor(matrix.length / 2);    
    
    const readRight = (row,colStart, colEnd ,matrix) => {
        let arr = [];
        for(let i = colStart; i <= colEnd; i++) {
            arr.push(matrix[row][i]);
        }
        return arr;
    }

    const readLeft = (row,colStart, colEnd ,matrix) => {
        let arr = [];
        for(let i = colEnd; i >= colStart; i--) {
            arr.push(matrix[row][i]);
        }
        return arr;
    }

    const readDown = (col,rowStart, rowEnd ,matrix) => {
        let arr = [];
        for(let i = rowStart; i <= rowEnd; i++) {
            arr.push(matrix[i][col]);
        }
        return arr;
    }

    const readUp = (col,rowStart, rowEnd ,matrix) => {
        let arr = [];
        for(let i = rowEnd; i >= rowStart; i--) {
            arr.push(matrix[i][col]);
        }
        return arr;
    }


    let totalRowIndex = matrix.length - 1;
    let totalColIndex = matrix[0].length - 1;
    for(let row = 0; row <= midRow; row++) {
        if(spiralRead.length === matrix.length * matrix[0].length) {
            break;
        }
        let colStart = row;
        let colEnd = totalColIndex - row;
        let rowEnd = totalRowIndex - row;
        spiralRead = [...spiralRead,...readRight(row, colStart, colEnd, matrix)];
        spiralRead = [...spiralRead,...readDown(colEnd, row + 1, rowEnd, matrix)];
        if(row < rowEnd) {
            spiralRead = [...spiralRead,...readLeft(rowEnd, colStart, colEnd - 1, matrix)];
        }
        if(colStart < colEnd) {
            spiralRead = [...spiralRead,...readUp(colStart, row + 1, rowEnd - 1, matrix)];
        }
    }

    return spiralRead;

};