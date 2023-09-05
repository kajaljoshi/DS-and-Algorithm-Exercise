/**
 * Definition for singly-linked list.
 * function ListNode(val, next) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.next = (next===undefined ? null : next)
 * }
 */
/**
 * @param {ListNode} head
 * @param {number} x
 * @return {ListNode}
 */
var partition = function(head, x) {

    let lessRoot = new ListNode(null,null);
    let moreRoot = new ListNode(null,null);

    let lessLink = lessRoot;
    let moreLink = moreRoot;
    while(head !== null) {
        if(head.val < x) {
            lessLink.next = new ListNode(head.val,null);
            lessLink = lessLink.next;
        } else {
            moreLink.next = new ListNode(head.val,null);
            moreLink = moreLink.next;
        }
        head = head.next;
    }

    lessLink.next = moreRoot.next;
    return lessRoot.next;
    
};