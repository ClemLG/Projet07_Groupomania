<!--JAVASCRIPT-->
<script>
    import RegisterForm from '@/components/RegisterForm.vue'
    import LoginForm from '@/components/LoginForm.vue'
    import SwitchAuth from '@/components/SwitchAuth.vue'

    export default {
        components: {
            RegisterForm,
            LoginForm,
            SwitchAuth
        },
        data() {
            return {
                currentView: 'register',
            }
        },
        methods: {
            onSwitch(view) {
                console.log('je passe par onSwitch')
                // LE BUT ICI:  MODIFIER LA VALEUR DE CURRENTVIEW
                this.currentView = view
            },
            reloadPage() {
                this.$router.go()
            }
        }
    }
</script>

<!--HTML-->
<template>
    <section class="background"></section>
    <b-container class="home__container">
        <b-row align-h="center" align-v="center">
            <b-col cols="12" md="10" lg="8" xl="6">
                <header class="d-flex flex-column align-items-center mb-4">
                    <a @click="reloadPage" aria-label="rechargement de la page">
                        <b-img src="./public/logo/icon-left-font-monochrome-white.svg" alt="logo de groupomania" aria-label="logo de groupomania" fluid/>
                    </a>
                </header>
                <b-card class="home__container__card">
                    <SwitchAuth class="mb-4" :current-view="currentView" @switch="onSwitch"/>
                    <RegisterForm v-if="currentView === 'register'"/>
                    <LoginForm v-if="currentView === 'login'"/>
                </b-card>
            </b-col>
        </b-row>
    </b-container>
</template>

<!--STYLE-->
<style lang="scss">
    .background {
        position: fixed;
        top: 0;
        right: 0;
        bottom: 0;
        left: 0;
        background-color: #4a556a;
        z-index: -1;
    }

    .home__container {
        &__card {
            background-color: #f2f3f5 !important;
        }
    }

    .home__container, .home__container > .row {
        min-height: 80vh;
    }
</style>