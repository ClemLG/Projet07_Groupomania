<!--HTML-->
<template>
    <b-container class="login-card d-flex flex-column col-md-4">
        <b-form class="login-card__form" @submit.prevent="loginUser">
            <b-form-group id="email" label="E-Mail" label-for="email">
                <b-form-input class="login-card__form__input" type="email" name="email" id="email"
                              v-model="email"></b-form-input>
            </b-form-group>
            <b-form-group id="password" label="Mot de passe" label-for="password">
                <b-form-input class="login-card__form__input" type="password" name="password" id="password"
                              placeholder="Mot de passe" v-model="password"></b-form-input>
            </b-form-group>
            <div class="d-flex justify-content-center mt-5">
                <b-button class="login-card__form__submitButton" type="submit" variant="submitHomePage">Se connecter
                </b-button>
            </div>
        </b-form>
    </b-container>
</template>

<!--JAVASCRIPT-->
<script>
    import axios from 'axios'
    import {Notyf} from 'notyf'
    import 'notyf/notyf.min.css'

    export default {
        name: 'LoginForm',
        data() {
            return {
                email: '@groupomania.fr',
                password: '',
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
            loginUser() {
                console.log('Je passe par loginUser')
                // On vérifie que les champs soient remplis
                if (!this.email || !this.password) {
                    return
                }
                console.log(this.email)
                // Si ok on envoi les données
                axios
                    .post('http://localhost:5000/api/auth/login', {
                        email: this.email,
                        password: this.password
                    })
                    .then((response) => {
                        console.log(response)
                        // On enregistre le token, l user id ainsi que le isAdmin dans le localstorage et on l'envoi sur la page du feed
                        localStorage.setItem("token", response.data.accessToken)
                        localStorage.setItem("user.id", response.data.user.id)
                        localStorage.setItem("user.email", response.data.user.email)
                        localStorage.setItem("user.username", response.data.user.username)
                        localStorage.setItem("user.avatar", response.data.user.avatar)
                        localStorage.setItem("user.isAdmin", response.data.user.isAdmin)
                        this.$router.push("/feed")
                        console.log('Requête login envoyée')
                    })
                    .catch(error => {
                        this.notyf.error("Erreur lors de la connexion" + error)
                    })
            }
        }
    }
</script>

<!--STYLE-->
<style lang="scss" scoped>
    .login-card {
        font-family: Montserrat, sans-serif;

        &__form {
            &__input {
                background-color: white;
                text-align: center;
            }

            &__submitButton {
                font-weight: bold;
            }
        }
    }
</style>