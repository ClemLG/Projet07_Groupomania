<!--HTML & JAVASCRIPT-->
<template>
    <div class="switch">
        <a @click="$emit('switch', 'register')" :class="{ active: currentView === 'register' }" aria-label="switch vers inscription">INSCRIPTION</a>
        <p class="mx-2">|</p>
        <a @click="$emit('switch', 'login')" :class="{ active: currentView === 'login' }" aria-label="switch vers connexion">CONNEXION</a>
    </div>
</template>

<script>
    export default {
        props: {
            currentView: {
                type: String,
                required: true
            }
        }
    }
</script>

<!--STYLE-->
<style lang="scss" scoped>
    @import "../../src/style/style";
    .switch {
        display: flex;
        flex-wrap: wrap;
        justify-content: center;
        font-size: 1.4rem;

        a {
            text-decoration: none;
            color: #3d3d3d;
            cursor: pointer;
            @include mobile-s {
                font-size: 1.2rem;
            }

            &.active {
                font-weight: bold;
            }
        }
    }
</style>