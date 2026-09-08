import { computed, nextTick, ref } from 'vue'
import { motionEnabled } from './useMotion'

const root = document.documentElement
const theme = ref(root.dataset.theme === 'light' ? 'light' : 'dark')
const switching = ref(false)
const isDarkMode = computed(() => theme.value === 'dark')

function applyTheme(value) {
  theme.value = value
  root.dataset.theme = value
  root.classList.toggle('dark', value === 'dark')
  root.style.colorScheme = value
  try { localStorage.setItem('theme', value) } catch { /* Private browsing may block storage. */ }
}

async function fallbackReveal(next, x, y, radius) {
  const veil = document.createElement('div')
  veil.className = 'theme-reveal-veil'
  veil.style.background = next === 'light' ? '#ffffff' : '#080f1b'
  document.body.append(veil)
  try {
    await veil.animate([
      { clipPath: `circle(0px at ${x}px ${y}px)` },
      { clipPath: `circle(${radius}px at ${x}px ${y}px)` },
    ], { duration: 500, easing: 'cubic-bezier(.65,0,.25,1)', fill: 'forwards' }).finished
    applyTheme(next)
    await nextTick()
    await veil.animate([{ opacity: 1 }, { opacity: 0 }], { duration: 260, fill: 'forwards' }).finished
  } finally { veil.remove() }
}

async function toggleTheme(event) {
  if (switching.value) return
  const next = isDarkMode.value ? 'light' : 'dark'
  if (!motionEnabled.value || !root.animate) { applyTheme(next); return }
  const bounds = event?.currentTarget?.getBoundingClientRect()
  const x = bounds ? bounds.left + bounds.width / 2 : innerWidth / 2
  const y = bounds ? bounds.top + bounds.height / 2 : 40
  const radius = Math.hypot(Math.max(x, innerWidth - x), Math.max(y, innerHeight - y)) + 24
  switching.value = true
  root.classList.add('theme-switching')
  let transition
  try {
    if (document.startViewTransition) {
      transition = document.startViewTransition(async () => { applyTheme(next); await nextTick() })
      // A skipped transition (for example in a background tab) must not leave the toggle locked.
      transition.finished.catch(() => {})
      await transition.ready
      await root.animate([
        { clipPath: `circle(0px at ${x}px ${y}px)` },
        { clipPath: `circle(${radius}px at ${x}px ${y}px)` },
      ], {
        duration: 900,
        easing: 'cubic-bezier(.65,0,.2,1)',
        pseudoElement: '::view-transition-new(root)',
      }).finished
      await transition.finished
    } else {
      await fallbackReveal(next, x, y, radius)
    }
  } catch {
    transition?.skipTransition()
    applyTheme(next)
  } finally {
    switching.value = false
    root.classList.remove('theme-switching')
  }
}

export { theme, isDarkMode, switching, toggleTheme }
