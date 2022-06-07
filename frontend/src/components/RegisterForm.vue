<!--HTML-->
<template>
    <b-container class="d-flex flex-column">
        <b-col>
            <form @submit.prevent="addUser">
                <label for="username">Nom d'utilisateur</label>
                <input type="text" name="username" id="username" v-model="username"/>

                <label for="email">E-Mail</label>
                <input type="email" name="email" id="email" v-model="email"/>

                <label for="password">Mot de passe</label>
                <input type="password" name="password" id="password" v-model="password"/>

                <label for="confirm">Confirmation mot de passe</label>
                <input type="password" name="confirm" id="confirm" v-model="confirm"/>

                <input type="submit" value="S'inscrire">
            </form>
            <div>
                <a>Déjà un compte ?</a>
            </div>
        </b-col>
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

</style>