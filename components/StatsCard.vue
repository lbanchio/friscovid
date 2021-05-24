<template>
  <div class="p-5 bg-white shadow-md border">
    <div class="text-base text-gray-800">
      {{ title }}
    </div>
    <div class="flex items-center pt-1">
      <div class="text-4xl font-bold text-gray-900">
        {{ value }}
      </div>
      <span
        v-if="change !== undefined"
        :class="{'text-red-600': !isBetter, 'bg-red-100': !isBetter, 'text-green-600': isBetter, 'bg-green-100': isBetter}"
        class="flex items-center px-2 py-0.5 mx-2 text-sm rounded-full"
      >
        <svg
          v-if="isBetter"
          xmlns="http://www.w3.org/2000/svg"
          class="h-4 w-4"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M19 9l-7 7-7-7"
          />
        </svg>
        <svg
          v-if="!isBetter"
          xmlns="http://www.w3.org/2000/svg"
          class="h-4 w-4"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M5 15l7-7 7 7"
          />
        </svg>

        <span>&nbsp;{{ change }}</span>
      </span>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator'

@Component
export default class StatsCard extends Vue {
  @Prop() readonly title: string | undefined;
  @Prop() readonly value: number | undefined;
  @Prop() readonly change: string | undefined;
  @Prop() readonly isBetter: boolean | undefined;
}
</script>
