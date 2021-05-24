export const state = () => ({
  raw: []
})

export const mutations = {
  update (state, cases) {
    state.raw = cases
  }
}

export const actions = {
  async updateRawData (context) {
    const rawData = await this.$axios.get('https://covid-data.lbanchio.workers.dev')
    context.commit('update', rawData.data.data.map((row) => {
      row.date = row.date.substring(0, 10) + ' 19:00:00'
      return row
    }))
  }
}

export const getters = {
  rawData: (state) => {
    return state.raw
  }
}
