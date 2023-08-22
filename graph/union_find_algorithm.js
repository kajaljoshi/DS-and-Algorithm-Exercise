// Algorithm :
// Maintain map which keeps track of parent of given vertex
// Find(x) : used to find root of tree which contains vertex x;
// union (root1,root2) : merge 2 trees by connection 2 roots
        // 1. always keep track of size of any tree
        // 2. while merging the tree, merge smaller size tree into bigger one
        // 3. this will keep merging tree height min, so easy to find root next time as less levels in tree


class UnionFind {
    constructor(size) {
        this.parentMap  = new Array(size).fill(-1);
        this.sizeMap = new Array(size).fill(1);
    }

    findParent(vertex) {
        let node = vertex;
        while(this.parentMap[node] !== -1){
            node = this.parentMap[node];
        }

        return node;
    }

    union(node1,node2) {
        let treeLength = 0;
        if(this.sizeMap[node1] >= this.sizeMap[node2]) {
            this.parentMap[node2] = node1;
            this.sizeMap[node1] += this.sizeMap[node2];
            treeLength = this.sizeMap[node1];
        } else {
            this.parentMap[node1] = node2;
            this.sizeMap[node2] += this.sizeMap[node1];
            treeLength = this.sizeMap[node2];
        }

        return treeLength;
    }
}