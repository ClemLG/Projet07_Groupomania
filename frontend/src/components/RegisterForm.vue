<!--HTML-->
<template>
    <b-container class="register-card d-flex flex-column col-md-4">
        <b-form class="register-card__form" @submit.prevent="addUser">
            <b-form-group id="username" label="Nom d'utilisateur" label-for="username">
                <b-form-input class="register-card__form__input" type="text" name="username" id="username"
                              placeholder="Nom d'utilisateur" v-model="username"></b-form-input>
            </b-form-group>
            <b-form-group id="email" label="E-Mail" label-for="email">
                <b-form-input class="register-card__form__input" type="email" name="email" id="email"
                              v-model="email"></b-form-input>
            </b-form-group>
            <b-form-group id="password" label="Mot de passe" label-for="password">
                <b-form-input class="register-card__form__input" type="password" name="password" id="password"
                              placeholder="Mot de passe" v-model="password"></b-form-input>
            </b-form-group>
            <b-form-group id="confirm" label="Confirmation mot de passe" label-for="confirm">
                <b-form-input class="register-card__form__input" type="password" name="confirm" id="confirm"
                              placeholder="Confirmation mot de passe " v-model="confirm"></b-form-input>
            </b-form-group>
            <div class="d-flex justify-content-center mt-5">
                <b-button class="register-card__form__submitButton" type="submit" variant="submitHomePage">S'inscrire
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
        name: 'RegisterForm',
        data() {
            return {
                username: '',
                email: '@groupomania.fr',
                password: '',
                confirm: '',
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
            addUser() {
                console.log('Je passe par addUser')
                // On vérifie que les champs contiennent les informations
                if (!this.username || !this.email || !this.password || !this.confirm) {
                    this.notyf.error("Tous les champs sont obligatoires !")
                    return
                }

                //Vérification de la concordance des deux mots de passe
                if (this.confirm !== this.password) {
                    this.notyf.error("Les deux mots de passe ne matchent pas !")
                    return
                }

                //Si ok on envoi les données
                axios.post("http://localhost:5000/api/auth/register", {
                    username: this.username,
                    email: this.email,
                    password: this.password
                })
                    .then((response) => {
                        console.log(response)
                        this.notyf.success('Votre compte a bien été créé ! A présent, veuillez vous connecter.')
                        this.$router.push('/')
                        console.log('requete register envoyée')
                    })
                    .catch(() => {
                        this.notyf.error("Erreur lors de l'inscription, assurez vous que tous les champs soient remplis correctement")
                    })
            }
        }
    }
</script>

<!--STYLE-->
<style lang="scss" scoped>
    .register-card {
        font-family: Montserrat, sans-serif;

        &__form {
            &__input {
                background-color: #ffffff;
                text-align: center;
            }

            &__submitButton {
                font-weight: bold;
            }
        }
    }
</style>