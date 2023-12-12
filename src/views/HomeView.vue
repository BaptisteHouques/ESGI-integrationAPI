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
            <article class="post-item" v-for="post in usePostStore().posts" :key="post.userId">
                <div class="user-id">{{ post.userId }}</div>
                <p class="post-text">{{ post.text }}</p>
                <img :src="post.imageUrl" alt="Post Image" class="post-image">
                <div class="post-tags">
                    Tags: <span v-for="tag in post.tags" :key="tag" class="tag">{{ tag }}</span>
                </div>
            </article>
        </section>
    </main>
</template>

<style scoped>
.home-container {
    max-width: 800px;
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

.post-image {
    width: 100%;
    height: auto;
    margin-top: 10px;
    border-radius: 10px;
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
