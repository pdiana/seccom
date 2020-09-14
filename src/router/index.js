import Vue from 'vue'
import VueRouter from 'vue-router'
import Users from "../views/Users";
import About from "../views/About";
Vue.use(VueRouter);

const routes = [
    {
        path: '/',
        name: 'Users',
        component: Users
    },

    {
        path: '/about',
        name: 'About',
        component: About
    },
];

const router = new VueRouter({
    routes
});

export default router
