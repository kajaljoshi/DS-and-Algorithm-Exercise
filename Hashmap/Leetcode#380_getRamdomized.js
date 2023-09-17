

var RandomizedSet = function() {
    
    this.counter = 0;
    this.valueHash = new Map();
    this.counterHash = new Map();
};

/** 
 * @param {number} val
 * @return {boolean}
 */
RandomizedSet.prototype.insert = function(val) {
    
    if(this.valueHash.has(val)) {
        return false;
    }
    
    this.valueHash.set(val, this.counter);
    this.counterHash.set(this.counter, val);
    this.counter++;
    return true;
};

/** 
 * @param {number} val
 * @return {boolean}
 */
RandomizedSet.prototype.remove = function(val) {
    
    if(!this.valueHash.has(val)) {
        return false;
    }

    if(this.counter > 1) {
        let replaceCounterVal = this.valueHash.get(val);
        let replaceVal = this.counterHash.get(this.counter - 1);
        this.counterHash.set(replaceCounterVal, replaceVal);
        this.valueHash.set(replaceVal,replaceCounterVal);
    }
    
    this.counterHash.delete(this.counter -1);
    this.valueHash.delete(val);
    this.counter--;
    return true;
    
};

/**
 * @return {number}
 */
RandomizedSet.prototype.getRandom = function() {
    
    let randomIndex = Math.floor(Math.random() * this.counter);
    return this.counterHash.get(randomIndex);
};

/** 
 * Your RandomizedSet object will be instantiated and called as such:
 * var obj = new RandomizedSet()
 * var param_1 = obj.insert(val)
 * var param_2 = obj.remove(val)
 * var param_3 = obj.getRandom()
 */