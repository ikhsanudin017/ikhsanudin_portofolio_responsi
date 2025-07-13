<template>
  <footer id="contact" class="relative bg-transparent py-24 font-tech overflow-hidden">
    <div class="absolute inset-0 z-0">
      <div class="particle-sea">
        <div class="particle" v-for="n in 100" :key="`p-${n}`" :style="{
          '--x': `${Math.random() * 100}vw`,
          '--y': `${Math.random() * 100}vh`,
          '--d': `${Math.random() * 8 + 7}s`,
          '--s': `${Math.random() * 2 + 1}px`
        }"></div>
      </div>
      <div class="sonar-grid"></div>
      <div class="energy-currents"></div>
    </div>

    <div class="container mx-auto px-6 text-center relative z-10">
      <div class="mb-12">
        <h2 class="text-5xl font-bold text-slate-100 mb-4 animate-pulse-slow" style="text-shadow: 0 0 15px rgba(34, 211, 238, 0.4);">
          HUBUNGI SAYA
        </h2>
        <div class="w-32 h-1 bg-gradient-to-r from-cyan-400 to-emerald-400 mx-auto rounded-full animate-glow"></div>
      </div>

      <p class="text-lg text-slate-300 mb-12 max-w-2xl mx-auto font-sans leading-relaxed">
        Saya selalu terbuka untuk diskusi, kolaborasi, atau sekadar menyapa. Jangan ragu untuk mengirimkan saya email.
      </p>

      <div class="mb-16 relative">
        <div class="holographic-border">
          <a href="mailto:ikhsankuliah017@gmail.com" class="cta-button-primary">
            <span class="relative z-10">ikhsankuliah017@gmail.com</span>
          </a>
        </div>
      </div>

      <div class="flex justify-center space-x-6 md:space-x-8 mb-16">
        <a v-for="social in socialLinks" :key="social.name" :href="social.url" target="_blank" :aria-label="social.name" class="social-link">
          <div class="social-icon-container">
            <span v-html="social.icon"></span>
          </div>
        </a>
      </div>

      <div class="border-t border-slate-700 pt-8 relative">
        <div class="absolute inset-x-0 top-0 h-[1px] bg-gradient-to-r from-transparent via-cyan-400 to-transparent opacity-50"></div>
        <p class="text-slate-400 text-sm">
          &copy; {{ new Date().getFullYear() }} Ikhsanudin. Dibuat dengan <span class="text-red-400 animate-pulse">♥</span> dan Vue.js.
        </p>
      </div>
    </div>
  </footer>
</template>

<script setup>
import { ref } from 'vue';

const socialLinks = ref([
  { name: 'GitHub', url: 'https://github.com/ikhsanudin017', icon: '<svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="currentColor"><path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.91 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/></svg>' },
  { name: 'LinkedIn', url: 'https://www.linkedin.com/in/ikhsanudin-ikhsan-6b26ab2b8/', icon: '<svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="currentColor"><path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/></svg>' },
  { name: 'Twitter', url: '#', icon: '<svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="currentColor"><path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z"/></svg>' },
]);
</script>

<style scoped>
/* BACKGROUND BARU DARI HERO */
.footer-background {
  background-color: #0A192F;
  background-image: radial-gradient(ellipse at 50% 100%, rgba(16, 185, 129, 0.15) 0%, transparent 70%);
}
.particle-sea {
  position: absolute;
  inset: 0;
  pointer-events: none;
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
    transform: translate(calc(var(--x) / 15), calc(var(--y) / 15));
    opacity: 0.2;
  }
}
.sonar-grid {
  position: absolute;
  top: 50%; left: 50%;
  width: 1px; height: 1px;
  background-color: transparent;
  border-radius: 50%;
  box-shadow: 0 0 100px 50px rgba(14, 165, 233, 0.1);
  animation: sonar-pulse 4s linear infinite;
  pointer-events: none;
}
@keyframes sonar-pulse {
  0% { transform: scale(0); opacity: 0.8; }
  100% { transform: scale(20); opacity: 0; }
}
.energy-currents {
  position: absolute; inset: 0;
  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 800 800'%3E%3Cpath d='M0 400 Q 200 350 400 400 T 800 400' stroke='%230ea5e9' stroke-width='2' fill='none' stroke-linecap='round'/%3E%3Cpath d='M0 450 Q 200 500 400 450 T 800 450' stroke='%2310b981' stroke-width='2' fill='none' stroke-linecap='round'/%3E%3C/svg%3E");
  background-size: 800px 800px;
  opacity: 0.05;
  animation: wave-flow 15s linear infinite;
  pointer-events: none;
}
@keyframes wave-flow {
  from { background-position-x: 0px; }
  to { background-position-x: -800px; }
}

/* Glow & Pulse Animation */
@keyframes glow { 0%, 100% { box-shadow: 0 0 20px rgba(14, 165, 233, 0.6); } 50% { box-shadow: 0 0 30px rgba(16, 185, 129, 0.8); } }
.animate-glow { animation: glow 2s ease-in-out infinite; }
@keyframes pulse-slow { 0%, 100% { opacity: 1; filter: drop-shadow(0 0 10px rgba(34, 211, 238, 0.3)); } 50% { opacity: 0.8; filter: drop-shadow(0 0 15px rgba(34, 211, 238, 0.1));} }
.animate-pulse-slow { animation: pulse-slow 3s ease-in-out infinite; }

/* Holographic Button */
.holographic-border {
  position: relative;
  padding: 2px;
  border-radius: 12px;
  background: linear-gradient(45deg, #0ea5e9, #06b6d4, #10b981, #0ea5e9);
  background-size: 300% 300%;
  animation: holographic 3s ease-in-out infinite;
  display: inline-block;
}
@keyframes holographic {
  0%, 100% { background-position: 0% 50%; }
  50% { background-position: 100% 50%; }
}
.cta-button-primary {
  @apply inline-block bg-gradient-to-r from-slate-900 to-slate-800 text-white font-bold py-5 px-10 rounded-lg shadow-2xl transform hover:scale-105 transition-all duration-300 text-lg uppercase tracking-wider border-2 border-transparent;
  position: relative;
  overflow: hidden;
}
.cta-button-primary::before {
  content: '';
  position: absolute;
  top: 0; left: -100%;
  width: 100%; height: 100%;
  background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.2), transparent);
  transition: left 0.5s;
}
.cta-button-primary:hover::before {
  left: 100%;
}
.cta-button-primary:hover {
  text-shadow: 0 0 20px rgba(14, 165, 233, 0.8);
}

/* Social Links */
.social-link { display: inline-block; transition: all 0.3s ease; }
.social-icon-container {
  @apply w-14 h-14 md:w-16 md:h-16 rounded-full border-2 border-slate-600 flex items-center justify-center text-slate-400 bg-gradient-to-br from-slate-800 to-slate-900 shadow-lg;
  transition: all 0.3s ease;
  position: relative;
  overflow: hidden;
}
.social-icon-container::before {
  content: '';
  position: absolute;
  top: 0; left: 0;
  width: 100%; height: 100%;
  background: linear-gradient(45deg, transparent, rgba(14, 165, 233, 0.2), transparent);
  transform: translateX(-100%);
  transition: transform 0.6s ease;
}
.social-link:hover .social-icon-container {
  @apply border-cyan-400 text-cyan-400 shadow-2xl;
  transform: translateY(-5px) scale(1.1);
  box-shadow: 0 20px 40px rgba(14, 165, 233, 0.3);
}
.social-link:hover .social-icon-container::before {
  transform: translateX(100%);
}
</style>
