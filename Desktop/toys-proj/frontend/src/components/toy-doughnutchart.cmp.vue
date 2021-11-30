<script>
    import { Doughnut } from 'vue-chartjs'
    export default {
    extends: Doughnut,
      mounted () {
        // Overwriting base render method with actual data.
        this.renderChart({
          labels: this.labelsInStock,
          datasets: [
            {
              label: 'Toy percentage in stock',
              backgroundColor: ['red', 'yellow', 'blue', 'green', 'pink', 'skyblue', 'orange'],
              data: this.labelPercentage
            }
          ]
        })
      },
      data() {
          return {
                    labelPercentage : this.$store.getters.labelPercentage,
                    labelsInStock:  [...new Set(this.$store.getters.labelsInStock)]
                }
      },
    }
</script>
