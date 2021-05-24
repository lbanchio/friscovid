<template>
  <div class="chart-container">
    <canvas v-if="config.loaded" ref="chart" width="400" />
  </div>
</template>

<script lang="ts">
/* eslint-disable no-new */
/* eslint-disable new-cap */

import { Component, Prop, Vue } from 'vue-property-decorator'
import { ChartConfiguration } from 'chart.js'

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

  private async createChart (): Promise<void> {
    const ctx = this.$refs.chart
    const localConfig = this.config

    if (localConfig && localConfig.options) {
      localConfig.options.aspectRatio = this.aspectRatio
    }

    const module = await import('chart.js/auto')
    new module.default(ctx, localConfig)
  }
}
</script>
