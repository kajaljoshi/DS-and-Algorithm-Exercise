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
 * @return {TreeNode}
 */
var invertTree = function(root) {

    if(!root) {
        return null;
    }

    let invertRoot = root;
    const invertNode = (node) => {
        if(!node.left && !node.right) {
            return node;
        }

        let leftNode = node.left;
        node.left = node.right ? invertNode(node.right) : null;
        node.right = leftNode ? invertNode(leftNode) : null;

        return node;
    }

    return invertNode(invertRoot);
    
};