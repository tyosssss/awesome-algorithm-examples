/**
 * HashTable - 开放寻址法 - 线性探索
 */
class HashTable {
  static NIL = Symbol('HashTable')

  constructor(capacity) {
    this.table = new Array(capacity).fill(HashTable.NIL)
    this.capacity = capacity
    this.length = 0
  }

  get(key) {
    const { capacity, table } = this
    let hash = this.hash(key)

    if (!this.free(hash)) {
      for (let i = 0, n = capacity; i < n; i++) {
        if (!this.free(hash) && table[hash].key == key) {
          return table[hash].value
        } else {
          hash = (hash + 1) % capacity
        }
      }
    }

    return null
  }

  put(key, value) {
    const { table, capacity, length } = this
    let hash = this.hash(key)

    // 同一个key只能出现一次
    if (!this.free(hash) && table[hash].key == value) {
      table[hash] = value
      return
    }

    if (length >= capacity) {
      throw new Error('The capacity is full.')
    }

    // 线性探索
    while (!this.free(hash)) hash = (hash + 1) % capacity
    table[hash] = new KeyValuePair(key, value)
    this.length++
  }

  delete(key) {}

  hash(key) {
    key = String(key)
      .substr(-2, 2)
      .split('')
      .reduce((r, s) => r + s.charCodeAt(0), 0)

    return key % this.capacity
  }

  free(hashValue) {
    return this.table[hashValue] === HashTable.NIL
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
  table.put('wrods', 22)

  console.log('word:', table.get('word'))
  console.log('words:', table.get('words'))
  console.log('free:', table.get('free'))
  console.log('rd:', table.get('rd'))
  console.log('wrods:', table.get('wrods'))
  console.log('xx', table.get('xx'))
})()
