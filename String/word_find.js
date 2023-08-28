let matrix = ['***',
              '  *',
              '  *',
              '  ***h**',
              '       *',
              '       e',
              '    *o *',
              '    *  l',
              '    *  *',
              '    *l**']

function findWord(matrix)  {

    const canMoveForward = (row,col) => {        
        if(row < 0 || col < 0) {
            return false;
        }

        if(row >= matrix.length || col >= matrix[row].length) {
            return false;
        }

        if(matrix[row][col] !== undefined && matrix[row][col].trim() !== '') {
            return true;
        }
        return false;
    }

    const findNextCell = (row,col) => {
        if(canMoveForward(row ,col+1)){
            return [row, col+ 1];
        } else if(canMoveForward(row + 1, col)){
            return [row + 1, col];
        } else if(canMoveForward(row - 1,col)){
            return [row - 1, col];
        } else if(canMoveForward(row, col - 1)){
            return [row, col - 1];
        } else {
            return null;
        }
    }

    let word = '';
    let row = 0;
    let col = 0;
    let value = matrix[row][col];
    
    while(value !== null) {

        if(value !== "*") {
            word += value;
        }
        // update the value to trap into loop
        let strArr = matrix[row].split('');
        strArr[col] = ' ';
        matrix[row] = strArr.join('');
        
        const nextCell = findNextCell(row, col);
        if(nextCell != null){
            row = nextCell[0];
            col = nextCell[1];
            value = matrix[row][col];
        } else {
            value = null;
        }
    }

    return word;
}

let output = findWord(matrix);
console.log(output);