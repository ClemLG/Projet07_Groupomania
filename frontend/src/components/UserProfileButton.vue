<!--HTML-->
<template>
    <div class="profile-button">
        <b-button @click="onclick" class="bg-white border-secondary"
                  aria-role="Bouton redirigeant vers la page profile">
            <b-avatar variant="secondary" class="me-2" :src="avatar && avatar !== 'null' ? avatar : null"
                      :text="username.charAt(0)" alt="avatar de l'utilisateur"
                      aria-label="avatar de l'utilisateur"></b-avatar>
            <span>{{ username }}</span>
        </b-button>
    </div>
</template>

<!--JAVASCRIPT-->
<script>
    export default {
        data() {
            return {
                username: null,
                avatar: null
            }
        },
        methods: {
            onclick(view) {
                this.$router.push("/profile")
                console.log('je passe vers la page ProfileView')
            }
        },
        beforeMount() {
            this.username = localStorage.getItem('user.username')
            this.avatar = localStorage.getItem('user.avatar')
        }
    }
</script>

<!--STYLE-->
<style lang="scss" scoped>

</style>