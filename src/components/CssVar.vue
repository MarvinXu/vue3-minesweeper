<script setup lang="ts">
const el = ref(null)
const size = useCssVar('--size', el)

function increase() {
  const v = parseInt(size.value) + 1
  size.value = `${v}px`
}
</script>
<template>
  <div
    ref="el"
    bg="blue-400"
    w-10
    style="--size: 12px;"
    h="$size"
  />
  <button block border @click="increase()">
    add
  </button>
</template>
