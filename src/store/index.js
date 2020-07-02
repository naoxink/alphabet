import Vue from 'vue'
import Vuex from 'vuex'
import alphabet from './alphabet.js'
import achievements from './achievements.js'
import VuexPersist from 'vuex-persist'
const version = 0.1
const storageKey = `alphabet-incremental-${version}`

const vuexPersist = new VuexPersist({
  'key': storageKey,
  'storage': localStorage
})

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    version,
    storageKey,
    alphabet,
    achievements,
    dots: 5,
    letterBaseCost: 5
  },
  mutations: {
    buy(state, data){
      state.dots -= data.cost
      state.alphabet[data.index].qty++
      if(state.alphabet[data.index].qty === 5 && state.alphabet[data.index + 1]){
        state.alphabet[data.index + 1].unlocked = true
      }
    },
    incDots(state, qty){
      state.dots += qty
    }
  },
  actions: {
  },
  modules: {
  },
  plugins: [ vuexPersist.plugin ]
})
