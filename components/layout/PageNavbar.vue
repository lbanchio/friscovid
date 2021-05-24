<template>
  <div class="relative bg-white">
    <div class="md:block hidden w-full mx-auto px-0 sm:px-0 divide-gray-50 md:visible">
      <div class="flex justify-between items-center shadow-md sm:px-6 sm:py-6 md:justify-start md:space-x-10">
        <div class="flex justify-start lg:w-0 lg:flex-1">
          <NuxtLink to="/">
            <span class="">Friscovid</span>
          </NuxtLink>
        </div>

        <nav class="md:flex space-x-10">
          <NuxtLink to="/" class="text-base font-medium text-gray-500 hover:text-gray-900">
            Inicio
          </NuxtLink>

          <NuxtLink to="/daily-cases" class="text-base font-medium text-gray-500 hover:text-gray-900">
            Gráficos diarios
          </NuxtLink>

          <NuxtLink to="/monthly-cases" class="text-base font-medium text-gray-500 hover:text-gray-900">
            Gráficos mensuales
          </NuxtLink>
        </nav>
      </div>
    </div>

    <div class="inset-x-0 transition transform origin-top-right md:hidden">
      <div class="shadow-md bg-white divide-gray-50">
        <div class="pt-2 pb-2 px-5">
          <div class="flex items-center justify-between">
            <div>
              Friscovid
            </div>
            <div class="-mr-2">
              <span class="bg-white p-2 inline-flex items-center justify-center text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500" @click="open = !open">
                <span class="sr-only">Close menu</span>
                <svg v-if="!open" class="h-5 w-5" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                  <title>Menu</title>
                  <path d="M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z" />
                </svg>
                <svg
                  v-if="open"
                  class="h-5 w-5"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  aria-hidden="true"
                >
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </span>
            </div>
          </div>
        </div>
        <div v-if="open" class="py-6 px-5 space-y-6">
          <div class="grid grid-cols-1 gap-y-4 gap-x-8">
            <NuxtLink to="/" class="text-base font-medium text-gray-900 hover:text-gray-700" @click.native="toggleMenu">
              Inicio
            </NuxtLink>
            <NuxtLink to="/daily-cases" class="text-base font-medium text-gray-500 hover:text-gray-900" @click.native="toggleMenu">
              Gráficos Diarios
            </NuxtLink>
            <NuxtLink to="/monthly-cases" class="text-base font-medium text-gray-500 hover:text-gray-900" @click.native="toggleMenu">
              Gráficos Mensuales
            </NuxtLink>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'

  @Component
export default class PageNavbar extends Vue {
    private open: boolean = false;
    private chartsMenuOpen: boolean = false;

    private toggleMenu (): void {
      this.open = !this.open
    }
}
</script>
