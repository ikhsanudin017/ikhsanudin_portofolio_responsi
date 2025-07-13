<template>
  <section id="education" class="relative bg-transparent py-24 font-tech overflow-hidden">
    <div class="absolute inset-0 z-0">
      <div class="particle-sea">
        <div class="particle" v-for="n in 100" :key="`p-${n}`" :style="{
          '--x': `${Math.random() * 100}vw`,
          '--y': `${Math.random() * 100}vh`,
          '--d': `${Math.random() * 8 + 6}s`,
          '--s': `${Math.random() * 2 + 1}px`
        }"></div>
      </div>
      <div class="sonar-grid"></div>
      <div class="energy-currents"></div>
    </div>

    <div class="container mx-auto px-6 relative z-10">
      <SectionTitle title="Riwayat Pendidikan" />

      <div class="relative wrap overflow-hidden p-10 h-full">
        <div class="absolute h-full w-1 bg-gradient-to-b from-sky-500 via-cyan-400 to-emerald-500 rounded-full" style="left: 50%; transform: translateX(-50%); box-shadow: 0 0 20px rgba(14, 165, 233, 0.6), 0 0 20px rgba(16, 185, 129, 0.6);"></div>

        <div v-for="(edu, index) in educationHistory" :key="edu.id"
             :class="['mb-8 flex justify-between items-center w-full', index % 2 === 0 ? 'flex-row-reverse left-timeline' : 'right-timeline']">

          <div class="order-1 w-5/12"></div>

          <div class="z-20 flex items-center order-1 bg-slate-800 shadow-lg w-10 h-10 rounded-full border-2 border-cyan-400" style="box-shadow: 0 0 15px rgba(14, 165, 233, 0.6);">
            <div class="mx-auto text-cyan-400">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <path d="M12 2L2 7l10 5 10-5-10-5z"></path>
                <path d="M2 17l10 5 10-5"></path>
                <path d="M2 12l10 5 10-5"></path>
              </svg>
            </div>
          </div>

          <div class="order-1 bg-slate-800/70 backdrop-blur-md border border-slate-700 rounded-lg shadow-xl w-5/12 px-6 py-4 card-timeline group">
            <p class="font-semibold text-cyan-400 text-sm uppercase tracking-wider">{{ edu.period }}</p>
            <h3 class="font-bold text-slate-100 text-xl mt-1 uppercase group-hover:text-emerald-400 transition-colors duration-300">{{ edu.institution }}</h3>
            <p class="text-slate-400 text-base leading-snug tracking-wide font-sans">{{ edu.major }}</p>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
<script setup>
import { ref, onMounted } from 'vue';
import SectionTitle from './SectionTitle.vue';

const educationHistory = ref([]); // ← Fix: ganti dari projects ke educationHistory

onMounted(async () => {
  try {
    const response = await fetch('/api/education');
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();

    // Debug detail
    console.log('Education - First 3 items:', data.slice(0, 3));
    console.log('Education - Field names:', Object.keys(data[0] || {}));
    console.log('Education - First item values:', Object.values(data[0] || {}));

    educationHistory.value = data;
  } catch (error) {
    console.error('Gagal mengambil data education:', error);
  }
});
</script>

<style scoped>
/* BACKGROUND BARU DARI HERO */
.education-background {
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

/* TIMELINE STYLES */
.card-timeline::before {
  content: " ";
  position: absolute;
  top: 22px;
  width: 0;
  height: 0;
  border-top: 8px solid transparent;
  border-bottom: 8px solid transparent;
  transition: border-color 0.3s ease-in-out;
}
.right-timeline .card-timeline { transform: translateX(10%); }
.left-timeline .card-timeline { transform: translateX(-10%); }
.right-timeline .card-timeline::before { left: -8px; border-right: 8px solid rgba(30, 41, 59, 0.7); }
.left-timeline .card-timeline::before { right: -8px; border-left: 8px solid rgba(30, 41, 59, 0.7); }

/* Mobile adjustments */
@media (max-width: 768px) {
  .wrap { padding-left: 1.25rem; padding-right: 1.25rem; }
  .absolute.h-full { left: 2rem; }
  .left-timeline, .right-timeline { justify-content: flex-start; flex-direction: row; }
  .left-timeline .w-5\/12, .right-timeline .w-5\/12 { width: 100%; }
  .left-timeline .order-1, .right-timeline .order-1 { order: 2; }
  .left-timeline .w-5\/12:first-child, .right-timeline .w-5\/12:first-child { display: none; }
  .z-20 { order: 1; position: absolute; left: 2rem; transform: translateX(-50%); }
  .card-timeline { margin-left: 3rem; text-align: left !important; transform: translateX(0) !important; }
  .card-timeline::before {
    left: -8px !important;
    right: auto !important;
    border-right: 8px solid rgba(30, 41, 59, 0.7);
    border-left: none;
  }
}

/* ANIMATION STYLES */
.card-timeline {
  opacity: 0;
  transform: translateY(20px);
  transition: opacity 0.5s ease-out, transform 0.5s ease-out, box-shadow 0.3s ease-out, border-color 0.3s ease-out;
}
.card-timeline:hover {
  box-shadow: 0 10px 30px -5px rgba(14, 165, 233, 0.25);
  border-color: #0ea5e9;
}
.card-timeline:hover::before {
  border-right-color: #334155;
  border-left-color: #334155;
}
@media (max-width: 768px) {
  .card-timeline:hover::before {
    border-right-color: #334155;
    border-left-color: transparent !important;
  }
}
.card-timeline.animate-in {
  opacity: 1;
  transform: translateY(0);
}
</style>
