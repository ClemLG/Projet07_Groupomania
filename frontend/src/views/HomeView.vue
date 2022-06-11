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
            }
        }
    }
</script>

<!--HTML-->
<template>
    <div class="home-body">
            <h1>GROUPOMANIA</h1>
        <div class="home-body__card align-items-center d-flex flex-column">
            <SwitchAuth @switch="onSwitch"/>
            <RegisterForm v-if="currentView === 'register'"/>
            <LoginForm v-if="currentView === 'login'"/>
        </div>
    </div>
</template>

<!--STYLE-->
<style lang="scss">
    .home-body {
        background-color: #4a556a;

        h1 {
            color: #ffffff;
            text-align: center;
        }

        &__card {
            background-color: #f2f3f5;
        }
    }
</style>