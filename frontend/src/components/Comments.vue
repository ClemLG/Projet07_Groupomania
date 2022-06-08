<!--HTML-->
<template>
    <b-container class="com-container">
        <b-row><input type="text" placeholder="Dites quelque chose à propos de ce post..."></b-row>
        <b-row>
            <div>
                <b-row>
                    <b-col class="d-flex align-items-center gap-2">
                        <b-avatar variant="secondary" text="BV"></b-avatar>
                        <span>Utilisateur</span>
                        <p>(Il y a 10 heures)</p>
                    </b-col>
                </b-row>
                <b-row>
                    <p> {{"le commentaire"}}</p>
                </b-row>
            </div>
        </b-row>
    </b-container>
</template>

<!--JAVASCRIPT-->
<script>
    export default {
        props: {
        },
        data() {
            return {}
        },
        methods: {}
    }
</script>

<!--CSS-->
<style lang="scss" scoped>
    .com-container{
        border: 1px black solid
    }
</style>