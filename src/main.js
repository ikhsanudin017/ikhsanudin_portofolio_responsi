import './assets/main.css'
import './assets/themes.css'

import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import animateOnScroll from './directives/animateOnScroll'

const app = createApp(App)

app.use(router)
app.directive('reveal', animateOnScroll)

app.mount('#app')
