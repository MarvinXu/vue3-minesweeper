<script setup lang="ts">
import { createBoard } from '~/composables/minesweeper'

const COLS = 40
const ROWS = 30
// TODO: scale
// const BASE_SIZE = 24
const board = createBoard(COLS, ROWS)

</script>
<template>
  <div
    style="--sz: 30px;"
    border="[calc(var(--sz)/6)] t-white r-gray b-gray l-white"
    h="80%"
  >
    <div border="[calc(var(--sz)/3)] #c6c6c6" h="full">
      <div
        border="[calc(var(--sz)/6)] t-gray r-white b-white l-gray"
        h="full"
        overflow="auto"
      >
        <div
          v-for="(row, i) in board"
          :key="i"
          flex="~"
        >
          <GameCell
            v-for="cell in row"
            :key="cell.id"
            :cell="cell"
          />
        </div>
      </div>
    </div>
  </div>
</template>
