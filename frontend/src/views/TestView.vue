<script>
    import ThingsList from '@/components/TestList.vue'

    export default {
        components: {
            ThingsList
        },
        data() {
            return {
                list: ['item1', 'item2'],
            }
        },
        methods: {
            catchItem(inputMsg) {
                this.list.push(inputMsg)
            }
        }
    }
</script>

<template>
</template>

