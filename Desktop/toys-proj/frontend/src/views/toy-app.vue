<template>
    <section class="toy-app">
      <section v-if="loggedInUser" class='logged-in-user'>
        <h3 >{{loggedInUser.username}} is connected</h3>
        <button @click="logout">logout</button>
      </section>
      <toy-add @addToy="addToy" v-if="loggedInUser && loggedInUser.isAdmin"/>
      <toy-filter  @filter="setFilter" @sortBy="sortBy" :filterBy="filterBy" />
      <toy-list @remove="remove" :toys="toys" :loggedInUser="loggedInUser"/>
      <section v-if="numOfPages > 1" class="pagination">
            <ul>
                <li><button class="page-btn" @click="movePage('first')">First</button></li>
                <li><button class="page-btn" @click="movePage('down')">Previous</button></li>
                <li v-for="i in numOfPages" :key="i">
                    <button class="page-btn" :class="{'clicked-page' : i === filterBy.paging.currPageIdx+1}" @click="movePage(i)">{{i}}</button>
                </li>
                <li><button class="page-btn" @click="movePage('up')">Next</button></li>
                <li><button class="page-btn" @click="movePage('last')">Last</button></li>
            </ul>
      </section>
    </section>
</template>

<script>
import toyFilter from "../components/toy-filter.cmp.vue";
import toyList from "../components/toy-list.cmp.vue";
import toyAdd from "../components/toy-add.cmp.vue";
import { eventBus, showMsg } from "../services/event-bus.service.js";
import {imgUploadService} from "../services/imgUpload.service.js"
export default {
  name: "toyApp",
  props: {},
  data() {
    return {
      filterBy : this.$store.getters.filterBy,
    };
  },
  created() {
    this.$store.dispatch({ type: "loadToys", filterBy : this.filterBy });
  },
  methods: {
    async movePage(direction) {
      this.$store.commit({type: "movePage", direction})
      const toys = await this.$store.dispatch({ type: "loadToys", filterBy : this.filterBy})
    },
    async remove(toyId) {
      try {
        await this.$store.dispatch({ type: "remove", toyId });
        showMsg("Toy removed!");
      } catch (err) {
        console.log(err);
        showMsg("Error.. try again", "danger");
      }
    },
    async addToy(toy) {
      try {
        await this.$store.dispatch({ type: "addToy", toy });
        this.$store.dispatch({type : 'loadToys', filterBy : this.filterBy})
        showMsg("Toy added!");
      } catch (err) {
        console.log(err);
        showMsg("Error.. try again", "danger");
      }
    },
    setFilter(filterBy) {
      this.$store.dispatch({ type: "setFilter", filterBy });
    },
    sortBy(sortBy) {
      this.$store.commit({ type: "sortBy", sortBy });
    },
    async logout() {
      const res = await this.$store.dispatch({type:"logout"})
      const {msg} = res.data
      showMsg(msg)
    }
  },
  computed: {
    toys() {
      return this.$store.getters.toys;
    },
    loggedInUser() {
      return this.$store.getters.loggedInUser
    },
    fiterBy() {  
      return this.$store.getters.filterBy
    },
    numOfToys() {
      return this.$store.getters.toysLength
    },
    numOfPages() {
      console.log('this.numOfToys',this.numOfToys);
      console.log('this.filterBy.paging.pageSize',this.filterBy.paging.pageSize);
      console.log('numOfPages',Math.ceil(this.numOfToys/this.filterBy.paging.pageSize));
      return Math.ceil(this.numOfToys/this.filterBy.paging.pageSize)
    }
  },

  components: {
    toyFilter,
    toyList,
    toyAdd,
  },
};
</script>