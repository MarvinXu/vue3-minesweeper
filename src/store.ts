import { useMineSweeper } from '~/composables'
const {
  state,
  grid,
  handleRightClick,
  reset,
  el,
  getMouseHandlers,
  minesLeft,
  timeElapsed,
} = useMineSweeper()

export {
  state,
  grid,
  handleRightClick,
  el,
  reset,
  getMouseHandlers,
  minesLeft,
  timeElapsed,
}
