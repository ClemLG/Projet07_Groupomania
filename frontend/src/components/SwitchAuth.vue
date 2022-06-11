<!--HTML & JAVASCRIPT-->
<template>
    <b-container class="switch d-flex justify-content-center justify-content-evenly py-4 col-4">
        <a @click="$emit('switch', 'register')">INSCRIPTION</a>
        <a @click="$emit('switch', 'login')">CONNEXION</a>
    </b-container>
</template>

<!--STYLE-->
<style lang="scss" scoped>
    .switch {
        font-family: Montserrat, sans-serif;
        font-size: 1.5rem;
    }
</style>