<script setup lang="ts">
const props = defineProps<{
  num: number
}>()
const padded = computed(() => {
  return props.num.toString().padStart(3, '0')
})
</script>
<template>
  <div
    bg="black"
    border3d-invert-2
    text="red 4xl"
    flex="~"
    items-center
  >
    {{ padded }}
  </div>
</template>
