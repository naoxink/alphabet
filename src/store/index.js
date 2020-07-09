import Vue from 'vue'
import Vuex from 'vuex'
import alphabet from './alphabet.js'
import achievements from './achievements.js'
import upgrades from './upgrades.js'
import VuexPersist from 'vuex-persist'
const version = 0.2
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
    upgrades,
    dots: 1,
    section: 'alphabet',
    higherDots: 3,
    startPlayingTime: Date.now(),
    // Counts
    upgradesAvailable: 0,
    // Multipliers
    allLettersMultiplier: 1,
    dotButtonMultiplier: 1
  },
  mutations: {
    buy(state, data){
      state.dots -= data.cost
      state.alphabet[data.index].level++
      state.alphabet[data.index].inc *= 1.1
      state.alphabet[data.index].cost *= 2.25
      if(state.alphabet[data.index].level === 7 && state.alphabet[data.index + 1]){
        state.alphabet[data.index + 1].unlocked = true
      }
      state.alphabet = state.alphabet.slice()
    },
    incDots(state, qty){
      state.dots += qty
      if(state.dots > state.higherDots){
        state.higherDots = state.dots
      }
    },
    changeSection(state, section){
      state.section = section
    },
    buyUpgrade(state, upgrade){
      let bought = false
      state.upgrades = state.upgrades.map(u => {
        if(u.id === upgrade.id){
          u.owned = true
          bought = true
        }
        return u
      })
      if(bought){
        state.dots -= upgrade.cost
      }
      if(upgrade.effect && typeof upgrade.effect === 'function'){
        upgrade.effect.bind(state)()
      }
    }
  },
  actions: {
  },
  modules: {
  },
  plugins: [ vuexPersist.plugin ]
})
