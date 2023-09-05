/**
 * @param {string[][]} equations
 * @param {number[]} values
 * @param {string[][]} queries
 * @return {number[]}
 */
var calcEquation = function(equations, values, queries) {
    
    let relationGraph = new Map();
    let index = 0;
    for(let [eq1, eq2] of equations) {
        let val = values[index];

        let eq1Rel = relationGraph.has(eq1) ? relationGraph.get(eq1) : new Map();
        eq1Rel.set(eq2, val);
        relationGraph.set(eq1, eq1Rel);

        let eq2Rel = relationGraph.has(eq2) ? relationGraph.get(eq2) : new Map();
        eq2Rel.set(eq1, 1/val);
        relationGraph.set(eq2, eq2Rel);

        index++;
    }

    let visited = new Map();
    const findPath = (source, destination) =>{
        
        let connectedNodeGraph = relationGraph.get(source);
        
        if(connectedNodeGraph.has(destination)) {
            return connectedNodeGraph.get(destination);
        }

        let totalWeight = -1.0000;
        visited.set(source, true);
        for(let [s, w] of connectedNodeGraph.entries()) {
            if(!visited.has(s)){
                let pathWeight = findPath(s, destination);
                if(pathWeight > -1) {
                    totalWeight = w * pathWeight;
                    break;
                }
            }
        }
        return totalWeight;
    }

    let result = [];
    index = 0;
    for(let [q1, q2] of queries) {
        visited.clear();
        if(!relationGraph.has(q1) || !relationGraph.has(q2)){
            result[index] = -1.00000;
            index++;
            continue;
        }

        if(q1 == q2) {
            result[index] = 1.00000;
            index++;
            continue;
        }

        result[index] = findPath(q1, q2);
        index++;
    }

    return result;
};