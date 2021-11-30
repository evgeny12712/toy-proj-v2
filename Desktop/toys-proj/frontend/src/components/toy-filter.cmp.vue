<template>
  <section class="toy-filter">
    <div class="filter">
      <span>Filter By : </span>
      <input type="text" v-model="filter.name" @input="setFilter" placeholder="name">
      <label for="in-stock">In stock : </label>
      <select @change="setFilter" id="in-stock" v-model="filter.inStock">
        <option value="">All</option>
        <option value="true">In stock</option>
        <option value="false">Not in stock</option>
      </select>
      <label for="add-select">Labels : </label>
      <el-select id="add-select" class="mult-select" @input="setFilter" v-model="filter.labels" multiple placeholder="Select">
      <el-option
        v-for="item in labels"
        :key="item.value"
        :label="item.label"
        :value="item.value">
      </el-option>
    </el-select>
    </div>

    <div class="sort">
      <span>Sort By :</span>
      <label for="toy-name">Name</label>
      <input type="radio" value='name' @change="sort" v-model="sortBy" name="sort" id="toy-name"/>
      <label for="toy-price">Price</label>
      <input type="radio" value='price' @change="sort" v-model="sortBy" name="sort" id="toy-price"/>
      <label for="created-at">Created At</label>
      <input type="radio" value='created' @change="sort" v-model="sortBy" name="sort" id="created-at"/>
    </div>
  </section>
</template>

<script>
export default {
  props: {
    filterBy: {
      type:Object,
      required: true
    }
  },
  created() {},
  data() {
    return {
      filter : {...this.filterBy},
      sortBy : '',
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
    }
  },
  methods: {
    setFilter() {
      this.$emit('filter', {...this.filter})
    },
    sort() {
      this.$emit('sortBy', this.sortBy)
    }

  },
  computed: {},
};
</script>

