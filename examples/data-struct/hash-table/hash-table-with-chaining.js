/**
 * HashTable - 链表法
 */
class HashTable {
  constructor(capacity) {
    this.capacity = capacity
    this.length = 0
    this.slots = new Array(capacity).fill(0).map(
      _ =>
        new Slot({
          equal(it, key) {
            return it.key === key
          },
        })
    )
  }

  get(key) {
    const { slots } = this
    const hash = this.hash(key)
    const slot = slots[hash]
    const node = slot.find(key)

    return node ? node.value.value : null
  }

  put(key, value) {
    const { slots } = this
    const hash = this.hash(key)
    const slot = slots[hash]

    // 同一个key只能出现一次
    const node = slot.find(key)
    if (node != null) {
      node.value.value = value
      return
    }

    slot.push(new KeyValuePair(key, value))

    this.length++
  }

  delete(key) {
    const { slots } = this
    const hash = this.hash(key)
    const slot = slots[hash]
    const index = slot.findIndex(key)

    if (~index) {
      slot.delete(index)
      this.length--
    }
  }

  hash(key) {
    key = String(key)
      .substr(-2, 2)
      .split('')
      .reduce((r, s) => r + s.charCodeAt(0), 0)

    return key % this.capacity
  }
}

class Slot {
  constructor({ equal }) {
    this.head = new SlotNode()
    this.tail = new SlotNode()
    this.length = 0
    this.equal = equal
  }

  getLength() {
    return this.length
  }

  empty() {
    return this.getLength() === 0
  }

  find(value, equal) {
    const { head, tail } = this
    let p = head

    equal = equal || this.equal || ((a, b) => a === b)

    while ((p = p.next) != null && p != tail) {
      if (equal(p.value, value)) return p
    }

    return null
  }

  findIndex(value, equal) {
    const { head, tail } = this
    let i = 0
    let p = head

    equal = equal || this.equal || ((a, b) => a === b)

    while ((p = p.next) != null && p != tail) {
      if (equal(p.value, value)) return i
      i++
    }

    return -1
  }

  push(value) {
    this.insert(this.getLength(), value)
  }

  unshift(value) {
    this.insert(0, value)
  }

  insert(index, value) {
    const { head, tail } = this
    const length = this.getLength()

    if (index < 0 || index > length) {
      throw new Error('Index Overflow')
    }

    const newNode = new SlotNode(value)

    let prev

    if (index == length) {
      prev = length == 0 ? head : tail.prior
    } else {
      prev = head
      for (let i = 0; i < index; i++) prev = prev.next
    }

    if (length == 0) {
      prev.next = newNode
      newNode.prior = prev
    } else {
      newNode.next = prev.next
      newNode.next.prior = newNode
      prev.next = newNode
      newNode.prior = prev
    }

    if (index == length) {
      newNode.next = tail
      tail.prior = newNode
    }

    this.length++
  }

  shift() {
    return this.delete(0)
  }

  pop() {
    return this.delete(this.length - 1)
  }

  delete(index) {
    const { head, tail, length } = this

    if (index < 0 || index >= length) {
      throw new Error('Index Overflow')
    }

    let prev
    if (index <= Math.floor(length >> 1)) {
      prev = head
      for (let i = 0; i < index; i++) prev = head.next
    } else {
      prev = tail
      for (let i = length; i >= index; i--) prev = prev.prior
    }

    let node = prev.next

    prev.next = prev.next.next
    prev.next.prior = prev

    this.length--

    return node
  }

  traverse(getter) {
    let p = this.head
    let nodes = []

    while ((p = p.next) != null && p != this.tail) {
      nodes.push(getter ? getter(p) : p.value)
    }

    console.log('slot:', nodes.join(' -> '))
  }
}

class SlotNode {
  constructor(val, prior, next) {
    this.value = val
    this.prior = prior || null
    this.next = next || null
  }
}

class KeyValuePair {
  constructor(key, value) {
    this.key = key
    this.value = value
  }
}

!(function main() {
  const table = new HashTable(10)
  table.put('word', 1)
  table.put('words', 2)
  table.put('free', 3)
  table.put('rd', 4)
  table.put('words', 22)
  table.put('srd', 9)
  console.log('word:', table.get('word'))
  console.log('words:', table.get('words'))
  console.log('free:', table.get('free'))
  console.log('rd:', table.get('rd'))
  console.log('wrods:', table.get('wrods'))
  console.log('xx', table.get('xx'))

  for (let i = 0; i < table.slots.length; i++) {
    console.log(`----slot ${i}----`)
    table.slots[i].traverse(it => `${it.value.key}=${it.value.value}`)
  }
})()
