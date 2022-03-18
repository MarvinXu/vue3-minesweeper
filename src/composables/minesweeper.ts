import type { Grid } from '~/types'
enum GameState {
  WAITING,
  PLAYING,
  WON,
  LOST,
}

export class Cell {
  readonly id: number
  isMine!: boolean
  isFlagged!: boolean
  /**
   * update when game over
   */
  hasFlaggedWrongly!: boolean
  isOpen!: boolean
  isTrigger!: boolean
  adjacentMineCount!: number
  constructor(id: number) {
    this.id = id
    this.init()
  }

  init() {
    this.isMine = false
    this.isFlagged = false
    this.hasFlaggedWrongly = false
    this.isOpen = false
    this.isTrigger = false
    this.adjacentMineCount = -1
  }

  open() {
    this.isOpen = true
  }

  toggleFlag() {
    this.isFlagged = !this.isFlagged
  }

  trigger() {
    this.isTrigger = true
  }

  get isZero() {
    return this.adjacentMineCount === 0
  }
}

export class Game {
  cols: number
  rows: number
  mineCount: number
  grid: Grid
  state = GameState.WAITING
  constructor(cols: number, rows: number, mineCount: number) {
    this.cols = cols
    this.rows = rows
    this.mineCount = mineCount

    this.grid = reactive(createGrid(cols, rows))
    this.generateMines(this.mineCount)
  }

  get isGameOver() {
    return this.state === GameState.LOST || this.state === GameState.WON
  }

  reset() {
    this.state = GameState.WAITING
    this.grid.forEach((cell) => {
      cell.init()
    })
  }

  generateMines(count: number): void {
    const { grid } = this
    const randomIndices = shuffle(grid.map((v, i) => i))
    randomIndices.slice(0, count).forEach((i) => {
      grid[i].isMine = true
    })

    // calculate
    grid.filter(cell => !cell.isMine)
      .forEach((cell) => {
        cell.adjacentMineCount
        = this.getAdjacentCells(cell)
            .filter(c => c.isMine)
            .length
      })
  }

  getAdjacentCells(cell: Cell) {
    const { grid, cols, rows } = this
    return getAdjacentIds(cell.id, cols, rows).map(id => grid[id])
  }

  onClick(cell: Cell) {
    if (this.isGameOver || cell.isFlagged)
      return

    if (!cell.isOpen) {
      cell.open()
      if (cell.isMine) {
        cell.trigger()
        this.stopGame()
      }
      else {
        if (cell.isZero)
          this.expandZero(cell)
      }
    }
    else {
      this.autoExpand(cell)
    }
  }

  expandZero(cell: Cell): void {
    this.getAdjacentCells(cell)
      .forEach((c) => {
        // cancel flag when expand zero
        if (c.isFlagged)
          c.toggleFlag()
        if (!c.isOpen) {
          c.open()
          if (c.isZero)
            this.expandZero(c)
        }
      })
  }

  autoExpand(cell: Cell) {
    const adjacentCells = this.getAdjacentCells(cell)
    const flaggedCount = adjacentCells.filter(c => c.isFlagged).length
    const adjacentZeroCells: Cell[] = []
    if (flaggedCount === cell.adjacentMineCount) {
      adjacentCells.filter(c => !c.isOpen && !c.isFlagged)
        .forEach((c) => {
          c.open()
          if (c.isMine) {
            if (!this.isGameOver) {
              c.trigger()
              this.stopGame()
            }
          }
          if (c.isZero)
            adjacentZeroCells.push(c)
        })

      // only expandZero when finish checking around
      if (!this.isGameOver) {
        adjacentZeroCells.forEach((c) => {
          this.expandZero(c)
        })
      }
    }
  }

  stopGame() {
    // eslint-disable-next-line no-console
    console.log('game over!')
    this.state = GameState.LOST

    this.grid.forEach((cell) => {
      // open all mines that are not flagged
      if (cell.isMine && !cell.isFlagged)
        cell.open()

      // check all flags
      if (cell.isFlagged && !cell.isMine)
        cell.hasFlaggedWrongly = true
    })
  }

  onRightClick(cell: Cell) {
    if (!cell.isOpen)
      cell.toggleFlag()
  }
}

function createGrid(cols: number, rows: number): Grid {
  return Array.from({ length: cols * rows }, (_, i) => new Cell(i))
}

function getAdjacentIds(id: number, cols: number, rows: number) {
  const cords = idToCoordinates(id, cols)
  return getAdjacentCoordinates(cords, cols, rows).map(([x, y]) => y * cols + x)
}

function idToCoordinates(id: number, cols: number) {
  return [id % cols, Math.floor(id / cols)]
}

function getAdjacentCoordinates([x, y]: number[], cols: number, rows: number): number[][] {
  const directions = [
    [-1, -1],
    [-1, 0],
    [-1, 1],
    [0, -1],
    [0, 1],
    [1, -1],
    [1, 0],
    [1, 1],
  ]

  return directions.map(([deltaX, deltaY]) => [x + deltaX, y + deltaY])
    .filter(([x, y]) => {
      if (x < 0 || y < 0 || x >= cols || y >= rows)
        return false
      return true
    })
}

function shuffle(arr: any[]) {
  for (let i = arr.length - 1; i >= 0; i--) {
    const t: number = Math.floor(Math.random() * i);
    // swap
    [arr[i], arr[t]] = [arr[t], arr[i]]
  }
  return arr
}

if (import.meta.vitest) {
  const { describe, it, expect } = import.meta.vitest
  describe('getAdjacentIds', () => {
    it('in middle', () => {
      expect(getAdjacentIds(14, 10, 10).sort((a, b) => a - b)).toEqual([3, 4, 5, 13, 15, 23, 24, 25])
    })
    it ('on top edge', () => {
      expect(getAdjacentIds(4, 10, 10).sort((a, b) => a - b)).toEqual([3, 5, 13, 14, 15])
    })
    it ('on bottom edge', () => {
      expect(getAdjacentIds(94, 10, 10).sort((a, b) => a - b)).toEqual([83, 84, 85, 93, 95])
    })
    it ('on left edge', () => {
      expect(getAdjacentIds(20, 10, 10).sort((a, b) => a - b)).toEqual([10, 11, 21, 30, 31])
    })
    it ('on right edge', () => {
      expect(getAdjacentIds(39, 10, 10).sort((a, b) => a - b)).toEqual([28, 29, 38, 48, 49])
    })
    it ('on bottom left corner', () => {
      expect(getAdjacentIds(90, 10, 10).sort((a, b) => a - b)).toEqual([80, 81, 91])
    })
    it ('on bottom right corner', () => {
      expect(getAdjacentIds(99, 10, 10).sort((a, b) => a - b)).toEqual([88, 89, 98])
    })
  })
  describe ('idToCoordinates', () => {
    it('', () => {
      expect(idToCoordinates(39, 10)).toEqual([9, 3])
    })
  })
  describe ('getAdjacentCoordinates', () => {
    //  [
    //    [0,1,2,3],
    //    [4,5,6,7],
    //    [8,9,10,11]
    //   ]
    it('middle', () => {
      expect(getAdjacentCoordinates([1, 1], 4, 3)).toEqual([[0, 0], [0, 1], [0, 2], [1, 0], [1, 2], [2, 0], [2, 1], [2, 2]])
    })
    it('top left corner', () => {
      expect(getAdjacentCoordinates([0, 0], 4, 3)).toEqual([[0, 1], [1, 0], [1, 1]])
    })
    it('left edge', () => {
      expect(getAdjacentCoordinates([0, 1], 4, 3)).toEqual([[0, 0], [0, 2], [1, 0], [1, 1], [1, 2]])
    })
    it('right edge', () => {
      expect(getAdjacentCoordinates([3, 1], 4, 3)).toEqual([[2, 0], [2, 1], [2, 2], [3, 0], [3, 2]])
    })
  })
  describe('shuffle', () => {
    it ('diff', () => {
      const arr = [1, 2, 3, 4, 5, 6]
      expect(shuffle(arr.slice())).not.toEqual(arr)
    })
  })
}
