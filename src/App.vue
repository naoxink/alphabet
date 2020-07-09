<template>
  <div id="app">
    <div class="title">
      <strong>alphabet</strong><span class="thin">incremental</span><small> beta v{{ version }}</small>
    </div>

    <Nav></Nav>

    <DotButton v-if="hasUpgrade('dotbutton')"></DotButton>

    <SectionAchievements v-if="section === 'achievements'"></SectionAchievements>

    <ul v-if="section === 'alphabet'">

      <div class="stats">
        <p>Available dots: <strong>{{ formatDots(dots) }}</strong></p>
        <p>Dots per second (dps): <strong>{{ formatDots(getDotsPerSecond()) }}/s</strong></p>
        <p>Playtime: <strong>{{ timeFormat(Date.now() - startPlayingTime) }}</strong></p>
      </div>

      <Letter v-for="(letter, index) in alphabet" :key="index" :index="index" :letter="letter"></Letter>
    </ul>

    <SectionUpgrades v-if="section === 'upgrades'"></SectionUpgrades>

    <SectionOptions v-if="section === 'options'"
      v-on:hardReset="hardReset"
    ></SectionOptions>

  </div>
</template>

<script>
import { mapState } from 'vuex'
import Letter from './components/Letter.vue'
import DotButton from './components/DotButton.vue'
import SectionUpgrades from './components/SectionUpgrades.vue'
import SectionAchievements from './components/SectionAchievements.vue'
import SectionOptions from './components/SectionOptions.vue'
import Nav from './components/Nav.vue'
import mixin from './mixins'

export default {
  name: 'App',
  mixins: [ mixin ],
  components: { Letter, Nav, DotButton, SectionUpgrades, SectionAchievements, SectionOptions },
  computed: {
    ...mapState([
      'alphabet',
      'achievements',
      'section',
      'upgrades',
      'dots',
      'version',
      'storageKey',
      'allLettersMultiplier',
      'dotButtonMultiplier',
      'startPlayingTime',
      'higherDots'
    ]),
    upgradesNotOwned(){
      return this.upgrades.filter(u => !u.owned)
    }
  },
  data(){
    return {
      timer: null,
      timerStartTick: null,
      showing: 'alphabet'
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
      let inc = this.getDotsPerSecond()
      inc = inc * delta / 1000
      this.$store.commit('incDots', inc)
      this.timerStartTick = Date.now()
      this.checkAchievements()
    },
    checkAchievements(){
      for(let id in this.achievements){
        if(!this.achievements[id].done && this.achievements[id].check.bind(this)()){
          this.achievements[id].done = true
          // alert('Achievement unlocked: ' + this.achievements[id].title)
        }
      }
    },
    stopTimer(){
      clearInterval(this.timer)
      this.timerStartTick = null
    },
    hardReset(){
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
    width: 900px;
    margin: 0 auto;
    overflow: hidden;
  }
  .title {
    font-size: 3em;
    text-align: center;
  }
  .title strong {
    color: royalblue;
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
    font-size: 1em;
    padding: 10px;
  }
  .stats > p {
    margin: -1px;
    margin-bottom: 20px;
    padding: 5px 10px;
    float: left;
    width: 30%;
    border: 1px solid black;
    background-color: #D9F1FF;
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
