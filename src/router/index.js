import Vue from 'vue'
import VueRouter from 'vue-router'
import Users from "../views/Users";
import About from "../views/About";
import Tickets from "../views/Tickets";

Vue.use(VueRouter);

const routes = [
    {
        path: '/',
        name: 'Users',
        component: Users
    },
    {
        path: '/tickets',
        name: 'Tichets',
        component: Tickets
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
