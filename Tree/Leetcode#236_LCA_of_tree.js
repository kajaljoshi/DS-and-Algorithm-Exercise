/**
 * Definition for a binary tree node.
 * function TreeNode(val) {
 *     this.val = val;
 *     this.left = this.right = null;
 * }
 */
/**
 * @param {TreeNode} root
 * @param {TreeNode} p
 * @param {TreeNode} q
 * @return {TreeNode}
 */
var lowestCommonAncestor = function(root, p, q) {
    
    let lca = null;

    const traverse = (node) => {

        if(lca !== null) {
            // common ancestorfound; stop traverse
            return [];
        }
        if(node === null) {
            return [];
        }

        let found = [false, false]
        if(node.val === p.val) {
            found[0] = true;
        }

        if(node.val === q.val) {
            found[1] = true;
        }

        let left = node?.left ? traverse(node.left) : [];
        let right = node?.right ? traverse(node.right) : [];

        let found1 =  found[0] || !!left[0] || !!right[0];
        let found2 =  found[1] || !!left[1] || !!right[1];
        
        if(found1 && found2 && lca == null) {
            lca = node;
        }

        return [found1, found2];
    }

    traverse(root);
    return lca;    

};