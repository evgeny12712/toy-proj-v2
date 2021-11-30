<template>
  <section v-if="toyToEdit" class="toy-edit">
    <form @submit.prevent="editToy">
      <input type="text" v-model="toyToEdit.name" placeholder='Enter name...' autofocus/>
      <input type="number" v-model="toyToEdit.price" placeholder='Enter price...'/>
      <label for="in-stock">is in stock?</label>
      <input type="checkbox" id='in-stock' v-model="toyToEdit.inStock"/>
    <button>Submit</button>
  </form>
  </section>
</template>

<script>
import {toyService} from '../services/toy-service.js'
import {eventBus, showMsg} from '../services/event-bus.service.js'
export default {
name: 'toy-edit',
data() {
  return {
    toyToEdit: null
  }
},
async created() {
  const {toyId} = this.$route.params
  try {    
    const toy = await toyService.getById(toyId)
    this.toyToEdit = {...toy}
  } catch (error) {
    console.log('error',error);
  }
},
methods: {
  async editToy() {
    this.$router.push('/');
    try {
      await this.$store.dispatch({type: 'editToy', toy:this.toyToEdit})
      showMsg('Toy Updated!')
      this.$store.dispatch({type : 'loadToys', filterBy : this.filterBy})
    } catch (err) {
      console.log('err',err);
      showMsg('Error.. try again', 'danger')      
    }
  }
}
}
</script>
