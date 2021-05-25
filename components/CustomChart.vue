<template>
  <div class="chart-container">
    <canvas v-if="config.loaded" ref="chart" width="400" />
  </div>
</template>

<script lang="ts">

import { Component, Prop, Vue } from 'vue-property-decorator'
import {
  ChartConfiguration,
  Chart,
  LineElement,
  BarElement,
  PointElement,
  BarController,
  LineController,
  CategoryScale,
  LinearScale,
  Legend,
  Title,
  Tooltip,
  ChartItem
} from 'chart.js'

Chart.register(
  LineElement,
  BarElement,
  PointElement,
  BarController,
  LineController,
  CategoryScale,
  LinearScale,
  Legend,
  Title,
  Tooltip
)

@Component
export default class CustomChart extends Vue {
  @Prop() readonly config!: ChartConfiguration;
  public aspectRatio?: number = undefined;

  private mounted (): void {
    this.updateAspectRatio()
    this.createChart()
  }

  private updateAspectRatio (): void {
    if (window.innerWidth <= window.innerHeight && this.aspectRatio !== 1.4) {
      this.aspectRatio = 1.4
      return
    }

    if (this.aspectRatio !== 2) {
      this.aspectRatio = 2.3
    }
  }

  private createChart (): void {
    const ctx = this.$refs.chart as ChartItem
    const localConfig = this.config

    if (localConfig && localConfig.options) {
      localConfig.options.aspectRatio = this.aspectRatio
    }

    // eslint-disable-next-line no-new
    new Chart(ctx, localConfig)
  }
}
</script>
