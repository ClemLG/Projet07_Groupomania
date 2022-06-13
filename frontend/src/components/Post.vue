<!--HTML-->
<template>
    <b-container class="post d-flex">
        <b-col class="pt-3 pb-1">
            <b-row class="row d-flex align-items-center mb-4 ">
                <b-col class="col-1 d-flex justify-content-center">
                    <b-avatar variant="secondary" text="BV" :src="post.user.avatar"></b-avatar>
                </b-col>
                <b-col class="col-11">
                    <h3>{{post.user.username}}</h3>
                    <p>{{ date(post.createdAt) }}</p>
                </b-col>
            </b-row>
            <b-row class="row mb-4">
                <p class="post__content mb-4">{{post.content}}</p>
                <div>
                    <b-img src="https://picsum.photos/1024/400/?image=41" fluid alt="Responsive image"></b-img>
                </div>
            </b-row>
            <b-row>
                <b-col class="d-flex align-items-center">
                    <button @click="likePost"><i class="fa-regular fa-heart"></i></button>
                    <p class="post__like-count pe-4">{{post.likes.length}}</p>
                    <button @click="toggleCommentSwitch"><i class="fa-regular fa-comment"></i></button>
                    <p class="post__like-count pe-4">{{post.comments.length}}</p>
                </b-col>
            </b-row>
            <b-row>
                <Comments v-if="commentSwitch" :comments="post.comments" :post="post"/>
            </b-row>
        </b-col>
    </b-container>
</template>

<!--SCRIPT-->
<script>
    import Comments from '@/components/Comments.vue'
    import axios from 'axios'
    import moment from 'moment'
    import fr from '@/config/moment.fr'

    export default {
        components: {Comments},
        data() {
            return {
                commentSwitch: false
            }
        },
        props: {
            post: {
                type: Object,
                required: true
            }
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
                        this.notyf.error("Erreur lors du like")
                    })
            },
            toggleCommentSwitch() {
                this.commentSwitch = !this.commentSwitch
            },

            date(value) {
                return moment(value).fromNow()
            }
        },
        mounted() {
            console.log(this.post)
        }
    }
</script>

<!--STYLE-->
<style lang="scss" scoped>
    .post {
        margin-bottom: 64px;
        background-color: #4a556a;
        color: #ffffff;
        border-radius: 10px;

        &__like-count {
            font-size: 1.2rem;
            position: relative;
            bottom: 3px;
        }

        &__content {
            font-size: 1.5rem;
        }

        i {
            color: #ffffff;
            font-size: 1.4rem;
        }

        button {
            border: none;
            background: none;
            cursor: pointer;
        }

        h3 {
            margin-bottom: -0.2rem;
        }
    }
</style>