/**
 * @param {number} n
 * @param {number[][]} edges
 * @param {number} s
 * @param {number[]} marked
 * @return {number}
 */
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


function buildGraph(n,edges) {
    let adjList  = new Array(n).fill(0).map(() => []);

    for(let [x,y,cost] of edges) {
        adjList[x].push([y, cost]);
    }
    return adjList;
}

var minimumDistance = function(n, edges, s, marked) {
    let graph = buildGraph(n +1, edges);
    let distance = new Array(n +1).fill(Infinity);
    let processed = new Array(n +1).fill(false);
    let processedCount = 1;

    const edgeCompareFn = (edge1, edge2) => edge1[1] > edge2[1];
    let priorityQueue = new MyPQ(edgeCompareFn);
    let nextNodeQueue = new MyPQ(edgeCompareFn);

    const addEdgesToPQ = (vertex) => {
        for(let edge of graph[vertex]) {
            priorityQueue.addItem(edge);
        }
    }

    distance[s] = 0;
    nextNodeQueue.addItem([s, distance[s]]);
    
    while(processedCount < n && !nextNodeQueue.isEmpty()) {
        let currentNodeItem = nextNodeQueue.getItem();
        let currentNode = currentNodeItem[0];
        if(processed[currentNode]) {
            continue;
        }

        addEdgesToPQ(currentNode);
        while(!priorityQueue.isEmpty()) {
            let edge = priorityQueue.getItem();
            distance[edge[0]] = Math.min(distance[edge[0]], distance[currentNode] + edge[1]);
            nextNodeQueue.addItem([edge[0], distance[edge[0]]])
        }

        processed[currentNode] = true;
        processedCount++;
    }
    
    let minDistance = Infinity;
    for(let node of marked){
        minDistance = Math.min(minDistance, distance[node]);
    }
    
    return minDistance === Infinity ? -1 : minDistance;

};