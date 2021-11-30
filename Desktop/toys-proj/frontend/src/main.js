import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import './styles/styles.css'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import { ValidationProvider, extend } from 'vee-validate';

// Add a rule.
extend('secret', {
    validate: value => value === 'example',
    message: 'This is not the magic word'
});


Vue.component('ValidationProvider', ValidationProvider);
Vue.config.productionTip = false
Vue.use(ElementUI);

new Vue({
    router,
    store,
    render: h => h(App)
}).$mount('#app')