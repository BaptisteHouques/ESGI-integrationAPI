<script setup>
import { RouterLink, RouterView } from 'vue-router'
import {useAuthStore} from "@/stores/authStore";
import {useLanguage} from "@/services/useLanguage";

const auth = useAuthStore()
const languages = [
  'English',
  'Français',
  'Español',
  'Deutsch',
  'Italiano',
  'Português',
  'Nederlands',
  'Русский',
  '日本語',
  '中文',
  '한국어',
  'العربية',
  'हिन्दी',
  'Svenska',
  'Dansk',
  'Norsk',
  'Suomi',
  'Polski',
  'Ελληνικά',
  'Türkçe',
  'Čeština',
  'Magyar',
  'Română',
  'Sloven',
]
const { selectedLanguage, setLanguage } = useLanguage();
</script>

<template>
  <header class="app-header">
    <div v-show="auth.user" class="wrapper">
      <nav class="main-nav">
        <RouterLink class="nav-link" to="/">Home</RouterLink>
        <RouterLink class="nav-link" to="/blackList">BlackList</RouterLink>
        <button class="sign-out-btn" @click="useAuthStore().logout()">Sign Out</button>
      </nav>
      <select v-model="selectedLanguage" @change="setLanguage(selectedLanguage)" class="language-selector">
        <option v-for="lang in languages" :key="lang" :value="lang">{{ lang }}</option>
      </select>
    </div>
  </header>

  <RouterView />
</template>

<style scoped>
.app-header {
  padding: 10px 20px;
  border-bottom: 1px solid #e1e1e1;
}

.wrapper {
  max-width: 800px;
  margin: auto;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.main-nav {
  font-size: 16px;
}

.nav-link {
  color: #333;
  text-decoration: none;
  margin-right: 20px;
  transition: color 0.3s;
}

.nav-link:hover {
  color: #555;
}

.sign-out-btn {
  background-color: transparent;
  color: #333;
  padding: 8px 15px;
  border: 1px solid #ccc;
  border-radius: 4px;
  cursor: pointer;
  transition: all 0.3s;
}

.sign-out-btn:hover {
  background-color: #f2f2f2;
  border-color: #bbb;
}

.language-selector {
  padding: 8px 15px;
  border: 1px solid #ccc;
  border-radius: 4px;
  background-color: white;
  color: #333;
  cursor: pointer;
}
</style>
