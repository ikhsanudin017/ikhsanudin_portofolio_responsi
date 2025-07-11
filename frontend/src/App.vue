<template>
  <div class="font-sans" :class="{ 'dark': isDarkMode }">
    
    <div class="background-canvas">
      <div class="particle-sea">
        <div class="particle" v-for="n in 150" :key="`p-${n}`" :style="{
          '--x': `${Math.random() * 100}vw`,
          '--y': `${Math.random() * 100}vh`,
          '--d': `${Math.random() * 20 + 15}s`,
          '--s': `${Math.random() * 2 + 1}px`
        }"></div>
      </div>
      <div class="sonar-grid"></div>
      <div class="energy-currents"></div>
    </div>

    <div class="relative z-10">
      <Navbar @toggle-dark-mode="toggleDarkMode" :is-dark-mode-active="isDarkMode" />
      <RouterView />
    </div>

  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { RouterView } from 'vue-router';
import Navbar from './components/Navbar.vue';

const isDarkMode = ref(false);

const toggleDarkMode = () => {
  isDarkMode.value = !isDarkMode.value;
  if (isDarkMode.value) {
    document.documentElement.classList.add('dark');
    localStorage.setItem('theme', 'dark');
  } else {
    document.documentElement.classList.remove('dark');
    localStorage.setItem('theme', 'light');
  }
};

onMounted(() => {
  const savedTheme = localStorage.getItem('theme');
  if (savedTheme === 'dark' || (!savedTheme && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
    isDarkMode.value = true;
    document.documentElement.classList.add('dark');
  }
});
</script>

<style>
/* STYLE GLOBAL (ditaruh di App.vue atau index.css)
  Ini akan mengatur semua animasi background.
*/

.background-canvas {
  position: fixed;
  inset: 0; /* top, right, bottom, left = 0 */
  z-index: 0;
  pointer-events: none; /* Agar tidak bisa diklik */
}

/* Animasi Background dari Hero */
.particle-sea { position: absolute; inset: 0; }
.particle {
  position: absolute;
  top: var(--y); left: var(--x);
  width: var(--s); height: var(--s);
  background-color: #0ea5e9;
  border-radius: 50%;
  box-shadow: 0 0 8px #0ea5e9, 0 0 16px #0ea5e9;
  animation: drift var(--d) ease-in-out infinite alternate;
}
@keyframes drift {
  to {
    transform: translate(calc(var(--x) / 10), calc(var(--y) / 10));
    opacity: 0.1;
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
}
@keyframes wave-flow {
  from { background-position-x: 0px; }
  to { background-position-x: -800px; }
}
</style>