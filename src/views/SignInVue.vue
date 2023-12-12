<template>
    <div class="signin-container">
        <form class="signin-form">
            <input class="input-field" v-model="username" placeholder="Username" />
            <input class="input-field" v-model="password" type="password" placeholder="Password" />
            <button class="signin-btn" type="submit" @click="handleSignIn">Sign In</button>
        </form>
    </div>
</template>

<script setup>
import { ref } from 'vue';
import {useAuthStore} from "@/stores/authStore";

const username = ref('');
const password = ref('');

const handleSignIn = async () => {
    // Logic to sign in
    await useAuthStore().login(username.value, password.value);
};
</script>

<style scoped>
.signin-container {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100vh;
    background-color: #f5f5f5;
}

.signin-form {
    padding: 20px;
    background: white;
    border-radius: 8px;
    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
}

.input-field {
    width: 100%;
    padding: 10px;
    margin-bottom: 20px;
    border-radius: 4px;
    border: 1px solid #ddd;
}

.signin-btn {
    width: 100%;
    padding: 10px;
    background-color: #4CAF50;
    color: white;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    transition: background-color 0.3s;
}

.signin-btn:hover {
    background-color: #45a049;
}
</style>

