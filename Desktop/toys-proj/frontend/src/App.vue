<template>
  <div id="app">
    <user-msg/>
    <section class="navigation">
    <router-link to="/reviews" class='title'>Reviews</router-link> | 
    <router-link to="/user" class='title'>User details</router-link> | 
    <router-link to="/login" class='title'>Login page</router-link> | 
    <router-link to="/" class='title'>Toys App</router-link> | 
    <router-link to="/dashboard" class='title'>Dashboard</router-link>
    </section>
    <router-view/>
  </div>
</template>


<script>
import userMsg from '../src/components/user-msg.cmp.vue'
export default {
components: {
  userMsg
}
}
</script>