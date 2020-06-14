/**
 * 用户标签
 * JDK BitSet
 * Redis bitmap
 */

/**
 * 位图
 */
class Bitmap {
  static BITMAP_WORD_SIZE = 32
  static BITMAP_WORD_BIT = Math.log2(Bitmap.BITMAP_WORD_SIZE)

  /**
   *
   * @param {Number} size 位图的位数
   */
  constructor(size) {
    this.size = size
    this.words = new Array(this.getWordIndex(size - 1) + 1).fill(0)
  }

  /**
   * 获得位图中指定位置的标志位
   * @param {Number} bitIndex 位图的第bitIndex位(bitIndex=0表示右数第1位)
   * @returns {Boolean} 返回标志位
   */
  getBit(bitIndex) {
    if (bitIndex < 0 || bitIndex > this.size - 1) {
      throw new Error('The index is out of bounds.')
    }

    const wordIndex = this.getWordIndex(bitIndex)

    return (this.words[wordIndex] & (1 << bitIndex)) != 0
  }

  /**
   * 设置标志位
   * @param {Number} bitIndex 位图的第bitIndex位(bitIndex=0表示右数第1位)
   */
  setBit(bitIndex, flag = true) {
    if (bitIndex < 0 || bitIndex > this.size - 1) {
      throw new Error('The index is out of bounds.')
    }

    const wordIndex = this.getWordIndex(bitIndex)

    if (flag) {
      this.words[wordIndex] |= 1 << bitIndex
    } else {
      this.words[wordIndex] ^= 1 << bitIndex
    }
  }

  getWordIndex(bitIndex) {
    return bitIndex >> Bitmap.BITMAP_WORD_BIT
  }

  print() {
    this.words.forEach(word => {
      console.log(word.toString(2))
    })
  }
}

class User {
  constructor(userId, userName) {
    this.userId = userId
    this.userName = userName
  }
}

class UserLabelCollection {
  static USER_ID_MAX_LENGTH = 1024

  constructor() {
    this.labels = {}
    this.totalUsers = new Bitmap(UserLabelCollection.USER_ID_MAX_LENGTH)
  }

  get(key) {
    return this.labels[key]
  }

  put(key) {
    this.labels[key] = new Bitmap(UserLabelCollection.USER_ID_MAX_LENGTH)
  }

  tag(key, userId) {
    this.labels[key].setBit(userId)
    this.totalUsers.setBit(userId)
  }

  unionLabel(keys) {
    return Array.from(
      keys.reduce((userIds, key) => {
        const bitmap = this.labels[key]

        if (bitmap) {
          for (let i = 0, size = bitmap.size; i < size; i++) {
            if (bitmap.getBit(i)) {
              userIds.add(i)
            }
          }
        }

        return userIds
      }, new Set())
    )
  }

  notHaveLabel(key) {
    const { totalUsers } = this
    const userIds = this.unionLabel([key])

    
  }
}

/**
 * 用户标签 -- 使用bitmap保存标签与用户的关系
 *
 * 1 - 表示指定userId有该标签
 */
class UserLabel {
  constructor(title) {
    this.title = title
    this.bitmap = new Bitmap()
  }
}

function main() {
  const user1 = new User(1, 'Tyo')
  const user2 = new User(127, 'Lily')
  const user3 = new User(254, 'Frank')

  const labels = new UserLabelCollection()
  labels.put('90')
  labels.put('female')
  labels.put('ios')

  labels.tag('90', user1.userId)
  labels.tag('90', user3.userId)

  labels.tag('female', user1.userId)

  labels.tag('ios', user2.userId)
  labels.tag('ios', user3.userId)

  console.log(labels.unionLabel(['female']))
}

main()
