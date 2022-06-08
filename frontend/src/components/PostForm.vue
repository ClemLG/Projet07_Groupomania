<!--HTML-->
<template>
    <b-container class="form mt-3 p-4">
        <b-row class="d-flex align-items-center">
            <b-col class="col d-flex justify-content-center">
                <b-avatar variant="secondary" text="BV"></b-avatar>
            </b-col>
            <b-col class="col-10">
                <b-form-input v-model="content" type="text" :placeholder="[['Quoi de neuf, ' + username + ' ?']]"></b-form-input>
            </b-col>
            <b-col class="col d-flex justify-content-center align-items-center gap-1">
                <!--Créer un input form pour l'image-->
                <a @click=""><i class="fa-solid fa-image"></i></a>
                <button @click="createPost"><i class="fa-solid fa-paper-plane"></i></button>
            </b-col>
        </b-row>
    </b-container>
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
    .form {
        background-color: #4a556a;
        border-radius: 10px;

        a {
            cursor: pointer;
        }

        i {
            font-size: 1.4rem;
            color: white;
        }

        button {
            border: none;
            background: none;
            cursor: pointer;
        }
    }
</style>