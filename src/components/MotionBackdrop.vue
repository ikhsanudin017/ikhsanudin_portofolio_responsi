<template>
  <div class="motion-backdrop" aria-hidden="true">
    <div class="ambient-light ambient-light--cyan"></div>
    <div class="ambient-light ambient-light--green"></div>
    <div class="motion-grid"></div>
    <canvas ref="canvas"></canvas>
  </div>
  <div class="reading-progress" aria-hidden="true" :style="{ transform: `scaleX(${progress})` }"></div>
  <button class="motion-toggle" @click="toggleMotion" :aria-pressed="paused" :disabled="reduced"
    :aria-label="reduced ? 'Animasi dikurangi sesuai pengaturan perangkat' : paused ? 'Aktifkan animasi' : 'Jeda animasi'">
    <svg v-if="motionEnabled" width="12" height="12" viewBox="0 0 12 12" fill="currentColor" aria-hidden="true"><path d="M2 1h3v10H2zM7 1h3v10H7z" /></svg>
    <svg v-else width="12" height="12" viewBox="0 0 12 12" fill="currentColor" aria-hidden="true"><path d="m3 1 8 5-8 5z" /></svg>
    {{ motionEnabled ? 'Jeda animasi' : reduced ? 'Gerakan dikurangi' : 'Aktifkan animasi' }}
  </button>
</template>

<script setup>
import { onMounted, onUnmounted, ref, watch } from 'vue'
import { motionEnabled, paused, reduced, toggleMotion } from '../composables/useMotion'
import { isDarkMode } from '../composables/useTheme'

const canvas = ref(null)
const progress = ref(0)
let context, frame = 0, width = 0, height = 0, time = 0, previous = 0
let pointer = { x: 0.7, y: 0.4 }, target = { ...pointer }
let resizeObserver
const stars = Array.from({ length: 46 }, (_, index) => ({
  x: ((index * 73 + 19) % 101) / 101,
  y: ((index * 47 + 7) % 97) / 97,
  radius: index % 3 === 0 ? 1.5 : 0.8,
}))

function draw() {
  if (!context) return
  context.clearRect(0, 0, width, height)
  if (!isDarkMode.value) {
    // Quiet, offset print contours for the daylight studio theme.
    const centerX = width * 0.9 + (pointer.x - 0.5) * 22
    const centerY = height * 0.44 + Math.sin(time * 0.18) * 18
    for (let ring = 0; ring < 7; ring++) {
      context.beginPath()
      context.ellipse(centerX, centerY, width * 0.3 + ring * 18, height * 0.38 + ring * 15,
        -0.5 + Math.sin(time * 0.1) * 0.04, 0, Math.PI * 2)
      context.strokeStyle = ring % 2 ? 'rgba(0,123,255,0.065)' : 'rgba(76,153,255,0.055)'
      context.lineWidth = 1
      context.stroke()
    }
    return
  }
  for (const [index, star] of stars.entries()) {
    const x = star.x * width + Math.sin(time * 0.18 + index) * 12
    const y = star.y * height + Math.cos(time * 0.12 + index) * 12
    context.fillStyle = `rgba(148, 218, 230, ${0.16 + (Math.sin(time + index) + 1) * 0.14})`
    context.beginPath()
    context.arc(x, y, star.radius, 0, Math.PI * 2)
    context.fill()
  }
  // One flowing wire ribbon replaces hundreds of animated DOM particles.
  const strands = width < 640 ? 9 : 17
  for (let strand = 0; strand < strands; strand++) {
    context.beginPath()
    for (let x = -20; x <= width + 20; x += 12) {
      const ratio = x / width
      const wave = Math.sin(ratio * 5.5 + time * 0.22 + strand * 0.055)
      const y = height * 0.56 + wave * height * 0.17 + Math.cos(ratio * 3 - time * 0.15) * 55
        + strand * 9 + (pointer.y - 0.5) * 36 + Math.sin(ratio * Math.PI) * (pointer.x - 0.5) * 55
      if (x === -20) context.moveTo(x, y)
      else context.lineTo(x, y)
    }
    const gradient = context.createLinearGradient(0, 0, width, 0)
    gradient.addColorStop(0, 'rgba(34,211,238,0)')
    gradient.addColorStop(0.45, 'rgba(34,211,238,0.055)')
    gradient.addColorStop(0.8, `rgba(52,211,153,${0.1 + strand * 0.003})`)
    gradient.addColorStop(1, 'rgba(34,211,238,0.025)')
    context.strokeStyle = gradient
    context.lineWidth = 0.8
    context.stroke()
  }
}
function tick(now) {
  if (now - previous >= 1000 / 30) {
    time += Math.min((now - previous) / 1000, 0.06)
    previous = now
    pointer.x += (target.x - pointer.x) * 0.06
    pointer.y += (target.y - pointer.y) * 0.06
    draw()
  }
  frame = requestAnimationFrame(tick)
}
function syncAnimation() {
  cancelAnimationFrame(frame)
  if (context && motionEnabled.value && !document.hidden) {
    previous = performance.now()
    frame = requestAnimationFrame(tick)
  } else draw()
}
function resize() {
  width = window.innerWidth
  height = window.innerHeight
  const dpr = Math.min(window.devicePixelRatio || 1, 1.5)
  canvas.value.width = width * dpr
  canvas.value.height = height * dpr
  context?.setTransform(dpr, 0, 0, dpr, 0, 0)
  draw()
  updateProgress()
}
function move(event) {
  if (event.pointerType === 'mouse' && motionEnabled.value) target = { x: event.clientX / width, y: event.clientY / height }
}
function updateProgress() {
  const distance = document.documentElement.scrollHeight - window.innerHeight
  progress.value = distance > 0 ? Math.min(1, Math.max(0, window.scrollY / distance)) : 0
}
watch(motionEnabled, syncAnimation)
watch(isDarkMode, draw)
onMounted(() => {
  context = canvas.value.getContext('2d')
  resize()
  syncAnimation()
  window.addEventListener('resize', resize)
  window.addEventListener('pointermove', move, { passive: true })
  window.addEventListener('scroll', updateProgress, { passive: true })
  document.addEventListener('visibilitychange', syncAnimation)
  resizeObserver = new ResizeObserver(updateProgress)
  resizeObserver.observe(document.body)
})
onUnmounted(() => {
  cancelAnimationFrame(frame)
  resizeObserver?.disconnect()
  window.removeEventListener('resize', resize)
  window.removeEventListener('pointermove', move)
  window.removeEventListener('scroll', updateProgress)
  document.removeEventListener('visibilitychange', syncAnimation)
})
</script>

<style scoped>
.motion-backdrop { position: fixed; inset: 0; pointer-events: none; overflow: hidden; z-index: 0; background: #080f1b; }
canvas { position: absolute; inset: 0; width: 100%; height: 100%; }
.motion-grid { position: absolute; inset: 0; background-image: linear-gradient(#8fd6dd06 1px, transparent 1px), linear-gradient(90deg, #8fd6dd06 1px, transparent 1px); background-size: 72px 72px; mask-image: linear-gradient(transparent, #000 40%, transparent); }
.ambient-light { position: absolute; width: 65vw; height: 65vw; border-radius: 50%; opacity: .7; animation: ambient-drift 22s ease-in-out infinite alternate; }
.ambient-light--cyan { top: -35vw; right: -12vw; background: radial-gradient(circle, #0c85942b, transparent 65%); }
.ambient-light--green { bottom: -40vw; left: -20vw; background: radial-gradient(circle, #166e5d26, transparent 65%); animation-delay: -11s; }
.reading-progress { position: fixed; inset: 0 0 auto; height: 2px; z-index: 100; background: linear-gradient(90deg, #22d3ee, #6ee7b7); transform-origin: left; box-shadow: 0 0 10px #22d3ee80; }
.motion-toggle { position: fixed; right: 20px; bottom: 18px; z-index: 40; display: flex; align-items: center; gap: 9px; padding: 10px 14px; border: 1px solid #93cbd52b; border-radius: 30px; background: #0c1829ed; color: #b5c9d5; font-size: 11px; letter-spacing: .04em; backdrop-filter: blur(12px); }
.motion-toggle:hover { border-color: #67e8f9; color: #fff; }
.motion-toggle:disabled { cursor: default; }
@keyframes ambient-drift { to { transform: translate(8%, 12%) scale(1.15); } }
@media (max-width: 640px) { .motion-toggle { right: 12px; bottom: 12px; padding: 9px 12px; } }
</style>
