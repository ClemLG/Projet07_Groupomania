<!--HTML-->
<template>
    <div class="header">
        <a href=""><img src="/logo/icon-left-font-monochrome-black.svg" alt="Groupomania header logo" @click="reloadPage"></a>
        <slot></slot>
    </div>
</template>

<!--JAVASCRIPT-->
<script>
    export default {
        methods: {
            reloadPage(){
                this.$router.go()
            }
        }
    }
</script>


<!--STYLE-->
<style scoped>

</style>