<template>
  <section id="education" class="relative bg-transparent py-24 font-tech overflow-hidden">
    <div class="container mx-auto px-6 relative z-10">
      <SectionTitle title="Riwayat Pendidikan" />

      <div class="education-timeline">
        <div class="timeline-line" aria-hidden="true"></div>

        <div v-for="(edu, index) in educationHistory" v-reveal="index" :key="edu.id ?? edu.institution"
             :class="['timeline-row', index % 2 === 0 ? 'left-timeline' : 'right-timeline']">

          <div class="timeline-node" aria-hidden="true">
            <div class="mx-auto text-cyan-400">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <path d="M12 2L2 7l10 5 10-5-10-5z"></path>
                <path d="M2 17l10 5 10-5"></path>
                <path d="M2 12l10 5 10-5"></path>
              </svg>
            </div>
          </div>

          <div class="card-timeline group">
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
    educationHistory.value = data;
    // Remove all debug console.log
  } catch (error) {
    console.error('Gagal mengambil data education:', error);
  }
});
</script>

<style scoped>
.education-timeline {
  position: relative;
  max-width: 1120px;
  margin: 0 auto;
  padding: 12px 8px;
  display: grid;
  gap: 32px;
}
.timeline-line {
  position: absolute;
  top: 12px;
  bottom: 12px;
  left: 50%;
  width: 2px;
  transform: translateX(-50%);
  border-radius: 2px;
  background: linear-gradient(#0ea5e9, #22d3ee, #34d399);
  box-shadow: 0 0 16px #22d3ee45;
}
.timeline-row {
  position: relative;
  display: grid;
  grid-template-columns: minmax(0, 1fr) 48px minmax(0, 1fr);
  align-items: center;
  column-gap: 32px;
}
.timeline-node {
  grid-column: 2;
  grid-row: 1;
  justify-self: center;
  display: grid;
  place-items: center;
  width: 40px;
  height: 40px;
  border: 2px solid #22d3ee;
  border-radius: 50%;
  background: #12283b;
  box-shadow: 0 0 18px #22d3ee30;
  z-index: 1;
}
.card-timeline {
  position: relative;
  grid-row: 1;
  min-width: 0;
  padding: 22px 24px;
  border: 1px solid #334155;
  border-radius: 12px;
  background: #1e293bb3;
  backdrop-filter: blur(12px);
  box-shadow: 0 12px 30px #0002;
  overflow-wrap: anywhere;
  transition: border-color .3s, box-shadow .3s;
}
.left-timeline .card-timeline { grid-column: 1; }
.right-timeline .card-timeline { grid-column: 3; }
.card-timeline::before {
  content: '';
  position: absolute;
  top: calc(50% - 6px);
  width: 12px;
  height: 12px;
  background: #1b293c;
  border-top: 1px solid #334155;
  border-right: 1px solid #334155;
  transition: border-color .3s;
}
.left-timeline .card-timeline::before { right: -7px; transform: rotate(45deg); }
.right-timeline .card-timeline::before { left: -7px; transform: rotate(-135deg); }
.card-timeline:hover { border-color: #22d3ee80; box-shadow: 0 12px 30px #0ea5e918; }
.card-timeline:hover::before { border-color: #22d3ee80; }
@media (max-width: 767px) {
  .education-timeline { gap: 24px; padding-inline: 0; }
  .timeline-line { left: 20px; }
  .timeline-row { grid-template-columns: 40px minmax(0, 1fr); column-gap: 20px; }
  .timeline-node { grid-column: 1; width: 36px; height: 36px; }
  .left-timeline .card-timeline, .right-timeline .card-timeline { grid-column: 2; padding: 18px; }
  .left-timeline .card-timeline::before, .right-timeline .card-timeline::before { left: -7px; right: auto; transform: rotate(-135deg); }
  .card-timeline h3 { font-size: 16px; line-height: 1.5; }
  .card-timeline p { font-size: 13px; }
}
</style>
