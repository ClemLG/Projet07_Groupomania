<!--JAVASCRIPT-->
<script>
    import axios from 'axios'
    import {Notyf} from 'notyf'
    import 'notyf/notyf.min.css'
    import Header from '@/components/Header.vue'

    export default {
        components: {
            Header
        },

        data() {
            return {
                user: [],
                imageProfile: null
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
            getUser() {
                const userId = localStorage.getItem('user.id')
                //On récupère les informations de l'utilisateur depuis le back
                axios.get('http://localhost:5000/api/users/' + userId, {
                    headers: {
                        'Authorization': 'Bearer ' + localStorage.getItem('token')
                    }
                })
                    .then(response => {
                        console.log(response)
                        this.user = response.data
                    })
                    .catch(error => {
                        this.notyf.error("impossible de récuperer l'utilisateur" + error)
                    })
            },
            onEdit() {
                // On récupère l'id de l'utilisateur dans le ls
                const userId = localStorage.getItem('user.id')

                const formData = new FormData()
                formData.append("image", this.imageProfile)
                formData.append("username", this.user.username)

                if(this.user.username === ""){
                    this.notyf.error("Veuillez ajouter un nom d'utilisateur")
                    return
                }

                axios.put('http://localhost:5000/api/users/' + userId, formData, {
                    headers: {
                        'Authorization': 'Bearer ' + localStorage.getItem('token'),
                        'Content-Type': 'multipart/form-data'
                    }
                })
                    .then(response => {
                        this.notyf.success('Profil modifié avec succès !')
                        localStorage.setItem("user.username", this.user.username)
                        localStorage.setItem("user.avatar", this.user.avatar)
                    })

                    .catch(e => {
                        this.notyf.error(e)
                    })
            },

            onLogout() {
                // Permet de se déconnecter
                localStorage.removeItem('user.email')
                localStorage.removeItem('user.username')
                localStorage.removeItem('user.isAdmin')
                localStorage.removeItem('user.id')
                localStorage.removeItem('token')
                localStorage.removeItem('user.avatar')

                this.$router.push('/');
            }
        },

        beforeMount() {
            console.log('On récupère les infos user avant chargement')
            this.getUser()
        }
    }
</script>

<!--HTML-->
<template>
    <Header/>
    <b-container class="profile-card d-flex flex-column col-md-4 col-8 align-items-center py-5 gap-5">
        <b-row>
            <b-img v-bind="mainProps" rounded="circle" alt="Avatar utilisateur"></b-img>
        </b-row>
        <b-row class="col-6 text-center">
            <label for="username">Nom d'utilisateur</label>
            <input class="mb-4 text-center" type="text" name="username" id="username" v-model="user.username">
            <label for="email">E-Mail</label>
            <input class="mb-4 text-center" disabled="true" type="email" name="email" id="email" v-model="user.email">
        </b-row>
        <b-row class="gap-2">
            <button @click="onEdit">Modifier profil</button>
            <button @click="onLogout">Se déconnecter</button>
        </b-row>
    </b-container>
</template>

<!--STYLE-->
<style lang="scss" scoped>
    .profile-card {
        font-family: sans-serif;
        border-radius: 1rem;
        background-color: #d7d7d7;
        margin-top: 4rem;
    }
</style>
