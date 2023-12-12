import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import SignInVue from "@/views/SignInVue.vue";
import {useAuthStore} from "@/stores/authStore";
import BlackListView from "@/views/BlackListView.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/sign_in',
      name: 'signIn',
      component: SignInVue
    },
    {
      path: '/blacklist',
      name: 'blacklist',
      component: BlackListView
    }
  ],
})

router.beforeEach(async (to) => {
  const auth = useAuthStore();

  if (to.path !== '/sign_in' && !auth.user) {
    return '/sign_in';
  }
  else if (to.path === '/sign_in' && auth.user) {
    return '/';
  }
});

export default router
