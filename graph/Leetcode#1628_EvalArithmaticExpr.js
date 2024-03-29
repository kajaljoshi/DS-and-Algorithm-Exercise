/**
 * This is the interface for the expression tree Node.
 * You should not remove it, and you can define some classes to implement it.
 */

var Node = function () {

    this.root = null;
    this.constructNode = function (val, left = null, right = null) {
        return {
            val : val,
            left : left,
            right: right
        }
    }
  
  
  };
  
  Node.prototype.evaluate = function () {
    
      function evalExp(leftVal, rightVal, exp){
        let val = 0;
        switch(exp){
          case '*' :
            val = leftVal * rightVal;
            break;
          case '+' :
            val = leftVal + rightVal;
            break;
          case '/' :
            val = leftVal / rightVal;
            break;
          case '-' :
            val = leftVal - rightVal;
        }
        return val;
      }
      
      function evalTree(node) {
         if(node && !isNaN(node.val)) {
            return Number(node.val);
         }
  
         let leftVal = evalTree(node.left);
         let rightVal = evalTree(node.right);
  
         return evalExp(leftVal, rightVal, node.val);
      }
  
      return evalTree(this.root);
  
  };
  
  /**
   * This is the TreeBuilder class.
   * You can treat it as the driver code that takes the postinfix input 
   * and returns the expression tree represnting it as a Node.
   */
  
  class TreeBuilder{
      /**
       * @param {string[]} s
       * @return {Node}
       */
      buildTree(postfix) {
          let nodeStack = [];
          let tree = new Node();
          for(let i = 0; i < postfix.length; i++){
              if(isNaN(postfix[i])){
                  // true if value is not a number - means expression
                  //  pop 2 values from stack n add values to tree
                  let rightNode = nodeStack.pop();
                  let leftNode = nodeStack.pop();
                  let node = tree.constructNode(postfix[i],leftNode,rightNode);
                  nodeStack.push(node); // push value again as it will be child node of parent expression
              } else {
                  // push value in stack in tree node form 
                  let node = tree.constructNode(postfix[i],null,null);
                  nodeStack.push(node);
              }
          }
          tree.root = nodeStack.pop(); //last node will be root in stack
          return tree;
      }
      
  }
  
  /**
   * Your TreeBuilder object will be instantiated and called as such:
   * var obj = new TreeBuilder();
   * var expTree = obj.buildTree(postfix);
   * var ans = expTree.evaluate();
   */