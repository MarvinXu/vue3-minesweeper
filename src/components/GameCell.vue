<script setup lang="ts">
import type { Cell } from '~/types'

const props = defineProps<{ cell: Cell }>()
const numberColors = [
  'text-transparent',
  'text-blue-500',
  'text-green-500',
  'text-yellow-500',
  'text-orange-500',
  'text-red-500',
  'text-purple-500',
  'text-pink-500',
  'text-teal-500',
]

const cellClass = computed(() => {
  if (props.cell.revealed)
    return 'border-#808080 border-1px'

  return props.cell.mine
    ? 'bg-red-500/50'
    : numberColors[props.cell.num]
})

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
