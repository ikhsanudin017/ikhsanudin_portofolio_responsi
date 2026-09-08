<template>
  <button class="theme-switch" type="button" :disabled="switching"
    :aria-label="isDarkMode ? 'Aktifkan mode light' : 'Aktifkan mode dark'"
    :aria-pressed="!isDarkMode" @click="toggleTheme">
    <span class="theme-switch-track" aria-hidden="true">
      <span class="theme-switch-thumb"></span>
      <svg class="theme-sun" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6"><circle cx="12" cy="12" r="4" /><path d="M12 1v3m0 16v3M1 12h3m16 0h3M4.2 4.2l2.1 2.1m11.4 11.4 2.1 2.1M4.2 19.8l2.1-2.1M17.7 6.3l2.1-2.1" /></svg>
      <svg class="theme-moon" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6"><path d="M20.5 14.1A8.7 8.7 0 0 1 9.9 3.5 8.7 8.7 0 1 0 20.5 14.1Z" /></svg>
    </span>
    <span class="theme-switch-label">{{ isDarkMode ? 'Dark' : 'Light' }}</span>
  </button>
</template>

<script setup>
import { isDarkMode, switching, toggleTheme } from '../composables/useTheme'
</script>

<style scoped>
.theme-switch { display: flex; align-items: center; gap: 8px; min-height: 44px; padding: 4px; color: #b8ced9; border-radius: 28px; flex-shrink: 0; }
.theme-switch-track { position: relative; display: flex; align-items: center; justify-content: space-between; width: 58px; height: 32px; padding: 0 8px; border: 1px solid #6b9bac50; border-radius: 20px; background: #112334; }
.theme-switch-track svg { z-index: 1; }
.theme-switch-thumb { position: absolute; top: 3px; left: 3px; width: 24px; height: 24px; border-radius: 50%; background: #2a4a5a; transform: translateX(26px); box-shadow: 0 2px 8px #0003; transition: transform .5s cubic-bezier(.34,1.56,.64,1), background .3s; }
.theme-moon { color: #abf3e5; }
.theme-sun { color: #7594a6; }
.theme-switch-label { min-width: 31px; font-size: 11px; font-weight: 600; letter-spacing: .03em; }
.theme-switch:hover .theme-switch-track { border-color: #67e8f9; }
.theme-switch:disabled { cursor: wait; }
@media (max-width: 480px) { .theme-switch-label { display: none; } }
</style>
