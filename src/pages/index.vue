<script setup lang="ts">
import { calculateNums, createBoard, generateMines } from '~/composables/minesweeper'

const COLS = 10
const ROWS = 10
const BASE_SIZE = 30
const el = ref(null)
const varCols = useCssVar('--cols', el)
const varSz = useCssVar('--sz', el)
varCols.value = COLS.toString()
varSz.value = `${BASE_SIZE}px`
const board = createBoard(COLS, ROWS)
generateMines(board, 30)
calculateNums(board, COLS, ROWS)
</script>

<template>
  <div>Minesweeper</div>
  <GameBoard ref="el" :board="board" />
</template>
