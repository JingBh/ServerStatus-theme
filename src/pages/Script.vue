<script setup lang="ts">
import { computed, ref } from 'vue'

import type { ClientParams } from '../types/params.ts'
import AppFooter from '../fragments/AppFooter.vue'
import AppHeader from '../fragments/AppHeader.vue'

const serverDefaults: Record<string, any> = {
  uid: '',
  gid: '',
  pass: '',
  vnstat: false,
  ping: true,
  tupd: true,
  extra: true,
  notify: true,
  'alias': '',
  'type': '',
  loc: '',
  interval: 1
}

const form = ref<ClientParams>({
  uid: '',
  gid: '',
  pass: '',
  vnstat: false,
  ping: false,
  tupd: true,
  extra: true,
  notify: true,
  'alias': '',
  'type': '',
  loc: '',
  interval: 2
})
const useSudo = ref(false)

const isValid = computed(() => {
  return (form.value.uid || (form.value.gid && form.value['alias'])) && form.value.pass
})

const command = computed(() => {
  const url = new URL('i', import.meta.env.VITE_SERVER_URL || location.href)
  for (const [key, value] of Object.entries(form.value)) {
    if (value === undefined || value === null || value === serverDefaults[key]) {
      continue
    }

    if (typeof value === 'boolean') {
      url.searchParams.append(key, value ? '1' : '0')
    } else {
      url.searchParams.append(key, value.toString())
    }
  }

  return `curl -fsSL "${url.toString()}" | ${useSudo.value ? 'sudo ' : ''}bash`
})
</script>

<template>
  <app-header custom-class="max-w-xl" />
  <div class="max-w-xl px-6 sm:px-8 py-8 mx-auto flex flex-col gap-4 sm:gap-6 items-stretch">
    <div class="flex flex-col gap-3 items-stretch">
      <h2 class="font-semibold text-xl sm:text-2xl">
        One-Click Deployment
      </h2>
      <p class="text-sm sm:text-base text-gray-500 dark:text-gray-400">
        Set the following parameters, and run the command generated to rapidly deploy the client to your server.
      </p>
    </div>
    <hr class="border-gray-200 dark:border-gray-800" />
    <div class="flex flex-col items-stretch gap-3 sm:gap-4">
      <div class="flex flex-col sm:flex-row gap-2 sm:gap-4 items-start sm:items-center">
        <label
          class="w-full sm:w-24 flex-shrink-0 sm:text-right font-medium text-gray-700 dark:text-gray-300"
          for="form_uid"
        >
          User ID
        </label>
        <input
          v-model="form.uid"
          id="form_uid"
          type="text"
          class="bg-gray-100 border border-gray-300 text-gray-800 text-sm rounded focus:ring-blue-500 focus:border-blue-500 block w-full px-2.5 py-1.5 dark:bg-gray-900 dark:border-gray-800 dark:text-gray-200"
        />
      </div>
      <div class="flex flex-col sm:flex-row gap-2 sm:gap-4 items-start sm:items-center">
        <label
          class="w-full sm:w-24 flex-shrink-0 sm:text-right font-medium text-gray-700 dark:text-gray-300"
          for="form_gid"
        >
          Group ID
        </label>
        <input
          v-model="form.gid"
          id="form_gid"
          type="text"
          class="bg-gray-100 border border-gray-300 text-gray-800 text-sm rounded focus:ring-blue-500 focus:border-blue-500 block w-full px-2.5 py-1.5 dark:bg-gray-900 dark:border-gray-800 dark:text-gray-200"
        />
      </div>
      <div class="flex flex-col sm:flex-row gap-2 sm:gap-4 items-start sm:items-center">
        <label
          class="w-full sm:w-24 flex-shrink-0 sm:text-right font-medium text-gray-700 dark:text-gray-300"
          for="form_pass"
        >
          Password
        </label>
        <input
          v-model="form.pass"
          id="form_pass"
          type="text"
          class="bg-gray-100 border border-gray-300 text-gray-800 text-sm rounded focus:ring-blue-500 focus:border-blue-500 block w-full px-2.5 py-1.5 dark:bg-gray-900 dark:border-gray-800 dark:text-gray-200"
        />
      </div>
      <div class="flex flex-col sm:flex-row gap-2 sm:gap-4 items-start sm:items-center">
        <label
          class="w-full sm:w-24 flex-shrink-0 sm:text-right font-medium text-gray-700 dark:text-gray-300"
          for="form_alias"
        >
          Alias
        </label>
        <input
          v-model="form.alias"
          id="form_alias"
          type="text"
          class="bg-gray-100 border border-gray-300 text-gray-800 text-sm rounded focus:ring-blue-500 focus:border-blue-500 block w-full px-2.5 py-1.5 dark:bg-gray-900 dark:border-gray-800 dark:text-gray-200"
        />
      </div>
      <div class="flex flex-col sm:flex-row gap-2 sm:gap-4 items-start sm:items-center">
        <label
          class="w-full sm:w-24 flex-shrink-0 sm:text-right font-medium text-gray-700 dark:text-gray-300"
          for="form_type"
        >
          Type
        </label>
        <input
          v-model="form.type"
          id="form_type"
          type="text"
          class="bg-gray-100 border border-gray-300 text-gray-800 text-sm rounded focus:ring-blue-500 focus:border-blue-500 block w-full px-2.5 py-1.5 dark:bg-gray-900 dark:border-gray-800 dark:text-gray-200"
        />
      </div>
      <div class="flex flex-col sm:flex-row gap-2 sm:gap-4 items-start sm:items-center">
        <label
          class="w-full sm:w-24 flex-shrink-0 sm:text-right font-medium text-gray-700 dark:text-gray-300"
          for="form_loc"
        >
          Location
        </label>
        <input
          v-model="form.loc"
          id="form_loc"
          type="text"
          class="bg-gray-100 border border-gray-300 text-gray-800 text-sm rounded focus:ring-blue-500 focus:border-blue-500 block w-full px-2.5 py-1.5 dark:bg-gray-900 dark:border-gray-800 dark:text-gray-200"
        />
      </div>
      <div class="flex flex-col sm:flex-row gap-2 sm:gap-4 items-start sm:items-center">
        <label class="w-full sm:w-24 flex-shrink-0 sm:text-right font-medium text-gray-700 dark:text-gray-300">
          Collect
        </label>
        <div class="w-full grid grid-cols-3 gap-2">
          <div class="flex items-center gap-2">
            <input
              v-model="form.tupd"
              id="form_tupd"
              type="checkbox"
              value=""
              class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800 focus:ring-2 dark:bg-gray-900 dark:border-gray-800"
            >
            <label
              class="text-sm text-gray-700 dark:text-gray-300"
              for="form_tupd"
            >
              TUPD
            </label>
          </div>
          <div class="flex items-center gap-2">
            <input
              v-model="form.extra"
              id="form_extra"
              type="checkbox"
              value=""
              class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800 focus:ring-2 dark:bg-gray-900 dark:border-gray-800"
            >
            <label
              class="text-sm text-gray-700 dark:text-gray-300"
              for="form_extra"
            >
              OS & IP
            </label>
          </div>
          <div class="flex items-center gap-2">
            <input
              v-model="form.vnstat"
              id="form_vnstat"
              type="checkbox"
              value=""
              class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800 focus:ring-2 dark:bg-gray-900 dark:border-gray-800"
            >
            <label
              class="text-sm font-mono text-gray-700 dark:text-gray-300"
              for="form_vnstat"
            >
              vnstat
            </label>
          </div>
        </div>
      </div>
      <div class="flex flex-col sm:flex-row gap-2 sm:gap-4 items-start sm:items-center">
        <label class="w-full sm:w-24 flex-shrink-0 sm:text-right font-medium text-gray-700 dark:text-gray-300">
          Notify
        </label>
        <div class="flex items-center gap-2">
          <input
            v-model="form.notify"
            id="form_notify"
            type="checkbox"
            value=""
            class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800 focus:ring-2 dark:bg-gray-900 dark:border-gray-800"
          >
          <label
            class="text-sm text-gray-700 dark:text-gray-300"
            for="form_notify"
          >
            Enable
          </label>
        </div>
      </div>
      <div class="flex flex-col sm:flex-row gap-2 sm:gap-4 items-start sm:items-center">
        <label
          class="w-full sm:w-24 flex-shrink-0 sm:text-right font-medium text-gray-700 dark:text-gray-300"
          for="form_interval"
        >
          Interval
        </label>
        <input
          v-model="form.interval"
          id="form_interval"
          type="number"
          min="1"
          step="1"
          class="bg-gray-100 border border-gray-300 text-gray-800 text-sm rounded focus:ring-blue-500 focus:border-blue-500 block w-full px-2.5 py-1.5 dark:bg-gray-900 dark:border-gray-800 dark:text-gray-200"
        />
      </div>
      <div class="flex flex-col sm:flex-row gap-2 sm:gap-4 items-start sm:items-center">
        <label class="w-full sm:w-24 flex-shrink-0 sm:text-right font-medium text-gray-700 dark:text-gray-300">
          Execution
        </label>
        <div class="flex items-center gap-2">
          <input
            v-model="useSudo"
            id="form_sudo"
            type="checkbox"
            value=""
            class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800 focus:ring-2 dark:bg-gray-900 dark:border-gray-800"
          >
          <label
            class="text-sm text-gray-700 dark:text-gray-300"
            for="form_sudo"
          >
            Use <span class="font-mono">sudo</span>
          </label>
        </div>
      </div>
    </div>
    <div v-if="isValid">
      <code
        class="block w-full mb-2 bg-gray-900 dark:bg-black dark:border dark:border-gray-800 text-gray-200 font-mono text-sm whitespace-pre-wrap break-all select-all rounded-lg p-4"
        v-text="command"
      />
      <p class="text-gray-400 dark:text-gray-500 text-xs">
        The correctness of the command is not guaranteed. Please double check before running.
      </p>
    </div>
    <p v-else class="text-amber-500 text-sm">
      Unable to generate command. Please fill in necessary fields.
    </p>
  </div>
  <app-footer custom-class="max-w-xl" />
</template>
