/**
 * @param {number} n
 * @param {number[][]} edges
 * @return {number}
 */
var countComponents = function(n, edges) {
    
    let parent = Array(n).fill(-1);
    let size = Array(n).fill(1);
    let count = n;

    for(let [x,y] of edges){
        let parent1 = findRoot(x);
        let parent2 = findRoot(y);
        if(parent1 !== parent2){
            union(parent1, parent2);
            count--;
        }
    }

    function findRoot(vertex){
        while(parent[vertex] !== -1){
            vertex = parent[vertex];
        }
        return vertex;
    }

    function union(p1,p2) {
        // always merge smaller component into bigger one,to keep height of total component min 
        if(size[p1] >= size[p2]){
            parent[p2] = p1;
            size[p1] += size[p2];
        } else {
            parent[p1] = p2;
            size[p2] += size[p1];
        }
    }
        
    return count;
};