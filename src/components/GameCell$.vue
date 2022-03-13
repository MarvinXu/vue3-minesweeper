<script setup lang="ts">
import type { Cell } from '~/types'

defineProps<{ cell: Cell }>()

</script>
<template>
  <div
    w="$sz" h="$sz"
    text="10px"
    box="border"
    border="[calc(var(--sz)/8)] t-white r-gray b-gray l-white"
    cursor="default"
    flex="shrink-0"
    bg="#c6c6c6"
  >
    {{ cell.id }}
  </div>
</template>
<style>
body{
  background-color: #000;
}
</style>
