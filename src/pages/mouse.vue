
<script setup lang="ts">
interface Item {
  id: number
  active: boolean
  open: boolean
}
const list = reactive(Array.from({ length: 10 }, (_, i) => ({
  id: i,
  active: false,
  open: false,
})))

const pressed = ref(false)

window.addEventListener('mouseup', () => {
  pressed.value = false
})

function handleMouseDown(item: Item) {
  pressed.value = true
  item.active = true
}
function handleMouseUp(item: Item) {
  if (pressed.value) {
    item.active = false
    item.open = true
  }
}
function handleMouseEnter(item: Item) {
  if (pressed.value)
    item.active = true
}
function handleMosueLeave(item: Item) {
  if (pressed.value)
    item.active = false
}

</script>
<template>
  pressed: {{ pressed }}
  <div flex>
    <div
      v-for="item in list"
      :key="item.id"
      w10 h10 flex items-center
      justify-center select-none
      :class="[
        item.open || item.active ? 'bg-#c6c6c6' : 'bg-#c6c6c6 border-outset border-4',
        item.open ? 'text-red' : 'text-transparent'
      ]"
      @mousedown="handleMouseDown(item)"
      @mouseenter="handleMouseEnter(item)"
      @mouseleave="handleMosueLeave(item)"
      @mouseup="handleMouseUp(item)"
    >
      {{ item.id }}
    </div>
  </div>
</template>
