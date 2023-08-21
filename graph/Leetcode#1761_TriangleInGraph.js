// #Approach 1 : Find triangle uisng 3 for loops

var minTrioDegree = function(n, edges) {
    // create an adjacency list of all the edges;
    const adjacencyList = new Array(n + 1).fill(0).map(() => new Set());
    for (const [x, y] of edges) {
        adjacencyList[x].add(y);
        adjacencyList[y].add(x);
    }
    
    let minimumDegree = Infinity;
    
    // Find all the combinations of 3 vertices that connect
    // and if they connect calculate the degree
    for (let i = 1; i <= n; i++) {
        for (let j = i + 1; j <= n; j++) {
            for (let k = j + 1; k <= n; k++) {
                if (adjacencyList[i].has(j) && adjacencyList[i].has(k) && adjacencyList[j].has(k)) {
                    // We minus 6 because we have 3 vertices and each vertices has 2 edges 
                    // going out to the 3 connecting nodes
                    const degree = adjacencyList[i].size + adjacencyList[j].size + adjacencyList[k].size - 6;
                    minimumDegree = 
                        Math.min(minimumDegree, degree);
                }
            }
        }
    }
    
    return minimumDegree === Infinity ? -1 : minimumDegree;
};


// #Approach 2 : Trio with BFS
// 1. Make adj list of vertices
// 2. start BFS travel of vertices by keeping track of entry time (steps basically)
// 3. when processing every edge, there are 4 cases
//   3.1 Case 1 : if we found that vertex is already discovered and entryStep of both vertex is same, and parent of both vertex is same then we have found triangle
//   3.2 Case 2 : if vertex is already found & both are on same level & both share edge from any of the higher level vertices (same potential parents)
//   3.3 Case 3 : if vertex is already found & both are on same level & both share edge from any of the lower level vertices (same child)
//   3.4 Case 4 : if vertex is already found & both are on same level & both share edge with oneof their siblings
//   3.5 calculate degree of current trio by checking number of total edges from vertex - trio edges
//   3.6 always store minDegree
// 4. return minDegree

// Code
/**
 * @param {number} n
 * @param {number[][]} edges
 * @return {number}
 */
var minTrioDegree = function(n, edges) {

    let adjList = Array(n+1).fill(0).map(() => new Set());
    let discovered = Array(n+1).fill(false);
    let processed = Array(n+1).fill(false);
    let entryStep = Array(n+1).fill(0);
    let parent = Array(n+1).fill(0);
    let potParents = Array(n+1).fill(0).map(() => new Set());

    let minDegree = edges.length;
    let trioFound = false;

    for(const [x,y] of edges) {
        adjList[x].add(y);
        adjList[y].add(x)
    }
    
    for(let i = 1; i <= n; i++){
        if(!processed[i]){
            BFS(i, 1);
        }
    }

    function BFS(vertex){
        let vQueue = [vertex];
        discovered[vertex] = true;
        entryStep[vertex] = 1;
        
        while(vQueue.length > 0){
            let v = vQueue.shift();
            
            for(let child of adjList[v]){
                if(!discovered[child]) {
                    // tree edge
                    discovered[child] = true;
                    parent[child] = v;
                    entryStep[child] = entryStep[v] + 1;
                    potParents[child].add(v);
                    vQueue.push(child);
                } else if(!processed[child]) {
                    // cross edge or forward edge (refered to child node of other parent)
                    process_edge(child, v);
                }
            }
            processed[v] = true;
        }
        return;
    }

    function process_edge(child,partner){
        if(entryStep[partner] < entryStep[child]){
            potParents[child].add(partner);
        }

        if(entryStep[child] === entryStep[partner]){
            if(parent[child] === parent[partner]) {
                // case 1 : cross edge : we have found trio
                processTrio(child, partner, parent[partner]);
                trioFound = true;
            }

            for(let v1 of potParents[child]){
                if(potParents[partner].has(v1)){
                    // case 2 
                    processTrio(child, partner, v1);
                    trioFound = true;
                }
            }

            // find all other siblings on same level
            let siblings = [];
            for(let i = 0; i < entryStep.length; i++){
                if(entryStep[i] === entryStep[child] && i !== child && i !== partner){
                    siblings.push(i);
                }
            }

            for(let j = 0;j < siblings.length; j++){
                // case 4
                if(adjList[child].has(siblings[j]) && adjList[partner].has(siblings[j])){
                    processTrio(child, partner, siblings[j]);
                    trioFound = true;
                }
            }
        }

        // if node points to same child & if there is cross edge between 2 nodes, it's trio
        if(entryStep[parent[child]] === entryStep[partner]) {
            // case 3
            if(adjList[partner].has(parent[child])){
                processTrio(child, partner, parent[child]);
                trioFound = true;
            }

            // check in any of the potential parents has cross edge with partner
            for(let p1 of potParents[child]){
                 if(adjList[partner].has(p1)){
                    processTrio(child, partner, p1);
                    trioFound = true;
                 }
            }
        }
    }

    function processTrio(v1, v2, v3){
        let trio = [v1,v2,v3].sort();
        let degree = 0;

        // calculate non-trio edges number
        let nonTrioEdgeNum = adjList[trio[0]].size + adjList[trio[1]].size + adjList[trio[2]].size;

        // it's undirected graph,so if v1 is in adj list of v2,then v2 also willbe in adjliston v1
        // but both represent same edge
        // so trio edges are represented in 6 ways in adjList.
        degree = nonTrioEdgeNum - 6;
        minDegree = Math.min(minDegree, degree);    
    }

    return trioFound ? minDegree : -1;

};