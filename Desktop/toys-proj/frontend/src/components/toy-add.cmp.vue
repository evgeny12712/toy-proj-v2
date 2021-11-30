<template>
  <section class="add-toy">
    <h3>Add Toy :</h3>

    <form @submit.prevent="addToy">
      <input type="text" v-model="toy.name" placeholder="Toy name" />
      <input type="number" v-model="toy.price" placeholder="Price" />
      <label for="filter-select">Labels : </label>
      <el-select id="filter-select" class="mult-select" v-model="toy.labels" multiple placeholder="Select">
        <el-option
          v-for="item in labels"
          :key="item.value"
          :label="item.label"
          :value="item.value"
        >
        </el-option>
      </el-select>

      <button>Submit</button>
    </form>
  </section>
</template>

<script>
export default {
  name: "toy-add",
  data() {
    return {
      toy: { name: "", price: "", labels: [] },
      labels: [{
        value:'onWheels',
        label:'On wheels'
       },
       {
        value:'boxGame',
        label:'Box game'
       },
       {
        value:'art',
        label:'Art'
       },
       {
        value:'baby',
        label:'Baby'
       },
       {
        value:'doll',
        label:'Doll'
       },
       {
        value:'puzzle',
        label:'Puzzle'
       },
        {
        value:'outdoor',
        label:'Outdoor'
       }]
    };
  },
  methods: {
    addToy() {
      let toyToAdd = { ...this.toy };
      toyToAdd.createdAt = Date.now();
      toyToAdd.inStock = true;
      this.$emit("addToy", toyToAdd);
      this.toy = {name : '', price : '', labels : []};
      
    },
  },
};
</script>
