<script setup lang="ts">
import type { Cell, Grid } from '~/types'
defineProps<{ grid: Grid }>()
defineEmits<{
  (e: 'cellClick', cell: Cell): void
  (e: 'cellRightClick', cell: Cell): void
}>()
</script>
<template>
  <div
    max-h="80%"
    m-x-auto
    border="[calc(var(--sz)/6)] t-white r-gray b-gray l-white"
    select-none
  >
    <div border="[calc(var(--sz)/3)] #c6c6c6" h="full">
      <div
        border="[calc(var(--sz)/6)] t-gray r-white b-white l-gray"
        h="full"
        overflow="auto"
      >
        <!-- wrapper for cells, fixed width -->
        <div
          flex="~ wrap"
          w="$gridW"
        >
          <GameCell
            v-for="(cell, i) in grid"
            :key="i"
            :cell="cell"
            @click="$emit('cellClick', cell)"
            @contextmenu.prevent="$emit('cellRightClick', cell)"
          />
        </div>
      </div>
    </div>
  </div>
</template>
