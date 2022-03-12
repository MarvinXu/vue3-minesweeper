interface Cell {
  id: number
  mine: boolean
  flagged: boolean
  num: number
}
export type Board = Cell[][]

// const board = reactive([])
export function createBoard(w: number, h: number): Board {
  return Array.from({ length: w }, (_, i) =>
    Array.from({ length: h }, (_, j) => {
      const cell: Cell = {
        id: i * w + j,
        mine: false,
        flagged: false,
        num: 0,
      }
      return cell
    }),
  )
}

function shuffle(arr: any[]) {
  for (let i = arr.length - 1; i >= 0; i--) {
    const t: number = Math.floor(Math.random() * i);
    // swap
    [arr[i], arr[t]] = [arr[t], arr[i]]
  }
}

if (import.meta.vitest) {
  const { it, expect } = import.meta.vitest
  it('shuffle', () => {
    const arr = [1, 2, 3, 4, 5, 6]
    expect(shuffle(arr)).not.toEqual(arr)
  })
}
