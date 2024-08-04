import { createApp } from "vue";
import "./assets/style/style.css";
import store from "./store";
import App from "./App.vue";
import { registerSW } from "virtual:pwa-register";

const app = createApp(App);

// 註冊 Service Worker
registerSW({
  onNeedRefresh() {
    // 當有新的內容可用時，您可以通知用戶
    console.log("New content available, click on reload button to update.");
  },
  onOfflineReady() {
    // 當應用程序已準備好離線工作時
    console.log("App ready to work offline");
  },
});

app.use(store);

app.mount("#app");
