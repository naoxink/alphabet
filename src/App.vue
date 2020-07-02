<template>
  <div id="app">
    <div class="title">
      <strong>alphabet</strong><span class="thin">incremental</span><small> beta v{{ version }}</small>
    </div>
    <ul class="options">
      <li class="reset" @click="reset">! Reset game</li>
    </ul>
    <div class="stats">
      <p>Available dots: <strong>{{ formatDots(dots) }}</strong></p>
    </div>
    <ul>
      <Letter v-for="(letter, index) in alphabet" :key="index" :index="index" :letter="letter"></Letter>
    </ul>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import Letter from './components/Letter.vue'
import mixin from './mixins'

export default {
  name: 'App',
  mixins: [ mixin ],
  components: { Letter },
  computed: {
    ...mapState([
      'alphabet',
      'achievements',
      'dots',
      'version',
      'storageKey'
    ])
  },
  data(){
    return {
      timer: null,
      timerStartTick: null
    }
  },
  methods: {
    startTimer(){
      if(this.timer) return false
      this.timer = setInterval(this.tick.bind(this), 1)
      this.timerStartTick = Date.now()
    },
    tick(){
      const delta = Date.now() - this.timerStartTick
      let inc = 0
      inc = this.alphabet.reduce((ac, l) => {
        if(!l.qty) return ac
        ac += l.inc * l.qty
        return ac
      }, inc)
      inc = inc * delta / 1000
      this.$store.commit('incDots', inc)
      this.timerStartTick = Date.now()
      this.checkAchievements()
    },
    checkAchievements(){
      for(let id in this.achievements){
        if(!this.achievements[id].done && this.achievements[id].check.bind(this)()){
          this.achievements[id].done = true
          alert('oleeeeeeeeee, logro: ' + this.achievements[id].title)
        }
      }
    },
    stopTimer(){
      clearInterval(this.timer)
      this.timerStartTick = null
    },
    reset(){
      this.stopTimer()
      localStorage.removeItem(this.storageKey)
      location.reload()
    }
  },
  mounted(){
    this.startTimer()
  }
}
</script>

<style>
  #app {
    width: 800px;
    margin: 0 auto;
    overflow: hidden;
  }
  .title {
    font-size: 3em;
    text-align: center;
  }
  .title strong {
    color: yellowgreen;
  }
  .title .thin {
    font-size: 100;
  }
  .title small {
    font-size: 0.4em;
    color: #777;
  }
  .stats {
    text-align: center;
    font-size: 1.2em;
  }
  .options {
    margin-top: 10px;
    padding: 10px;
    border-bottom: 1px solid black;
    border-top: 1px solid black;
  }
  .options > li {
    display: inline;
  }
  .reset {
    color: tomato;
    cursor: pointer;
  }
</style>
