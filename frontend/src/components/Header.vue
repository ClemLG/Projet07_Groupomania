<!--HTML-->
<template>
    <div class="header">
        <b-container class="py-3">
            <b-row>
                <b-col>

                    <img src="/logo/icon-left-font-monochrome-black.svg" alt="le logo de groupomania" class="logo" @click="reloadPage">

                </b-col>
                <b-col class="d-flex justify-content-end">

                    <slot></slot>

                </b-col>
            </b-row>
        </b-container>
    </div>
</template>

<!--JAVASCRIPT-->
<script>
    export default {
        methods: {
            reloadPage() {
                this.$router.go()
            }
        }
    }
</script>


<!--STYLE-->
<style lang="scss" scoped>
    .header {
        background-color: #fff;

        .logo {
            cursor: pointer;
            width: 240px;
        }
    }
</style>