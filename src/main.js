import { createApp } from "vue";
import "./style.css";
import App from "./App.vue";
import router from "./router/router";
import Vue3Toastify from "vue3-toastify";
import { createPinia } from "pinia";
const pinia = createPinia();

createApp(App)
	.use(router)
	.use(pinia)
	.use(Vue3Toastify, { autoClose: 3000 })
	.mount("#app");
