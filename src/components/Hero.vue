<template>
  <section id="hero" class="relative bg-transparent py-24 font-tech overflow-hidden">
    <div class="absolute inset-0 z-0">
      <div class="particle-sea">
        <div class="particle" v-for="n in 100" :key="`p-${n}`" :style="{
          '--x': `${Math.random() * 100}vw`,
          '--y': `${Math.random() * 100}vh`,
          '--d': `${Math.random() * 5 + 3}s`,
          '--s': `${Math.random() * 2 + 1}px`
        }"></div>
      </div>
      <div class="sonar-grid"></div>
      <div class="energy-currents"></div>
    </div>

    <div class="container mx-auto px-4 sm:px-6 py-24 md:py-32 min-h-screen flex items-center relative z-10">
      <div class="grid md:grid-cols-2 gap-8 lg:gap-16 items-center w-full">
        <div class="text-center md:text-left order-2 md:order-1">
          <h1 class="hero-title animate-fade-in-up" style="animation-delay: 100ms;">
            <div class="hero-greeting">Halo, Saya</div>
            <div class="hero-name">
              <span class="typewriter-text">{{ displayedName }}</span>
              <span class="typewriter-cursor">|</span>
            </div>
          </h1>

          <p class="hero-subtitle animate-fade-in-up" style="animation-delay: 200ms;">
            Mahasiswa & Web Developer
          </p>

          <p class="hero-description animate-fade-in-up" style="animation-delay: 300ms;">
            Saya mengubah ide dan desain menjadi aplikasi web yang fungsional, modern, dan ramah pengguna dengan teknologi masa depan.
          </p>

          <div class="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center md:justify-start mt-6 sm:mt-8 animate-fade-in-up" style="animation-delay: 400ms;">
            <div class="holographic-border-hero">
              <a href="#contact" class="cta-button-primary">
                <span class="relative z-10">Hubungi Saya</span>
              </a>
            </div>
            <a href="https://drive.google.com/uc?export=download&id=1Vu441KQsPlOIBhn-tgeNZN-5H74JL4FV" download="Ikhsanudin-CV.pdf" class="cta-button-secondary">
              <span class="relative z-10">Download CV</span>
            </a>
          </div>
        </div>

        <div class="relative flex justify-center order-1 md:order-2 animate-fade-in-up" style="animation-delay: 500ms;">
          <div class="profile-image-container">
            <div class="orbital-rings">
              <div class="ring ring-1"></div>
              <div class="ring ring-2"></div>
              <div class="ring ring-3"></div>
            </div>

            <div class="sonar-ping-emitter"></div>

            <img
              src="/ican.jpg" alt="Foto Profil Ikhsanudin"
              class="profile-avatar"
            />
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref, onMounted } from 'vue'

const displayedName = ref('')
const fullName = 'Ikhsanudin'

onMounted(() => {
  setTimeout(() => {
    typeWriter()
  }, 1000) // Mulai setelah 1 detik
})

const typeWriter = () => {
  let i = 0
  const timer = setInterval(() => {
    displayedName.value += fullName.charAt(i)
    i++
    if (i > fullName.length - 1) {
      clearInterval(timer)
    }
  }, 150) // Kecepatan mengetik 150ms per karakter
}
</script>

<style scoped>
/* Main Hero Background - Deep Ocean Theme */
.hero-background {
  background-color: #0A192F; /* Base color from slate-900 */
  background-image: radial-gradient(ellipse at 50% 50%, rgba(14, 165, 233, 0.15) 0%, transparent 70%);
  position: relative;
  min-height: 100vh;
  font-family: 'Rajdhani', sans-serif;
  overflow: hidden;
}

/* Drifting Particle Sea Effect */
.particle-sea {
  position: absolute;
  inset: 0;
}
.particle {
  position: absolute;
  top: var(--y);
  left: var(--x);
  width: var(--s);
  height: var(--s);
  background-color: #0ea5e9;
  border-radius: 50%;
  box-shadow: 0 0 8px #0ea5e9, 0 0 16px #0ea5e9;
  animation: drift var(--d) ease-in-out infinite alternate;
}
@keyframes drift {
  to {
    transform: translate(calc(var(--x) / 10), calc(var(--y) / 10));
    opacity: 0.2;
  }
}

/* Sonar Grid Pulse Effect */
.sonar-grid {
  position: absolute;
  top: 50%;
  left: 50%;
  width: 1px;
  height: 1px;
  background-color: transparent;
  border-radius: 50%;
  box-shadow: 0 0 100px 50px rgba(14, 165, 233, 0.1);
  animation: sonar-pulse 4s linear infinite;
}
@keyframes sonar-pulse {
  0% {
    transform: scale(0);
    opacity: 0.8;
  }
  100% {
    transform: scale(20);
    opacity: 0;
  }
}

/* Flowing Energy Currents */
.energy-currents {
  position: absolute;
  inset: 0;
  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 800 800'%3E%3Cpath d='M0 400 Q 200 350 400 400 T 800 400' stroke='%230ea5e9' stroke-width='2' fill='none' stroke-linecap='round'/%3E%3Cpath d='M0 450 Q 200 500 400 450 T 800 450' stroke='%2310b981' stroke-width='2' fill='none' stroke-linecap='round'/%3E%3C/svg%3E");
  background-size: 800px 800px;
  opacity: 0.1;
  animation: wave-flow 15s linear infinite;
}
@keyframes wave-flow {
  from { background-position-x: 0px; }
  to { background-position-x: -800px; }
}

/* Typography */
.hero-title {
  font-size: clamp(2rem, 5vw, 4.5rem);
  font-weight: 700;
  color: #f8fafc; /* slate-50 */
  margin-bottom: 0.5rem;
  letter-spacing: 0.02em;
}

.hero-greeting {
  display: block;
  margin-bottom: 0.5rem;
}

.hero-name {
  background: linear-gradient(45deg, #22d3ee, #0ea5e9, #10b981);
  -webkit-background-clip: text;
  background-clip: text;
  -webkit-text-fill-color: transparent;
  animation: text-glow-cycle 4s ease-in-out infinite;
  position: relative;
  display: block;
}

/* Typewriter Effect */
.typewriter-text {
  display: inline-block;
}

.typewriter-cursor {
  display: inline-block;
  color: #0ea5e9;
  animation: blink 1s infinite;
  font-weight: 400;
}

@keyframes blink {
  0%, 50% { opacity: 1; }
  51%, 100% { opacity: 0; }
}

@keyframes text-glow-cycle {
  0%, 100% {
    text-shadow: 0 0 20px rgba(34, 211, 238, 0.7);
  }
  50% {
    text-shadow: 0 0 20px rgba(16, 185, 129, 0.7);
  }
}

.hero-subtitle {
  font-size: clamp(1.125rem, 3vw, 1.75rem);
  font-weight: 500;
  color: #94a3b8; /* slate-400 */
  margin-bottom: 1.5rem;
  letter-spacing: 0.05em;
}

.hero-description {
  font-size: clamp(0.9rem, 2vw, 1.125rem);
  color: #cbd5e1; /* slate-300 */
  max-width: 600px;
  line-height: 1.7;
  margin: 0 auto 1.5rem;
}

/* CTA Buttons - Responsive Design */
.holographic-border-hero {
  @apply relative p-0.5 rounded-lg inline-block w-full sm:w-auto;
  background: linear-gradient(45deg, #0ea5e9, #06b6d4, #10b981, #0ea5e9);
  background-size: 300% 300%;
  animation: holographic 4s ease-in-out infinite;
}
@keyframes holographic {
  0%, 100% { background-position: 0% 50%; }
  50% { background-position: 100% 50%; }
}

.cta-button-primary {
  @apply inline-block font-bold py-3 px-6 sm:px-8 rounded-md transition-all duration-300 uppercase tracking-wider text-center w-full;
  background-color: #0A192F;
  color: #f8fafc;
  font-size: clamp(0.75rem, 2vw, 1rem);
  min-height: 48px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.cta-button-primary:hover {
  background-color: #1e293b;
  box-shadow: 0 0 20px rgba(14, 165, 233, 0.5);
  transform: translateY(-2px);
}

.cta-button-secondary {
  @apply inline-block font-bold py-3 px-6 sm:px-8 rounded-lg transition-all duration-300 uppercase tracking-wider text-center w-full sm:w-auto;
  background: transparent;
  color: #0ea5e9;
  border: 2px solid #0ea5e9;
  box-shadow: inset 0 0 10px rgba(14, 165, 233, 0.2);
  font-size: clamp(0.75rem, 2vw, 1rem);
  min-height: 48px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.cta-button-secondary:hover {
  background-color: rgba(14, 165, 233, 0.1);
  color: #f8fafc;
  box-shadow: 0 0 20px rgba(14, 165, 233, 0.5);
  transform: translateY(-2px);
}

/* Profile Image Section */
.profile-image-container {
  @apply relative flex items-center justify-center;
  width: clamp(200px, 40vw, 400px);
  height: clamp(200px, 40vw, 400px);
}

.profile-avatar {
  @apply w-[90%] h-[90%] rounded-full object-cover relative z-10;
  border: 4px solid #0ea5e9;
  box-shadow: 0 0 40px rgba(14, 165, 233, 0.6), inset 0 0 20px rgba(14, 165, 233, 0.4);
}

/* Orbital Rings */
.orbital-rings .ring {
  @apply absolute rounded-full;
  border-style: solid;
  border-color: transparent;
  animation: orbit-rotate 20s linear infinite;
}
.ring-1 {
  inset: 0;
  border-width: 2px;
  border-top-color: #0ea5e9;
  animation-duration: 15s;
}
.ring-2 {
  inset: 10%;
  border-width: 1px;
  border-left-color: #10b981;
  animation-direction: reverse;
  animation-duration: 20s;
}
.ring-3 {
  inset: 20%;
  border-width: 2px;
  border-bottom-color: #06b6d4;
  animation-duration: 25s;
}
@keyframes orbit-rotate {
  to { transform: rotate(360deg); }
}

.sonar-ping-emitter {
  @apply absolute inset-0 rounded-full;
  border: 2px solid rgba(14, 165, 233, 0.5);
  animation: sonar-ping 4s ease-out infinite;
}
@keyframes sonar-ping {
  0% {
    transform: scale(0.5);
    opacity: 0;
  }
  50% {
    opacity: 1;
  }
  100% {
    transform: scale(1.5);
    opacity: 0;
  }
}

/* Entry Animations */
@keyframes fade-in-up {
  from {
    opacity: 0;
    transform: translateY(40px);
    filter: blur(5px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
    filter: blur(0);
  }
}
.animate-fade-in-up {
  animation: fade-in-up 1s ease-out forwards;
  opacity: 0;
}

/* Responsive Adjustments */
@media (max-width: 640px) {
  .hero-description {
    text-align: center;
  }
  
  .profile-image-container {
    margin-bottom: 1rem;
  }
  
  .cta-button-primary,
  .cta-button-secondary {
    font-size: 0.875rem;
    padding: 0.875rem 1.5rem;
  }
}

@media (max-width: 768px) {
  .hero-description {
    margin: 0 auto 1.5rem;
  }
  
  .hero-title {
    margin-bottom: 1rem;
  }
  
  .hero-subtitle {
    margin-bottom: 1rem;
  }
}

@media (min-width: 768px) {
  .hero-description {
    text-align: left;
    margin: 0 0 1.5rem 0;
  }
}

/* Touch device optimizations */
@media (hover: none) {
  .cta-button-primary:hover,
  .cta-button-secondary:hover {
    transform: none;
  }
}
</style>