<script setup lang="ts">
import { computed } from 'vue'

defineProps<{
  customClass?: string
}>()

const footerText = computed(() => {
  return import.meta.env.VITE_APP_FOOTER_TEXT
})
</script>

<template>
  <div
    class="mx-auto px-6 sm:px-8 pb-8 text-gray-500 dark:text-gray-400"
    :class="customClass"
  >
    <hr class="mb-6 border-t border-gray-200 dark:border-gray-800" />
    <p
      v-if="footerText"
      class="mb-2 text-xs"
      v-text="footerText"
    />
    <p class="text-xs">
      <span class="inline-block">Powered by <a class="underline underline-offset-2" href="https://github.com/zdz/ServerStatus-Rust" target="_blank" ref="noreferer">ServerStatus-Rust</a></span>
      <span class="inline-block text-gray-400 dark:text-gray-500 mx-2" aria-hidden="true">|</span>
      <a class="inline-block underline underline-offset-2" href="https://github.com/JingBh/ServerStatus-theme" target="_blank" rel="noreferrer">Theme</a>
    </p>
  </div>
</template>
