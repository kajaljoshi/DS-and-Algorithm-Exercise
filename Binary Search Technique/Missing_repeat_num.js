// Problem:
// You are given a read only array of n integers from 1 to n.
// Each integer appears exactly once except A which appears twice and B which is missing.
// Return A and B.
// Note: Your algorithm should have a linear runtime complexity. Could you implement it without using extra memory?
// Note that in your output A should precede B.
// Example:
// Input:[3 1 2 5 3] 
// Output:[3, 4] 

module.exports = { 
    //param A : array of integers
    //return a array of integers
       repeatedNumber : function(nums){
        
           let start = 0;
           let end = nums.length - 1;
           let duplicate =-1; 
   
           while(start <= end) {
               let midNum = start + Math.floor((end - start)/2);
               let count = nums.reduce((count, num) => num <= midNum ? count + 1 :count, 0);
               if(count <= midNum){
                   //duplicate number is part of [mindNum , end] range
                   start = midNum + 1;
               } else {
                   //duplicate number is part of [start , midNum] range
                   duplicate = midNum;
                   end = midNum - 1; 
               }
           }
           
           let sumOfN = Math.floor((nums*(nums + 1))/2);
           let sumOfNums = nums.reduce((sum, num) => sum +num, 0) - duplicate;
           let missing = sumOfN - sumOfNums;
           
           return [duplicate, missing];
           
       }
   };
   