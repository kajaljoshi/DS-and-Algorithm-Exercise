
var MinStack = function() {
    this._stackArr = [];
};

/** 
 * @param {number} val
 * @return {void}
 */
MinStack.prototype.push = function(val) {
    if(this._stackArr.length == 0){
        this._stackArr.push([val, val]);
    } else {
        let min = Math.min(this._stackArr[this._stackArr.length - 1][1], val);
        this._stackArr.push([val, min]);
    }

};

/**
 * @return {void}
 */
MinStack.prototype.pop = function() {
    return this._stackArr.pop()[0];
};

/**
 * @return {number}
 */
MinStack.prototype.top = function() {
    return this._stackArr[this._stackArr.length - 1][0];
};

/**
 * @return {number}
 */
MinStack.prototype.getMin = function() {
    return this._stackArr[this._stackArr.length - 1][1];
};

/** 
 * Your MinStack object will be instantiated and called as such:
 * var obj = new MinStack()
 * obj.push(val)
 * obj.pop()
 * var param_3 = obj.top()
 * var param_4 = obj.getMin()
 */