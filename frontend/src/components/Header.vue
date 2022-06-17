<!--HTML-->
<template>
    <div class="header py-3">

        <b-container>
            <b-row align-v="center" no-gutters>
                <b-col class="p-0">

                    <div class="d-flex justify-content-center justify-content-md-start">
                        <img src="/logo/icon-left-font-monochrome-black.svg" alt="le logo de groupomania" class="logo" @click="reloadPage">
                    </div>

                </b-col>
                <b-col class="p-0">

                    <div class="d-flex justify-content-center justify-content-md-end">
                        <slot></slot>
                    </div>

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