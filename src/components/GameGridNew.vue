<script setup lang="ts">
import type { Grid } from '~/composables'
defineProps<{ grid: Grid }>()

</script>
<template>
  <div
    border3d-invert border-6
    flex="1"
    overflow="auto"
    m="b-2.5"
  >
    <!-- wrapper for cells, fixed width -->
    <div
      flex="~ wrap"
      w="$gridW"
    >
      <game-cell-new
        v-for="(cell, i) in grid"
        :key="i"
        :cell="cell"
      />
    </div>
  </div>
</template>
