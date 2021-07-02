<template>
  <div>
    <page-title>Gráficos Diarios</page-title>

    <page-subtitle>Casos diarios</page-subtitle>

    <div
      v-if="!dailyCases.loaded"
      class="h-36 flex items-center justify-center"
    >
      <loading-spinner />
    </div>

    <custom-chart
      v-if="dailyCases && dailyCases.loaded"
      class="mb-4"
      :config="dailyCases"
    />

    <page-subtitle>Fallecimientos diarios</page-subtitle>

    <div
      v-if="!dailyDeaths.loaded"
      class="h-36 flex items-center justify-center"
    >
      <loading-spinner />
    </div>
    <custom-chart
      v-if="dailyDeaths && dailyDeaths.loaded"
      class="mb-4"
      :config="dailyDeaths"
    />

    <page-subtitle>Personas hospitalizadas</page-subtitle>

    <div
      v-if="!dailyHospitalized.loaded"
      class="h-36 flex items-center justify-center"
    >
      <loading-spinner />
    </div>
    <custom-chart
      v-if="dailyHospitalized && dailyHospitalized.loaded"
      class="mb-4"
      :config="dailyHospitalized"
    />

    <page-subtitle>Casos totales</page-subtitle>

    <div
      v-if="!dailyActive.loaded"
      class="h-36 flex items-center justify-center"
    >
      <loading-spinner />
    </div>
    <custom-chart
      v-if="dailyActive && dailyActive.loaded"
      class="mb-4"
      :config="dailyActive"
    />
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import { Getter, Action } from 'vuex-class'
import DailyCasesChartData from '../../domain/charts/DailyCasesChartData'
import DailyDeathsChartData from '../../domain/charts/DailyDeathsChartData'
import DailyHospitalizedChartData from '../../domain/charts/DailyHospitalizedChartData'
import DailyActiveCasesChartData from '../../domain/charts/DailyActiveCasesChartData'

@Component({
  components: {
    CustomChart: () => import('../../components/CustomChart.vue'),
    PageTitle: () => import('../../components/layout/PageTitle.vue'),
    PageSubtitle: () => import('../../components/layout/PageSubtitle.vue'),
    LoadingSpinner: () => import('../../components/LoadingSpinner.vue')
  }
})
export default class Index extends Vue {
  private dailyCases: object | null = null;
  private dailyDeaths: object | null = null;
  private dailyHospitalized: object | null = null;
  private dailyActive: object | null = null;

  @Action('cases/cases/updateRawData') updateRawData: any;
  @Getter('cases/cases/rawData') rawData: any;

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

    this.dailyCases = DailyCasesChartData.get(data)
    this.dailyDeaths = DailyDeathsChartData.get(data)
    this.dailyHospitalized = DailyHospitalizedChartData.get(data)
    this.dailyActive = DailyActiveCasesChartData.get(data)
  }
}
</script>
