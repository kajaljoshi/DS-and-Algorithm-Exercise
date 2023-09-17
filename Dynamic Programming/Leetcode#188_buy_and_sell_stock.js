/**
 * @param {number} k
 * @param {number[]} prices
 * @return {number}
 */

var maxProfit = function(k, prices) {

    let memoTrade = new Map();

    function findTrade(k, startIndex) {
      if(k == 0 || startIndex === prices.length - 1) {
        return 0;
      }

      if(memoTrade.has(k+"|"+startIndex)) {
        return memoTrade.get(k+"|"+startIndex)
      }

      let minPrice = prices[startIndex];
      let maxProfit = 0;
      for(let index = startIndex; index < prices.length;index++) {
        if(prices[index] <= minPrice) {
          minPrice = prices[index];
        }  else {
          let profit = prices[index] - minPrice;
          potSellPrice = prices[index];
          if(k - 1 > 0 && index + 1 < prices.length) {
            profit += findTrade(k-1, index + 1);
          }
          maxProfit = Math.max(profit, maxProfit);
        }
      }

      memoTrade.set(k+"|"+startIndex, maxProfit);
      return maxProfit;
    }

    return findTrade(k, 0);

};