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
        border3d-4
        active:border3d-invert-4
        flex items-center justify-center
        text="3xl"
      >
        <!-- <div i-openmoji:slightly-smiling-face /> -->
        <div i-openmoji:face-with-crossed-out-eyes />
        <!-- <div i-openmoji:smiling-face-with-sunglasses /> -->
      </div>
      <digit-display :num="0" />
    </div>
  </div>
</template>
