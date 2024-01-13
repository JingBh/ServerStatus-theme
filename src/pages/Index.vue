<script setup lang="ts">
import { useIntervalFn } from '@vueuse/core'
import { useAxios } from '@vueuse/integrations/useAxios'

import { StatsResp } from '../types/stats.ts'
import {
  formatNetworkSpeed,
  formatSize,
  getDiskPercentage,
  getDiskText,
  getMemoryPercentage,
  getMemoryText,
  getSwapPercentage, getSwapText,
  isOnline
} from '../utils/stats.ts'
import AppFooter from '../fragments/AppFooter.vue'
import AppHeader from '../fragments/AppHeader.vue'

import BiArrowDownShort from 'bootstrap-icons/icons/arrow-down-short.svg?component'
import BiArrowUpShort from 'bootstrap-icons/icons/arrow-up-short.svg?component'
import BiCpu from 'bootstrap-icons/icons/cpu.svg?component'
import BiDisplay from 'bootstrap-icons/icons/display.svg?component'
import BiEthernet from 'bootstrap-icons/icons/ethernet.svg?component'
import BiGear from 'bootstrap-icons/icons/gear.svg?component'
import BiGeoAlt from 'bootstrap-icons/icons/geo-alt.svg?component'
import BiHdd from 'bootstrap-icons/icons/hdd.svg?component'
import BiHddNetwork from 'bootstrap-icons/icons/hdd-network.svg?component'
import BiHddStack from 'bootstrap-icons/icons/hdd-stack.svg?component'
import BiMemory from 'bootstrap-icons/icons/memory.svg?component'
import BiMotherboard from 'bootstrap-icons/icons/motherboard.svg?component'
import BiPower from 'bootstrap-icons/icons/power.svg?component'
import BiRouter from 'bootstrap-icons/icons/router.svg?component'

const {
  data: stats,
  isLoading,
  error,
  execute: fetchStats
} = useAxios<StatsResp>('json/stats.json', {
  //
}, {
  immediate: false
})

useIntervalFn(fetchStats, 2000, {
  immediate: true,
  immediateCallback: true
})
</script>

<template>
  <app-header custom-class="max-w-7xl" />
  <div class="max-w-7xl mx-auto p-6 sm:px-8 flex flex-col items-stretch gap-2">
    <div v-if="!stats && isLoading" class="flex justify-center items-center gap-3 py-8" role="status">
      <svg aria-hidden="true" class="w-8 h-8 text-gray-300 animate-spin dark:text-gray-700 fill-blue-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor"/>
        <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill"/>
      </svg>
      <span class="text-gray-700 dark:text-gray-300 text-lg">Loading Stats...</span>
    </div>
    <div
      v-else-if="stats"
      class="flex flex-col items-stretch gap-6 mb-4"
    >
      <div
        v-for="stat of stats.servers"
        :key="stat.name"
        class="p-4 border border-slate-200 dark:border-slate-800 rounded-lg shadow-lg bg-slate-100 dark:bg-slate-900"
      >
        <div class="flex items-center justify-between gap-3 mb-2">
          <h5 class="text-lg font-medium">
            <bi-display v-if="stat.type === 'PC'" class="inline-block w-5 h-5 mr-2 text-gray-600 dark:text-gray-400" />
            <bi-motherboard v-else-if="stat.type === 'Board'" class="inline-block w-5 h-5 mr-2 text-gray-600 dark:text-gray-400" />
            <bi-router v-else-if="stat.type === 'Router'" class="inline-block w-5 h-5 mr-2 text-gray-600 dark:text-gray-400" />
            <bi-hdd-network v-else-if="stat.type === 'KVM'" class="inline-block w-5 h-5 mr-2 text-gray-600 dark:text-gray-400" />
            <bi-hdd-stack v-else class="inline-block w-5 h-5 mr-2 text-gray-600 dark:text-gray-400" />
            <span v-text="stat.alias || stat.name" />
          </h5>
          <div class="flex items-center gap-2">
              <span
                v-if="!isOnline(stat, stats.updated)"
                class="inline-block w-16 py-1 text-center text-xs font-semibold text-red-600 bg-red-100 dark:text-red-100 dark:bg-red-600 rounded-full"
              >Offline</span>
            <span
              v-else
              class="inline-block w-16 py-1 text-center text-xs font-semibold text-green-600 bg-green-100 dark:text-green-100 dark:bg-green-600 rounded-full"
            >{{ stat.online6 ? 'IPv6' : 'IPv4' }}</span>
          </div>
        </div>

        <div class="flex items-center gap-5 text-sm text-gray-600 dark:text-gray-300">
          <p class="inline-block">
            <bi-geo-alt class="inline-block w-4 h-4 mr-2 text-gray-400 dark:text-gray-500" />
            <span class="align-middle" v-text="stat.location || 'Unknown'" />
          </p>
          <template v-if="isOnline(stat, stats.updated)">
            <p class="inline-block">
              <bi-power class="inline-block w-4 h-4 mr-2 text-gray-400 dark:text-gray-500" />
              <span class="align-middle"><span class="hidden sm:inline">Uptime: </span>{{ stat.uptime }}</span>
            </p>
            <p class="hidden sm:inline-block">
              <bi-gear class="inline-block w-4 h-4 mr-2 text-gray-400 dark:text-gray-500" />
              <span class="align-middle">Load: <span :class="{ 'text-red-600 dark:text-red-500': stat.load_1 > 3 }">{{ stat.load_1 }}</span></span>
            </p>
          </template>
        </div>

        <div
          v-if="isOnline(stat, stats.updated)"
          class="flex flex-col md:flex-row md:grid md:grid-cols-2 lg:grid-cols-3 mt-3 gap-3 md:gap-x-5"
        >
          <!-- CPU -->
          <div class="flex items-center gap-2">
            <bi-cpu class="inline-block w-4 h-4 text-gray-400 dark:text-gray-500" />
            <div class="flex-1 flex flex-col items-stretch gap-1">
              <div class="flex flex-row-reverse justify-between items-center text-xs text-gray-600 dark:text-gray-300">
                <span>{{ stat.cpu }}%</span>
                <span v-if="stat.process_count || stat.thread_count">{{ stat.process_count }} Processes / {{ stat.thread_count}} Threads</span>
                <span v-else class="text-gray-400 dark:text-gray-500">CPU Usage</span>
              </div>
              <div class="w-full bg-gray-200 rounded-full h-1 dark:bg-gray-700">
                <div
                  class="h-1 rounded-full transition-[width] duration-500 ease-linear"
                  :class="{ 'bg-blue-600 dark:bg-blue-500': stat.cpu < 80, 'bg-red-600 dark:bg-red-500': stat.cpu >= 80 }"
                  :style="{ width: stat.cpu + '%' }"
                />
              </div>
            </div>
          </div>

          <!-- RAM -->
          <div v-if="stat.memory_total" class="flex items-center gap-2">
            <bi-memory class="inline-block w-4 h-4 text-gray-400 dark:text-gray-500" />
            <div class="flex-1 flex flex-col items-stretch gap-1">
              <div class="flex flex-row-reverse justify-between items-center text-xs text-gray-600 dark:text-gray-300">
                <span>{{ getMemoryPercentage(stat) }}%</span>
                <span>{{ getMemoryText(stat) }}
                    <span
                      v-if="stat.swap_total"
                      class="hidden sm:inline"
                    >({{ getSwapText(stat) }} swap)</span></span>
              </div>
              <div class="flex w-full bg-gray-200 rounded-full h-1 dark:bg-gray-700">
                <div
                  class="h-1 transition-[width] duration-500 ease-linear"
                  :class="{ 'bg-blue-600 dark:bg-blue-500': getMemoryPercentage(stat) < 80, 'bg-red-600 dark:bg-red-500': getMemoryPercentage(stat) >= 80, 'rounded-s-full': stat.swap_total, 'rounded-full': !stat.swap_total }"
                  :style="{ width: getMemoryPercentage(stat) + '%' }"
                />
                <div
                  v-if="stat.swap_total"
                  class="bg-amber-600 h-1 rounded-e-full dark:bg-amber-500 transition-[width] duration-500 ease-linear"
                  :style="{ width: getSwapPercentage(stat) + '%' }"
                />
              </div>
            </div>
          </div>

          <!-- Disk -->
          <div v-if="stat.hdd_total" class="flex items-center gap-2">
            <bi-hdd class="inline-block w-4 h-4 text-gray-400 dark:text-gray-500" />
            <div class="flex-1 flex flex-col items-stretch gap-1">
              <div class="flex flex-row-reverse justify-between items-center text-xs text-gray-600 dark:text-gray-300">
                <span>{{ getDiskPercentage(stat) }}%</span>
                <span v-text="getDiskText(stat)"></span>
              </div>
              <div class="w-full bg-gray-200 rounded-full h-1 dark:bg-gray-700">
                <div
                  class="h-1 rounded-full transition-[width] duration-500 ease-linear"
                  :class="{ 'bg-blue-600 dark:bg-blue-500': stat.hdd_total - stat.hdd_used > 1024, 'bg-red-600 dark:bg-red-500': stat.hdd_total - stat.hdd_used <= 1024 }"
                  :style="{ width: getDiskPercentage(stat) + '%' }"
                />
              </div>
            </div>
          </div>

          <!-- Network -->
          <div class="lg:col-span-3 flex items-center gap-2 text-xs text-gray-600 dark:text-gray-300">
            <bi-ethernet class="inline-block w-4 h-4 text-gray-400 dark:text-gray-500" />
            <div class="grid grid-flow-col grid-rows-2 lg:grid-rows-none gap-x-2">
              <p class="inline-block">
                <bi-arrow-up-short class="inline-block w-4 h-4 text-gray-400 dark:text-gray-500" />
                <span class="align-middle">{{ formatNetworkSpeed(stat.network_tx) }}
                  ({{ formatSize(stat.network_out) }} total)</span>
              </p>
              <p class="inline-block">
                <bi-arrow-down-short class="inline-block w-4 h-4 text-gray-400 dark:text-gray-500" />
                <span class="align-middle">{{ formatNetworkSpeed(stat.network_rx) }}
                  ({{ formatSize(stat.network_in) }} total)</span>
              </p>
              <p class="inline-block">
                <span class="ml-1 align-middle text-gray-400 dark:text-gray-500">TCP:</span>
                <span class="align-middle">{{ stat.tcp_count }}</span>
              </p>
              <p class="inline-block">
                <span class="ml-1 align-middle text-gray-400 dark:text-gray-500">UDP:</span>
                <span class="align-middle">{{ stat.udp_count }}</span>
              </p>
            </div>
          </div>
        </div>
      </div>
      <div v-if="!stats.servers.length" class="flex flex-col items-center gap-4 py-8 text-lg text-gray-600 dark:text-gray-300">
        <img alt="Empty" src="../assets/images/empty.png" class="w-32 h-32" />
        No servers available
      </div>
    </div>
    <p v-if="stats?.updated" class="text-sm text-gray-500 dark:text-gray-400">
      Refreshed at {{ new Date(stats?.updated * 1000).toLocaleString() }}
    </p>
    <p v-if="error" class="text-sm text-red-600">
      Last refresh attempt failed with {{ error }}
    </p>
  </div>
  <app-footer custom-class="max-w-7xl" />
</template>
