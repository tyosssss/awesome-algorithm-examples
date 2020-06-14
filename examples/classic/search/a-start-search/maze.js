class Cell {
  constructor(x, y) {
    this.x = x
    this.y = y
    this.G = 0
    this.H = 0
    this.F = 0
  }

  init(parent, end) {
    this.parent = parent

    if (parent != null) this.G = parent.G + 1

    this.H = Math.abs(this.x - end.x) + Math.abs(this.y - end.y)

    this.F = this.G + this.H
  }
}

class CellList {
  constructor() {
    this.list = []
  }

  get length() {
    return this.list.length
  }

  push(element) {
    this.append(element)
  }

  append(element) {
    this.list.push(element)
  }

  remove(element) {
    const index = this.findIndex(element)

    if (~index) {
      this.list.splice(index, 1)
    }
  }

  contain(element) {
    return ~this.findIndex(element)
  }

  findIndex(element) {
    return this.list.findIndex(it => it.x === element.x && it.y === element.y)
  }

  find(element) {
    const index = this.findIndex(element)

    return ~index ? this.list[index] : null
  }

  findMinCell() {
    const { list } = this

    if (list.length === 0) {
      return null
    }

    let minCell = list[0]
    for (let cell of list) {
      if (cell.F < minCell.F) minCell = cell
    }

    return minCell
  }
}

function aStarSearch(maze, start, end) {
  const m = maze.length
  const n = maze[0].length

  // 可到达的格子
  const openList = new CellList()

  // 已到达的格子
  const closeList = new CellList()

  // 起始点
  openList.push(start)

  //
  let currentCell, neighbors
  while (openList.length > 0) {
    // 当前格子 = 从可到达的格子中找出最小的
    currentCell = openList.findMinCell()
    openList.remove(currentCell)
    closeList.append(currentCell)

    // 探索相邻格子(四个方向)
    neighbors = findValidNeighbors(currentCell)
    for (let neighbor of neighbors) {
      if (!openList.contain(neighbor)) {
        neighbor.init(currentCell, end)
        openList.push(neighbor)
      }
    }

    // 检查终点是否已可达
    const openedEndCell = openList.find(end)
    if (openedEndCell) {
      return openedEndCell
    }
  }

  return null

  function findValidNeighbors(cell) {
    return [
      new Cell(cell.x - 1, cell.y), // 上
      new Cell(cell.x, cell.y + 1), // 右
      new Cell(cell.x + 1, cell.y), // 下
      new Cell(cell.x, cell.y - 1), // 左
    ].filter(isValidCell)
  }

  function isValidCell(cell) {
    if (cell.x < 0 || cell.y < 0 || cell.x >= m || cell.y >= n) {
      return false
    }

    if (openList.contain(cell) || closeList.contain(cell)) {
      return false
    }

    if (maze[cell.x][cell.y] === 1) {
      return false
    }

    return true
  }
}

function main() {
  const maze = [
    [0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 1, 0, 0, 0],
    [0, 0, 0, 1, 0, 0, 0],
    [0, 0, 0, 1, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0],
  ]

  // 回溯路径
  const paths = new CellList()
  let resultCell = aStarSearch(maze, new Cell(2, 1), new Cell(4, 6))
  while (resultCell != null) {
    paths.push(resultCell)
    resultCell = resultCell.parent
  }

  // 输出路径
  for (let i = 0, m = maze.length; i < m; i++) {
    for (let j = 0, n = maze[0].length; j < n; j++) {
      if (paths.contain(new Cell(i, j))) {
        maze[i][j] = '*'
      }
    }
  }

  for (let i = 0, m = maze.length; i < m; i++) {
    console.log(maze[i].join(''))
  }
}

main()
