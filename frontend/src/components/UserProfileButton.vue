<!--HTML-->
<template>
    <div class="container">
        <a href="" @click="">
            <img src="" alt="">
            <p></p>
        </a>
    </div>
</template>

<!--JAVASCRIPT-->
<script>
    export default {
        name: 'MainFeedView',
        props: {
            avatarUrl: "",
            username: ""
        },
        methods: {
            onclick(view){
                console.log('je passe vers la page ProfileView')
            }
        }
    }
</script>

<!--STYLE-->
<style scoped>

</style>