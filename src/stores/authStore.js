import router from "@/router";
import {defineStore} from "pinia";
import axios from "axios";

export const useAuthStore = defineStore({
  id: 'auth',
  state: () => ({
    // initialize state from local storage to enable user to stay logged in
    user: JSON.parse(localStorage.getItem('user'))
  }),
  actions: {
    async login(username, password) {
      try {
        const {data} = await axios.get('/db.json');
        const user = data.users.find(u => u.username === username && u.password === password);
        if (user) {
          // Gérer la session de l'utilisateur
          this.user = user;
          localStorage.setItem('user', JSON.stringify(user));

          await router.push('/')
        } else {
          console.log('Invalid Credentials');
        }
      } catch (error) {
        console.error(error);
      }
    },

    logout() {
      this.user = null;
      localStorage.removeItem('user');
      router.push('/sign_in').catch(err => {
        console.log(err)
      })
    }
  }
});