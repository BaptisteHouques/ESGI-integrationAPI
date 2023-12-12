<script setup>
import {ref} from "vue";
import {useAuthStore} from "@/stores/authStore";

const auth = useAuthStore()
const newTag = ref('');

const addTagToBlacklist = () => {
    if (newTag.value && !auth.user.tagBlackList.includes(newTag.value)) {
        auth.user.tagBlackList.push(newTag.value);
        newTag.value = ''; // Reset le champ après l'ajout
    }
};

const removeTagFromBlacklist = (tag) => {
    const index = auth.user.tagBlackList.indexOf(tag);
    if (index > -1) {
        auth.user.tagBlackList.splice(index, 1);
    }
};

</script>

<template>
    <main class="home-container">
        <h1>Tags blacklistés</h1>

        <div class="input-group">
            <input v-model="newTag" placeholder="Ajouter un nouveau tag" />
            <button @click="addTagToBlacklist">Ajouter</button>
        </div>

        <ul>
            <li v-for="tag in auth.user.tagBlackList" :key="tag">
                {{ tag }}
                <button @click="removeTagFromBlacklist(tag)">Supprimer</button>
            </li>
        </ul>
    </main>
</template>

<style scoped>
.home-container {
    max-width: 600px;
    margin: auto;
    padding: 20px;
    background-color: #fff;
    border-radius: 8px;
    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
}

h1 {
    color: #333;
    text-align: center;
}

.input-group {
    display: flex;
    margin-bottom: 10px;
}

.input-group input {
    flex-grow: 1;
    padding: 10px;
    border-radius: 4px 0 0 4px;
    border: 1px solid #ddd;
}

.input-group button {
    padding: 10px 15px;
    background-color: #4CAF50;
    color: white;
    border: none;
    border-radius: 0 4px 4px 0;
    cursor: pointer;
    transition: background-color 0.3s;
}

.input-group button:hover {
    background-color: #45a049;
}

ul {
    list-style-type: none;
    padding: 0;
}

li {
    background-color: #f2f2f2;
    margin-bottom: 10px;
    padding: 10px;
    border-radius: 4px;
    display: flex;
    justify-content: space-between;
    align-items: center;
}

li button {
    background-color: #ff4d4f;
    color: white;
    padding: 5px 10px;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    transition: background-color 0.3s;
}

li button:hover {
    background-color: #ff3333;
}
</style>
