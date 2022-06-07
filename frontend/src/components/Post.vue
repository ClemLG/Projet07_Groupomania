<!--HTML-->
<template>
    <b-container class="post d-flex">
        <b-col class="pt-3 pb-1">
            <b-row class="row d-flex align-items-center mb-4 ">
                <b-col class="col-1 d-flex justify-content-center">
                    <b-avatar variant="secondary" text="BV"></b-avatar>
                </b-col>
                <b-col class="col-11">
                    <h3>{{post.user.username}}</h3>
                    <p>Posté il y a </p>
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
                    <button @click="$emit('like', post)"><i class="fa-regular fa-heart"></i></button>
                    <p class="post__like-count pe-4">{{10}}</p>
                    <button @click="$emit('comment', post)"><i class="fa-regular fa-comment"></i></button>
                </b-col>
            </b-row>
        </b-col>
    </b-container>
</template>

<!--SCRIPT-->
<script>
    export default {
        props: {
            post: {
                type: Object,
                required: true
            }
        },
        methods: {
            getImgUrl() {
                return {
                    image: image
                }
                console.log(`récupération de l'image du post`)
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