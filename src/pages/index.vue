<script setup lang="ts">
import { Game } from '~/composables/minesweeper'

const COLS = 8
const ROWS = 10
const BASE_SIZE = 30
const el = ref(null)
const varCols = useCssVar('--cols', el)
const varSz = useCssVar('--sz', el)
const varGridW = useCssVar('--gridW', el)
varCols.value = COLS.toString()
varSz.value = `${BASE_SIZE}px`
varGridW.value = 'calc(var(--sz)*var(--cols))'
// style="--cols: 4;--sz: 30px;--gridW: calc(var(--sz)*var(--cols))"
const game = new Game(COLS, ROWS, 10)

</script>

<template>
  <div>Minesweeper</div>
  <button class="" @click="game.reset()">
    reset
  </button>
  <GameBoard
    ref="el"
    :grid="game.grid"
    @cell-click="(cell) => game.onClick(cell)"
    @cell-right-click="(cell) => game.onRightClick(cell)"
  />
</template>
