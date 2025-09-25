<template>
  <section id="projects" class="relative bg-transparent py-24 font-tech overflow-hidden">
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
      <div class="text-center mb-16">
        <h2 class="text-5xl font-bold text-slate-100 mb-4 animate-pulse-slow" style="text-shadow: 0 0 15px rgba(34, 211, 238, 0.4);">
          PROYEK UNGGULAN
        </h2>
        <div class="w-40 h-1 bg-gradient-to-r from-cyan-400 to-emerald-400 mx-auto rounded-full animate-glow"></div>
        <p class="mt-4 text-slate-300 text-lg">
          Beberapa karya yang telah saya bangun.
        </p>
      </div>

      <div class="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
        <div
          v-for="(project, index) in projects"
          :key="project.id"
          class="project-card group"
          :style="{ animationDelay: `${index * 150}ms` }"
        >
          <div class="holographic-frame">
            <div class="image-container">
              <img :src="project.image" :alt="project.title" class="project-image">
              <div class="image-overlay">
                <div class="scan-effect"></div>
              </div>
              <div class="glitch-overlay"></div>
            </div>

            <div class="card-content">
              <h3 class="project-title">{{ project.title }}</h3>
              <p class="project-description">{{ project.description }}</p>

              <div class="tech-stack">
                <span v-for="tech in project.tech" :key="tech" class="tech-chip">
                  {{ tech }}
                </span>
              </div>

              <div class="action-links">
                <a :href="project.repoUrl" target="_blank" rel="noopener noreferrer" class="action-btn github-btn" aria-label="GitHub Repository">
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.91 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                  </svg>
                  <span>CODE</span>
                </a>
                <a :href="project.liveUrl" target="_blank" rel="noopener noreferrer" class="action-btn demo-btn" aria-label="Live Demo">
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                    <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path>
                    <polyline points="15 3 21 3 21 9"></polyline>
                    <line x1="10" y1="14" x2="21" y2="3"></line>
                  </svg>
                  <span>DEMO</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
<script setup>
import { ref, onMounted } from 'vue';
import SectionTitle from './SectionTitle.vue';

const projects = ref([]); // ← Ini sudah benar

onMounted(async () => {
  try {
    const response = await fetch('/api/projects');
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();
    projects.value = data;
    // Remove debug console.log
  } catch (error) {
    console.error('Gagal mengambil data projects:', error);
  }
});
</script>

<style scoped>
/* BACKGROUND BARU DARI HERO */
.projects-background {
  background-color: #0A192F;
  background-image: radial-gradient(ellipse at 50% 50%, rgba(14, 165, 233, 0.15) 0%, transparent 70%);
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
  top: 50%;
  left: 50%;
  width: 1px;
  height: 1px;
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
  position: absolute;
  inset: 0;
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

/* Project Card Styling (Tidak ada perubahan signifikan, hanya animasi masuk) */
.project-card {
  /* opacity: 0; */
  /* transform: translateY(50px) rotateX(10deg); */
  opacity: 1; /* ← Force show */
  transform: translateY(0) rotateX(0deg); /* ← Force show */
  transition: all 0.6s cubic-bezier(0.4, 0, 0.2, 1);
  perspective: 1000px;
}
.project-card.animate-in {
  opacity: 1;
  transform: translateY(0) rotateX(0deg);
}

.holographic-frame {
  position: relative;
  background: linear-gradient(145deg, rgba(30, 41, 59, 0.8), rgba(15, 23, 42, 0.9));
  border: 1px solid rgba(14, 165, 233, 0.2);
  border-radius: 12px;
  overflow: hidden;
  backdrop-filter: blur(8px);
  transition: all 0.4s ease;
  height: 100%;
  display: flex;
  flex-direction: column;
}

.holographic-frame::before {
  content: '';
  position: absolute;
  top: 0; left: 0; right: 0; bottom: 0;
  background: linear-gradient(135deg, rgba(14, 165, 233, 0.1) 0%, transparent 50%, rgba(16, 185, 129, 0.1) 100%);
  opacity: 0;
  transition: opacity 0.4s ease;
  pointer-events: none;
}

.project-card:hover .holographic-frame {
  transform: translateY(-10px) scale(1.03);
  border-color: rgba(34, 211, 238, 0.5);
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.3), 0 0 60px rgba(14, 165, 233, 0.1);
}

.project-card:hover .holographic-frame::before {
  opacity: 1;
}

/* Image Container */
.image-container {
  position: relative;
  height: 200px;
  overflow: hidden;
  border-bottom: 1px solid rgba(14, 165, 233, 0.2);
}
.project-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.6s ease;
  filter: saturate(1.1);
}
.image-overlay {
  position: absolute;
  inset: 0;
  background: linear-gradient(45deg, rgba(14, 165, 233, 0.1), transparent);
  opacity: 0;
  transition: opacity 0.4s ease;
}
.scan-effect {
  position: absolute; top: 0; left: -100%; width: 100%; height: 100%;
  background: linear-gradient(90deg, transparent, rgba(14, 165, 233, 0.3), transparent);
  transition: left 0.6s ease;
}
.glitch-overlay {
  position: absolute; inset: 0;
  background:
    linear-gradient(0deg, transparent 98%, rgba(14, 165, 233, 0.1) 100%),
    linear-gradient(0deg, transparent 96%, rgba(16, 185, 129, 0.1) 100%);
  opacity: 0; transition: opacity 0.3s ease;
}
.project-card:hover .project-image { transform: scale(1.1); }
.project-card:hover .image-overlay { opacity: 1; }
.project-card:hover .scan-effect { left: 100%; }
.project-card:hover .glitch-overlay { opacity: 1; }

/* Card Content */
.card-content { padding: 1.5rem; flex: 1; display: flex; flex-direction: column; }
.project-title { font-size: 1.25rem; font-weight: 700; color: #0ea5e9; margin-bottom: 0.75rem; text-transform: uppercase; letter-spacing: 0.05em; text-shadow: 0 0 10px rgba(14, 165, 233, 0.3); }
.project-description { color: #cbd5e1; line-height: 1.6; margin-bottom: 1.5rem; flex: 1; }

/* Tech Stack */
.tech-stack { display: flex; flex-wrap: wrap; gap: 0.5rem; margin-bottom: 1.5rem; }
.tech-chip { padding: 0.25rem 0.75rem; background: rgba(14, 165, 233, 0.1); border: 1px solid rgba(14, 165, 233, 0.2); border-radius: 6px; font-size: 0.75rem; font-weight: 600; color: #0ea5e9; text-transform: uppercase; letter-spacing: 0.05em; transition: all 0.3s ease; }
.tech-chip:hover { border-color: rgba(14, 165, 233, 0.5); background: rgba(14, 165, 233, 0.2); box-shadow: 0 0 15px rgba(14, 165, 233, 0.2); }

/* Action Links */
.action-links { display: flex; gap: 1rem; padding-top: 1rem; border-top: 1px solid rgba(14, 165, 233, 0.2); }
.action-btn { display: flex; align-items: center; gap: 0.5rem; padding: 0.5rem 1rem; background: rgba(14, 165, 233, 0.1); border: 1px solid rgba(14, 165, 233, 0.3); border-radius: 6px; color: #94a3b8; text-decoration: none; font-size: 0.875rem; font-weight: 600; text-transform: uppercase; letter-spacing: 0.05em; transition: all 0.3s ease; }
.action-btn:hover { background: rgba(14, 165, 233, 0.2); border-color: rgba(14, 165, 233, 0.6); box-shadow: 0 0 20px rgba(14, 165, 233, 0.3); transform: translateY(-2px); color: #f8fafc; }

/* Glow & Pulse Animation */
@keyframes glow { 0%, 100% { box-shadow: 0 0 20px rgba(14, 165, 233, 0.6); } 50% { box-shadow: 0 0 30px rgba(16, 185, 129, 0.8); } }
.animate-glow { animation: glow 2s ease-in-out infinite; }
@keyframes pulse-slow { 0%, 100% { opacity: 1; filter: drop-shadow(0 0 10px rgba(34, 211, 238, 0.3)); } 50% { opacity: 0.8; filter: drop-shadow(0 0 15px rgba(34, 211, 238, 0.1));} }
.animate-pulse-slow { animation: pulse-slow 3s ease-in-out infinite; }

/* Responsive Design */
@media (max-width: 768px) {
  .action-links { flex-direction: column; }
  .action-btn { justify-content: center; }
}
</style>
