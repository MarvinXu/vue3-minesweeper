import type { Board, Cell } from '~/types'

export function createBoard$(cols: number, rows: number): Board {
  const board = Array.from({ length: cols }, (_, i) =>
    Array.from({ length: rows }, (_, j) => {
      const cell: Cell = {
        id: i * rows + j,
        mine: false,
        flagged: false,
        revealed: false,
        num: 0,
      }
      return cell
    }),
  )
  return reactive(board)
}

export function createBoard(cols: number, rows: number): Board {
  const board = Array.from({ length: cols * rows }, (_, i) => ({
    id: i,
    mine: false,
    flagged: false,
    revealed: false,
    num: 0,
  }))
  return reactive(board)
}

export function generateMines(board: Board, count: number): void {
  const randomIdxs = shuffle(board.map((v, i) => i))
  randomIdxs.slice(0, count).forEach((i) => {
    board[i].mine = true
  })
}

export function calculateNums(board: Board, cols: number, rows: number): void {
  board.filter(cell => !cell.mine)
    .forEach((cell) => {
      const neighbors = getNeighborCell(board, cell, cols, rows)
      cell.num = neighbors.filter(ne => ne.mine).length
    })
}

export function expandCell(board: Board, cell: Cell, cols: number, rows: number): void {
  if (cell.num === 0) {
    const neighbors = getNeighborCell(board, cell, cols, rows)
    neighbors.forEach((cell) => {
      if (!cell.revealed) {
        cell.revealed = true
        expandCell(board, cell, cols, rows)
      }
    })
  }
}

function getNeighborCell(board: Board, cell: Cell, cols: number, rows: number) {
  return getNeighbors(cell.id, cols, rows).map(i => board[i])
}

function getNeighbors(i: number, cols: number, rows: number): number[] {
  const neighbors = [
    i - cols - 1,
    i - cols,
    i - cols + 1,
    i - 1,
    i + 1,
    i + cols - 1,
    i + cols,
    i + cols + 1,
  ]
  return neighbors.filter((ne) => {
    if (ne < 0 || ne > cols * rows - 1)
      return false
    if (i % cols === 0 && ne % cols === cols - 1)
      return false
    if (ne % cols === 0 && i % cols === cols - 1)
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
  describe('getNeighbors', () => {
    it('in middle', () => {
      expect(getNeighbors(14, 10, 10)).toEqual([3, 4, 5, 13, 15, 23, 24, 25])
    })
    it ('on top edge', () => {
      expect(getNeighbors(4, 10, 10)).toEqual([3, 5, 13, 14, 15])
    })
    it ('on bottom edge', () => {
      expect(getNeighbors(94, 10, 10)).toEqual([83, 84, 85, 93, 95])
    })
    it ('on left edge', () => {
      expect(getNeighbors(20, 10, 10)).toEqual([10, 11, 21, 30, 31])
    })
    it ('on right edge', () => {
      expect(getNeighbors(39, 10, 10)).toEqual([28, 29, 38, 48, 49])
    })
    it ('on bottom left corner', () => {
      expect(getNeighbors(90, 10, 10)).toEqual([80, 81, 91])
    })
    it ('on bottom right corner', () => {
      expect(getNeighbors(99, 10, 10)).toEqual([88, 89, 98])
    })
  })
  describe('shuffle', () => {
    it ('diff', () => {
      const arr = [1, 2, 3, 4, 5, 6]
      expect(shuffle(arr.slice())).not.toEqual(arr)
    })
  })
  describe('generateMines', () => {
    it ('correct number', () => {
      const board = createBoard(2, 2)
      generateMines(board, 2)
      expect(board.filter(v => v.mine).length).toBe(2)
    })
  })
}
