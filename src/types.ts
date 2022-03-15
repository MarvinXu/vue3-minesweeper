export interface Cell {
  id: number
  isMine: boolean
  isFlagged: boolean
  hasFlaggedWrongly: boolean
  isOpen: boolean
  isTrigger: boolean
  adjacentMineCount: number
}
/**
 * Use flat array as grid, easier to manipulate
 */
export type Grid = Cell[]

export enum GameState {
  WAITING,
  PLAYING,
  WON,
  LOST,
}
