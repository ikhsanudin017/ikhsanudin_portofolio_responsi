<template>
  <div class="text-center mb-16">
    <h2 
      class="text-4xl md:text-5xl font-bold text-slate-100 mb-4 animate-pulse-slow" 
      style="text-shadow: 0 0 15px rgba(34, 211, 238, 0.4);"
    >
      {{ title }}
    </h2>
    <div class="w-32 md:w-40 h-1 bg-gradient-to-r from-cyan-400 to-emerald-400 mx-auto rounded-full animate-glow"></div>
  </div>
</template>

<script setup>
defineProps({
  title: {
    type: String,
    required: true,
  },
});
</script>

<style scoped>
@keyframes glow {
  0%, 100% {
    box-shadow: 0 0 20px rgba(14, 165, 233, 0.6);
  }
  50% {
    box-shadow: 0 0 30px rgba(16, 185, 129, 0.8);
  }
}
.animate-glow {
  animation: glow 2s ease-in-out infinite;
}

@keyframes pulse-slow {
  0%, 100% {
    opacity: 1;
    filter: drop-shadow(0 0 10px rgba(34, 211, 238, 0.3));
  }
  50% {
    opacity: 0.8;
    filter: drop-shadow(0 0 15px rgba(34, 211, 238, 0.1));
  }
}
.animate-pulse-slow {
  animation: pulse-slow 3s ease-in-out infinite;
}
</style>