<template>
  <section v-if="user" class="user-details">
    <h1>Username : {{ user.username }}</h1>
    <h1>Full name : {{ user.fullname }}</h1>
    <ul v-if="reviews && reviews.length">
      <h3>Reviews :</h3>
      <li v-for="(review, idx) in reviews" :key="idx">
        <single-review :review="review" />
      </li>
    </ul>
  </section>
  <section v-else>
    <h1>Login first</h1>
  </section>
</template>

<script>
import singleReview from '../components/single-review.cmp'
export default {
  name: "user-details",
  data() {
    return {
      user: null,
      reviews: null,
    };
  },
  async created() {
    this.user = this.$store.getters.loggedInUser;
    if(this.user) {
        this.reviews = await this.$store.dispatch({type : 'loadReviews'})
        this.reviews = this.reviews.filter((review) => review.byUser._id === this.user._id)
    }
  },
    components: {
    singleReview
  }
};
</script>