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
    border3d-invert-6
    h="full"
    overflow="auto"
    m="b-2.5"
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
</template>
