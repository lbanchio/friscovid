<template>
    <canvas ref="chart" width="400"></canvas>
</template>

<script lang="ts">
import { Component, Prop, Vue, Watch } from 'vue-property-decorator'
import Chart from 'chart.js/auto'

@Component
export default class CustomChart extends Vue {
    @Prop() readonly config!: object
    
    private mounted(): void {
        this.createChart();
    }

    private createChart(): void {
        let ctx = this.$refs.chart;
        console.log('pasó');
        new Chart(ctx, this.config)
    }
}
</script>
