<template>
    <section class="dashboard">
        <toy-doughnutchart class='bar'/>    
        <toy-barchart class='bar'/>
    </section>
</template>

<script>
import toyDoughnutchart from '../components/toy-doughnutchart.cmp'
import toyBarchart from '../components/toy-barchart.cmp'

export default {
    data() {
        return {
        }
    },
    components: {
        toyDoughnutchart,
        toyBarchart
    }
}
</script>