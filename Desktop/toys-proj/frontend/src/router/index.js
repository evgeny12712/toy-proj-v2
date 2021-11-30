import Vue from 'vue'
import VueRouter from 'vue-router'
import toyApp from '../views/toy-app'
import toyEdit from '../views/toy-edit'
import toyDetails from '../views/toy-details'
import toyDashboard from '../views/toy-dashboard'
import toyLogin from '../views/toy-login'
import toyReviews from '../views/reviews-explore'
import userDetails from '../views/user-details'
Vue.use(VueRouter)

const routes = [{
        path: '/',
        name: 'toyApp',
        component: toyApp,
    },
    {
        path: '/edit/:toyId',
        name: 'Edit',
        component: toyEdit
    },
    {
        path: '/details/:toyId',
        name: 'Details',
        component: toyDetails
    },
    {
        path: '/dashboard',
        name: 'Dashboard',
        component: toyDashboard
    },
    {
        path: '/login',
        name: 'toyLogin',
        component: toyLogin
    },
    {
        path: '/reviews',
        name: 'toyReviews',
        component: toyReviews
    },
    {
        path: '/user',
        name: 'userDetails',
        component: userDetails
    }

]

const router = new VueRouter({
    routes
})

export default router