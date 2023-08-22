/**
 * @param {number} n
 * @param {number[][]} connections
 * @return {number}
 */
// Example 1:
// Input: n = 3, connections = [[1,2,5],[1,3,6],[2,3,1]]
// Output: 6
// Explanation: Choosing any 2 edges will connect all cities so we choose the minimum 2.

//Algorithm : Kruskal's Algorithm for MST
// 1. sort the edges according to weight
// 2. peek the min weigth edge
    //   2.1 check whether both vertices are part of MST or same connected component
    //   2.2  if yes,then do not add that edge as it will create cycle in MST
    //   2.2  else, consider edge as part of MST, merge components containing both vertices
    //   2.3 continue till all edges have been considered or all vertices are part of one component

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

var minimumCost = function(n, connections) {
    
    let vertexCount = 1;
    let totalCost = 0;
    
    let unionFindMap = new UnionFind(n +1);
    const edgeCompareFn = (edge1, edge2) => edge1[2] - edge2[2];
    let priorityQueue = connections.sort(edgeCompareFn)

    while(priorityQueue.length > 0 && vertexCount < n) {
        let edge = priorityQueue.shift();
                
        let p1 = unionFindMap.findParent(edge[0]);
        let p2 = unionFindMap.findParent(edge[1]);
        
        if(p1 !== p2){
            let totalNodes = unionFindMap.union(p1, p2);
            totalCost += edge[2];
            vertexCount = Math.max(vertexCount, totalNodes);
        }
    }

    if(vertexCount < n) {
        return -1;
    }

    return totalCost;
};