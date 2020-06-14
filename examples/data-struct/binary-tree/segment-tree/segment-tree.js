class SegmentTree {
  constructor() {
    this.nodes = []
  }

  static buildFromArray(array) {
    const tree = new SegmentTree()

    tree.build(array)

    return tree
  }

  build(array) {
    const { nodes } = this

    !(function doBuild(nodeIndex, begin, end) {
      const node = (nodes[nodeIndex] = new SegmentTreeNode(nodeIndex))

      node.begin = begin
      node.end = end

      if (begin === end) {
        // 构造单节点
        node.single = true
        node.val = node.min = node.max = node.sum = array[begin]
      } else {
        // 构造区间

        // 构造子树
        const mid = Math.floor((begin + end) / 2)
        const leftChild = nodeIndex * 2
        const rightChild = nodeIndex * 2 + 1

        // 左子树区间 = [begin, (begin+end)/2)]
        doBuild(leftChild, begin, mid)

        // 右子树区间 = [(begin+end)/2)+1, end]
        doBuild(rightChild, mid + 1, end)

        // 回溯更新节点信息
        node.min = Math.min(
          nodes[leftChild].min,
          nodes[leftChild].max,
          nodes[rightChild].min,
          nodes[rightChild].max
        )

        node.max = Math.max(
          nodes[leftChild].min,
          nodes[leftChild].max,
          nodes[rightChild].min,
          nodes[rightChild].max
        )

        node.sum = nodes[leftChild].sum + nodes[rightChild].sum
      }
    })(1, 0, array.length - 1)
  }

  /**
   * 搜索区间的最小值
   */
  searchMin(left, right) {
    const { nodes } = this
    const nil = {}

    return (function search(node, left, right) {
      if (!node) {
        return nil
      }

      // 查询区间与当前区间没有交集
      // [begin .. end .. left]
      // [right .. begin .. end]
      if (left > node.end || right < node.begin) {
        return nil
      }

      // 查询区间完全包含当前区间, 直接返回当前区间的最小值
      // [left .. begin .... end ..right]
      if (left <= node.begin && node.end <= right) {
        return node.min
      }

      // 查询区间与当前区间有部分交集
      //
      const min1 = search(nodes[node.index * 2], left, right)
      const min2 = search(nodes[node.index * 2 + 1], left, right)

      if (min1 === nil) {
        // 不在左区间
        return min2
      } else if (min2 === nil) {
        // 不在右区间
        return min1
      } else {
        // 包含在左右区间中, 取最小
        return min1 <= min2 ? min1 : min2
      }
    })(nodes[1], left, right)
  }

  /**
   * 搜索区间的最大值
   */
  searchMax(left, right) {
    const { nodes } = this
    const nil = {}
    const max = (function search(node, left, right) {
      if (!node) {
        return nil
      }

      // 超出区间
      // [right..begin..end] or [begin..end..left]
      if (right < node.begin || node.end < left) {
        return nil
      }

      // 查询区间: 完全包含当前区间
      // [left..begin..end..right]
      if (left <= node.begin && node.end <= right) {
        return node.max
      }

      // 查询区间:
      // 1. 包含在左区间
      // 2. 包含在右区间
      // 3. 包含在左区间和右区间
      const max_left = search(nodes[node.index * 2], left, right)
      const max_right = search(nodes[node.index * 2 + 1], left, right)

      if (max_right == nil) return max_left
      else if (max_left == nil) return max_right
      else return Math.max(max_left, max_right)
    })(nodes[1], left, right)

    return max === nil ? -Infinity : max
  }

  searchSum(left, right) {
    const { nodes } = this
    const nil = {}
    const sum = (function search(node, left, right) {
      if (!node) {
        return nil
      }

      // 超出区间
      // [right..begin..end] or [begin..end..left]
      if (right < node.begin || node.end < left) {
        return nil
      }

      // 查询区间: 完全包含当前区间
      // [left..begin..end..right]
      if (left <= node.begin && node.end <= right) {
        return node.sum
      }

      // 查询区间:
      // 1. 包含在左区间
      // 2. 包含在右区间
      // 3. 包含在左区间和右区间
      const sum_left = search(nodes[node.index * 2], left, right)
      const sum_right = search(nodes[node.index * 2 + 1], left, right)

      if (sum_right == nil) return sum_left
      else if (sum_left == nil) return sum_right
      else return sum_left + sum_right
    })(nodes[1], left, right)

    return sum === nil ? NaN : sum
  }

  /**
   * 区间更新
   */

  traverse() {
    const { nodes } = this

    !(function doTraverse(prefix, index) {
      const node = nodes[index]

      if (node) {
        if (node.single) {
          console.log(prefix + `${index}=${node.val}`)
        } else {
          console.log(
            prefix +
              `${index}=[${node.begin},${node.end}], min=${node.min}, max=${node.max}, sum=${node.sum}`
          )
        }

        prefix += '  '

        doTraverse(prefix, index * 2)
        doTraverse(prefix, index * 2 + 1)
      }
    })('', 1)
  }
}

class SegmentTreeNode {
  constructor(index) {
    this.single = false

    this.index = index

    // 单节点的值
    this.val = null

    // 区间的最小值
    this.min = -Infinity

    // 区间的最大值
    this.max = +Infinity

    // 区间的汇总值
    this.sum = 0
  }
}

function main() {
  const array = [-2, 1, -3, 4, -1, 2, 1, -5, 4]
  const tree = SegmentTree.buildFromArray(array)

  tree.traverse()

  const left = 0
  const right = 5

  console.log(
    `[${left}, ${right}]: `,
    [-2, 1, -3, 4, -1, 2, 1, -5, 4].slice(left, right + 1)
  )
  console.log(`searchMin[${left}, ${right}]`, tree.searchMin(left, right))
  console.log(`searchMax[${left}, ${right}]`, tree.searchMax(left, right))
  console.log(`searchSum[${left}, ${right}]`, tree.searchSum(left, right))
}

main()
