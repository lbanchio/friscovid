<template>
  <div>
    <page-title>Estadística mensual</page-title>

    <page-subtitle>Casos mensuales</page-subtitle>

    <div v-if="!monthlyCases.loaded" class="h-36 flex items-center justify-center">
      <loading-spinner />
    </div>

    <custom-chart v-if="monthlyCases && monthlyCases.loaded" class="mb-4" :config="monthlyCases" />

    <page-subtitle>Fallecidos</page-subtitle>

    <div v-if="!monthlyDeaths.loaded" class="h-36 flex items-center justify-center">
      <loading-spinner />
    </div>

    <custom-chart v-if="monthlyDeaths && monthlyCases.loaded" class="mb-4" :config="monthlyDeaths" />
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import { Getter, Action } from 'vuex-class'
import MonthlyCasesChartData from '../../domain/charts/MontlyCasesChartData'
import MonthlyDeathsChartData from '../../domain/charts/MonthlyDeathsChartData'

@Component({
  components: {
    CustomChart: () => import('../../components/CustomChart.vue'),
    PageTitle: () => import('../../components/layout/PageTitle.vue'),
    PageSubtitle: () => import('../../components/layout/PageSubtitle.vue'),
    LoadingSpinner: () => import('../../components/LoadingSpinner.vue')
  }
})
export default class Index extends Vue {
    private monthlyCases: object|null = null;
    private monthlyDeaths: object|null = null;

    @Action('cases/cases/updateRawData') updateRawData:any;
    @Getter('cases/cases/rawData') rawData:any

    private created () {
      this.load()
      const allowList = ['cases/cases/update']
      this.$store.subscribe((mutation) => {
        if (allowList.includes(mutation.type)) {
          this.load()
        }
      })
    }

    private load (): void {
      const data = this.rawData

      if (!data) {
        return
      }

      this.monthlyCases = MonthlyCasesChartData.get(data)
      this.monthlyDeaths = MonthlyDeathsChartData.get(data)
    }
}
</script>
