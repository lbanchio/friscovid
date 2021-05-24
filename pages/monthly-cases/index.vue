<template>
  <div>
    <page-title>Estadística mensual</page-title>

    <h2 class="text-xl font-light my-2">
      Casos mensuales
    </h2>

    <div v-if="!monthlyCases.loaded" class="h-36 flex items-center justify-center">
      <loading-spinner />
    </div>

    <custom-chart v-if="monthlyCases && monthlyCases.loaded" class="mb-4" :config="monthlyCases" />

    <h2 class="text-xl font-light my-2">
      Fallecimientos mensuales
    </h2>

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
import PageTitle from '../../components/layout/PageTitle.vue'
import CustomChart from '~/components/CustomChart.vue'

@Component({
  components: {
    CustomChart,
    PageTitle
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
