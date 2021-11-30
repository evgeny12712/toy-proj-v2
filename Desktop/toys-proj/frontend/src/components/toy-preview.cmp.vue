<template>
          <section class="toy-preview">
            <img src="https://via.placeholder.com/200/F5F5F5/000000?Text=TempImg"/>
            <span class='toy-name'>{{toy.name}}</span>
            <span>Id : {{toy._id}}</span>
            <span>Created At : </span>
            <span>{{new Date(toy.createdAt).toLocaleString()}}</span>
            <span>In stock : {{toy.inStock}}</span>
            <span>Price : {{toy.price}}</span>
            <span>Labels : {{toy.labels}}</span>
            <div class="buttons">
                <router-link :to="'/edit/'+toy._id" v-if="loggedInUser && loggedInUser.isAdmin">Edit</router-link>
                <router-link :to="'/details/'+toy._id">Details</router-link>
                <button @click="remove" v-if="loggedInUser && loggedInUser.isAdmin">Delete</button>
            </div>
        </section>
</template>

<script>
export default {
    data() {
        return {
            // imgs : "../assets/images/img1.jpg"
        }
    },
    created() {
    },
    props: {
        toy: {
            type: Object,
            required: true
        },
        loggedInUser: {
            type:Object,
        },
    },
    computed: {
        imgs() {
            return "https://picsum.photos/id/250/125";
        }
    },
    methods: {
        remove() {
            this.$emit('remove', this.toy._id);
        }
    }
}
</script>
