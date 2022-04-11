import { useMineSweeper } from '~/composables'
const { grid, handleLeftClick, handleRightClick, reset, el, getMouseHandlers } = useMineSweeper()

export {
  grid,
  handleLeftClick,
  handleRightClick,
  el,
  reset,
  getMouseHandlers,
}
