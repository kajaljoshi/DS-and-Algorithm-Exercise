/**
 * @param {number} numCourses
 * @param {number[][]} prerequisites
 * @return {number[]}
 */

function buildGraph(vertexNum, edges){
    let list = Array(vertexNum).fill(0).map(() => []);

    for(let [x,y] of edges){
        list[x].push(y);
    }

    return list;
}

var findOrder = function(numCourses, prerequisites) {

    /**
        Algo : topological sorting
    */
    
    let adjList = buildGraph(numCourses, prerequisites);
    let courseOrder = [];
    let cycleFound = false;

    let discovered = Array(numCourses).fill(false);
    let processed = Array(numCourses).fill(false);
    let rank = Array(numCourses).fill(numCourses);


    function buildRelation(vertex) {
        for(let next of adjList[vertex]){
            if(cycleFound){
                return;
            }
            if(!discovered[next]){
                discovered[next] = true;
                rank[next] = rank[vertex] + 1;

                buildRelation(next);
            } else if(!processed[next]) {
                if(rank[next] < rank[vertex]){
                    //cycle found, not possible to finish all courses
                    cycleFound = true;
                }
            }
        }
        processed[vertex] = true;
        courseOrder.push(vertex);
    }

    for(let i = 0; i < numCourses; i++){
        if(cycleFound) {
            return [];
        }
        if(!processed[i]){
            discovered[i] = true;
            rank[i] = 0;
            buildRelation(i);
        }
    }

    return courseOrder;
};