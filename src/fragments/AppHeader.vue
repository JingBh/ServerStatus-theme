<script setup lang="ts">
import { Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/vue'

import BiCodeSlash from 'bootstrap-icons/icons/code-slash.svg?component'
import BiListTask from 'bootstrap-icons/icons/list-task.svg?component'
import BiGlobe from 'bootstrap-icons/icons/globe-asia-australia.svg?component'
import BiGraphUp from 'bootstrap-icons/icons/graph-up.svg?component'
import BiList from 'bootstrap-icons/icons/list.svg?component'
import logoUrl from '../assets/images/logo.svg?url'

defineProps<{
  customClass?: string
}>()
</script>

<template>
  <div class="w-full bg-slate-800 text-white">
    <div
      class="mx-auto flex justify-between items-center gap-3 p-6 sm:p-8"
      :class="customClass"
    >
      <router-link to="/" class="flex-shrink-0 inline-flex items-center gap-3">
        <img alt="Logo" :src="logoUrl" class="w-8 h-8 inline-block" />
        <h1 class="text-xl sm:text-2xl font-titillium font-semibold">
          ServerStatus
        </h1>
      </router-link>
      <Menu as="div" class="relative inline-flex items-center gap-3">
        <menu-button
          class="w-10 h-10 -my-2 inline-flex justify-center items-center rounded-full hover:bg-slate-600 focus:outline-none focus:bg-slate-700 focus-visible:ring-2 focus-visible:ring-white/75"
          aria-label="Pages"
        >
          <bi-list class="w-6 h-6 inline-block" />
        </menu-button>
        <transition
          enter-active-class="transition duration-100 ease-out"
          enter-from-class="transform scale-95 opacity-0"
          enter-to-class="transform scale-100 opacity-100"
          leave-active-class="transition duration-75 ease-in"
          leave-from-class="transform scale-100 opacity-100"
          leave-to-class="transform scale-95 opacity-0"
        >
          <menu-items class="absolute top-10 right-0 w-40 p-1 origin-top-right rounded-md bg-white/75 dark:bg-black/75 backdrop-blur text-gray-700 dark:text-gray-200 shadow-lg ring-1 ring-black/5 focus:outline-none">
            <menu-item v-slot="{ active }">
              <router-link
                class="flex w-full items-center rounded-md p-2 text-sm"
                :class="active ? 'bg-blue-500 text-white' : ''"
                to="/"
              >
                <bi-graph-up
                  class="h-4 w-4 inline-block mr-2"
                  :class="active ? 'text-white' : 'text-gray-400 dark:text-gray-500'"
                />
                <span class="align-middle">Stats</span>
              </router-link>
            </menu-item>
            <menu-item v-slot="{ active }">
              <a
                class="flex w-full items-center rounded-md p-2 text-sm"
                :class="active ? 'bg-blue-500 text-white' : ''"
                href="/detail"
              >
                <bi-list-task
                  class="h-4 w-4 inline-block mr-2"
                  :class="active ? 'text-white' : 'text-gray-400 dark:text-gray-500'"
                />
                <span class="align-middle">Details</span>
              </a>
            </menu-item>
            <menu-item v-slot="{ active }">
              <a
                class="flex w-full items-center rounded-md p-2 text-sm"
                :class="active ? 'bg-blue-500 text-white' : ''"
                href="/map"
              >
                <bi-globe
                  class="h-4 w-4 inline-block mr-2"
                  :class="active ? 'text-white' : 'text-gray-400 dark:text-gray-500'"
                />
                <span class="align-middle">Map</span>
              </a>
            </menu-item>
            <menu-item v-slot="{ active }">
              <router-link
                class="flex w-full items-center rounded-md p-2 text-sm"
                :class="active ? 'bg-blue-500 text-white' : ''"
                to="/script"
              >
                <bi-code-slash
                  class="h-4 w-4 inline-block mr-2"
                  :class="active ? 'text-white' : 'text-gray-400 dark:text-gray-500'"
                />
                <span class="align-middle">One-Click</span>
              </router-link>
            </menu-item>
          </menu-items>
        </transition>
      </Menu>
    </div>
  </div>
</template>
