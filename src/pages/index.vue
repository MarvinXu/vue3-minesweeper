<script setup lang="ts">
import { el, grid } from '~/store'
</script>
<template>
  <!-- border -->
  <div
    w-full
    h-full
    border3d border-6
    select-none
  >
    <!-- container -->
    <div
      bg="#c6c6c6"
      h="full"
      flex="~ col"
      p="x-3 y-2.5"
    >
      <game-panel-top />
      <game-grid-new
        ref="el"
        :grid="grid"
      />
      <game-panel-bottom />
    </div>
  </div>
</template>
