<!--HTML-->
<template>
    <article class="bg-primary rounded-3 text-white py-3">
        <b-container>
            <b-row align-v="center" class="mb-4">
                <b-col cols="auto">

                    <b-avatar variant="secondary" text="BV" :src="post.user.avatar" alt="avatar de l'utilisateur" aria-label="avatar de l'utilisateur"></b-avatar>

                </b-col>
                <b-col>

                    <h3 class="mb-0">{{post.user.username}}</h3>
                    <p>{{ date(post.createdAt) }}</p>

                </b-col>
            </b-row>
            <b-row>
                <b-col>

                    <p class="post-content">{{post.content}}</p>

                </b-col>
            </b-row>
            <b-row class="mt-2">
                <b-col>

                    <b-img src="https://picsum.photos/1024/400/?image=41" alt="Image du Post" aria-label="Image du Post" fluid></b-img>

                </b-col>
            </b-row>
            <b-row class="mt-3">
                <b-col>
                    <div class="d-flex">
                        <div @click="likePost" class="d-flex me-3">
                            <span>
                                <i class="fa-regular fa-heart"></i>
                            </span>
                            <p class="ms-1">{{post.likes.length}}</p>
                        </div>

                        <div @click="toggleCommentSwitch" class="d-flex me-3">
                            <span>
                                <i class="fa-regular fa-comment"></i>
                            </span>
                            <p class="ms-1">{{post.comments.length}}</p>
                        </div>

                        <div v-if="userId == post.user.id || isAdmin == 'true'" @click="deletePost(post.id)" class="d-flex me-3">
                            <span>
                                <i class="fa-regular fa-trash-can"></i>
                            </span>
                        </div>
                    </div>
                </b-col>
            </b-row>
            <b-row class="mb-2">
                <b-col>
                    <div class="border-bottom border-secondary"></div>
                </b-col>
            </b-row>
            <b-row>
                <b-col>
                    <Comments v-if="commentSwitch" :comments="post.comments" :post="post"/>
                </b-col>
            </b-row>
        </b-container>
    </article>
</template>

<!--SCRIPT-->
<script>
    import Comments from '@/components/Comments.vue'
    import axios from 'axios'
    import moment from 'moment'
    import fr from '@/config/moment.fr'
    import {Notyf} from 'notyf'
    import 'notyf/notyf.min.css'

    export default {
        components: {Comments},
        data() {
            return {
                commentSwitch: false,
                isAdmin: localStorage.getItem('user.isAdmin'),
                userId: localStorage.getItem('user.id')
            }
        },
        props: {
            post: {
                type: Object,
                required: true
            }
        },
        created() {
            this.notyf = new Notyf({
                duration: 4000,
                position: {
                    x: "right",
                    y: "bottom"
                }
            })
        },
        methods: {
            likePost() {
                const currentUserId = localStorage.getItem('user.id')

                // Variable temporaire qui contient l'action que l'on veut faire (va être concaténé à l'url)
                let action = 'like'
                // Si j'ai un like dont l'userId == currentUserId, le post est déjà liké, donc je change la valeur de ma variable temporaire en "unlike"
                this.post.likes.forEach(like => {
                    if (like.userId == currentUserId) {
                        action = 'unlike'
                    }
                })

                axios.post(`http://localhost:5000/api/posts/${this.post.id}/${action}`, null, {
                    headers: {
                        'Content-Type': 'multipart/form-data',
                        'Authorization': 'Bearer ' + localStorage.getItem('token')
                    }
                })
                    .then(res => {
                        this.$emit('updated', this.post)
                    })
                    .catch(error => {
                        this.notyf.error("Erreur lors du like" + error)
                    })
            },
            deletePost() {
                axios.delete(`http://localhost:5000/api/posts/${this.post.id}`, {
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': 'Bearer ' + localStorage.getItem('token')
                    }
                })
                    .then(() => {
                        this.notyf.success('Post supprimé avec succès !')
                        window.location.reload()
                    })
                    .catch(error => {
                        this.notyf.error('Erreur lors de la suppression du post' + error)
                    })
            },

            toggleCommentSwitch() {
                this.commentSwitch = !this.commentSwitch
            },

            date(value) {
                return moment(value).fromNow()
            }
        }
    }
</script>

<!--STYLE-->
<style lang="scss" scoped>
    .post-content {
        font-size: 1.5rem;
    }
    i {
        cursor: pointer;
    }
</style>