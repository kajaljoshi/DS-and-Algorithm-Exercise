/**
 * @param {number[]} prices
 * @return {number}
 */
// Algo :
// max profit = max sell price -  min buy price in past 
// calculate maxProfit[i] = price[i] - Min value from[0, i-1];
// we keep the track of min value at each point
// traverse the array and calculate max profile on each price and return max profit 
var maxProfit = function(prices) {
    
    let min = prices[0];
    let maxProfit = 0;
    
    for(let currPrice of prices) {
        min = Math.min(min, currPrice);
        maxProfit = Math.max(maxProfit, (currPrice - min));
    }

    return maxProfit;
};