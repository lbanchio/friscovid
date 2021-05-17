<template>
  <div class="container sm:max-w-full lg:max-w-screen-md pt-2 pb-6 mx-auto px-2">
    <h1 class="my-4 text-3xl font-bold leading-tight">
        Estadística de casos de covid Ciudad de San Francisco
    </h1>

    <h2 class="text-2xl my-2">Casos diarios</h2>
    <custom-chart class="mb-4" v-if="dailyCases && dailyCases.loaded" :config="dailyCases"></custom-chart>

    <h2 class="text-2xl my-2">Fallecimientos diarios</h2>
    <custom-chart class="mb-4" v-if="dailyDeaths && dailyDeaths.loaded" :config="dailyDeaths"></custom-chart>

    <h2 class="text-2xl my-2">Personas hospitalizadas</h2>
    <custom-chart class="mb-4" v-if="dailyHospitalized && dailyHospitalized.loaded" :config="dailyHospitalized"></custom-chart>
  </div>

</template>

<script lang="ts">
import { Component, Vue, Inject } from 'vue-property-decorator'
import CustomChart from '~/components/CustomChart.vue';
import IRawData from '../domain/IRawData';
import AverageMaker from '../domain/AverageMaker';

@Component({
  components: {
    CustomChart
  }
})
export default class Index extends Vue {
    public raw?: Array<IRawData>;
    public dailyCases: object|null = null;
    public dailyDeaths: object|null = null;
    public dailyHospitalized: object|null = null;
  
    async created() {
        let rawData = await this.$axios.get('https://script.google.com/macros/s/AKfycbw5EYA5VAxSqeXHl5XlfreTlPPtjFU6QNuD9nZTXmia6iJHuDtG6D_w7zj3ga0z4AeV/exec');
        this.raw = rawData.data.data;
        this.dailyCases = this.getDailyCases();
        this.dailyDeaths = this.getDailyDeaths();
        this.dailyHospitalized = this.getDailyHospitalized();
    }
  
    private getDailyCases(): Object
    {
        let labels: string[] = []; 
        let cases: number[] = [];
        let avg: number[] = [];

        this.raw!.forEach((element: IRawData) => {
            let date = new Date(element.date.substring(0, 10) + ' 12:00:00');
            labels.push(date.toLocaleDateString());
            cases.push(element.new_cases);

        });

        avg = AverageMaker.make(7, cases);

        return {
            loaded: cases.length > 0,
            type: 'bar',
            data: {
                labels: labels,
                datasets: [
                    {
                        label: 'Media móvil 7D',
                        data: avg,
                        type: 'line',
                        backgroundColor: '#FF642A',
                        borderColor: '#FF642A'
                    },
                    {
                        label: 'Casos confirmados',
                        data: cases,
                        backgroundColor: 'rgb(255 100 42 / 50%)'
                    }
                ]
            },
            options: {
                scales: {
                    y: {
                        beginAtZero: true
                    }
                }
            }
        };
    }

    private getDailyDeaths(): Object
    {
        //90BE6D
        let labels: string[] = []; 
        let deaths: number[] = [];
        
        this.raw!.forEach((element: IRawData) => {
            let date = new Date(element.date.substring(0, 10) + ' 12:00:00');
            labels.push(date.toLocaleDateString());
            deaths.push(element.deaths);
        });

        return {
            loaded: deaths.length > 0,
            type: 'bar',
            data: {
                labels: labels,
                datasets: [
                    {
                        label: 'Fallecimientos',
                        data: deaths,
                        backgroundColor: 'rgb(171 51 7 / 50%)'
                    }
                ]
            },
            options: {
                scales: {
                    y: {
                        beginAtZero: true,
                        ticks: {
                            precision: 0,
                        },
                        precision: 0,
                        stepSize: 1,
                    }
                }
            }
        };
    }

    private getDailyHospitalized(): Object
    {
                //90BE6D
        let labels: string[] = []; 
        let hospitalized: number[] = [];
        let ventilated: number[] = [];
        
        this.raw!.forEach((element: IRawData) => {
            let date = new Date(element.date.substring(0, 10) + ' 12:00:00');
            labels.push(date.toLocaleDateString());
            hospitalized.push(element.hospitalized);
            ventilated.push(element.ventilators)
        });

        return {
            loaded: hospitalized.length > 0,
            type: 'bar',
            data: {
                labels: labels,
                datasets: [
                    {
                        label: 'Uso de respirador',
                        data: ventilated,
                        backgroundColor: 'rgb(153 97 77 / 66%)'
                    },
                    {
                        label: 'Hospitalizados',
                        data: hospitalized,
                        backgroundColor: 'rgb(72 83 232 / 50%)'
                    },

                ]
            },
            options: {
                scales: {
                    y: {
                        beginAtZero: true,
                        ticks: {
                            precision: 0,
                        },
                        //stacked: true,
                    },
                    x: {
                        stacked: true,
                    },
                }
            }
        };
    }
}
</script>
