var detectCycle = function (head) {
  let slow, fast

  slow = fast = head

  while (fast != null && fast.next != null) {
    slow = slow.next
    fast = fast.next.next

    if (slow == fast) {
      // 有环
      // slow = fast = 首次相遇点
      // D:  链头 ~ 入环点的距离
      // S1: 入环点 ~ 首次相遇点的距离
      // S2: 首次相遇点 ~ 入环点的距离
      // 相遇时所走的距离
      //  slow = D + S1
      //  fast = D + S1 + S1 + S2 (比slow多走了一圈)
      //  2slow = fast
      //  即 D = S2
      //  故 从开始位置和相遇点位置开始走, 直到两者相遇的位置即是入环点
      slow = head

      while (slow !== fast) {
        slow = slow.next
        fast = fast.next
      }

      return slow
    }
  }

  return null
}

function main() {
  const nodes = []
  const values = [3, 2, 0, -4]
  const pos = 1

  let head, node

  values.forEach((val, index) => {
    nodes.push((node = new ListNode(val)))

    if (index === 0) {
      head = node
    } else {
      nodes[index - 1].next = node
    }
  })

  if (pos != -1) {
    nodes[nodes.length - 1].next = nodes[pos]
  }

  console.log(detectCycle(head))
}

function ListNode(val) {
  this.val = val
  this.next = null
}

main()
