import { computed, ref } from 'vue'

const preference = window.matchMedia('(prefers-reduced-motion: reduce)')
const reduced = ref(preference.matches)
const paused = ref(false)
preference.addEventListener('change', (event) => { reduced.value = event.matches })

export const motionEnabled = computed(() => !reduced.value && !paused.value)
export function toggleMotion() { paused.value = !paused.value }
export { reduced, paused }
