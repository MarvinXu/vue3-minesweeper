import { useMineSweeper } from '~/composables'
const { grid, handleLeftClick, handleRightClick, reset, el } = useMineSweeper()

export {
  grid,
  handleLeftClick,
  handleRightClick,
  el,
  reset,
}
