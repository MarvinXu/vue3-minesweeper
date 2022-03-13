export interface Cell {
  id: number
  mine: boolean
  flagged: boolean
  revealed: boolean
  num: number
}
export type Board = Cell[]
