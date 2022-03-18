<script setup lang="ts">
import type { Cell } from '~/types'

const props = defineProps<{ cell: Cell }>()
const numberColors = [
  'text-transparent',
  'text-blue',
  'text-green',
  'text-red',
  'text-darkblue',
  'text-brown',
  'text-cyan',
  'text-black',
  'text-gray',
]

const cellClass = computed(() => {
  const { cell } = props
  const styles = []
  if (cell.isOpen) {
    styles.push('border-gray border-1px')
    if (cell.isMine) {
      styles.push('text-black')
      if (cell.isTrigger)
        styles.push('bg-red')
      else
        styles.push('bg-#c6c6c6')
    }

    else if (cell.adjacentMineCount > 0) { styles.push('bg-#c6c6c6', numberColors[props.cell.adjacentMineCount]) }
    else { styles.push('bg-#c6c6c6') }
  }
  else {
    styles.push('bg-#c6c6c6', 'border-[calc(var(--sz)/8)] border-t-white border-r-gray border-b-gray border-l-white')
  }
  if (cell.isFlagged) {
    styles.push('text-red')
    if (cell.hasFlaggedWrongly)
      styles.push('bg-pink')
  }

  return styles.join(' ')
})

</script>
<template>
  <div
    w="$sz" h="$sz"
    text="xl"
    font="bold"
    box="border"
    cursor="default"
    flex="~ shrink-0"
    justify="center"
    class="items-center active:(border-gray border-1px)"
    :class="cellClass"
  >
    <template v-if="cell.isOpen">
      <div v-if="cell.isMine" class="i-fa:bomb" />
      <template v-else-if="cell.adjacentMineCount > 0">
        {{ cell.adjacentMineCount }}
      </template>
    </template>

    <div v-else-if="cell.isFlagged" class="h-full w-full" bg="flag center 120%" />
    <div v-else>
      {{ cell.adjacentMineCount }}
    </div>
  </div>
</template>
