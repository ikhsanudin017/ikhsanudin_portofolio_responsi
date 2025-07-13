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

    <div class="container mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
      <div class="mb-8 sm:mb-12">
        <h2 class="text-3xl sm:text-4xl lg:text-5xl font-bold text-slate-100 mb-4 animate-pulse-slow" style="text-shadow: 0 0 15px rgba(34, 211, 238, 0.4);">
          HUBUNGI SAYA
        </h2>
        <div class="w-24 sm:w-32 h-1 bg-gradient-to-r from-cyan-400 to-emerald-400 mx-auto rounded-full animate-glow"></div>
      </div>

      <p class="text-base sm:text-lg text-slate-300 mb-8 sm:mb-12 max-w-2xl mx-auto font-sans leading-relaxed px-4">
        Saya selalu terbuka untuk diskusi, kolaborasi, atau sekadar menyapa. Jangan ragu untuk mengirimkan saya email.
      </p>

      <div class="mb-12 sm:mb-16 relative px-4">
        <div class="holographic-border">
          <a href="mailto:ikhsankuliah017@gmail.com" class="cta-button-primary">
            <span class="relative z-10">ikhsankuliah017@gmail.com</span>
          </a>
        </div>
      </div>

      <div class="flex justify-center space-x-4 sm:space-x-6 md:space-x-8 mb-12 sm:mb-16 px-4">
        <a v-for="social in socialLinks" :key="social.name" :href="social.url" target="_blank" :aria-label="social.name" class="social-link">
          <div class="social-icon-container">
            <span v-html="social.icon"></span>
          </div>
        </a>
      </div>

      <div class="border-t border-slate-700 pt-6 sm:pt-8 relative mx-4">
        <div class="absolute inset-x-0 top-0 h-[1px] bg-gradient-to-r from-transparent via-cyan-400 to-transparent opacity-50"></div>
        <p class="text-slate-400 text-xs sm:text-sm px-4">
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
  { name: 'Instagram', url: 'https://www.instagram.com/i_can017/?hl=en', icon: '<svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/></svg>' },
]);
</script>

<style scoped>
/* BACKGROUND DARI HERO */
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
@keyframes glow { 
  0%, 100% { box-shadow: 0 0 20px rgba(14, 165, 233, 0.6); } 
  50% { box-shadow: 0 0 30px rgba(16, 185, 129, 0.8); } 
}
.animate-glow { animation: glow 2s ease-in-out infinite; }

@keyframes pulse-slow { 
  0%, 100% { opacity: 1; filter: drop-shadow(0 0 10px rgba(34, 211, 238, 0.3)); } 
  50% { opacity: 0.8; filter: drop-shadow(0 0 15px rgba(34, 211, 238, 0.1));} 
}
.animate-pulse-slow { animation: pulse-slow 3s ease-in-out infinite; }

/* Holographic Button - Responsive */
.holographic-border {
  position: relative;
  padding: 2px;
  border-radius: 12px;
  background: linear-gradient(45deg, #0ea5e9, #06b6d4, #10b981, #0ea5e9);
  background-size: 300% 300%;
  animation: holographic 3s ease-in-out infinite;
  display: inline-block;
  width: 100%;
  max-width: 400px;
}

@keyframes holographic {
  0%, 100% { background-position: 0% 50%; }
  50% { background-position: 100% 50%; }
}

.cta-button-primary {
  display: inline-block;
  background: linear-gradient(135deg, #0f172a, #1e293b);
  color: white;
  font-weight: bold;
  border-radius: 10px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.3);
  transform: translateY(0);
  transition: all 0.3s ease;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  border: 2px solid transparent;
  position: relative;
  overflow: hidden;
  width: 100%;
  text-align: center;
  
  /* Responsive padding and font size */
  padding: 12px 16px;
  font-size: 12px;
  
  /* Minimum touch target for mobile */
  min-height: 44px;
  display: flex;
  align-items: center;
  justify-content: center;
}

/* Responsive breakpoints for email button */
@media (min-width: 480px) {
  .cta-button-primary {
    padding: 14px 20px;
    font-size: 14px;
  }
}

@media (min-width: 640px) {
  .cta-button-primary {
    padding: 16px 24px;
    font-size: 15px;
  }
}

@media (min-width: 768px) {
  .cta-button-primary {
    padding: 20px 32px;
    font-size: 16px;
  }
}

@media (min-width: 1024px) {
  .cta-button-primary {
    padding: 20px 40px;
    font-size: 18px;
  }
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
  transform: translateY(-2px);
  box-shadow: 0 15px 40px rgba(14, 165, 233, 0.3);
}

/* Social Links - Responsive */
.social-link { 
  display: inline-block; 
  transition: all 0.3s ease; 
}

.social-icon-container {
  border-radius: 50%;
  border: 2px solid #475569;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #94a3b8;
  background: linear-gradient(135deg, #1e293b, #0f172a);
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.3);
  transition: all 0.3s ease;
  position: relative;
  overflow: hidden;
  
  /* Responsive sizes */
  width: 48px;
  height: 48px;
}

@media (min-width: 640px) {
  .social-icon-container {
    width: 56px;
    height: 56px;
  }
}

@media (min-width: 768px) {
  .social-icon-container {
    width: 64px;
    height: 64px;
  }
}

/* Responsive icon sizes */
.social-icon-container svg {
  width: 20px;
  height: 20px;
}

@media (min-width: 640px) {
  .social-icon-container svg {
    width: 24px;
    height: 24px;
  }
}

@media (min-width: 768px) {
  .social-icon-container svg {
    width: 28px;
    height: 28px;
  }
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
  border-color: #22d3ee;
  color: #22d3ee;
  box-shadow: 0 8px 25px rgba(14, 165, 233, 0.3);
  transform: translateY(-3px) scale(1.05);
}

.social-link:hover .social-icon-container::before {
  transform: translateX(100%);
}

/* Touch device optimizations */
@media (hover: none) {
  .cta-button-primary:hover,
  .social-link:hover .social-icon-container {
    transform: none;
  }
}

/* Ensure email doesn't break on very small screens */
@media (max-width: 320px) {
  .cta-button-primary {
    font-size: 11px;
    padding: 10px 12px;
    letter-spacing: 0.02em;
  }
}
</style>