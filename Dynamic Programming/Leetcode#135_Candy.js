/**
 * @param {number[]} ratings
 * @return {number}
 */
var candy = function(ratings) {
    
    let totalNumCandy = 0;
    let prevNeighCandy = 1;
    let descSeqDP = [];

    descSeqDP[ratings.length - 1] = 1;
    for(let i = ratings.length - 2; i >= 0; i--) {
        if(ratings[i] > ratings[i + 1]) {
            descSeqDP[i] = descSeqDP[i + 1] + 1;
        } else  {
            descSeqDP[i] = 1;
        }
    }

    for(let index = 0; index < ratings.length; index++) {
        let prevRank = index == 0 ? Infinity : ratings[index - 1];
        let currRank = ratings[index];
        let allocatedCandy = 1;
        if(currRank > prevRank) {
            allocatedCandy += prevNeighCandy;
        }
        allocatedCandy = Math.max(allocatedCandy, descSeqDP[index]);
        totalNumCandy += allocatedCandy;
        prevNeighCandy = allocatedCandy;
    }

    return totalNumCandy;

};