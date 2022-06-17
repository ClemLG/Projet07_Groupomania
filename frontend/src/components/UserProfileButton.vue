<!--HTML-->
<template>
    <div class="profile-button">
        <b-button @click="onclick" class="bg-white border-secondary">
            <b-avatar variant="secondary" text="BV" class="me-2" :src="avatar"></b-avatar>
            <span>{{ username }}</span>
        </b-button>
    </div>
</template>

<!--JAVASCRIPT-->
<script>
    export default {
        data()
        {
            return {
                username: null,
                avatar: null
            }
        },
        methods: {
            onclick(view){
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