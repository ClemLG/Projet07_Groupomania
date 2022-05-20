<!--HTML-->
<template>
    <form @submit.prevent="loginUser">
        <label for="email" class="">E-Mail</label>
        <input type="email" name="email" id="email" v-model="email"/>
        <label for="password">Mot de passe</label>
        <input type="password" name="password" id="password" v-model="password"/>
        <input type="submit" value="Se connecter">
    </form>
    <div>
        <a>Mot de passe oublié ?</a>
    </div>
</template>

<!--JAVASCRIPT-->
<script>
    export default {
        data() {
            return {
                email: '',
                password: '',
            }
        },
        methods: {
            loginUser(){
                // On vérifie que les champs soient remplis
                console.log('Je passe par loginUser')
                if(!this.email || !this.password){
                    return
                }
                // Si ok on envoi les données
                console.log('Requête login envoyée')
            }
        }
    }
</script>

<!--STYLE-->
<style>

</style>