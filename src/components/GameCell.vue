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
  if (cell.revealed) {
    styles.push('border-gray border-1px')
    if (cell.mine)
      styles.push('bg-red')
    if (cell.num > 0)
      styles.push(numberColors[props.cell.num])
  }
  else {
    styles.push('border-[calc(var(--sz)/8)] border-t-white border-r-gray border-b-gray border-l-white')
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
    class="items-center"
    bg="#c6c6c6"
    :class="cellClass"
  >
    <template v-if="cell.revealed">
      <div v-if="cell.mine" class="i-fa:bomb" />
      <template v-else-if="cell.num > 0">
        {{ cell.num }}
      </template>
    </template>

    <div v-else-if="cell.flagged" class="i-fa:flag" />
    <!-- <template v-else>
      {{ cell.id }}
    </template> -->
  </div>
</template>
