<!--HTML-->
<template>
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
</template>

<!--JAVASCRIPT-->
<script>
    export default {
        data() {
            return {
                username: '',
                email: '',
                password: '',
                confirm: ''
            }
        },
        methods: {
            addUser(){
                console.log('Je passe par addUser')
                // On vérifie que les champs contiennent les informations
                if(!this.username || !this.email || !this.password || !this.confirm){
                    return
                }
                //Si ok on envoi les données
                console.log('Requête register envoyée')
            }
        }
    }
</script>

<!--STYLE-->
<style>

</style>