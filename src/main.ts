import { createApp } from 'vue'

import router from './router.ts'

import App from './App.vue'

import './assets/styles/app.css'

const app = createApp(App)

app.use(router)

app.mount('#app')
