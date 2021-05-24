<template>
  <div class="leading-normal tracking-normal gradient">
    <page-navbar />
    <div
      class="container shadow-lg lg:max-w-screen-lg sm:mt-8 sm:mt-8 pt-2 px-4 sm:pt-6 pb-6 mx-auto sm:px-12 bg-white"
    >
      <Nuxt />
    </div>
  </div>
</template>

<script>
export default {
  components: {
    PageNavbar: () => import('../components/layout/PageNavbar')
  },
  data () {
    return {
      loaded: false
    }
  },
  head () {
    return {
      bodyAttrs: {
        class: 'bg-white bg-gray-100 font-sans leading-normal tracking-normal'
      }
    }
  },
  async created () {
    try {
      await this.$store.dispatch('cases/cases/updateRawData')
    } catch (e) {
      //
    }

    this.$nextTick(() => this.$forceUpdate())
    this.loaded = true
  }
}
</script>

<style>
html {
  font-size: 16px;
  word-spacing: 1px;
  -ms-text-size-adjust: 100%;
  -webkit-text-size-adjust: 100%;
  -moz-osx-font-smoothing: grayscale;
  -webkit-font-smoothing: antialiased;
  box-sizing: border-box;
}

*,
*::before,
*::after {
  box-sizing: border-box;
  margin: 0;
}
</style>
