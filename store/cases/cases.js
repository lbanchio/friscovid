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
    const rawData = await this.$axios.get('https://script.google.com/macros/s/AKfycbw5EYA5VAxSqeXHl5XlfreTlPPtjFU6QNuD9nZTXmia6iJHuDtG6D_w7zj3ga0z4AeV/exec')

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
