<template>
  <section class="login-user">
      <button @click="switchForm('login')">login</button>
      <button @click="switchForm('signup')">Signup</button>
      <section v-if="login" class="signin">
          <h1>Sign in : </h1>
          <form @submit.prevent="signin">
              <input type="text" v-model="user.username" placeholder="Username..." autofocus>
              <input type="text" v-model="user.password" placeholder="Password...">
            <button>submit</button>
          </form>
      </section>
    
      <section v-if="sign" class="sign up">
          <h1>Sign up : </h1>
          <form @submit.prevent="signup">
              <input type="text" v-model="user.fullname" placeholder="Full name...">
              <input type="text" v-model="user.username" placeholder="Username..." autofocus>
              <input type="text" v-model="user.password" placeholder="Password...">
            <button>submit</button>
          </form>
      </section>
  </section>
</template>

<script>
import {eventBus, showMsg} from '../services/event-bus.service.js'
export default {
name:'toy-login',
data() {
    return {
        login:false,
        sign:false,
        user: {username: '', password: '', fullname: ''}
    }
},
methods: {
    switchForm(formType) {
        if(formType === 'login') {
            this.sign = false
            this.login = true
        }
        if(formType === 'signup') {
            this.sign = true
            this.login = false
        }
    },
    async signin() {
            const loggedUser = await this.$store.dispatch({ type: "loginUser", user : this.user});
            if(!loggedUser) {
                showMsg('Wrong username or password', 'danger')
                return
            }
            showMsg('Logged in!')
            this.$router.push('/')
    },
    async signup() {
            const loggedUser = await this.$store.dispatch({ type: "signUpUser", user : this.user});
            if(!loggedUser) {
                showMsg('Wrong username or password', 'danger')
                return
            }
            showMsg('User created!!')
            this.$router.push('/')

    },

}
}
</script>
