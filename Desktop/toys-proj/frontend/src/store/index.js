import Vue from 'vue'
import Vuex from 'vuex'
import { userStore } from './user.store.js'
import { toyStore } from './toy.store.js'
import { reviewStore } from './review.store.js'
Vue.use(Vuex)

export default new Vuex.Store({
    strict: true,
    state: {},
    modules: {
        userStore,
        toyStore,
        reviewStore
    }
})