export interface Cell {
  id: number
  isMine: boolean
  isFlagged: boolean
  isOpen: boolean
  adjacentMineCount: number
}
/**
 * Use flat array as grid, easier to manipulate
 */
export type Grid = Cell[]
