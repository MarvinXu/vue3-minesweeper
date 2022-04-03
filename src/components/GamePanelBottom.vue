<script setup lang="ts">
const [flagMode, toggle] = useToggle(false)
</script>
<template>
  <div>
    <!-- toggle flag mode -->
    <div
      w10
      h10
      flex items-center justify-center
      border3d-2
      @click="toggle()"
    >
      <div
        v-if="flagMode"
        i-carbon:flag-filled
        text="red 2xl"
      />
      <div
        v-else
        i-carbon:flag
        text-xl
      />
    </div>
  </div>
</template>
