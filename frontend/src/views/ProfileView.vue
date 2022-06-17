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
                        this.user = response.data
                        localStorage.setItem('user.username', this.user.username)
                        localStorage.setItem('user.avatar', this.user.avatar)
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

                if (this.user.username === "") {
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
                        this.getUser()
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
            },
            onDeleteAccount() {
                let confirmDeleteMsg = confirm(" Êtes vous sur de vouloir supprimer votre compte ?")
                if (confirmDeleteMsg == true) {
                    const userId = localStorage.getItem('user.id');
                    axios.delete('http://localhost:5000/api/users/' + userId, {
                        headers: {
                            'Content-Type': 'application/json',
                            'Authorization': 'Bearer ' + localStorage.getItem('token')
                        }
                    })
                        .then(() => {
                            this.notyf.success('Votre compte a bien été supprimé')
                            localStorage.clear();
                            this.$router.push('/');
                        })
                        .catch(error => {
                            this.notyf.error('Erreur lors de la suppression de compte' + error)
                        })
                }
            },

            // Permet de modifier la photo de profil
            onFileSelected(event) {
                this.imageProfile = event.target.files[0]
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
    <div class="background bg-secondary"></div>
    <Header/>
    <b-container class="profile-container">
        <b-row align-h="center" align-v="center">
            <b-col cols="12" md="10" lg="8" xl="6">

                <b-card class="profile-container__card my-5">

                    <b-row align-h="center" align-v="center">
                        <b-col cols="8">

                            <b-img :src="user.avatar" rounded="circle" alt="Avatar utilisateur" aria-label="avatar de l'utilisateur" fluid></b-img>

                        </b-col>
                    </b-row>

                    <div class="profile-container__card__media-select d-flex justify-content-center my-4">
                        <input type="file" id="formFile" @change="onFileSelected" ref="fileUpload">
                    </div>

                    <b-row align-h="center" align-v="center">
                        <b-col cols="12" md="10" lg="8">

                            <b-form class="profile-container__card__form">
                                <b-form-group id="username" label="Nom d'utilisateur" label-for="username">
                                    <b-form-input class="text-center bg-white" name="username" id="username"
                                                  v-model="user.username"></b-form-input>
                                </b-form-group>

                                <b-form-group id="email" label="E-Mail" label-for="email">
                                    <b-form-input class="text-center" disabled="true" type="email" name="email"
                                                  id="email" v-model="user.email"></b-form-input>
                                </b-form-group>
                            </b-form>

                        </b-col>
                    </b-row>

                    <b-row align-v="center" align-h="center">
                        <b-col cols="12" md="6">

                            <div class="profile-container__card__btn-section d-flex flex-column gap-2 my-5">
                                <b-button class="bg-light-blue" @click="onEdit" aria-role="bouton de modification de profil">Modifier profil</b-button>
                                <b-button class="bg-light-blue" @click="onLogout" aria-role="bouton de déconnexion de profil">Se déconnecter</b-button>
                                <b-button class="bg-danger mt-4" @click="onDeleteAccount" aria-role="bouton de suppression de compte">Supprimer son compte</b-button>
                            </div>

                        </b-col>
                    </b-row>

                </b-card>

            </b-col>
        </b-row>
    </b-container>
</template>

<!--STYLE-->
<style lang="scss" scoped>
    @import "../../src/style/style";
    .profile-container {
        &__card {
            border-radius: 0.5rem;

            &__form input {
                border:1px solid $secondary
            }

            &__btn-section button {
                transition: all .2ms ease-in-out;
                &:hover{
                    opacity: 0.8;
                }
            }
        }
    }
</style>
