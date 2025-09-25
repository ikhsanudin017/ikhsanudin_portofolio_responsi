<template>
  <section id="certificates" class="relative bg-transparent py-24 font-tech overflow-hidden">
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
          SERTIFIKAT & PENCAPAIAN
        </h2>
        <div class="w-40 h-1 bg-gradient-to-r from-cyan-400 to-emerald-400 mx-auto rounded-full animate-glow"></div>
        <p class="mt-4 text-slate-300 text-lg">
          Sertifikat dan pencapaian yang telah saya raih dalam perjalanan belajar.
        </p>
      </div>

      <div class="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
        <div
          v-for="(certificate, index) in certificates"
          :key="certificate.id"
          class="certificate-card group"
          :style="{ animationDelay: `${index * 150}ms` }"
        >
          <div class="holographic-frame">
            <div class="image-container">
              <div v-if="certificate.image_url" class="certificate-preview">
                <img :src="certificate.image_url" :alt="certificate.title" class="certificate-image">
              </div>
              <div v-else class="pdf-preview">
                <div class="pdf-icon">
                  <svg xmlns="http://www.w3.org/2000/svg" width="64" height="64" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M14,2H6A2,2 0 0,0 4,4V20A2,2 0 0,0 6,22H18A2,2 0 0,0 20,20V8L14,2M18,20H6V4H13V9H18V20Z"/>
                  </svg>
                </div>
                <div class="pdf-label">PDF Certificate</div>
              </div>

              <div class="image-overlay">
                <div class="scan-effect"></div>
              </div>
              <div class="glitch-overlay"></div>

              <div class="certificate-badge">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 2l2.4 7.2h7.6l-6 4.8 2.4 7.2-6-4.8-6 4.8 2.4-7.2-6-4.8h7.6z"/>
                </svg>
              </div>
            </div>

            <div class="card-content">
              <h3 class="certificate-title">{{ certificate.title }}</h3>
              <p class="certificate-issuer">{{ certificate.issuer }}</p>
              <p class="certificate-date">{{ certificate.date }}</p>
              <p class="certificate-description">{{ certificate.description }}</p>

              <div class="skill-tags" v-if="certificate.skills && certificate.skills.length">
                <span v-for="skill in certificate.skills" :key="skill" class="skill-tag">
                  {{ skill }}
                </span>
              </div>

              <div class="action-links">
                <a
                  v-if="certificate.credential_url && certificate.credential_url !== '#'"
                  :href="certificate.credential_url"
                  target="_blank"
                  rel="noopener noreferrer"
                  class="action-btn verify-btn"
                  aria-label="Verifikasi Sertifikat"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                    <path d="M9 12l2 2 4-4"/>
                    <path d="M21 12c0 4.97-4.03 9-9 9s-9-4.03-9-9 4.03-9 9-9c1.5 0 2.9.37 4.13 1.02"/>
                  </svg>
                  <span>VERIFIKASI</span>
                </a>
                <button
                  @click="openCertificateModal(certificate)"
                  class="action-btn view-btn"
                  aria-label="Lihat Sertifikat"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                    <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/>
                    <circle cx="12" cy="12" r="3"/>
                  </svg>
                  <span>LIHAT</span>
                </button>
                <a
                  v-if="certificate.pdf_url && certificate.pdf_url !== '#'"
                  :href="certificate.pdf_url"
                  :download="certificate.title + '.pdf'"
                  class="action-btn download-btn"
                  aria-label="Download Sertifikat"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                    <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/>
                    <polyline points="7,10 12,15 17,10"/>
                    <line x1="12" y1="15" x2="12" y2="3"/>
                  </svg>
                  <span>DOWNLOAD</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div
      v-if="selectedCertificate"
      class="fixed inset-0 bg-black/90 flex items-center justify-center z-50 p-4"
      @click="closeCertificateModal"
    >
      <div class="relative w-full max-w-6xl h-[90vh] bg-slate-800 rounded-lg overflow-hidden">
        <div class="flex justify-between items-center p-4 bg-slate-900 border-b border-slate-700">
          <div>
            <h3 class="text-xl font-bold text-white">{{ selectedCertificate.title }}</h3>
            <p class="text-cyan-400">{{ selectedCertificate.issuer }}</p>
          </div>
          <div class="flex gap-2">
            <a
              v-if="selectedCertificate.pdf_url && selectedCertificate.pdf_url !== '#'"
              :href="selectedCertificate.pdf_url"
              target="_blank"
              class="px-4 py-2 bg-cyan-600 text-white rounded hover:bg-cyan-700 transition-colors flex items-center gap-2"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/>
                <polyline points="15 3 21 3 21 9"/>
                <line x1="10" y1="14" x2="21" y2="3"/>
              </svg>
              Buka PDF
            </a>
            <button
              @click="closeCertificateModal"
              class="px-4 py-2 bg-slate-600 text-white rounded hover:bg-slate-700 transition-colors"
            >
              Tutup
            </button>
          </div>
        </div>

        <div class="w-full h-full flex items-center justify-center p-4" @click.stop>
          <img
            v-if="selectedCertificate.image_url"
            :src="selectedCertificate.image_url"
            :alt="selectedCertificate.title"
            class="max-w-full max-h-full object-contain rounded"
          >
          <iframe
            v-else-if="selectedCertificate.pdf_url && selectedCertificate.pdf_url !== '#'"
            :src="selectedCertificate.pdf_url"
            class="w-full h-full rounded"
          ></iframe>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref, onMounted } from 'vue';

const certificates = ref([]);
const selectedCertificate = ref(null);

const openCertificateModal = (certificate) => {
  selectedCertificate.value = certificate;
  document.body.style.overflow = 'hidden';
};

const closeCertificateModal = () => {
  selectedCertificate.value = null;
  document.body.style.overflow = '';
};

onMounted(async () => {
  try {
    // Hanya pakai API, tidak ada static data
    const response = await fetch('/api/certificates');
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();
    certificates.value = data;
    console.log('Certificates loaded from API:', data);
  } catch (error) {
    console.error('Gagal mengambil data certificates dari API:', error);
    // Jika API gagal, biarkan kosong
    certificates.value = [];
  }
});
</script>

<style scoped>
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

.certificate-card {
  opacity: 1;
  transform: translateY(0) rotateX(0deg);
  transition: all 0.6s cubic-bezier(0.4, 0, 0.2, 1);
  perspective: 1000px;
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

.certificate-card:hover .holographic-frame {
  transform: translateY(-10px) scale(1.03);
  border-color: rgba(34, 211, 238, 0.5);
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.3), 0 0 60px rgba(14, 165, 233, 0.1);
}

.certificate-card:hover .holographic-frame::before {
  opacity: 1;
}

.image-container {
  position: relative;
  height: 200px;
  overflow: hidden;
  border-bottom: 1px solid rgba(14, 165, 233, 0.2);
}

.certificate-preview {
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  background: linear-gradient(135deg, rgba(14, 165, 233, 0.05), rgba(16, 185, 129, 0.05));
}

.certificate-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.6s ease;
  filter: saturate(1.1);
}

.pdf-preview {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background: linear-gradient(135deg, rgba(14, 165, 233, 0.1), rgba(16, 185, 129, 0.1));
  color: #0ea5e9;
  transition: all 0.6s ease;
}

.pdf-icon {
  margin-bottom: 8px;
  transition: transform 0.3s ease;
}

.pdf-label {
  font-size: 0.875rem;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.05em;
}

.certificate-card:hover .pdf-icon {
  transform: scale(1.1);
}

.certificate-card:hover .pdf-preview {
  background: linear-gradient(135deg, rgba(14, 165, 233, 0.2), rgba(16, 185, 129, 0.2));
}

.certificate-card:hover .certificate-image {
  transform: scale(1.1);
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

.certificate-badge {
  position: absolute;
  top: 12px;
  right: 12px;
  background: linear-gradient(45deg, #f59e0b, #eab308);
  color: white;
  padding: 8px;
  border-radius: 50%;
  box-shadow: 0 0 15px rgba(245, 158, 11, 0.4);
}

.certificate-card:hover .image-overlay { opacity: 1; }
.certificate-card:hover .scan-effect { left: 100%; }
.certificate-card:hover .glitch-overlay { opacity: 1; }

.card-content { padding: 1.5rem; flex: 1; display: flex; flex-direction: column; }
.certificate-title {
  font-size: 1.1rem;
  font-weight: 700;
  color: #0ea5e9;
  margin-bottom: 0.5rem;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  text-shadow: 0 0 10px rgba(14, 165, 233, 0.3);
  line-height: 1.2;
}
.certificate-issuer {
  color: #10b981;
  font-weight: 600;
  margin-bottom: 0.25rem;
  font-size: 0.9rem;
}
.certificate-date {
  color: #64748b;
  font-size: 0.8rem;
  margin-bottom: 1rem;
}
.certificate-description {
  color: #cbd5e1;
  line-height: 1.4;
  margin-bottom: 1.5rem;
  flex: 1;
  font-size: 0.85rem;
}

.skill-tags {
  display: flex;
  flex-wrap: wrap;
  gap: 0.4rem;
  margin-bottom: 1.5rem;
}
.skill-tag {
  padding: 0.2rem 0.6rem;
  background: rgba(16, 185, 129, 0.1);
  border: 1px solid rgba(16, 185, 129, 0.2);
  border-radius: 6px;
  font-size: 0.7rem;
  font-weight: 600;
  color: #10b981;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  transition: all 0.3s ease;
}
.skill-tag:hover {
  border-color: rgba(16, 185, 129, 0.5);
  background: rgba(16, 185, 129, 0.2);
  box-shadow: 0 0 15px rgba(16, 185, 129, 0.2);
}

.action-links {
  display: flex;
  gap: 0.5rem;
  padding-top: 1rem;
  border-top: 1px solid rgba(14, 165, 233, 0.2);
  flex-wrap: wrap;
}
.action-btn {
  display: flex;
  align-items: center;
  gap: 0.3rem;
  padding: 0.4rem 0.6rem;
  background: rgba(14, 165, 233, 0.1);
  border: 1px solid rgba(14, 165, 233, 0.3);
  border-radius: 6px;
  color: #94a3b8;
  text-decoration: none;
  font-size: 0.7rem;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  transition: all 0.3s ease;
  cursor: pointer;
  flex: 1;
  justify-content: center;
  min-width: 80px;
}
.action-btn:hover {
  background: rgba(14, 165, 233, 0.2);
  border-color: rgba(14, 165, 233, 0.6);
  box-shadow: 0 0 20px rgba(14, 165, 233, 0.3);
  transform: translateY(-2px);
  color: #f8fafc;
}

.verify-btn:hover {
  background: rgba(16, 185, 129, 0.2);
  border-color: rgba(16, 185, 129, 0.6);
  box-shadow: 0 0 20px rgba(16, 185, 129, 0.3);
}

.download-btn:hover {
  background: rgba(245, 158, 11, 0.2);
  border-color: rgba(245, 158, 11, 0.6);
  box-shadow: 0 0 20px rgba(245, 158, 11, 0.3);
}

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

@media (max-width: 768px) {
  .action-links {
    flex-direction: column;
    gap: 0.5rem;
  }
  .action-btn {
    justify-content: center;
    min-width: auto;
    flex: none;
  }

  .certificate-title {
    font-size: 1rem;
  }

  .certificate-description {
    font-size: 0.8rem;
  }

  .image-container {
    height: 160px;
  }
}
</style>
