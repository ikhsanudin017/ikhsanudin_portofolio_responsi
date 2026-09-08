<template>
  <div class="app-shell font-sans" :class="{ dark: isDarkMode, 'motion-paused': !motionEnabled }">
    <MotionBackdrop />
    <div class="relative z-10">
      <Navbar />
      <RouterView />
    </div>
  </div>
</template>

<script setup>
import { RouterView } from 'vue-router'
import Navbar from './components/Navbar.vue'
import MotionBackdrop from './components/MotionBackdrop.vue'
import { motionEnabled } from './composables/useMotion'
import { isDarkMode } from './composables/useTheme'
</script>
