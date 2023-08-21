/**
 * @param {number[][]} intervals
 * @return {number[][]}
 */

// Approach :
 
// 1.Sort array by start of interval
// 2. Loop through sortedArray
//     2.1 if end of prev interval > current intervals's start than merge intervals
//     2.2 else not overlapping interval, so add it to final result
// 3. return result

var merge = function(intervals) {

    if(intervals.length === 1){
        return intervals;
    }

    let minQueue = [];
    let sIntervals = intervals.sort((a,b) =>  a[0] - b[0]);

    const mergeInterval = (interval1, interval2) => {
        return [Math.min(interval1[0], interval2[0]), Math.max(interval1[1], interval2[1])];
    }

    minQueue.push(sIntervals[0]);
    for(let i = 1; i < sIntervals.length; i++){
        if(minQueue[minQueue.length - 1][1] >= sIntervals[i][0]) {
            let newItem = mergeInterval(minQueue.pop(), sIntervals[i]);
            minQueue.push(newItem);   
        } else {
            minQueue.push(sIntervals[i]); 
        }
    
    }

    return minQueue;
    
};