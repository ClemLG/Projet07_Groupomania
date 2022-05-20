<script>
    export default {
        props: {
            list: {
                type: Array
            },
        },
        data() {
            return {
                inputMsg: ''
            }
        },
        methods: {
            addItem(){
                this.$emit('add-item', this.inputMsg)
                this.inputMsg = ''
            }
        }
    }
</script>

<template>
    <p v-for="item in list">{{item}}</p>
    <input type="text" v-model="inputMsg">
    <button @click="addItem">Ajouter item</button>
</template>
