<script setup lang="ts">
import { Game } from '~/composables/minesweeper'

const COLS = 20
const ROWS = 20
const BASE_SIZE = 2
const el = ref(null)
const varCols = useCssVar('--cols', el)
const varSz = useCssVar('--sz', el)
const varGridW = useCssVar('--gridW', el)
varCols.value = COLS.toString()
varSz.value = `${BASE_SIZE}rem`
varGridW.value = 'calc(var(--sz)*var(--cols))'
// style="--cols: 4;--sz: 30px;--gridW: calc(var(--sz)*var(--cols))"
const game = new Game(COLS, ROWS, 100)

</script>

<template>
  <!-- border -->
  <div
    w-full
    h-full
    border3d-6
    select-none
  >
    <!-- container -->
    <div
      bg="#c6c6c6"
      h="full"
      flex="~ col"
      p="x-3 y-2.5"
    >
      <game-panel />
      <game-grid
        ref="el"
        :grid="game.grid"
        @cell-click="(cell) => game.onClick(cell)"
        @cell-right-click="(cell) => game.onRightClick(cell)"
      />
      <div>
        <!-- flag button -->
        <button
          w-15 h-15
          @click="game.toggleFlag()"
        >
          flag
        </button>
      </div>
    </div>
  </div>
</template>
