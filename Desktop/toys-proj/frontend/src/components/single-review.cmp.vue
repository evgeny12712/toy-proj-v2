<template>
              <div class="single-review">
                <span><h4>About Toy : </h4> {{review.aboutToy.name}}</span>
                <span><h4>From User : </h4> {{review.byUser.fullname}}</span>
                <span><h4>The Review :</h4> {{review.txt}}</span>
                <hr/>
            </div>
</template>

<script>
export default {
    name:'single-review',
    props:{
        review: {
            type:Object,
            required: true
        }
    }
}
</script>
