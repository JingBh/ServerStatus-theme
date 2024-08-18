<script setup lang="ts">
// @ts-ignore
import { countryCodeEmoji } from 'country-code-emoji'

import {
  formatNetworkSpeed,
  formatSize,
  getDiskPercentage,
  getDiskText,
  getMemoryPercentage,
  getMemoryText,
  getSwapPercentage,
  getSwapText
} from '../utils/stats.ts'
import type { HostStat } from '../types/stats.ts'

import BiArrowDownShort from 'bootstrap-icons/icons/arrow-down-short.svg?component'
import BiArrowUpShort from 'bootstrap-icons/icons/arrow-up-short.svg?component'
import BiCpu from 'bootstrap-icons/icons/cpu.svg?component'
import BiDisplay from 'bootstrap-icons/icons/display.svg?component'
import BiEthernet from 'bootstrap-icons/icons/ethernet.svg?component'
import BiGear from 'bootstrap-icons/icons/gear.svg?component'
import BiGeoAlt from 'bootstrap-icons/icons/geo-alt.svg?component'
import BiHdd from 'bootstrap-icons/icons/hdd.svg?component'
import BiHddNetwork from 'bootstrap-icons/icons/hdd-network.svg?component'
import BiMemory from 'bootstrap-icons/icons/memory.svg?component'
import BiMotherboard from 'bootstrap-icons/icons/motherboard.svg?component'
import BiPower from 'bootstrap-icons/icons/power.svg?component'
import BiRouter from 'bootstrap-icons/icons/router.svg?component'
import { computed } from 'vue'

const props = defineProps<{
  stat: HostStat
}>()

const isOnline = computed(() => {
  return props.stat.online4 || props.stat.online6
})

const location = computed(() => {
  try {
    const emoji = countryCodeEmoji(props.stat.location)
    if (emoji === '🇹🇼') {
      return '🇨🇳'
    }
    return emoji
  } catch {
    return props.stat.location
  }
})
</script>

<template>
  <div class="p-4 border border-slate-200 dark:border-slate-800 rounded-lg shadow-md shadow-slate-200 dark:shadow-slate-800 bg-slate-100 dark:bg-slate-900">
    <div class="flex items-center justify-between gap-3 mb-2">
      <!-- Title -->
      <h5 class="text-lg font-medium">
        <bi-display v-if="stat.type === 'PC'" class="inline-block w-5 h-5 mr-2 text-gray-600 dark:text-gray-400" />
        <bi-motherboard v-else-if="stat.type === 'Board'" class="inline-block w-5 h-5 mr-2 text-gray-600 dark:text-gray-400" />
        <bi-router v-else-if="stat.type === 'Router'" class="inline-block w-5 h-5 mr-2 text-gray-600 dark:text-gray-400" />
        <bi-hdd-network v-else-if="stat.type.includes('VM') || stat.type === 'Hyper-V'" class="inline-block w-5 h-5 mr-2 text-gray-600 dark:text-gray-400" />
        <span v-text="stat.alias || stat.name" />
      </h5>

      <!-- Online Status -->
      <div class="flex items-center gap-2">
        <span
          v-if="!isOnline"
          class="inline-block w-16 py-1 text-center text-xs font-semibold text-red-600 bg-red-100 dark:text-red-100 dark:bg-red-600 rounded-full"
        >Offline</span>
        <span
          v-else
          class="inline-block w-16 py-1 text-center text-xs font-semibold text-green-600 bg-green-100 dark:text-green-100 dark:bg-green-600 rounded-full"
        >{{ stat.online6 ? 'IPv6' : 'IPv4' }}</span>
      </div>
    </div>

    <div
      v-if="stat.location || isOnline"
      class="flex items-center gap-5 text-sm text-gray-600 dark:text-gray-300"
    >
      <!-- Location -->
      <p
        v-if="stat.location"
        class="inline-block"
      >
        <bi-geo-alt class="inline-block w-4 h-4 mr-2 text-gray-400 dark:text-gray-500" />
        <span
          class="align-middle"
          v-text="location"
        />
      </p>

      <template v-if="isOnline">
        <!-- Uptime -->
        <p class="inline-block">
          <bi-power class="inline-block w-4 h-4 mr-2 text-gray-400 dark:text-gray-500" />
          <span class="align-middle"><span class="hidden sm:inline">Uptime: </span>{{ stat.uptime }}</span>
        </p>

        <!-- Load -->
        <p class="hidden sm:inline-block">
          <bi-gear class="inline-block w-4 h-4 mr-2 text-gray-400 dark:text-gray-500" />
          <span class="align-middle">Load: <span :class="{ 'text-red-600 dark:text-red-500': stat.load_1 > 3 }">{{ stat.load_1 }}</span></span>
        </p>
      </template>
    </div>

    <div
      v-if="isOnline"
      class="flex flex-col md:flex-row md:grid md:grid-cols-2 lg:grid-cols-3 mt-3 gap-3 md:gap-x-5"
    >
      <!-- CPU -->
      <div class="flex items-center gap-2">
        <bi-cpu class="inline-block w-4 h-4 text-gray-400 dark:text-gray-500" />
        <div class="flex-1 flex flex-col items-stretch gap-1">
          <div class="flex flex-row-reverse justify-between items-center text-xs text-gray-600 dark:text-gray-300">
            <span>{{ stat.cpu }}%</span>
            <span v-if="stat.process_count || stat.thread_count">{{ stat.process_count }} Processes / {{ stat.thread_count}} Threads</span>
            <span v-else class="text-gray-400 dark:text-gray-500">CPU</span>
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
      <div class="xl:col-span-3 flex items-center gap-2 text-xs text-gray-600 dark:text-gray-300">
        <bi-ethernet class="inline-block w-4 h-4 text-gray-400 dark:text-gray-500" />
        <div class="grid grid-flow-col grid-rows-2 xl:grid-rows-none gap-x-2">
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
          <template v-if="stat.tcp_count || stat.udp_count">
            <p class="inline-block">
              <span class="ml-1 align-middle text-gray-400 dark:text-gray-500">TCP:</span>
              <span class="align-middle">{{ stat.tcp_count }}</span>
            </p>
            <p class="inline-block">
              <span class="ml-1 align-middle text-gray-400 dark:text-gray-500">UDP:</span>
              <span class="align-middle">{{ stat.udp_count }}</span>
            </p>
          </template>
        </div>
      </div>
    </div>
  </div>
</template>
