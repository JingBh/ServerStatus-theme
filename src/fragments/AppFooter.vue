<script setup lang="ts">
import { computed } from 'vue'

defineProps<{
  customClass?: string
}>()

const isPersonal = computed(() => {
  // conditionally display personal information
  // for the author's personal usage
  return window.location.hostname.indexOf('jingbh') > -1
})
</script>

<template>
  <div
    class="mx-auto px-6 sm:px-8 pb-8 text-gray-500 dark:text-gray-400"
    :class="customClass"
  >
    <hr class="mb-6 border-t border-gray-200 dark:border-gray-800" />
    <p v-if="isPersonal" class="mb-2 text-xs">
      JingBh's Cloud Status
    </p>
    <p class="text-xs">
      <span class="inline-block">Powered by <a class="underline underline-offset-2" href="https://github.com/zdz/ServerStatus-Rust" target="_blank" ref="noreferer">ServerStatus-Rust</a></span>
      <span class="inline-block text-gray-400 dark:text-gray-500 mx-2" aria-hidden="true">|</span>
      <a class="inline-block underline underline-offset-2" href="https://github.com/JingBh/ServerStatus-theme" target="_blank" rel="noreferrer">Theme</a>
    </p>
  </div>
</template>
