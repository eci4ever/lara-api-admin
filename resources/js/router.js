import Vue from 'vue'
import VueRouter from 'vue-router'
import store from './store'

Vue.use(VueRouter)

const routes = [
    {
        path: '/',
        component: () => import("./components/views/Home.vue")
    },
    {
        path: '/users',
        component: () => import("./components/admin/User.vue"),
        beforeEnter: (to, from, next) => {
            if (!store.getters['auth/authenticated']) {
                return next({
                    path: '/login'
                })
            }
            next()
        }
    },
    {
        path: '/dashboard',
        component: () => import("./components/views/Dashboard.vue"),
        beforeEnter: (to, from, next) => {
            if (!store.getters['auth/authenticated']) {
                return next({
                    path: '/login'
                })
            }
            next()
        }
    },
    {
        path: '/profile',
        component: () => import("./components/Profile.vue"),
        beforeEnter: (to, from, next) => {
            if (!store.getters['auth/authenticated']) {
                return next({
                    path: '/login'
                })
            }
            next()
        }
    },
    {
        path: '/login',
        component: () => import("./components/views/Login.vue")
    },
    {
        path: '/register',
        component: () => import("./components/views/Register.vue")
    }
]

const router = new VueRouter({
    mode: 'history',
    routes
});

export default router