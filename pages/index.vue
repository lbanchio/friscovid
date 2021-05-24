<template>
  <div>
    <page-title>
      Resumen
    </page-title>

    <div v-if="lastRecord">
      <page-subtitle>
        Último registro:
        <span class="rounded-3xl font-medium text-base bg-blue-100 px-3 py-2">{{
          new Date(lastRecord.date.substring(0, 10) + ' 12:00:00').toLocaleDateString()
        }}</span>
      </page-subtitle>
      <div v-if="lastRecord" class="flex items-center dark:bg-gray-900">
        <div class="container max-w-6xl mx-auto">
          <div class="grid gap-7 sm:grid-cols-2 md:grid-cols-3">
            <stats-card
              title="Casos confirmados"
              :value="lastRecord.new_cases"
              :change="Math.abs(lastRecord.new_cases - previousRecord.new_cases)"
              :is-better="(lastRecord.new_cases - previousRecord.new_cases) < 0"
            />

            <stats-card
              title="Fallecimientos"
              :value="lastRecord.deaths"
              :change="Math.abs(lastRecord.deaths - previousRecord.deaths)"
              :is-better="(lastRecord.deaths - previousRecord.deaths) <= 0"
            />

            <stats-card
              title="Casos activos"
              :value="lastRecord.active"
              :change="Math.abs(lastRecord.active - previousRecord.active)"
              :is-better="(lastRecord.active - previousRecord.active) < 0"
            />

            <stats-card
              title="Personas hospitalizadas"
              :value="lastRecord.hospitalized"
              :change="Math.abs(lastRecord.hospitalized - previousRecord.hospitalized)"
              :is-better="(lastRecord.hospitalized - previousRecord.hospitalized) <= 0"
            />

            <stats-card
              title="Personas con ARM"
              :value="lastRecord.ventilators"
              :change="Math.abs(lastRecord.ventilators - previousRecord.ventilators)"
              :is-better="(lastRecord.ventilators - previousRecord.ventilators) <= 0"
            />

            <stats-card
              title="Personas aisladas"
              :value="lastRecord.isolated"
              :change="Math.abs(lastRecord.isolated - previousRecord.isolated)"
              :is-better="(lastRecord.isolated - previousRecord.isolated) <= 0"
            />
          </div>
        </div>
      </div>

      <page-subtitle>
        Información histórica
      </page-subtitle>

      <div v-if="lastRecord" class="flex items-center dark:bg-gray-900">
        <div class="container max-w-6xl mx-auto">
          <div class="grid gap-7 sm:grid-cols-2 md:grid-cols-3">
            <stats-card
              title="Casos totales"
              :value="lastRecord.total_cases"
            />

            <stats-card
              title="Personas recuperadas"
              :value="lastRecord.recovered"
            />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import { Getter, Action } from 'vuex-class'
import StatsCard from '../components/StatsCard.vue'
import IRawData from '../domain/IRawData'
import PageTitle from '../components/layout/PageTitle.vue'
import PageSubtitle from '../components/layout/PageSubtitle.vue'

@Component({
  components: {
    StatsCard,
    PageTitle,
    PageSubtitle
  }
})
export default class Index extends Vue {
  @Action('cases/cases/updateRawData') updateRawData: any;
  @Getter('cases/cases/rawData') rawData: any;
  private lastRecord?: IRawData = undefined;
  private previousRecord?: IRawData = undefined;

  private created () {
    this.load()
    const allowList = ['cases/cases/update']
    this.$store.subscribe((mutation) => {
      if (allowList.includes(mutation.type)) {
        this.load()
        this.$forceUpdate()
      }
    })
  }

  private load (): void {
    const data: Array<IRawData> = this.rawData

    if (!data) {
      return
    }

    this.lastRecord = data[data.length - 1]
    this.previousRecord = data[data.length - 2]
  }
}
</script>
