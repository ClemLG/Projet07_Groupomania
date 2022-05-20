import {createRouter, createWebHistory} from 'vue-router'
import HomeView from '../views/HomeView.vue'
import MainFeedView from '../views/MainFeedView.vue'
import ProfileView from '../views/ProfileView.vue'
import TestView from '../views/TestView.vue'

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: [
        {
            path: '/',
            name: 'home',
            component: HomeView
        },
        {
            path: '/feed',
            name: 'feed',
            component: MainFeedView
        },
        {
            path: '/profile',
            name: 'profile',
            component: ProfileView
        },
        {
            path: '/test',
            name: 'test',
            component: TestView
        },
    ]
})

export default router
