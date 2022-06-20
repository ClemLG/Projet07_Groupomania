<!--HTML-->
<template>
    <section class="bg-primary rounded-3 py-3">
        <b-container>
            <b-row>
                <b-col cols="auto">

                    <b-avatar :src="avatar && avatar !== 'null' ? avatar : null" :text="username.charAt(0)" alt="avatar de l'utilisateur" aria-label="avatar de l'utilisateur"></b-avatar>

                </b-col>
                <b-col>

                    <b-form-input class="bg-white" v-model="content" type="text" :placeholder="'Quoi de neuf, ' + username + ' ?'"></b-form-input>

                </b-col>
                <b-col cols="auto">
                    <input type="file" class="input-file" ref="input-file" @change="onFileSelect">
                    <!--Créer un input form pour l'image-->
                    <span class="form-icon text-white" @click="onFileClick">
                        <i class="fa-solid fa-image" aria-label="icone d'upload d'image"></i>
                    </span>
                    <span class="form-icon text-white ms-2" @click="createPost">
                        <i class="fa-solid fa-paper-plane" aria-label="icone de soumission de post"></i>
                    </span>
                </b-col>
            </b-row>
            <b-row v-if="imagePreview">
                <b-img :src="imagePreview" fluid class="mt-2"/>
            </b-row>
        </b-container>
    </section>
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
                imageFile: null,
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

                if (!this.content || !this.content.length) {
                    return
                }

                const formData = new FormData()
                formData.append("content", this.content)
                if (this.imageFile) {
                    formData.append("image", this.imageFile)
                }

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
            },
            onFileClick()
            {
                this.$refs['input-file'].click()
            },
            onFileSelect()
            {
                const [file] = this.$refs['input-file'].files
                if (file && file['type'].split('/')[0] === 'image') {
                    this.imageFile = file
                    this.imagePreview = URL.createObjectURL(file)
                } else {
                    this.$refs['input-file'].value = null
                }
            }
        }
    }
</script>

<!--STYLE-->
<style lang="scss" scoped>
    span {
        cursor: pointer;
    }

    .form-icon {
        font-size: 1.5em;
    }

    .input-file {
        display: none;
    }
</style>