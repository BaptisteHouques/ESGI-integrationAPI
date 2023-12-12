import axios from "axios";
import {defineStore} from "pinia";

export const usePostStore = defineStore({
    id: 'post',
    state: () => ({
        posts: []
    }),
    actions: {
        async loadPosts() {
            try {
                await axios.get('/db.json')
                    .then((response) => {
                        this.posts = response.data.posts;
                    });
            } catch (error) {
                console.error('Error loading posts:', error);
            }
        },

        async createPost(userId, text, imageUrl, imageAlt, tags) {
            const newPost = {
                userId,
                text,
                imageUrl,
                imageAlt,
                tags
            };

            this.posts.push(newPost);
        },

        // Dans votre store Pinia ou un composable

        async getTagsFromImage (imageUrl) {
            const PAT = '4011bb96e60a4871bfb3ef53834e66df';
            const USER_ID = 'clarifai';
            const APP_ID = 'main';
            const MODEL_ID = 'general-image-recognition';
            const MODEL_VERSION_ID = 'aa7f35c01e0642fda5cf400f543e7c40';

            const raw = JSON.stringify({
                "user_app_id": {
                    "user_id": USER_ID,
                    "app_id": APP_ID
                },
                "inputs": [
                    {
                        "data": {
                            "image": {
                                "url": imageUrl
                            }
                        }
                    }
                ]
            });

            const requestOptions = {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Authorization': 'Key ' + PAT
                },
                body: raw
            };

            return fetch("https://api.clarifai.com/v2/models/" + MODEL_ID + "/versions/" + MODEL_VERSION_ID + "/outputs", requestOptions)
                .then(response => response.json())
                .then(result => {
                    // Traitement du résultat pour extraire les tags
                    return result.outputs[0].data.concepts;
                })
                .catch(error => {
                    console.error('Error fetching tags:', error);
                    return [];
                });
        }

    }
});
