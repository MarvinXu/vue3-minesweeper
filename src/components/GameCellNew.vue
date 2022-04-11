<script setup lang="ts">
import type { Cell } from '~/composables'
import { CellState } from '~/composables'
import { handleLeftClick, handleRightClick } from '~/store'

function getCellClass(cell: Cell) {
  const classClosed = 'border3d border-[calc(var(--sz)/7.5)]'
  const classOpend = 'border-gray border-1px'
  const classDefaultBg = 'bg-#c6c6c6'

  const numberColors = [
    'text-blue',
    'text-green',
    'text-red',
    'text-darkblue',
    'text-brown',
    'text-cyan',
    'text-black',
    'text-gray',
  ]

  const num = cell.adjacentMineCount
  const map: Record<number, string> = {
    [CellState.CLOSED_EMPTY]: classClosed,
    [CellState.CLOSED_FLAG]: `${classClosed} ${classDefaultBg}`,
    [CellState.CLOSED_FLAG_WRONG]: `${classClosed} bg-pink`,
    [CellState.OPENED_MINE]: `${classOpend} ${classDefaultBg}`,
    [CellState.OPENED_MINE_HIT]: `${classOpend} bg-red`,
    [CellState.OPENED_NUMBER]: `${classOpend} ${numberColors[num - 1]}`,
  }

  return map[cell.state]
}

function getCellInnerClass(cell: Cell) {
  const classFlagged = 'h-full w-full bg-flag bg-center bg-120%'
  const classMine = 'i-carbon:uv-index-filled text-black'

  const num = cell.adjacentMineCount
  const map: Record<number, string> = {
    [CellState.CLOSED_EMPTY]: '',
    [CellState.CLOSED_FLAG]: `${classFlagged}`,
    [CellState.CLOSED_FLAG_WRONG]: `${classFlagged}`,
    [CellState.OPENED_MINE]: `${classMine}`,
    [CellState.OPENED_MINE_HIT]: `${classMine}`,
    [CellState.OPENED_NUMBER]: `i-carbon-number-${num} h-full w-full`,
  }

  return map[cell.state]
}

const props = defineProps<{ cell: Cell }>()
const cellClass = computed(() => getCellClass(props.cell))
const innerClass = computed(() => getCellInnerClass(props.cell))
</script>
<template>
  <div
    w="$sz" h="$sz"
    text="xl"
    font="bold"
    box="border"
    cursor="default"
    flex="~ shrink-0"
    justify="center"
    class="items-center active:(border-gray border-1px)"
    :class="cellClass"
    @click="handleLeftClick(cell)"
    @contextmenu.prevent="handleRightClick(cell)"
  >
    <div :class="innerClass" />
  </div>
</template>
