<!--JAVASCRIPT-->
<script>
    import axios from 'axios'
    import {Notyf} from 'notyf'
    import 'notyf/notyf.min.css'
    import Header from '@/components/Header.vue'
    import UserProfileButton from '@/components/UserProfileButton.vue'
    import Post from '@/components/Post.vue'
    import PostForm from '@/components/PostForm.vue'

    export default {
        components: {
            Header,
            UserProfileButton,
            Post,
            PostForm,
        },
        data() {
            return {
                postList: []
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
            }
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
                <b-col>

                    <div class="rounded-3 border border-secondary bg-white px-5 py-3 mt-4">
                        <PostForm/>
                        <h1 class="mt-5 mb-3">Publications récentes</h1>
                        <Post v-for="(postItem, index) in postList" :post="postItem" :class="{ 'mb-4': index < postList.length - 1 }" @updated="getPosts"/>
                    </div>

                </b-col>
            </b-row>
        </b-container>
    </div>
</template>