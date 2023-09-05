/**
 * Definition for singly-linked list.
 * function ListNode(val, next) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.next = (next===undefined ? null : next)
 * }
 */
/**
 * @param {ListNode} l1
 * @param {ListNode} l2
 * @return {ListNode}
 */
var addTwoNumbers = function(l1, l2) {
    
    let sumRootNode = new ListNode(0, null);

    let sumPointer = sumRootNode;
    let carry = 0;
    while(l1 !== null || l2 !== null) {
        let value = carry;
        value += l1 ? l1.val : 0;
        value += l2 ? l2.val : 0;
        carry = 0;
        if(value > 9){
            carry = Math.trunc(value/10);
            value = value%10;
        }
        sumPointer.next = new ListNode(value, null);
        sumPointer = sumPointer.next;
        l1 = l1 ? l1.next : null;
        l2 = l2 ? l2.next : null;
    }

    if(carry !== 0){
        sumPointer.next = new ListNode(carry, null);
    }

    return sumRootNode.next;

};