<!--HTML-->
<template>
    <b-form class="mb-2">
        <b-input-group>
            <b-form-input class="bg-white" placeholder="Dites quelque chose à propos de ce post..."
                          v-model="contentComment"/>
            <b-input-group-append>
                <b-button variant="secondary" @click="createComment" aria-role="bouton de creation de commentaire">
                    <i class="fa-solid fa-share" aria-label="icone d'envoi de commentaire"></i>
                </b-button>
            </b-input-group-append>
        </b-input-group>
    </b-form>

    <div class="bg-white border border-secondary rounded-3 p-2 text-black" v-for="(comment, index) in comments"
         :class="{ 'mb-2': index < comments.length - 1 }">
        <b-container fluid class="p-0">
            <b-row align-v="center">
                <b-col>

                    <div class="user-infos d-flex align-items-center">
                        <b-avatar variant="secondary"
                                  :src="comment.user.avatar && comment.user.avatar !== 'null' ? comment.user.avatar : null"
                                  :text="comment.user.username.charAt(0)" alt="avatar de l'utilisateur"></b-avatar>
                        <span class="mx-2">{{ comment.user.username }}</span>
                        <p>{{ date(comment.createdAt) }}</p>
                    </div>

                </b-col>
                <b-col cols="auto">

                    <span class="delete-icon" v-if="userId == comment.user.id || isAdmin == 'true'"
                          @click="deleteComment(comment.id)" aria-label="suppression de commentaire">
                        <i class="fa-solid fa-circle-xmark" aria-label="icone de suppression de commentaire"></i>
                    </span>

                </b-col>
            </b-row>
            <b-row>

                <p>{{ comment.content }}</p>

            </b-row>
        </b-container>
    </div>
</template>

<!--JAVASCRIPT-->
<script>
    import axios from 'axios'
    import moment from 'moment'
    import fr from '@/config/moment.fr'
    import {Notyf} from 'notyf'
    import 'notyf/notyf.min.css'

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
            },
            avatar: {
                type: String,
                required: true
            }
        },
        data() {
            return {
                username: '',
                avatar: '',
                contentComment: '',
                isAdmin: localStorage.getItem('user.isAdmin'),
                userId: localStorage.getItem('user.id')
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
            createComment() {
                axios.post(`http://localhost:5000/api/posts/${this.post.id}/comment`, {
                    content: this.contentComment,
                }, {
                    headers: {
                        'Authorization': 'Bearer ' + localStorage.getItem('token')
                    }
                })
                    .then(res => {
                        console.log('commentaire créé')
                        window.location.reload()
                    })
                    .catch(error => {
                        this.notyf.error("Erreur lors de la publication du commentaire")
                    })
            },
            deleteComment(commentId) {
                axios.delete(`http://localhost:5000/api/posts/${this.post.id}/comment/${commentId}`, {
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': 'Bearer ' + localStorage.getItem('token')
                    }
                })
                    .then(() => {
                        this.notyf.success('Commentaire supprimé avec succès !')
                        window.location.reload()
                    })
                    .catch(error => {
                        this.notyf.error('Erreur lors de la suppression du post' + error)
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
    @import "../../src/style/style";

    .user-infos {
        @include mobile-s {
            flex-wrap: wrap;

            p {
                font-size: 0.8rem;
            }

        }
    }

    .delete-icon {
        color: #8da2c0;
        cursor: pointer;
    }

</style>