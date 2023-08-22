/**
 * @param {number} n
 * @param {number[][]} connections
 * @return {number}
 */

// Example 1:
// Input: n = 3, connections = [[1,2,5],[1,3,6],[2,3,1]]
// Output: 6
// Explanation: Choosing any 2 edges will connect all cities so we choose the minimum 2.

// Algorithm :
// Prim's Algorithm
// 1. Choose any arbitary vertex and consider it part of MST
// 2. Add all edges of that vertex in priorityQueue
// 3. fetch min cost edge from priorityQueue
//     3.1 if edge's second vertx is not part of MST, add it into MST
//     3.2 add cost of edge into totalCost of MST
//     3.3 add all the corresponding edges of that vertex into priorityQueue
//     3.4 repeat this step until all edges are considered orall vertexes are part of MST
// 4. After considering all the edges, if nay vertex is not part of MST    
//     4.1 then graph is not fully connected
// 5. return MST/totalCost

class MyPQ {
    constructor(compareFn) {
        this.compareFn = compareFn;
        this.queue = [];
    }

    addItem(item) {
        let start = 0;
        let end = this.queue.length - 1;

        while(start <= end){
            let mid = start + Math.floor((end - start)/2);
            if(this.compareFn(this.queue[mid], item)) {
                end = mid - 1;
            } else {
                start = mid + 1; 
            }
        }

        this.queue.splice(start, 0,item);

    }

    getItem() {
        return this.queue.shift();
    }

    isEmpty() {
        return this.queue.length === 0;
    }
}

function buildGraph(connections, n) {
    let adjList = new Array(n+1).fill(0).map(() => []);

    for(let [x,y, w] of connections) {
        adjList[x].push([y, w]);
        adjList[y].push([x, w]);
    }

    return adjList;
}

var minimumCost = function(n, connections) {
    
    let graph = buildGraph(connections, n);
    let discovered = new Array(n).fill(false);
    let vertexCount = 1;
    let totalCost = 0;
    
    const edgeCompareFn = (edge1, edge2) => edge1[1] > edge2[1];
    let priorityQueue = new MyPQ(edgeCompareFn);

    const addEdgesToPQ = (vertex) => {
        for(let edge of graph[vertex]) {
            priorityQueue.addItem(edge);
        }
    }

    discovered[1] = true;
    addEdgesToPQ(1);

    while(!priorityQueue.isEmpty() && vertexCount < n) {

        let edge = priorityQueue.getItem();
        if(!discovered[edge[0]]) {
            vertexCount++;
            totalCost += edge[1];
            addEdgesToPQ(edge[0])
            discovered[edge[0]] = true;
        }

    }

    if(vertexCount < n) {
        return -1;
    }

    return totalCost;
    

};