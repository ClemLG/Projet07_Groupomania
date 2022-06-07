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
    <b-container class="fullscreen col-12">
            <h1>GROUPOMANIA</h1>
        <div class="card">
            <SwitchAuth @switch="onSwitch"/>
            <RegisterForm v-if="currentView === 'register'"/>
            <LoginForm v-if="currentView === 'login'"/>
        </div>
    </b-container>
</template>

<!--STYLE-->
<style lang="scss">
    .fullscreen {
        background-color: #4a556a;

        h1 {
            color: #ffffff;
            text-align: center;
        }
    }
</style>