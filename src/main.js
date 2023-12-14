import './assets/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'
import Toast from "vue-toastification"
import "vue-toastification/dist/index.css";

import App from './App.vue'
import router from './router'

const app = createApp(App)

app.use(createPinia())
app.use(router)

app.use(Toast, {
    transition: "Vue-Toastification__bounce",
    maxToasts: 2,
    newestOnTop: true,
    position: "top-left",
    filterBeforeCreate: (toast, toasts) => {
        if (toasts.filter(
            t => t.type === toast.type
        ).length !== 0) {
            // Returning false discards the toast
            return false;
        }
        // You can modify the toast if you want
        return toast;
    }
})

app.mount('#app')
