import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
    { path: '/', component: () => import("./components/views/Dashboard.vue") },
    { path: '/login', component: () => import("./components/views/Login.vue") }
]

const router = new VueRouter({
    mode: 'history',
    routes
});

export default router