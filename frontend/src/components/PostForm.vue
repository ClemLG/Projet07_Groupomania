<!--HTML-->
<template>
    <div class="bg-primary rounded-3 py-3">
        <b-container>
            <b-row>
                <b-col cols="auto">
                    <b-avatar variant="secondary" text="BV" :src="avatar"></b-avatar>
                </b-col>
                <b-col>
                    <b-form-input v-model="content" type="text" :placeholder="'Quoi de neuf, ' + username + ' ?'"></b-form-input>
                </b-col>
                <b-col cols="auto">
                    <!--Créer un input form pour l'image-->
                    <span class="form-icon text-white" @click="">
                        <i class="fa-solid fa-image"></i>
                    </span>
                    <span class="form-icon text-white ms-2" @click="createPost">
                        <i class="fa-solid fa-paper-plane"></i>
                    </span>
                </b-col>
            </b-row>
        </b-container>
    </div>
</template>

<!--SCRIPT-->
<script>
    import axios from 'axios'
    import {Notyf} from 'notyf'
    import 'notyf/notyf.min.css'

    export default {
        props: {
            avatar: {
               type: String
            },
            username: {
                type: String,
                required: true
            }
        },
        data() {
            return {
                userId: localStorage.getItem('user.id'),
                username: localStorage.getItem('user.username'),
                isAdmin: localStorage.getItem('user.isAdmin'),
                avatar: localStorage.getItem('user.avatar'),
                content: '',
                imagePost: '',
                imagePreview: null
            }
        },
        created() {
            this.notyf = new Notyf({
                duration: 4000,
                position: {
                    x: "right",
                    y: "bottom"
                }
            })
        },
        methods: {
            // Permet de créer un nouveau message
            uploadFile() {
                this.$refs.fileUpload.click()
            },
            onFileSelected(event) {
                this.imagePost = event.target.files[0];
                this.imagePreview = URL.createObjectURL(this.imagePost);
            },
            createPost() {
                console.log('je passe par createPost')
                console.log(this.content);

                const formData = new FormData()
                formData.append("content", this.content)
                formData.append("image", this.imagePost)

                axios.post('http://localhost:5000/api/posts', formData, {
                    // On envoi dans la requête le headers comprenant l'utilisateur et les données du post
                    headers: {
                        'Content-Type': 'multipart/form-data',
                        'Authorization': 'Bearer ' + localStorage.getItem('token')
                    }
                })
                    .then(() => {
                        //Rechargement de la page
                        window.location.reload()
                    })
                    .catch(error => {
                        this.notyf.error("Erreur lors de la création du post" + error)
                    })
            }
        }
    }
</script>

<!--STYLE-->
<style lang="scss" scoped>
    .form-icon {
        font-size: 1.5em;
    }
</style>