<script setup lang="ts">
import { reset } from '~/store'
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
      <digit-display :num="40" />
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
        <!-- <div i-openmoji:slightly-smiling-face /> -->
        <div i-openmoji:face-with-crossed-out-eyes />
        <!-- <div i-openmoji:smiling-face-with-sunglasses /> -->
      </div>
      <digit-display :num="999" />
    </div>
  </div>
</template>
