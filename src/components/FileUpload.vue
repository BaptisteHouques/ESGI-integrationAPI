<template>
    <div class="sample-app">
        <p>Upload</p>
        <IKContext
                :publicKey="publicKey"
                :urlEndpoint="urlEndpoint"
                :authenticationEndpoint="authenticationEndpoint"
        >
            <IKUpload fileName="abc.jpg" v-bind:tags="['tag1']" v-bind:responseFields="['tags']"/>
        </IKContext>
        <p>To use this funtionality please remember to setup the server</p>
    </div>
</template>

<script>
import { IKImage, IKContext, IKUpload } from "imagekitio-vue";
let urlEndpoint= "https://ik.imagekit.io/your_imagekit_id";

export default {
    name: "app",
    components: {
        IKImage,
        IKContext,
        IKUpload
    },
    data() {
        return {
            urlEndpoint: "https://ik.imagekit.io/your_imagekit_id",
            publicKey: "your_public_api_key",
            authenticationEndpoint: "https://www.yourserver.com/auth"
        };
    }
};
</script>