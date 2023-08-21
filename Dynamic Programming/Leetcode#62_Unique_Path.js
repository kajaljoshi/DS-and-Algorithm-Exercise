/**
 * @param {number} m
 * @param {number} n
 * @return {number}
 */
var uniquePaths = function(m, n) {
    

    let memoPathWays = new Array(m).fill(0).map(() => new Array(n).fill(1));
    
    for(let i = 1 ; i < m; i++) {
        for(let j = 1; j < n;j++) {
            memoPathWays[i][j] = memoPathWays[i - 1][j] + memoPathWays[i][j - 1];
        }
    }

    return memoPathWays[m-1][n-1];

};