import {VueQueryPlugin} from '@tanstack/vue-query';
import type {Plugin} from 'vue';
import {createApp} from 'vue';
import App from './App.vue';

import './assets/main.css';
import router from './router';

createApp(App)
  .use(VueQueryPlugin as Plugin)
  .use(router)
  .mount('#app');
