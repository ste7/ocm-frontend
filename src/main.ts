import { createApp } from 'vue';
import { createPinia } from 'pinia';
import './style.css';
import App from './App.vue';
import Vue3Toastify, { type ToastContainerOptions } from 'vue3-toastify';
import 'vue3-toastify/dist/index.css';
const app = createApp(App);
const pinia = createPinia();

app.use(Vue3Toastify, {
  autoClose: 3000
} as ToastContainerOptions);
app.use(pinia);
app.mount('#app');
