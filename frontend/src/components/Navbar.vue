<template>
  <header
    :class="[
      'sticky top-0 z-50 transition-all duration-300 font-tech',
      isScrolled ? 'bg-slate-900/80 backdrop-blur-lg border-b border-cyan-400/20' : 'bg-transparent'
    ]"
  >
    <nav class="container mx-auto px-6 h-20 flex justify-between items-center">
      <div class="text-2xl font-bold">
        <a href="#" class="tech-logo">IKHSANUDIN</a>
      </div>
      
      <div class="hidden md:flex items-center gap-8">
        <a v-for="link in navLinks" :key="link.href" :href="link.href" class="nav-link">
          <span>{{ link.text }}</span>
        </a>
      </div>

      <div class="hidden md:flex items-center gap-4">
         <div class="holographic-border-nav">
          <a href="#contact" class="cta-button-nav">
             <span class="relative z-10">Hubungi Saya</span>
          </a>
        </div>
      </div>

      <div class="md:hidden">
        <button @click="isMobileMenuOpen = !isMobileMenuOpen" class="text-cyan-400 z-50 relative p-2">
          <svg v-if="!isMobileMenuOpen" class="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16"></path></svg>
          <svg v-else class="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path></svg>
        </button>
      </div>
    </nav>
    
    <transition name="mobile-menu-fade">
      <div v-if="isMobileMenuOpen" class="md:hidden bg-slate-900/95 backdrop-blur-lg absolute top-0 left-0 w-full h-screen">
        <ul class="flex flex-col items-center justify-center h-full space-y-8">
          <li v-for="link in navLinks" :key="link.href">
            <a :href="link.href" @click="closeMobileMenu" class="mobile-nav-link">{{ link.text }}</a>
          </li>
            <li class="mt-8 pt-8 border-t border-cyan-400/20 w-4/5 text-center">
               <div class="holographic-border-nav inline-block">
                <a href="#contact" @click="closeMobileMenu" class="cta-button-nav">
                  <span class="relative z-10">Hubungi Saya</span>
                </a>
              </div>
          </li>
        </ul>
      </div>
    </transition>
  </header>
</template>

<script setup>
import { ref, onMounted, onUnmounted, watch } from 'vue';

const isScrolled = ref(false);
const isMobileMenuOpen = ref(false);

const navLinks = [
  { href: '#hero', text: 'Profil' }, 
  { href: '#education', text: 'Pendidikan' }, 
  { href: '#skills', text: 'Skills' }, 
  { href: '#projects', text: 'Proyek' },
];

const handleScroll = () => {
  isScrolled.value = window.scrollY > 10;
};

const closeMobileMenu = () => {
  isMobileMenuOpen.value = false;
};

watch(isMobileMenuOpen, (newVal) => {
  if (newVal) {
    document.body.style.overflow = 'hidden';
  } else {
    document.body.style.overflow = '';
  }
});

onMounted(() => {
  window.addEventListener('scroll', handleScroll);
});

onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll);
  document.body.style.overflow = '';
});
</script>

<style scoped>
/* CATATAN: Pastikan Anda telah menambahkan font 'Rajdhani' di index.html */
.font-tech {
  font-family: 'Rajdhani', sans-serif;
}

/* Logo dengan gradien dan glow yang disesuaikan */
.tech-logo {
  font-weight: 700;
  letter-spacing: 0.05em;
  @apply text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-emerald-400;
  text-shadow: 0 0 15px rgba(14, 165, 233, 0.5), 0 0 25px rgba(16, 185, 129, 0.3);
  transition: all 0.3s ease-in-out;
}
.tech-logo:hover {
  text-shadow: 0 0 20px rgba(14, 165, 233, 0.8), 0 0 35px rgba(16, 185, 129, 0.5);
}

/* Link navigasi desktop disesuaikan dengan tema footer */
.nav-link {
  @apply relative py-1 font-semibold text-slate-300 hover:text-white transition-colors duration-300 uppercase;
}
.nav-link:hover {
  text-shadow: 0 0 10px rgba(14, 165, 233, 0.7);
}
.nav-link::after {
  content: '';
  position: absolute;
  bottom: -4px;
  left: 0;
  width: 0;
  height: 2px;
  background: linear-gradient(90deg, #0ea5e9, #10b981); /* Gradient dari footer */
  box-shadow: 0 0 8px rgba(14, 165, 233, 0.7);
  transition: width 0.3s ease-out;
}
.nav-link:hover::after {
  width: 100%;
}

/* Tombol Aksi di Navbar disesuaikan dengan holographic-border dari footer */
.holographic-border-nav {
  position: relative;
  padding: 2px;
  border-radius: 8px; /* Sudut lebih tajam untuk tombol kecil */
  background: linear-gradient(45deg, #0ea5e9, #06b6d4, #10b981, #0ea5e9);
  background-size: 300% 300%;
  animation: holographic 4s ease-in-out infinite;
  display: inline-block;
  transition: all 0.3s ease;
}

@keyframes holographic {
  0%, 100% { background-position: 0% 50%; }
  50% { background-position: 100% 50%; }
}

.cta-button-nav {
  @apply inline-block bg-slate-900/80 text-white font-bold py-2 px-6 rounded-md shadow-lg transform hover:scale-105 transition-all duration-300 uppercase tracking-wider border-2 border-transparent;
  position: relative;
  overflow: hidden;
}

.cta-button-nav:hover {
  text-shadow: 0 0 15px rgba(14, 165, 233, 0.7);
  background-color: #0F172A; /* Sedikit lebih terang saat hover */
}

/* Link navigasi mobile */
.mobile-nav-link {
  @apply text-2xl font-bold text-slate-200 hover:text-cyan-400 transition-colors uppercase;
   text-shadow: 0 0 10px transparent;
   transition: text-shadow 0.3s ease;
}
.mobile-nav-link:hover {
  text-shadow: 0 0 10px rgba(14, 165, 233, 0.7);
}


/* Transisi menu mobile */
.mobile-menu-fade-enter-active,
.mobile-menu-fade-leave-active {
  transition: opacity 0.3s ease;
}

.mobile-menu-fade-enter-from,
.mobile-menu-fade-leave-to {
  opacity: 0;
}
</style>