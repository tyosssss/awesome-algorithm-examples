class SkipList {
  static MAX_LEVEL = 4

  constructor() {
    // 头指针
    this.head = new SkipListNode()

    // 节点数
    this.length = 0

    // 节点最大层级
    this.level = 0

    this.random = () => Math.floor(Math.random() * 100000)
  }

  length() {
    return this.length
  }

  empty() {
    return this.length() === 0
  }

  find(value) {
    const { level, head } = this
    let p = head

    // 从上往下逐层搜索
    for (let i = level - 1; i >= 0; i--) {
      // 当前节点的下一跳(后继)大于或者等于当前值时, 停止向后搜索, 转而跳到下一层
      while (p.forwards[i] != null && p.forwards[i].value < value) {
        p = p.forwards[i]
      }
    }

    // 第 0 层存储了所有结点，如果找到要查找的值，返回该结点，否则返回 null
    if (p.forwards[0] != null && p.forwards[0].value == value) {
      return p.forwards[0]
    }

    return null
  }

  insert(value) {
    const level = this.getInsertLevel()
    const newNode = new SkipListNode(value, level)

    // 记录每层插入位置的前驱
    const update = new Array(level)
    for (let i = level - 1; i >= 0; i--) update[i] = this.head

    // 找到第 i 层索引的插入位置，将插入位置前面的结点保存到 update 数组
    let p = this.head
    for (let i = level - 1; i >= 0; i--) {
      while (p.forwards[i] != null && p.forwards[i].value < value)
        p = p.forwards[i]
      update[i] = p
    }

    // 更新各层的 forwards 结点
    for (let i = level - 1; i >= 0; i--) {
      newNode.forwards[i] = update[i].forwards[i]
      update[i].forwards[i] = newNode
    }

    // 更新当前索引总层数
    if (this.level < level) this.level = level

    // 更新节点个数
    this.length++
  }

  getInsertLevel() {
    let level = 1

    for (let i = 1; i < SkipList.MAX_LEVEL; i++) {
      if ((this.random() & 1) == 0) level++
    }

    return level
  }

  delete(value) {
    const { head, level } = this
    const update = new Array(level)
    let p = head

    // 找到要删除节点在所有层级的前驱
    for (let i = level - 1; i >= 0; i--) {
      while (p.forwards[i] != null && p.forwards[i].value < value) {
        p = p.forwards[i]
      }

      update[i] = p
    }

    // 如果找到对应的节点
    if (p.forwards[0] != null && p.forwards[0].value == value) {
      // 逐层删除
      for (let i = level - 1; i >= 0; i--) {
        // 判断第 i 层索引是否有要删除的结点
        if (
          update[i].forwards[i] != null &&
          update[i].forwards[i].value == value
        ) {
          // prev->next = prev->next->next
          update[i].forwards[i] = update[i].forwards[i].forwards[i]
        }
      }
    }

    this.length--
  }

  traverse() {
    const { level, head } = this
    const ret = []

    for (let i = level - 1; i >= 0; i--) {
      let nodes = []
      let p = head.forwards[i]

      while (p != null) {
        nodes.push(p.value)
        p = p.forwards[i]
      }

      ret.push(nodes)
    }

    ret.forEach((nodes, index) => {
      console.log(`lv.${level - index} ${nodes.join(' -> ')}`)
    })
  }
}

class SkipListNode {
  constructor(val, level) {
    // 数据
    this.value = val || null

    // 当前索引所在的层级
    this.level = level || null

    // 保存当前结点的所有下一跳结点(next)
    // forwards[i] 表示当前结点在第i层索引的下一跳结点，i in [0, level-1]
    this.forwards = new Array(level).fill(null)
  }
}

!(function main() {
  const skipList = new SkipList()

  skipList.insert(3)
  skipList.insert(1)
  skipList.insert(2)
  skipList.insert(5)
  skipList.insert(4)
  skipList.insert(9)

  // console.log('find 4', skipList.find(6))

  skipList.delete(6)
  skipList.delete(3)

  skipList.traverse()
})()
