import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store/store";
import VueAwesomePaginate from "vue-awesome-paginate";
// import { createMetaManager } from "vue-meta"; // Import for Vue 3

// Import the necessary CSS file
import "vue-awesome-paginate/dist/style.css";

// Create the Vue application
const app = createApp(App);

// Install plugins
app.use(router);
app.use(store);
app.use(VueAwesomePaginate);
// app.use(createMetaManager()); // Use VueMeta in Vue 3

app.config.globalProperties.$serverUrl = "https://buffalo-arriving-clearly.ngrok-free.app"


app.mount("#app");

