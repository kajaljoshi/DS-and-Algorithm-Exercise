/*
        Algorithm :
        1. consider first value of preOrder = root
        2. Find index of that root in inorder
        3. all the value on the left side = left tree of that root
        4. all the values on the right side = right tree of that root 
        5. slice the arrays and continue process till we build whole tree
        
        Can follow same logic if we have given postorder and inorder traversal Or preorder and postorder traversal
*/

/**
 * Definition for a binary tree node.
 * function TreeNode(val, left, right) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.left = (left===undefined ? null : left)
 *     this.right = (right===undefined ? null : right)
 * }
 */
/**
 * @param {number[]} preorder
 * @param {number[]} inorder
 * @return {TreeNode}
 */
var buildTree = function(preorder, inorder) {

    if(preorder.length == 1 || inorder.length == 1){
        return {
            val : preorder[0],
            left: null,
            right: null
        };
    }

    let root = {
        val : preorder[0],
        left: null,
        right: null
    }

    let posRoot = 0;
    for(let i = 0; i< inorder.length; i++) {
        if(inorder[i] === root.val){
            posRoot = i;
            break;
        }
    }
    
    let leftTree = inorder.slice(0, posRoot);
    let leftTreeLen = leftTree.length;
    if(leftTreeLen > 0){
        root.left = buildTree(preorder.slice(1, leftTreeLen + 1), leftTree);
    }
    let rightTree = inorder.slice(posRoot + 1);
    if(rightTree.length > 0) {
        root.right = buildTree(preorder.slice(leftTreeLen + 1), rightTree);
    }

    return root;

};