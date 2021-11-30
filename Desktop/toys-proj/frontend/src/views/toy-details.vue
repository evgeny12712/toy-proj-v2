<template>
  <section v-if="toy" class="toy-details">
    <h3><span>Name : {{toy.name}}</span></h3>
    <h3><span>Nd : {{toy._id}}</span></h3>
    <h3><span>Price : {{toy.price}}</span></h3>
    <h3>Is in stock : {{toy.inStock}}</h3>
    <h3><span>Created at : {{new Date(toy.createdAt).toLocaleString()}}</span></h3>
    <h3>Labels : </h3>
    <ul class="details-labels">
        <li v-for="label in toy.labels" :key="toy._id+label">
          <span>{{label}}</span>
        </li>
    </ul>
    <ul v-if="toyReviews && toyReviews.length">
    <h3>Reviews : </h3>
      <li v-for="(review, idx) in toyReviews" :key="idx">
          <single-review :review="review"/>
      </li>
    </ul>
    <button @click="isAddReview = !isAddReview">Add Review</button>
    <section v-if="isAddReview" class="add-review">
      <form @submit.prevent="addReview">
        <textarea cols="30" rows="10" v-model="review.txt"/>
        <button>Submit</button>
      </form>
    </section>
    <router-link to="/">Back</router-link>
  </section>
</template>

<script>
import {toyService} from '../services/toy-service.js'
import singleReview from '../components/single-review.cmp'
export default {
name: 'toy-details',
data() {
  return {
    toy: null,
    isAddReview : false,
    toyReviews : null,
    review : {txt: '', aboutToyId : null}
  }
},
async created() {
  try {
    const {toyId} = this.$route.params
    const toy = await toyService.getById(toyId)
    this.toy = {...toy}    
    this.review.aboutToyId = toy._id
    const reviews = await this.$store.dispatch({type : 'loadReviews'})
    console.log('reviews',reviews);
    this.toyReviews = reviews.filter((review) => review.aboutToy._id === toyId)
    console.log('toyReviews',this.toyReviews);
  } catch (error) {
    console.log('error',error);
  }
},
methods: {
  async addReview() {
    await this.$store.dispatch({type: 'addReview', review: this.review})
    this.review = {txt: '', about: null}
  }
  },
  components: {
    singleReview
  }
}
</script>
