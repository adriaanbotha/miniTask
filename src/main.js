import { createApp } from "vue";
import { createStore } from "vuex";
import App from "./App.vue";
import router from "./router";
import store from "./store/Store";
import "./assets/css/tailwind.css";

const app = createApp(App);
app.use(router);
app.use(store);
app.mount("#app");
