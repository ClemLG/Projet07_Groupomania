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
                username: null,
                email: null,
                avatar: null
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
            onEdit() {
                // On récupère l'id de l'utilisateur dans le ls
                const userId = localStorage.getItem('userId')

                const formData = new FormData()
                formData.append("image", this.avatar)

                //On vérifie que le champs username contient bien de la donnée
                if(!this.username){
                    this.notyf.error("Aucun nom d'utilisateur rentré !")
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
                    })
                    .catch(e => {
                        this.notyf.error(e)
                    })
            },

            onLogout() {
                // Permet de se déconnecter
                localStorage.removeItem('user.email');
                localStorage.removeItem('user.username');
                localStorage.removeItem('user.isAdmin');
                localStorage.removeItem('user.id');
                localStorage.removeItem('token');
                localStorage.removeItem('user.avatar')

                this.$router.push('/');
            }
        },

        beforeMount() {
            this.username = localStorage.getItem('user.username')
            this.avatar = localStorage.getItem('user.avatar')
            this.email = localStorage.getItem('user.email')
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
            <input class="mb-4 text-center" type="text" name="username" id="username" v-model="username">
            <label for="email">E-Mail</label>
            <input class="mb-4 text-center" disabled="true" type="email" name="email" id="email" v-model="email">
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
