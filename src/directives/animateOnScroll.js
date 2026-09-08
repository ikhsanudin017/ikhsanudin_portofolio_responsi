import { watch } from 'vue'
import { motionEnabled } from '../composables/useMotion'

const states = new WeakMap()
export default {
  mounted(el, binding) {
    if (!motionEnabled.value || !('IntersectionObserver' in window) || !el.animate) return
    const state = { animation: null, observer: null, stop: null }
    state.observer = new IntersectionObserver((entries) => {
      if (!entries.some((entry) => entry.isIntersecting)) return
      state.observer.disconnect()
      if (!motionEnabled.value) return
      state.animation = el.animate([
        { opacity: 0, translate: '0 28px' },
        { opacity: 1, translate: '0 0' },
      ], {
        duration: 750,
        delay: Math.min(Number(binding.value) || 0, 5) * 75,
        easing: 'cubic-bezier(.16,1,.3,1)',
        fill: 'backwards',
      })
    }, { threshold: 0.08 })
    state.stop = watch(motionEnabled, (enabled) => {
      if (!enabled) { state.animation?.cancel(); state.observer.disconnect() }
    })
    state.observer.observe(el)
    states.set(el, state)
  },
  beforeUnmount(el) {
    const state = states.get(el)
    state?.observer.disconnect()
    state?.animation?.cancel()
    state?.stop()
    states.delete(el)
  },
}
