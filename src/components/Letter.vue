<template>
  <li v-if="letter.unlocked" class="letter" :class="{ 'owned': letter.level, 'disabled': !canBuy, 'maxed': isMaxed }">
    <div class="letter-content">
      <div class="name">{{ name }}</div>
      <div v-if="isMaxed">MAXED</div>
      <small class="letter-level" v-if="!isMaxed && letter.level">{{ letter.level }}/{{ isSuper ? letter.maxLevel : letter.superLevel }}</small>
      <small class="letter-increment" v-if="letter.level">Dots: {{ formatDots(actualIncrementWithAll) }}/s</small>
      <div>
        <small class="letter-increment" v-if="isSuper && !isMaxed">({{ formatDots(actualIncrement) }}/s x2)</small>
        <small class="letter-increment" v-if="isMaxed">({{ formatDots(actualIncrement) }}/s x3)</small>
      </div>
    </div>
    <div @click="buy" v-if="!isMaxed" class="letter-cost">
      <small>Next lvl: {{ formatDots(incrementNextLevel) }}/s</small>
      <small>Cost: {{ this.formatDots(cost) }}</small>
    </div>
    <div v-if="!isMaxed" class="fill" :style="`height: ${ percent }%`"></div>
  </li>
</template>

<script>
import { mapState } from 'vuex'
import mixin from '../mixins'

export default {
  name: 'Letter',
  mixins: [ mixin ],
  props: {
    letter: Object,
    index: Number
  },
  computed: {
    ...mapState([
      'letterBaseCost',
      'dots',
      'alphabet'
    ]),
    name(){
      return this.isSuper ? this.letter.super : this.letter.name
    },
    cost(){
      return this.letter.cost
    },
    canBuy(){
      return this.cost <= this.dots && !this.isMaxed
    },
    isSuper(){
      return this.letter.level >= this.letter.superLevel
    },
    isMaxed(){
      return this.letter.level >= this.letter.maxLevel
    },
    percent(){
      return this.calcPercent(this.dots, this.cost)
    },
    actualIncrement(){
      return this.letter.inc
    },
    actualIncrementWithAll(){
      let inc = this.actualIncrement
      if(this.isMaxed){
        inc *= 3
      }else if(this.isSuper){
        inc *= 2
      }
      return inc
    },
    incrementNextLevel(){
      let inc = this.actualIncrement * 1.1
      if(this.isMaxed){
        inc *= 3
      }else if(this.isSuper){
        inc *= 2
      }
      return inc
    }
  },
  methods: {
    buy(){
      if(!this.canBuy){
        return false
      }
      this.$store.commit('buy', {
        index: this.index,
        cost: this.cost
      })
    }
  }
}
</script>


<style scoped>
  ::selection {
    color: none;
    background: none;
  }
  ::-moz-selection {
    color: none;
    background: none;
  }
  .letter {
    -webkit-transition: all .2s;
    -o-transition: all .2s;
    transition: all .2s;
    display: block;
    float: left;
    font-family: serif;
    margin: 10px;
    border: 1px solid black;
    -webkit-border-radius: 7px;
    -moz-border-radius: 7px;
    -ms-border-radius: 7px;
    -o-border-radius: 7px;
    border-radius: 7px;
    overflow: hidden;
    height: 140px;
    position: relative;
  }
  .letter .name {
    font-size: 3em;
  }
  .letter-content {
    overflow: hidden;
    text-align: center;
    width: 100px;
    padding: 10px 15px;
    font-size: 1em;
    position: relative;
  }
  .letter-level {
    position: absolute;
    top: 5px;
    left: 5px;
  }
  .letter-cost {
    cursor: pointer;
    display: block;
    padding: 10px 15px;
    border-top: 1px solid rgba(0, 0, 0, .8);
    background-color: rgba(0, 0, 0, .1);
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
  }
  .letter-cost > small {
    display: block;
  }
  .fill {
    position: absolute;
    background-color: #D9F1FF;
    width: 100%;
    display: block;
    bottom: 0;
    z-index: -1;
  }
  .letter.maxed {
    border: 0;
    color: royalblue;
  }
  .letter:not(.disabled):not(.maxed){
    border-color: blue;
    color: white;
    background-color: blue;
  }
  .letter:not(.disabled):not(.maxed) .letter-cost {
    border-color: blue;
  }
</style>
