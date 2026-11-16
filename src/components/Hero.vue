<template>
  <section id="hero" ref="hero" class="hero-section" @pointermove="movePortrait" @pointerleave="resetPortrait">
    <div class="hero-layout">
      <div class="hero-copy">
        <div class="hero-eyebrow hero-enter" style="--delay: 0ms">
          <span class="status-dot" aria-hidden="true"></span>
          IDE. KODE. KARYA.
          <span class="eyebrow-line" aria-hidden="true"></span>
        </div>
        <h1 class="hero-title hero-enter" style="--delay: 100ms">
          <span class="hero-greeting">Halo, saya</span>
          <span class="hero-name">Ikhsanudin<span class="name-period">.</span></span>
        </h1>
        <p class="hero-subtitle hero-enter" style="--delay: 200ms">Content Creator <span>&</span> Web Developer</p>
        <p class="hero-description hero-enter" style="--delay: 300ms">
          Saya mengubah ide dan desain menjadi aplikasi web yang fungsional, modern, dan ramah pengguna dengan teknologi masa depan.
        </p>
        <div class="hero-actions hero-enter" style="--delay: 400ms">
          <a href="#projects" class="hero-button hero-button--primary">
            Jelajahi karya
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" aria-hidden="true"><path d="M5 12h14M12 5l7 7-7 7" /></svg>
          </a>
          <a href="/portofolio_ikhsanudin.pdf" download="portofolio_ikhsanudin.pdf" class="hero-button hero-button--secondary">
            Download CV
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" aria-hidden="true"><path d="M12 3v12m-5-5 5 5 5-5M5 16v5h14v-5" /></svg>
          </a>
        </div>
        <a href="#contact" class="hero-contact hero-enter" style="--delay: 500ms">Punya ide menarik? <span>Mari berkolaborasi ↗</span></a>
      </div>

      <div class="hero-visual hero-enter" style="--delay: 250ms">
        <div ref="scene" class="orbital-scene">
          <div class="studio-art" aria-hidden="true">
            <div class="studio-disc"></div>
            <div class="studio-outline"></div>
            <svg class="studio-sunburst" viewBox="0 0 120 120" fill="none">
              <path v-for="ray in 16" :key="ray" d="M60 12v26" :transform="`rotate(${ray * 22.5} 60 60)`" stroke="currentColor" stroke-width="5" />
            </svg>
            <span class="studio-caption">a little curiosity, a lot of creativity.</span>
          </div>
          <div class="orbit-halo" aria-hidden="true"></div>
          <svg class="orbit-art" viewBox="0 0 560 560" fill="none" aria-hidden="true">
            <defs>
              <linearGradient id="orbit-gradient" x1="60" y1="20" x2="510" y2="520" gradientUnits="userSpaceOnUse">
                <stop stop-color="#67e8f9" /><stop offset=".5" stop-color="#22d3ee" stop-opacity=".05" /><stop offset="1" stop-color="#6ee7b7" />
              </linearGradient>
            </defs>
            <g class="orbit-ring orbit-ring--outer">
              <circle cx="280" cy="280" r="248" stroke="#74c6d2" stroke-opacity=".13" />
              <circle cx="280" cy="280" r="248" stroke="url(#orbit-gradient)" stroke-width="2" stroke-dasharray="240 540 80 698" />
              <circle cx="280" cy="32" r="5" fill="#67e8f9" class="orbit-beacon" />
              <circle cx="280" cy="528" r="3" fill="#6ee7b7" />
            </g>
            <g class="orbit-ring orbit-ring--inner">
              <circle cx="280" cy="280" r="216" stroke="#9eeaf2" stroke-opacity=".22" stroke-dasharray="1 13" stroke-width="3" />
              <circle cx="280" cy="280" r="204" stroke="url(#orbit-gradient)" stroke-dasharray="180 1100" />
            </g>
            <g stroke="#89c7d2" stroke-opacity=".35">
              <path d="M280 3v15m0 524v15M3 280h15m524 0h15M85 79l11 11m368 380 11 11M79 475l11-11m380-368 11-11" />
            </g>
            <ellipse class="orbit-cross" cx="280" cy="280" rx="269" ry="95" transform="rotate(-32 280 280)" stroke="url(#orbit-gradient)" />
          </svg>
          <div class="portrait-float">
            <div class="portrait-window">
              <img src="/ican.jpg" alt="Foto profil Ikhsanudin" class="profile-avatar" fetchpriority="high" width="400" height="480" />
              <div class="portrait-shade" aria-hidden="true"></div>
              <div class="portrait-topline" aria-hidden="true"><span>CREATIVE / DEVELOPER</span><span class="portrait-cross">+</span></div>
              <div class="portrait-caption"><span>Ikhsanudin</span><span>Di balik setiap karya.</span></div>
              <div class="portrait-scan" aria-hidden="true"></div>
            </div>
          </div>
          <div class="floating-label floating-label--code" aria-hidden="true">
            <span class="label-icon">&lt;/&gt;</span><div><small>DEVELOPMENT</small><strong>Built with passion.</strong></div>
          </div>
          <div class="floating-label floating-label--design" aria-hidden="true">
            <span class="label-icon label-icon--green">✳</span><div><small>CREATIVE THINKING</small><strong>Ide jadi nyata.</strong></div>
          </div>
          <div class="orbit-coordinate" aria-hidden="true"><span class="coordinate-dot"></span> ALWAYS EXPLORING <span>↗</span></div>
        </div>
      </div>
    </div>

    <div class="hero-bottom hero-enter" style="--delay: 650ms">
      <a href="#education" class="scroll-cue"><span class="scroll-track" aria-hidden="true"><span></span></span> SCROLL UNTUK EKSPLORASI</a>
      <span class="hero-note">Dari rasa ingin tahu, menjadi karya.</span>
      <span class="hero-index" aria-hidden="true">01 — 06</span>
    </div>
    <div class="creative-strip" aria-hidden="true">
      <div class="creative-track">
        <div v-for="copy in 2" :key="copy" class="creative-sequence">
          <div v-for="word in ['CREATIVE THINKING', 'WEB DEVELOPMENT', 'CONTENT CREATION', 'CONTINUOUS LEARNING']" :key="word" class="creative-item">
            <span>{{ word }}</span>
            <svg class="strip-star" viewBox="0 0 24 24" fill="none" aria-hidden="true">
              <path d="M12 3v18M3 12h18M5.6 5.6l12.8 12.8M5.6 18.4 18.4 5.6" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" />
            </svg>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { onUnmounted, ref, watch } from 'vue'
import { motionEnabled } from '../composables/useMotion'

const hero = ref(null)
const scene = ref(null)
let frame = 0
function movePortrait(event) {
  if (!motionEnabled.value || event.pointerType !== 'mouse' || window.innerWidth < 768) return
  const bounds = hero.value.getBoundingClientRect()
  const x = (event.clientX - bounds.left) / bounds.width - 0.5
  const y = (event.clientY - bounds.top) / bounds.height - 0.5
  cancelAnimationFrame(frame)
  frame = requestAnimationFrame(() => {
    scene.value?.style.setProperty('--tilt-x', `${-y * 7}deg`)
    scene.value?.style.setProperty('--tilt-y', `${x * 9}deg`)
  })
}
function resetPortrait() {
  cancelAnimationFrame(frame)
  scene.value?.style.setProperty('--tilt-x', '0deg')
  scene.value?.style.setProperty('--tilt-y', '0deg')
}
watch(motionEnabled, (enabled) => { if (!enabled) resetPortrait() })
onUnmounted(() => cancelAnimationFrame(frame))
</script>

<style scoped>
.studio-art { display: none; }
.hero-section { position: relative; overflow: hidden; }
.hero-layout { max-width: 1280px; margin: 0 auto; padding: 78px 48px 66px; min-height: min(760px, calc(100svh - 160px)); display: grid; grid-template-columns: 1.05fr 1fr; align-items: center; gap: 22px; }
.hero-copy { position: relative; z-index: 2; }
.hero-eyebrow { display: flex; align-items: center; gap: 12px; color: #a5c6cd; font: 10px/1.5 ui-monospace, monospace; letter-spacing: .22em; margin-bottom: 30px; }
.status-dot { height: 6px; width: 6px; border-radius: 50%; background: #6ee7b7; box-shadow: 0 0 12px #6ee7b760; position: relative; }
.status-dot::after { content: ''; position: absolute; inset: -5px; border: 1px solid #6ee7b7; border-radius: 50%; animation: status-pulse 3s ease-out infinite; }
.eyebrow-line { width: 54px; height: 1px; background: #6eabb04d; }
.hero-title { letter-spacing: -.065em; line-height: 1.06; font-weight: 650; margin-bottom: 24px; }
.hero-greeting { display: block; color: #e6edf4; font-size: clamp(36px, 4.5vw, 64px); font-weight: 400; letter-spacing: -.055em; margin-bottom: 10px; }
.hero-name { display: block; width: fit-content; font-size: clamp(48px, 6.3vw, 86px); padding-bottom: 8px; background: linear-gradient(110deg, #efffff 5%, #67e8f9 35%, #6ee7b7 60%, #efffff 85%); background-size: 240% 100%; background-clip: text; -webkit-background-clip: text; color: transparent; animation: name-shimmer 10s ease-in-out infinite; }
.name-period { color: #6ee7b7; }
.hero-subtitle { color: #cedae3; font-size: clamp(14px, 1.45vw, 19px); font-weight: 500; letter-spacing: -.02em; margin-bottom: 20px; }
.hero-subtitle span { color: #5f7d91; padding: 0 3px; }
.hero-description { max-width: 450px; color: #91a5b8; font-size: 15px; line-height: 1.9; }
.hero-actions { display: flex; flex-wrap: wrap; gap: 12px; margin-top: 32px; }
.hero-button { display: inline-flex; align-items: center; justify-content: center; gap: 20px; border-radius: 8px; padding: 15px 23px; font-size: 13px; font-weight: 650; transition: transform .25s, box-shadow .25s, border-color .25s; }
.hero-button svg { transition: transform .25s; }
.hero-button:hover svg { transform: translateX(3px); }
.hero-button--primary { color: #08232a; background: #83ecd8; border: 1px solid #b6ffee80; box-shadow: 0 0 28px #6ee7b712; }
.hero-button--primary:hover { transform: translateY(-3px); box-shadow: 0 8px 32px #6ee7b72b; }
.hero-button--secondary { color: #c1d0dc; border: 1px solid #8daec530; background: #101c2c66; }
.hero-button--secondary:hover { transform: translateY(-3px); border-color: #67e8f980; }
.hero-contact { display: inline-block; color: #708a9d; font-size: 11px; margin-top: 24px; }
.hero-contact span { color: #b0c5d0; margin-left: 3px; transition: color .2s; }
.hero-contact:hover span { color: #6ee7b7; }
.hero-visual { min-width: 0; perspective: 1100px; }
.orbital-scene { position: relative; width: 100%; aspect-ratio: 1; max-width: 550px; margin: 0 auto; transform: rotateX(var(--tilt-x, 0deg)) rotateY(var(--tilt-y, 0deg)); transition: transform .5s ease-out; }
.orbit-halo { position: absolute; inset: 4%; border-radius: 50%; background: radial-gradient(circle, #22d3ee12, transparent 68%); animation: halo-breathe 6s ease-in-out infinite alternate; }
.orbit-art { position: absolute; inset: 0; width: 100%; height: 100%; overflow: visible; }
.orbit-ring { transform-origin: 280px 280px; }
.orbit-ring--outer { animation: orbit-spin 38s linear infinite; }
.orbit-ring--inner { animation: orbit-spin 65s linear infinite reverse; }
.orbit-beacon { filter: drop-shadow(0 0 5px #67e8f9); }
.orbit-cross { stroke-dasharray: 900 350; animation: orbit-trace 18s linear infinite; }
.portrait-float { position: absolute; inset: 16%; animation: portrait-float 7s ease-in-out infinite; }
.portrait-window { width: 100%; height: 100%; position: relative; border-radius: 50%; overflow: hidden; border: 4px solid #72d5e478; background: #132d34; box-shadow: 0 28px 60px #0007, 0 0 35px #22d3ee18; }
.profile-avatar { width: 100%; height: 100%; object-fit: cover; object-position: center 30%; filter: saturate(.75); }
.portrait-shade { position: absolute; inset: 0; background: linear-gradient(180deg, #07182745, transparent 35%, #08172210 50%, #071522f2); }
.portrait-topline { display: none; }
.portrait-caption { position: absolute; bottom: 10%; left: 14%; right: 14%; display: flex; flex-direction: column; align-items: center; text-align: center; gap: 4px; }
.portrait-caption span:first-child { font-size: 22px; font-weight: 600; letter-spacing: -.04em; color: #e7f8fc; }
.portrait-caption span:last-child { font-size: 9px; color: #9db9c2; }
.portrait-scan { position: absolute; top: -50%; left: -50%; width: 200%; height: 25%; background: linear-gradient(transparent, #d1fffa0d, transparent); transform: rotate(-25deg); animation: portrait-scan 9s ease-in-out infinite; pointer-events: none; }
.floating-label { position: absolute; display: flex; gap: 12px; align-items: center; padding: 13px 17px; border: 1px solid #8bb9c32b; border-radius: 10px; background: #0d1c2cde; backdrop-filter: blur(12px); box-shadow: 0 12px 28px #0003; animation: label-float 6s ease-in-out infinite; }
.floating-label--code { top: 16%; right: -1%; transform: rotate(5deg); }
.floating-label--design { bottom: 12%; left: -1%; animation-delay: -3s; }
.label-icon { display: grid; place-items: center; height: 32px; width: 32px; color: #67e8f9; background: #22d3ee10; border: 1px solid #22d3ee24; border-radius: 8px; font: 14px ui-monospace, monospace; }
.label-icon--green { color: #6ee7b7; font-size: 25px; background: #6ee7b70a; border-color: #6ee7b725; }
.floating-label small { display: block; font: 7px ui-monospace, monospace; color: #718b9d; letter-spacing: .13em; margin-bottom: 4px; }
.floating-label strong { display: block; color: #dae8ee; font-size: 11px; font-weight: 500; }
.orbit-coordinate { position: absolute; bottom: 2%; left: 50%; transform: translateX(-50%); display: flex; align-items: center; gap: 9px; white-space: nowrap; color: #6a8999; font: 8px ui-monospace, monospace; letter-spacing: .14em; }
.coordinate-dot { width: 4px; height: 4px; border-radius: 50%; background: #6ee7b7; }
.hero-bottom { max-width: 1184px; margin: 0 auto; padding: 10px 0 35px; display: flex; align-items: center; justify-content: space-between; gap: 20px; }
.scroll-cue { display: flex; align-items: center; gap: 12px; font: 8px ui-monospace, monospace; letter-spacing: .18em; color: #8ba6b6; }
.scroll-track { width: 17px; height: 26px; display: grid; justify-items: center; padding-top: 5px; border: 1px solid #7696a64d; border-radius: 10px; }
.scroll-track span { width: 2px; height: 5px; border-radius: 2px; background: #67e8f9; animation: scroll-down 2s ease-in-out infinite; }
.hero-note { color: #718797; font-size: 10px; }
.hero-index { color: #5b7587; font: 9px ui-monospace, monospace; letter-spacing: .12em; }
.creative-strip { overflow: hidden; border-top: 1px solid #809bb71a; border-bottom: 1px solid #809bb71a; background: #101e2a66; mask-image: linear-gradient(90deg, transparent, #000 32px, #000 calc(100% - 32px), transparent); }
.creative-track { display: flex; width: max-content; animation: creative-marquee 42s linear infinite; }
.creative-sequence { display: flex; align-items: center; justify-content: space-around; min-width: 100vw; flex: 0 0 auto; }
.creative-item { display: flex; align-items: center; flex: 0 0 auto; gap: clamp(28px, 3vw, 56px); padding: 22px clamp(18px, 2.5vw, 48px); }
.creative-item > span { white-space: nowrap; font-size: 12px; line-height: 20px; letter-spacing: .16em; font-weight: 500; color: #94aebc; }
.strip-star { display: block; flex: 0 0 18px; width: 18px; height: 18px; color: #62c4b2; }
.hero-enter { animation: hero-arrive 1s cubic-bezier(.16,1,.3,1) both; animation-delay: var(--delay, 0ms); }
@keyframes hero-arrive { from { opacity: 0; transform: translateY(24px); } to { opacity: 1; transform: translateY(0); } }
@keyframes orbit-spin { to { transform: rotate(360deg); } }
@keyframes orbit-trace { to { stroke-dashoffset: -1250; } }
@keyframes portrait-float { 0%, 100% { transform: translateY(0); } 50% { transform: translateY(-10px); } }
@keyframes label-float { 0%, 100% { translate: 0 0; } 50% { translate: 0 -10px; } }
@keyframes portrait-scan { 0%, 20% { top: -50%; } 70%, 100% { top: 150%; } }
@keyframes status-pulse { 0% { transform: scale(.6); opacity: .5; } 80%, 100% { transform: scale(1.5); opacity: 0; } }
@keyframes halo-breathe { to { transform: scale(1.15); opacity: .5; } }
@keyframes name-shimmer { 0%, 100% { background-position: 0% 50%; } 50% { background-position: 100% 50%; } }
@keyframes scroll-down { 0%, 100% { transform: translateY(0); opacity: .5; } 50% { transform: translateY(7px); opacity: 1; } }
@keyframes creative-marquee { to { transform: translateX(-50%); } }
@media (min-width: 1440px) { .hero-layout { padding-top: 95px; padding-bottom: 95px; } }
@media (max-width: 1279px) { .hero-bottom { margin-inline: 48px; } }
@media (max-width: 1023px) {
  .hero-layout { padding: 65px 30px 55px; gap: 0; }
  .hero-name { font-size: clamp(44px, 6.3vw, 70px); }
  .floating-label { padding: 6px 8px; gap: 6px; }
  .floating-label--code { right: -2%; top: 18%; transform: rotate(5deg) scale(.75); transform-origin: top right; }
  .floating-label--design { transform: scale(.75); transform-origin: bottom left; }
  .label-icon { width: 24px; height: 24px; font-size: 11px; }
  .label-icon--green { font-size: 19px; }
  .floating-label strong { font-size: 9px; white-space: nowrap; }
  .floating-label small { font-size: 5px; margin-bottom: 2px; }
  .hero-bottom { margin-inline: 30px; }
}
@media (max-width: 767px) {
  .hero-layout { grid-template-columns: 1fr; padding: 48px 24px 28px; gap: 22px; }
  .hero-copy { text-align: center; }
  .hero-eyebrow { justify-content: center; margin-bottom: 24px; font-size: 9px; }
  .eyebrow-line { display: none; }
  .hero-greeting { font-size: 35px; }
  .hero-name { margin-inline: auto; font-size: clamp(48px, 11vw, 76px); }
  .hero-title { margin-bottom: 15px; }
  .hero-subtitle { font-size: 14px; }
  .hero-description { margin-inline: auto; max-width: 390px; font-size: 13px; line-height: 1.85; }
  .hero-actions { justify-content: center; margin-top: 25px; }
  .hero-button { padding: 13px 17px; font-size: 12px; gap: 12px; }
  .hero-contact { font-size: 10px; margin-top: 20px; }
  .orbital-scene { max-width: 400px; }
  .hero-visual { padding: 0 4px; }
  .floating-label { animation-duration: 7s; }
  .floating-label--code { transform: rotate(5deg) scale(.7); }
  .floating-label--design { transform: scale(.7); }
  .portrait-window { border-width: 3px; }
  .portrait-caption span:first-child { font-size: 18px; }
  .portrait-caption span:last-child { font-size: 8px; }
  .hero-bottom { margin-inline: 24px; padding-bottom: 28px; }
  .hero-note { display: none; }
  .creative-item { gap: 28px; padding: 18px 18px; }
  .creative-item > span { font-size: 10px; letter-spacing: .12em; }
  .strip-star { width: 16px; height: 16px; flex-basis: 16px; }
}
@media (max-width: 359px) {
  .hero-layout { padding-inline: 18px; }
  .hero-subtitle { font-size: 12px; }
  .floating-label { padding: 5px 6px; gap: 5px; }
  .label-icon { width: 20px; height: 20px; font-size: 10px; }
  .label-icon--green { font-size: 16px; }
  .floating-label strong { font-size: 8px; }
  .portrait-caption { bottom: 10%; gap: 2px; }
  .portrait-caption span:first-child { font-size: 18px; }
}
</style>
