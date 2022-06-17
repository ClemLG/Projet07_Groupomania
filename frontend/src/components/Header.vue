<!--HTML-->
<template>
    <div class="header py-3">

        <b-container>
            <b-row align-v="center" no-gutters>
                <b-col class="p-0">

                    <header class="d-flex justify-content-center justify-content-md-start">
                        <b-img src="/logo/icon-left-font-monochrome-black.svg" alt="le logo de groupomania" aria-label="le logo de groupomania" class="logo" @click="goFeedPage"></b-img>
                    </header>

                </b-col>
                <b-col class="p-0">

                    <nav class="d-flex justify-content-center justify-content-md-end">
                        <!--Slot ou le bouton profile va être-->
                        <slot></slot>
                    </nav>

                </b-col>
            </b-row>
        </b-container>
    </div>
</template>

<!--JAVASCRIPT-->
<script>
    export default {
        methods: {
            goFeedPage() {
                this.$router.push("/feed")
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