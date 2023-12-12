<script setup>
import {usePostStore} from "@/stores/postStore";
import {onMounted, ref} from "vue";
import CreatePost from "@/components/CreatePost.vue";

const postStore = usePostStore();
const showCreatePost = ref(false)

onMounted(async () => {
    await postStore.loadPosts();
});

</script>

<template>
    <main class="home-container">
        <h1>Liste des posts</h1>
        <button class="btn-toggle-create" @click="showCreatePost = !showCreatePost">Créer un post</button>
        <CreatePost v-if="showCreatePost" @onClose="showCreatePost = false" />

        <section class="post-list">
            <article class="post-item" v-for="post in usePostStore().posts" :key="post.username">
                <div class="user-id">{{ post.username }}</div>
                <p class="post-text">{{ post.text }}</p>
                <div class="image-container">
                    <img :src="post.imageUrl" :alt="post.imageAlt" :title="post.imageAlt" class="post-image">
                </div>
                <div class="post-tags">
                    Tags:
                    <span v-if="post.tags[0] !== ''" v-for="tag in post.tags" :key="tag" class="tag">{{ tag }}</span>
                    <span v-else>Aucuns</span>
                </div>
            </article>
        </section>
    </main>
</template>

<style scoped>
.home-container {
    max-width: 500px;
    margin: auto;
    padding: 20px;
}

.btn-toggle-create {
    background-color: #4CAF50;
    color: white;
    padding: 10px 20px;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    margin-bottom: 20px;
}

.post-list {
    margin-top: 20px;
}

.post-item {
    background-color: #fff;
    padding: 15px;
    margin-bottom: 20px;
    border-radius: 10px;
    box-shadow: 0 2px 4px rgba(0,0,0,0.1);
}

.user-id {
    font-weight: bold;
    color: #333;
}

.post-text {
    margin-top: 10px;
    color: #555;
}

.image-container {
    margin-top: 10px;
    text-align: center;
}

.post-image {
    max-width: 100%; /* Assure que l'image ne dépasse pas la largeur de son conteneur */
    max-height: 300px; /* Définit la hauteur maximale de l'image */
    height: auto; /* Garde le ratio de l'image */
    object-fit: cover; /* S'assure que l'image couvre la zone définie tout en gardant son ratio */
    margin-bottom: 10px;
    border-radius: 8px; /* Optionnel: pour arrondir les coins de l'image */
}

.post-tags {
    margin-top: 10px;
    color: #007bff;
}

.tag {
    display: inline-block;
    background-color: #e1ecf4;
    color: #007bff;
    padding: 3px 6px;
    margin-right: 5px;
    border-radius: 5px;
    font-size: 14px;
}
</style>
