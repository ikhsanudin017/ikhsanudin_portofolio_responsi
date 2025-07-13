<template>
  <section id="skills" class="relative bg-transparent py-24 font-tech overflow-hidden">
    <div class="absolute inset-0 z-0">
      <div class="particle-sea">
        <div class="particle" v-for="n in 100" :key="`p-${n}`" :style="{
          '--x': `${Math.random() * 100}vw`,
          '--y': `${Math.random() * 100}vh`,
          '--d': `${Math.random() * 8 + 5}s`,
          '--s': `${Math.random() * 2 + 1}px`
        }"></div>
      </div>
      <div class="sonar-grid"></div>
      <div class="energy-currents"></div>
    </div>

    <div class="container mx-auto px-6 relative z-10">
      <SectionTitle title="Keterampilan" />

      <div class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
        <div
          v-for="(skill, index) in skills"
          :key="skill.name"
          class="skill-card"
          :style="{ animationDelay: `${index * 50}ms` }"
        >
          <div class="skill-icon-container">
            <div class="skill-icon" v-html="skill.icon"></div>
          </div>
          <h3 class="skill-name">{{ skill.name }}</h3>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import SectionTitle from './SectionTitle.vue';

const skills = ref([]); // ← Fix: ganti dari projects ke skills

onMounted(async () => {
  try {
    const response = await fetch('/api/skills');
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();

    // Debug detail
    console.log('Skills - First 3 items:', data.slice(0, 3));
    console.log('Skills - Field names:', Object.keys(data[0] || {}));
    console.log('Skills - First item values:', Object.values(data[0] || {}));

    skills.value = data;
  } catch (error) {
    console.error('Gagal mengambil data skills:', error);
  }
});
</script>

<style scoped>
/* BACKGROUND BARU DARI HERO */
.skills-background {
  background-color: #0A192F;
  background-image: radial-gradient(ellipse at 50% 0%, rgba(14, 165, 233, 0.15) 0%, transparent 70%);
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

/* SKILL CARD STYLES */
.skill-card {
  @apply relative bg-slate-800/60 backdrop-blur-sm border border-slate-700 p-6 flex flex-col items-center justify-center gap-4 text-center overflow-hidden;
  clip-path: polygon(0 15px, 15px 0, 100% 0, 100% calc(100% - 15px), calc(100% - 15px) 100%, 0 100%);
  transition: all 0.3s ease-in-out;
  opacity: 0;
  transform: translateY(30px);
}
.skill-card:hover {
  transform: translateY(-5px) scale(1.05);
  background: #1e293b;
  border-color: #0ea5e9;
  box-shadow: 0 0 25px rgba(14, 165, 233, 0.4);
}
.skill-card.animate-in {
  opacity: 1;
  transform: translateY(0);
}
.skill-icon-container {
  @apply w-16 h-16 flex items-center justify-center;
}
.skill-icon {
  @apply w-full h-full text-slate-400;
  transition: all 0.3s ease-in-out;
}
.skill-card:hover .skill-icon {
  color: #22d3ee;
  filter: drop-shadow(0 0 10px #22d3ee);
}
.skill-name {
  @apply font-semibold text-slate-300 uppercase tracking-wider transition-colors duration-300;
}
.skill-card:hover .skill-name {
  color: #f8fafc;
}
</style>
