<!--HTML-->
<template>
    <b-container class="com-container mt-3">
        <b-row>
            <input type="text" placeholder="Dites quelque chose à propos de ce post...">
        </b-row>
        <b-row>
            <div v-for="comment in comments">
                <b-row>
                    <b-col class="d-flex align-items-center gap-2">
                        <b-avatar variant="secondary" text="BV"></b-avatar>
                        <span>{{ comment.user.username }}</span>
                        <p>{{ date(comment.createdAt) }}</p>
                    </b-col>
                </b-row>
                <b-row>
                    <p>{{ comment.content }}</p>
                </b-row>
            </div>
        </b-row>
    </b-container>
</template>

<!--JAVASCRIPT-->
<script>
    import moment from 'moment'
    import fr from '@/config/moment.fr'
    moment.locale('fr', fr)

    export default {
        props: {
            comments: {
                type: Array,
                required: true
            }
        },
        data() {
            return {
                username: '',
                avatar: '',
            }
        },
        methods: {
            createComment() {
/*                const postId =
                axios.post('http://localhost:5000/api/comments/ ')*/
            },
            date(value)
            {
                return moment(value).fromNow()
            }
        },
        beforeMount() {
            localStorage.getItem('user.username')
            localStorage.getItem('user.avatar')
        }
    }
</script>

<!--CSS-->
<style lang="scss" scoped>
    .com-container {
        background-color: white;
        color: #181818;
    }
</style>