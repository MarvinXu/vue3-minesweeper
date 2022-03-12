interface Cell {
  id: number
  isMine: boolean
  isFlag: boolean
  num: number
}
type Board = Cell[][]
export function createBoard(w: number, h: number): Board {
  return Array.from({ length: w }, (_, i) =>
    Array.from({ length: h }, (_, j) => {
      const cell: Cell = {
        id: i * w + j,
        isMine: false,
        isFlag: true,
        num: 0,
      }
      return cell
    }),
  )
}
