<template>
    <section class="toy-list">
      <p v-if="!toys">Loading...</p>
      <ul v-else>
        <li v-for="toy in toys" :key="toy._id">
          <toy-preview @remove="remove" :toy="toy" :loggedInUser="loggedInUser"/>
        </li>
      </ul>
    </section>
</template>

<script>
import toyPreview from './toy-preview.cmp.vue';
export default {
  name: 'toy-list',
  props:{
    toys: {
      type: Array,
      required: true
    },
    loggedInUser: {
      type: Object,
    }
  },
  methods: {
    remove(toyId) {
      this.$emit('remove', toyId)
    }
  },
  components: {
    toyPreview
  }

}
</script>