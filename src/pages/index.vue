<script setup lang="ts">
import { calculateNums, createBoard, expandCell, generateMines } from '~/composables/minesweeper'
import type { Cell } from '~/types'

const COLS = 10
const ROWS = 10
const BASE_SIZE = 30
const el = ref(null)
const varCols = useCssVar('--cols', el)
const varSz = useCssVar('--sz', el)
varCols.value = COLS.toString()
varSz.value = `${BASE_SIZE}px`
const board = createBoard(COLS, ROWS)
generateMines(board, 10)
calculateNums(board, COLS, ROWS)

function onClick(cell: Cell) {
  cell.revealed = true
  if (!cell.mine)
    expandCell(board, cell, COLS, ROWS)
}
</script>

<template>
  <div>Minesweeper</div>
  <GameBoard ref="el" :board="board" @cell-click="onClick" />
</template>
