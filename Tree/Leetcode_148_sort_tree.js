/**
 * Definition for singly-linked list.
 * function ListNode(val, next) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.next = (next===undefined ? null : next)
 * }
 */
/**
 * @param {ListNode} head
 * @return {ListNode}
 */
// merge sort

var sortList = function(head) {

    if(head == null) {
        return head;
    }

    const divideAndMerge = (listHead) => {
        
        if(listHead.next == null) {
            return listHead;
        }

        let slowPointer = null;
        let fastPointer = listHead;

        while(fastPointer !== null && fastPointer.next !== null) {
            slowPointer = !slowPointer ? listHead : slowPointer.next;
            fastPointer = fastPointer.next.next;
        }
        let rightHead = slowPointer.next;
        slowPointer.next = null;
        
        let leftSortedHead = divideAndMerge(listHead);
        let rightSortedHead = divideAndMerge(rightHead);
                
        let headPointer = new ListNode(null,null);
        let sortedArrHead = headPointer;
        while(leftSortedHead !== null && rightSortedHead !== null) {
            if(leftSortedHead.val < rightSortedHead.val) {
                sortedArrHead.next = leftSortedHead;
                leftSortedHead = leftSortedHead.next;
            } else {
                sortedArrHead.next = rightSortedHead;
                rightSortedHead = rightSortedHead.next;
            }
            sortedArrHead = sortedArrHead.next;
        }

        if(leftSortedHead !== null) {
            sortedArrHead.next = leftSortedHead;
        }
        if(rightSortedHead !== null) {
            sortedArrHead.next = rightSortedHead;
        }

        return headPointer.next;
    }

    return divideAndMerge(head);
};