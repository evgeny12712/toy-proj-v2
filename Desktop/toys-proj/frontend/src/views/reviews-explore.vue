<template>
  <section class="toy-reviews">
      <h1>Reviews : </h1>
      <ul v-if="reviews">
          <li v-for="review in reviews" :key="review._id">
              <single-review :review="review"/>
          </li>
      </ul>
  </section>
</template>

<script>
import singleReview from '../components/single-review.cmp'
export default {
    name:'reviews-explore',
    data() {
        return {
            reviews : null
        }
    },
    async created() {
        this.reviews = await this.$store.dispatch({type:"loadReviews"})
    },
    components: {
        singleReview
    }
}
</script>
