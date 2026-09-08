<template>
  <section id="skills" class="relative bg-transparent py-24 font-tech overflow-hidden">
    <div class="container mx-auto px-6 relative z-10">
      <SectionTitle title="Keterampilan" />

      <div class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
        <div
          v-for="(skill, index) in skills"
          v-reveal="index"
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
    skills.value = data;
    // console.log('Skills loaded:', data); // Remove this
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
.skill-card {
  @apply relative bg-slate-800/60 backdrop-blur-sm border border-slate-700 p-6 flex flex-col items-center justify-center gap-4 text-center overflow-hidden;
  clip-path: polygon(0 15px, 15px 0, 100% 0, 100% calc(100% - 15px), calc(100% - 15px) 100%, 0 100%);
  transition: all 0.3s ease-in-out;
  /* Remove these lines that hide cards: */
  /* opacity: 0; */
  /* transform: translateY(30px); */
  opacity: 1; /* ← Force show */
  transform: translateY(0); /* ← Force show */
}
</style>
