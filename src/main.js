import { createApp } from "vue";
import App from "./App.vue";
const app = createApp(App);
app.mount("#app");


const NODE_ENV = process.env.NODE_ENV;
console.log("webpack", NODE_ENV)
console.log(process.env);