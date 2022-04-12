<script setup lang="ts">
import { GameState } from '~/composables'
import { minesLeft, reset, state, timeElapsed } from '~/store'
const icon = computed(() => {
  const map: Record<number, string> = {
    [GameState.WAITING]: 'i-openmoji:slightly-smiling-face',
    [GameState.PLAYING]: 'i-openmoji:slightly-smiling-face',
    [GameState.LOST]: 'i-openmoji:face-with-crossed-out-eyes',
    [GameState.WON]: 'i-openmoji:smiling-face-with-sunglasses',
  }

  return map[state.value]
})
</script>
<template>
  <div
    border3d-invert-6
    m="b-2.5"
  >
    <div
      flex="~"
      justify="between"
      h="15"
      p="2"
    >
      <digit-display :num="minesLeft" />
      <!-- reset button -->
      <div
        w="11"
        h="11"
        border3d border-4
        class="active:(border3d border-6)"
        flex items-center justify-center
        text="3xl"
        @click="reset"
      >
        <div :class="[icon]" />
      </div>
      <digit-display :num="timeElapsed" />
    </div>
  </div>
</template>
