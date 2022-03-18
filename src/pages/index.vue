<script setup lang="ts">
import { Game } from '~/composables/minesweeper'

const COLS = 10
const ROWS = 10
const BASE_SIZE = 30
const el = ref(null)
const varCols = useCssVar('--cols', el)
const varSz = useCssVar('--sz', el)
varCols.value = COLS.toString()
varSz.value = `${BASE_SIZE}px`

const game = new Game(COLS, ROWS, 10)

</script>

<template>
  <div>Minesweeper</div>
  <button class="" @click="game.reset()">
    reset
  </button>
  <GameBoard
    ref="el" :grid="game.grid"
    @cell-click="(cell) => game.onClick(cell)"
    @cell-right-click="(cell) => game.onRightClick(cell)"
  />
</template>
