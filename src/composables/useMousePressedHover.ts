import type { Ref } from 'vue'

const pressed = ref(false)

export interface PressedOptions {
  onPressedEnter?: () => void
  onPressedLeave?: () => void
  onMouseUp?: () => void
}

export function useMousePressedHover(el: Ref<HTMLElement | null>, options: PressedOptions) {
  const { onPressedEnter, onPressedLeave, onMouseUp } = options
  useEventListener('mouseup', (e) => {
    if (e.button === 0)
      pressed.value = false
  })
  useEventListener(el, 'mousedown', (e: MouseEvent) => {
    if (e.button === 0) {
      pressed.value = true
      onPressedEnter?.()
    }
  })
  useEventListener(el, 'mouseenter', (e: MouseEvent) => {
    if (e.button === 0) {
      if (pressed.value)
        onPressedEnter?.()
    }
  })
  useEventListener(el, 'mouseleave', (e: MouseEvent) => {
    if (e.button === 0) {
      if (pressed.value)
        onPressedLeave?.()
    }
  })

  useEventListener(el, 'mouseup', (e: MouseEvent) => {
    if (e.button === 0) {
      if (pressed.value)
        onMouseUp?.()
    }
  })
}
