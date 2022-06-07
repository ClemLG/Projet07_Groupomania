<!--HTML-->
<template>
    <form @submit.prevent="loginUser">
        <label for="email" class="">E-Mail</label>
        <input type="email" name="email" id="email" v-model="email"/>

        <label for="password">Mot de passe</label>
        <input type="password" name="password" id="password" v-model="password"/>

        <input type="submit" value="Se connecter" v-on:click="loginUser">
    </form>
    <div>
        <a>Mot de passe oublié ?</a>
    </div>
</template>

<!--JAVASCRIPT-->
<script>
    import axios from 'axios'

    export default {
        name: 'LoginForm',
        data() {
            return {
                email: '',
                password: '',
            }
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
                    .catch(() => res.status(401).json({message: "email ou mot de passe invalide !"}),
                        console.log("Mot de passe invalide")
                    )
            }
        }
    }
</script>

<!--STYLE-->
<style>

</style>