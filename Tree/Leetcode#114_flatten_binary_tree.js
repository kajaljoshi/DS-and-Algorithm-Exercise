/**
 * Definition for a binary tree node.
 * function TreeNode(val, left, right) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.left = (left===undefined ? null : left)
 *     this.right = (right===undefined ? null : right)
 * }
 */
/**
 * @param {TreeNode} root
 * @return {void} Do not return anything, modify root in-place instead.
 */
var flatten = function(root) {

    if(root == null) {
        return null;
    }

    let treeProcessStack  = [root];
    let endOfList = null;
    
    while(treeProcessStack.length > 0) {
        let nextNode = treeProcessStack.pop();
        if(!!nextNode.right) {
            treeProcessStack.push(nextNode.right);
        }
        if(!!nextNode.left) {
            treeProcessStack.push(nextNode.left);
        }

        nextNode.left = null;
        if(!!endOfList) {
            endOfList.right = nextNode;
        }
        endOfList = nextNode;
    }

    return root;
};