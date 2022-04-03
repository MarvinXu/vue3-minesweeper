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
    <div
      v-for="(c, i) in padded"
      :key="i"
      :class="`i-fad:digital${c} digit`"
      h-full
      w-6
    />
  </div>
</template>
<style scoped>
.digit{
  mask-size: 180% 180%;
  mask-position: center;
  -webkit-mask-size: 180% 180%;
  -webkit-mask-position: center;
}
</style>
