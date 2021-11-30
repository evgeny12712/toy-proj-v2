
 <script>
    import { Bar } from 'vue-chartjs'
    export default {
    extends: Bar,
      mounted () {
        // Overwriting base render method with actual data.
        this.renderChart({
          labels: this.toysNames,
          datasets: [
            {
              label: 'Toy prices',
              backgroundColor: ['red', 'yellow', 'blue', 'green', 'pink', 'skyblue', 'orange'],
              data: this.toyPrices
            }
          ]
        })
      },
      data() {
          return {
                    toysNames : this.$store.getters.toyNames,
                    toyPrices:  this.$store.getters.toyPrices
                }
      },
    }

</script>
