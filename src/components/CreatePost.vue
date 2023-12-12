<template>
    <div class="create-post-container">
        <input class="input-field" type="text" v-model="text" placeholder="Enter text">
        <input class="input-field" type="text" v-model="imageUrl" placeholder="Enter image URL">
        <button class="btn-action" @click="fetchTags">Get Tags</button>

        <div v-if="waiting" class="loading">Waiting ...</div>

        <div v-if="suggestedTags.length" class="tags-container">
            <p>Suggested Tags:</p>
            <ul>
                <li v-for="tag in suggestedTags" :key="tag" @click="addTag(tag)">{{ tag }}</li>
            </ul>
        </div>

        <div v-if="showTags" class="selected-tags">
            <p>Selected Tags:</p>
            <input class="input-field" type="text" v-model="selectedTags" placeholder="Enter tags (separated by commas)">
        </div>

        <button class="btn-action" @click="submitPost">Submit Post</button>
    </div>
</template>

<script setup>
import { ref } from 'vue';
import { usePostStore } from '@/stores/postStore';
import {useAuthStore} from "@/stores/authStore";

const emits = defineEmits(['onClose'])

const waiting = ref(false);
const text = ref('');
const imageUrl = ref('');
const suggestedTags = ref([]);
const selectedTags = ref('');
const showTags = ref(false);

const fetchTags = async () => {
    waiting.value = true
    usePostStore().getTagsFromImage(imageUrl.value).then((response) => {
        suggestedTags.value = response;
        showTags.value = true;
        waiting.value = false
    });
};

const addTag = (tag) => {
    if (selectedTags.value) {
        selectedTags.value += ', ' + tag; // Ajoute le tag à la chaîne avec une virgule si d'autres tags existent déjà
    } else {
        selectedTags.value = tag; // Initialise la chaîne avec le premier tag
    }
    suggestedTags.value = suggestedTags.value.filter(t => t !== tag); // Supprime le tag des suggestions
};

const submitPost = () => {
    const postStore = usePostStore();
    postStore.createPost(useAuthStore().user.username, text.value, imageUrl.value, selectedTags.value.split(',').map(tag => tag.trim()));
    imageUrl.value = '';
    suggestedTags.value = [];
    selectedTags.value = '';
    showTags.value = false
    close()
};

function close() {
    emits('onClose')
}
</script>

<style scoped>
.create-post-container {
    max-width: 600px;
    margin: auto;
    padding: 20px;
}

.input-field {
    width: 100%;
    padding: 10px;
    margin-bottom: 10px;
    border-radius: 5px;
    border: 1px solid #ccc;
}

.btn-action {
    background-color: #008CBA;
    color: white;
    padding: 10px 20px;
    border: none;
    border-radius: 5px;
    cursor: pointer;
}

.loading {
    color: #000;
    margin-bottom: 10px;
}

.tags-container, .selected-tags {
    margin-bottom: 20px;
}
</style>
