<!--JAVASCRIPT-->
<script>
    import axios from 'axios'
    import {Notyf} from 'notyf'
    import 'notyf/notyf.min.css'
    import Header from '@/components/Header.vue'
    import UserProfileButton from '@/components/UserProfileButton.vue'
    import Post from '@/components/Post.vue'
    import PostForm from '@/components/PostForm.vue'
    import Comments from '@/components/Comments.vue'

    export default {
        components: {
            Header,
            UserProfileButton,
            Post,
            PostForm,
            Comments
        },
        data() {
            return {
                postList: [],
                commentsList: [],
                like: 0,
                showComment: false,
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
            getPosts() {
                // Requête pour récupérer les posts
                axios.get('http://localhost:5000/api/posts', {
                    headers: {
                        'Authorization': `Bearer ${localStorage.getItem('token')}`
                    }
                })
                    .then(response => {
                        this.postList = response.data
                    })
                    .catch(e => {
                        console.log(e)
                    })
            },

            getComments(id) {
                this.showComment = !this.showComment
                const postId = id;
                // Requête pour récupérer les commentaires
                axios.get('http://localhost:5000/api/comments' + postId, {
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': 'Bearer ' + localStorage.getItem('token')
                    }
                })
                    .then(response => {
                        this.commentsList = response.data
                    })
                    .catch(e => {
                        this.notyf.error(e)
                    })
            },

            onComment(post) {
                axios.post('http://localhost:5000/api/comments/:id', {
                    comment: this.comment
                })
                console.log("Commentaire sur le post " + post.id)
            },

            onLike(post) {
                axios.post('http://localhost:5000/api/posts/:id/like', {
                    like: this.like
                })
                console.log("Like sur le post " + post.id)
            },
        },
        beforeMount() {
            console.log('récupération des posts au chargement')
            this.getPosts()
        }
    }
</script>

<!--HTML-->
<template>

    <Header>
        <UserProfileButton/>
    </Header>

    <div class="main">
        <b-container>
            <b-row>
                <b-col class="main__col mt-5 rounded-3 border border-secondary">

                    <PostForm/>
                    <h1>Publications récentes</h1>
                    <Post v-for="postItem in postList" :post="postItem"/>
                    <!--La fenêtre commentaire apparait uniquement si on clique sur l'icone commentaire-->
                    <Comments/>
                </b-col>
            </b-row>
        </b-container>
    </div>
</template>

<!--STYLE-->
<style lang="scss" scoped>
    .main {
        h1 {
            margin: 64px 0;
        }

        &__col {
            background-color: #fdfeff;
            padding: 0 96px;
        }
    }
</style>