import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home'
import MarsRover from './components/MarsRover'

Vue.use(Router)

export default new Router({
    mode: 'history',
    base: process.send.base.BASE_URL,
    routes: [
        {
            path: '/',
            name: 'marsrover',
            component: MarsRover
        },
        {
            path: '/home',
            name: 'home',
            component: Home
        }
    ]
})