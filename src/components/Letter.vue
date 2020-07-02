<template>
  <li @click="buy" v-if="letter.unlocked" class="letter" :class="{ 'owned': letter.qty, 'disabled': !canBuy, 'maxed': isMaxed }">
    <div class="name">{{ name }}</div>
    <small v-if="!isMaxed" class="cost">Cost: {{ this.formatDots(cost) }}</small>
    <small v-if="isMaxed">MAXED</small>
    <small v-if="!isMaxed && letter.qty">Qty: {{ letter.qty }}</small>
    <small v-if="letter.qty">Inc: {{ formatDots(letter.inc * letter.qty) }}/s</small>
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
      return this.isMaxed ? this.letter.super : this.letter.name
    },
    cost(){
      let cost = this.letterBaseCost
      cost *= 1 + this.letter.qty
      cost *= 1 + this.index
      if(this.letter.qty){
        cost *= 1.15
      }
      return cost
    },
    canBuy(){
      return this.cost <= this.dots && !this.isMaxed
    },
    isMaxed(){
      return this.letter.qty > (this.alphabet.length + 3 - this.index)
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
    cursor: pointer;
    font-family: serif;
    display: block;
    float: left;
    text-align: center;
    width: 100px;
    height: 100px;
    padding: 10px 15px;
    margin: 10px;
    border: 1px solid black;
    -webkit-border-radius: 7px;
    -moz-border-radius: 7px;
    -ms-border-radius: 7px;
    -o-border-radius: 7px;
    border-radius: 7px;
    font-size: 1em;
    position: relative;
  }
  .letter:not(.disabled):hover,
  .letter.owned {
    background-color: rgba(0, 0, 0, .7);
    color: yellowgreen;
    border-color: white;
  }
  .letter.owned.disabled {
    color: #CCC;
  }
  .letter .name {
    font-size: 3em;
  }
  .letter.maxed, .letter.disabled.maxed {
    background-color: transparent;
    border-color: transparent;
    color: #3333CC;
  }
  small {
    display: block;
  }
</style>
