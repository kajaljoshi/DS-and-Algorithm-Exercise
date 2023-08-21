/**
 * @param {number} n
 * @param {number[][]} connections
 * @return {number[][]}
 */
var criticalConnections = function(n, connections) {
    /**
        Idea :  if you find cycle in graph then all edges part of that cycle arenot critical connection
        Algorithm :
        1. Create Adjecency List from connection array
        2. start DFS traversal
            2.1 maintain rank of node (bascially level in tree), 
                         lowest rank reachable from current node (rank of ancestor)
            2.2 if child node can reach higher ancestor than parent, cycle found in tree
                than current parent -> child edge is not critical  
            2.3 maintain lowest rank of current node and it's parent as well.  
    */
    
    let adjList = Array(n).fill().map(() => []);
    let criticalConnections = [];

    for(let [x,y] of connections){
        adjList[x].push(y);
        adjList[y].push(x);
    }

    let rank = Array(n).fill(0);  // level of given vertex in DFS tree
    let discovered = Array(n).fill(false); // vertex is discovered in DFS tree 
    let processed = Array(n).fill(false); // vertex is processed in DFS tree
    let low = Array(n).fill(n); // lowest level of rank reachable in DFS tree

    function DFS(vertex, parent) {
        
        for(let child of adjList[vertex]){

            // same edge as it is undirected graph
            if(child === parent){
                continue;
            }

            if(!discovered[child]){
                discovered[child] = true;
                rank[child] = rank[vertex] + 1;
                low[child] = rank[child];
                DFS(child, vertex);
                
                if(low[child] > rank[vertex]){
                    //child was not able to reach any of ancestor
                    criticalConnections.push([vertex,child]);
                } else {
                    //update lowest reachable ancestor from current node
                    low[vertex] = Math.min(low[vertex], low[child]);
                }
            } else if(!processed[child]){
                // cycle found in graph
                if(rank[child] < rank[vertex]){
                    //edge is between ancestor and current node, it's cycle
                    low[vertex] = Math.min(low[vertex], low[child]);
                }  
            }
        }
        processed[vertex] = true;
    }

    discovered[0] = true;
    low[0] = 0;
    DFS(0,0);

    return criticalConnections;

};