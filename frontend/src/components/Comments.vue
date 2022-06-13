<!--HTML-->
<template>
    <b-container class="com-container mt-3">
        <b-row>
            <b-input-group class="mt-3">
                <b-form-input type="text" placeholder="Dites quelque chose à propos de ce post..." v-model="contentComment"></b-form-input>
                <b-input-group-append>
                    <b-button variant="secondary" @click="createComment"><i class="fa-solid fa-share"></i></b-button>
                </b-input-group-append>
            </b-input-group>
        </b-row>
        <b-row class="mt-2">
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
    import axios from 'axios'
    import moment from 'moment'
    import fr from '@/config/moment.fr'

    moment.locale('fr', fr)

    export default {
        props: {
            comments: {
                type: Array,
                required: true
            },
            post: {
                type: Object,
                required: true
            }
        },
        data() {
            return {
                username: '',
                avatar: '',
                contentComment: ''
            }
        },
        methods: {
            createComment() {
                const formData = new FormData()
                formData.append("content", this.contentComment)
                axios.post(`http://localhost:5000/api/posts/${this.post.id}/comment`, formData, {
                    headers: {
                        'Content-Type': 'multipart/form-data',
                        'Authorization': 'Bearer ' + localStorage.getItem('token')
                    }
                })
                .then(res => {
                    console.log('commentaire créé')
                    window.location.reload()
                })
                .catch(error => {
                    this.notyf.error("Erreur lors de la création du post")
                })
            },

            date(value) {
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