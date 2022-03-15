<script setup lang="ts">
import type { Cell, Grid } from '~/types'
defineProps<{ grid: Grid }>()
defineEmits<{ (e: 'cellClick', cell: Cell): void }>()
</script>
<template>
  <div
    border="[calc(var(--sz)/6)] t-white r-gray b-gray l-white"
    select-none
    h="80%"
  >
    <div border="[calc(var(--sz)/3)] #c6c6c6" h="full">
      <div
        border="[calc(var(--sz)/6)] t-gray r-white b-white l-gray"
        h="full"
        overflow="auto"
      >
        <div
          flex="~ wrap"
          w="[calc(var(--sz)*var(--cols))]"
        >
          <GameCell
            v-for="(cell, i) in grid"
            :key="i"
            :cell="cell"
            @click="$emit('cellClick', cell)"
          />
        </div>
      </div>
    </div>
  </div>
</template>
