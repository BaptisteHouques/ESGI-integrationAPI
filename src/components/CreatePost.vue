<template>
    <div class="create-post-container">
        <input class="input-field"  :class="{ 'input-field-fearless': text}" type="text" v-model="text" placeholder="Enter text">
        <p v-show="text" @click="correctText" class="text-corrected clickable">
            <strong>Correct my text</strong>
            <span v-if="loadingCorrection" class="loading-indicator"></span>
        </p>
        <input class="input-field" type="url" v-model="imageUrl" @blur="validateUrl" placeholder="Enter image URL">
        <div class="error-message" v-if="imageUrlError">{{ imageUrlError }}</div>
        <button v-show="imageUrl" class="btn-action" @click="fetchTags" :disabled="!!imageUrlError">Get Tags</button>

        <div v-if="waiting" class="loading">Waiting...</div>

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
        <div class="submit-container">
            {{imageUrlError}}
            <button class="btn-action" @click="submitPost" :disabled="!!imageUrlError">Submit Post</button>
        </div>
    </div>
</template>

<script setup>
import { ref } from 'vue';
import { usePostStore } from '@/stores/postStore';
import {useAuthStore} from "@/stores/authStore";
import {toastHandler} from "@/helper/toastHandler";
import {postGPTRequest} from "@/services/postGPTRequest";

const emits = defineEmits(['onClose'])

const waiting = ref(false);
const text = ref('');
const imageUrl = ref('');
const imageAlt = ref('');
const suggestedTags = ref([]);
const selectedTags = ref('');
const showTags = ref(false);
const imageUrlError = ref('');
const loadingCorrection = ref(false);

const fetchTags = async () => {
    waiting.value = true
    usePostStore().getTagsFromImage(imageUrl.value).then((response) => {
        suggestedTags.value = response.slice(0, 3).map(concept => concept.name);
        // Préparation de la phrase avec les 5 premiers tags
        const firstFiveTags = response.slice(0, 5).map(concept => concept.name);
        imageAlt.value = "The image contains: " + firstFiveTags.join(', ');
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

const validateUrl = () => {
    // Version simplifiée de l'expression régulière pour valider les URLs
    const pattern = /^(https?:\/\/)?[\w-]+(\.[\w-]+)+[/#?]?.*$/;
    if (!pattern.test(imageUrl.value)) {
        imageUrlError.value = 'Invalid URL. Please enter a valid URL.';
    } else {
        imageUrlError.value = '';
    }
};

const submitPost = () => {
    const postStore = usePostStore();
    let tagsPosted
    if (selectedTags.value) {
        tagsPosted = selectedTags.value.split(',').map(tag => tag.trim())
    }
    else {
        tagsPosted = []
    }
    postStore.createPost(useAuthStore().user.username, text.value, imageUrl.value, imageAlt.value, tagsPosted);
    toastHandler('success', "Post créé!")
    imageUrl.value = '';
    suggestedTags.value = [];
    selectedTags.value = '';
    showTags.value = false
    close()
};

function correctText() {
    loadingCorrection.value = true
    // Prompt compliqué permettant de demander à ChatGPT de corriger le text et de le renvoyer. Pas fiable à 100%.
    postGPTRequest("Task: Correct the following text. Return only the corrected version of the text. Do not include any additional explanations or comments. Original text: '" + text.value + "'")
        .then((correctedText) => {
            // Ajouter la propriété correctedText et mettre loadingTranslation à false
            text.value = correctedText;
            loadingCorrection.value = false
        }
    )
}

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

.input-field-fearless {
    margin-bottom: unset;
}

.text-corrected {
    margin-bottom: 10px;
    font-size: 14px;
    font-weight: 600;
    font-style: italic;
    color: #317234;
}

.btn-action {
    background-color: #008CBA;
    color: white;
    padding: 10px 20px;
    border: none;
    border-radius: 5px;
    cursor: pointer;
}

.btn-action:disabled {
    cursor: not-allowed;
    background-color: #a9a9a9;
}

.loading {
    color: #000;
    margin-bottom: 10px;
}

.tags-container, .selected-tags {
    margin-bottom: 20px;
}

.submit-container {
    margin-top: 10px;
    text-align: center;
}
</style>
