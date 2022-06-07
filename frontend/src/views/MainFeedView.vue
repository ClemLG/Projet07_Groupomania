<!--JAVASCRIPT-->
<script>
    import axios from 'axios'
    import Header from '@/components/Header.vue'
    import UserProfileButton from '@/components/UserProfileButton.vue'
    import Post from '@/components/Post.vue'
    import PostForm from '@/components/PostForm.vue'

    export default {
        components: {
            Header,
            UserProfileButton,
            Post,
            PostForm
        },
        data() {
            return {
                postList: [],
                like: 0,
                comment: '',
            }
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
            onLike(post) {
                axios.post('http://localhost:5000/api/posts/:id/like', {
                    like: this.like
                })
                console.log("Like sur le post " + post.id)
            },
            onComment(post) {
                axios.post('http://localhost:5000/api/comments/:id', {
                    comment: this.comment
                })
                console.log("Commentaire sur le post " + post.id)
            },
        },
        beforeMount() {
            console.log('qzdqzd')
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
                    <Post v-for="postItem in postList" :post="postItem" @like="onLike" @comment="onComment"/>

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