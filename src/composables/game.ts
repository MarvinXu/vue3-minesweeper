import type { PressedOptions } from './useMousePressedHover'

export enum GameState {
  WAITING,
  PLAYING,
  WON,
  LOST,
}

// cell state:
// closed-empty
// closed-flag
// closed-flag-wrong
// half-opened
// opened-empty
// opened-number
// opened-mine
// opened-mine-hit
export enum CellState {
  CLOSED_EMPTY,
  CLOSED_FLAG,
  CLOSED_FLAG_WRONG,
  HALF_OPENED,
  OPENED_EMPTY,
  OPENED_NUMBER,
  OPENED_MINE,
  OPENED_MINE_HIT,
}

export interface Cell {
  readonly id: number
  isMine: boolean
  adjacentMineCount: number
  state: CellState
}

export type Grid = Cell[]

const cellDefaults = {
  isMine: false,
  adjacentMineCount: -1,
  state: CellState.CLOSED_EMPTY,
}

export function useMineSweeper() {
  const state = ref(GameState.WAITING)
  const cols = ref(10)
  const rows = ref(10)
  const mineCount = ref(5)
  const timeElapsed = ref(0)
  let timer = 0

  // cell UI size
  const BASE_SIZE = 2
  const scale = ref(1)
  const el = ref(null)
  const varCols = useCssVar('--cols', el)
  const varSz = useCssVar('--sz', el)
  const varGridW = useCssVar('--gridW', el)

  varCols.value = cols.value.toString()
  varGridW.value = 'calc(var(--sz)*var(--cols))'
  watch(scale, () => {
    varSz.value = `${BASE_SIZE * scale.value}rem`
  }, { immediate: true })

  const grid = reactive(createGrid(cols.value, rows.value))

  const isGameOver = $computed(() => state.value === GameState.LOST || state.value === GameState.WON)

  generateMines()

  const minesLeft = computed(() => {
    return mineCount.value - grid.filter(cell => isFlagged(cell)).length
  })

  function startGame() {
    state.value = GameState.PLAYING
    timeElapsed.value = 0
    timer = window.setInterval(() => {
      timeElapsed.value++
    }, 1000)
  }

  function generateMines(): void {
    const randomIndices = shuffle(grid.map((v, i) => i))
    randomIndices.slice(0, mineCount.value).forEach((i) => {
      grid[i].isMine = true
    })

    // calculate
    grid.filter(cell => !cell.isMine)
      .forEach((cell) => {
        cell.adjacentMineCount
        = getAdjacentCells(cell)
            .filter(c => c.isMine)
            .length
      })
  }

  function getAdjacentCells(cell: Cell) {
    return getAdjacentIds(cell.id, cols.value, rows.value).map(id => grid[id])
  }

  function handleRightClick(cell: Cell) {
    if (isGameOver) return
    toggleFlag(cell)
  }

  function toggleFlag(cell: Cell) {
    if (isOpen(cell))
      return
    if (isFlagged(cell)) {
      cell.state = CellState.CLOSED_EMPTY
    }
    else {
      cell.state = CellState.CLOSED_FLAG
      checkWinning()
    }
  }

  function expandZero(cell: Cell) {
    getAdjacentCells(cell).forEach((c) => {
      if (!isOpen(c)) {
        openCell(c)
        if (c.adjacentMineCount === 0)
          expandZero(c)
      }
    })
  }

  function openCell(cell: Cell) {
    if (state.value === GameState.WAITING)
      startGame()

    if (cell.isMine) {
      cell.state = isGameOver ? CellState.OPENED_MINE : CellState.OPENED_MINE_HIT
      failGame()
    }
    else { cell.state = CellState.OPENED_NUMBER }

    checkWinning()
  }

  function failGame() {
    state.value = GameState.LOST
    clearInterval(timer)

    grid.forEach((cell) => {
      // open all mines that are not opened nor flagged
      if (cell.isMine && !isOpen(cell) && !isFlagged(cell))
        cell.state = CellState.OPENED_MINE

      // mark all wrong flags
      if (isFlagged(cell) && !cell.isMine)
        cell.state = CellState.CLOSED_FLAG_WRONG
    })
  }

  function reset() {
    state.value = GameState.WAITING
    clearInterval(timer)
    timeElapsed.value = 0
    grid.forEach((cell) => {
      Object.assign(cell, cellDefaults)
    })
    generateMines()
  }

  function checkWinning() {
    // all cells left are mines
    const notOpenedCells = grid.filter(cell => !isOpen(cell))
    if (notOpenedCells.every(cell => cell.isMine)) {
      // flag all mines
      notOpenedCells.forEach((c) => {
        c.state = CellState.CLOSED_FLAG
      })
      winGame()
    }
  }

  function winGame() {
    state.value = GameState.WON
    clearInterval(timer)
  }

  function getMouseHandlers(cell: Cell): PressedOptions {
    // set active state when press enter
    function onPressedEnter() {
      if (isGameOver || isFlagged(cell))
        return
      if (!isOpen(cell)) {
        cell.state = CellState.HALF_OPENED
      }
      else {
        getAdjacentCells(cell).forEach((c) => {
          if (!isOpen(c) && !isFlagged(c))
            c.state = CellState.HALF_OPENED
        })
      }
    }
    // unset active state when press leave
    function onPressedLeave() {
      if (isGameOver || isFlagged(cell))
        return
      if (!isOpen(cell)) {
        cell.state = CellState.CLOSED_EMPTY
      }
      else {
        getAdjacentCells(cell).forEach((c) => {
          if (!isOpen(c) && !isFlagged(c))
            c.state = CellState.CLOSED_EMPTY
        })
      }
    }
    // unset active state and trigger click
    function onMouseUp() {
      if (isGameOver || isFlagged(cell))
        return
      if (!isOpen(cell)) {
        openCell(cell)
        if (cell.adjacentMineCount === 0)
          expandZero(cell)
      }

      else {
        // auto expand when ajacent flags equals mine count
        const adjacents = getAdjacentCells(cell)
        const adjacentZeroCells: Cell[] = []
        if (adjacents.filter(c => isFlagged(c)).length === cell.adjacentMineCount) {
          adjacents.forEach((c) => {
            if (!isGameOver && !isFlagged(c))
              openCell(c)

            if (c.adjacentMineCount === 0)
              adjacentZeroCells.push(c)
          })
          // open adjacent zero cells
          adjacentZeroCells.forEach((c) => {
            expandZero(c)
          })
        }
        else {
          adjacents.forEach((c) => {
            if (!isOpen(c) && !isFlagged(c))
              c.state = CellState.CLOSED_EMPTY
          })
        }
      }
    }
    return {
      onPressedEnter,
      onPressedLeave,
      onMouseUp,
    }
  }

  return {
    state,
    grid,
    handleRightClick,
    el,
    reset,
    getMouseHandlers,
    minesLeft,
    timeElapsed,
  }
}

// -----------------------------------------------------------------------------
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

function createCell(id: number) {
  const cell = {
    id,
    ...cellDefaults,
  }

  return cell
}

function createGrid(cols: number, rows: number): Grid {
  return Array.from({ length: cols * rows }, (_, i) => createCell(i))
}

function isOpen(cell: Cell) {
  return cell.state === CellState.OPENED_EMPTY
    || cell.state === CellState.OPENED_NUMBER
    || cell.state === CellState.OPENED_MINE
    || cell.state === CellState.OPENED_MINE_HIT
}

function isFlagged(cell: Cell) {
  return cell.state === CellState.CLOSED_FLAG || cell.state === CellState.CLOSED_FLAG_WRONG
}
