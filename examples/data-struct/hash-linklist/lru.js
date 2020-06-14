class HashSet {
  constructor(capacity = Infinity) {
    this.length = 0
    this.capacity = capacity
    this.map = {}
    this.list = new LinkList()
  }

  has(key) {
    return !!this.map[key]
  }

  get(key) {
    if (!this.has(key)) {
      throw new ERror('The key is not exists.')
    }

    return this.map[key]
  }

  put(key, value) {
    if (this.length == this.capacity) {
      this.weedOut()
    }

    this.map[key] = value
    this.insertToLRUList(key)

    this.length++
  }

  insertToLRUList(key) {
    const { list } = this
    const index = list.findIndex(key)

    if (~index) {
      list.delete(index, key)
    }

    list.push(key)
  }

  weedOut() {
    this.delete(this.list.get(0).val)
  }

  delete(key) {
    if (!this.has(key)) {
      throw new Error('The key is not exists.')
    }

    this.list.deleteByValue(key)
    delete this.map[key]
    this.length--
  }
}

class LinkList {
  constructor() {
    this.head = new LinkNode()
    this.length = 0
  }

  static createFromArray(array) {
    let list = new LinkList()

    array.forEach(it => list.insert(list.getLength(), it))

    return list
  }

  get(index) {
    if (index < 0 || index > this.length - 1) {
      throw new Error('The index is overflow')
    }

    let p = this.head
    for (let i = 0; i <= index; i++) p = p.next

    return p
  }

  getLength() {
    return this.length
  }

  findIndex(x) {
    let p = this.head.next
    let i = 0

    while (p !== null) {
      if (p.val === x) return i

      i++
      p = p.next
    }

    return -1
  }

  insert(index, x) {
    const { head, length } = this

    if (index < 0 || index > length) {
      throw new Error('The index is invalid.')
    }

    let prev = head
    let s = new LinkNode(x)

    // find previous node
    for (let i = 0; i < index; i++) prev = prev.next

    s.next = prev.next
    prev.next = s
    this.length++
  }

  push(x) {
    this.insert(this.length, x)
  }

  delete(index) {
    const { head, length } = this

    if (index < 0 || index >= length) {
      throw new Error('The index is invalid.')
    }

    let prev = head
    let s

    // find previous node
    for (let i = 0; i < index; i++) prev = prev.next

    s = prev.next
    prev.next = s.next
    this.length--

    return s
  }

  deleteByValue(x) {
    return this.delete(this.findIndex(x))
  }

  unshift() {
    return this.delete(0)
  }

  pop() {
    return this.delete(this.length - 1)
  }

  forEach(iteratee) {
    if (typeof iteratee !== 'function') {
      throw new Error('The iteratee must be a function.')
    }

    const { head } = this
    let i = 0
    let p = head.next

    while (p != null) {
      iteratee(p.val, i++, p, head)
      p = p.next
    }
  }

  traverse() {
    this.forEach((it, idx) => console.log(`${idx} = ${it}`))
  }
}

class LinkNode {
  constructor(val) {
    this.val = val
    this.next = null
  }
}

function main() {
  // const linklist = LinkList.createFromArray([1, 2, 3, 4, 5, 6, 7, 8, 9])
  // linklist.delete(linklist.getLength() - 1)
  // linklist.delete(0)
  // linklist.delete(3)
  // linklist.traverse()

  const hashSet = new HashSet(3)

  hashSet.put('a', 1)
  hashSet.put('b', 2)
  hashSet.put('c', 3)
  hashSet.put('d', 4)
  hashSet.put('b', 5)
  hashSet.put('e', 6)

  console.log(hashSet.map)
  hashSet.list.traverse()
}

main()
