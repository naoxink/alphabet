<template>
  <div class="dot-button" @click="addDots">+{{ formatDots(calcInc) }} dots</div>
</template>

<script>
import mixin from '../mixins'
import { mapState } from 'vuex'

export default {
  name: 'DotButton',
  mixins: [ mixin ],
  computed: {
    ...mapState([
      'upgrades',
      'dotButtonMultiplier'
    ]),
    calcInc(){
      let inc = 5
      inc *= this.dotButtonMultiplier
      return inc
    }
  },
  methods: {
    addDots(){
      this.$store.commit('incDots', this.calcInc)
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
  .dot-button {
    display: block;
    width: 200px;
    padding: 10px 15px;
    cursor: pointer;
    border: 1px solid black;
    margin: 10px auto;
    text-align: center;
  }
  .dot-button:hover {
    border-color: royalblue;
    color: royalblue;
  }
  .dot-button:active {
    background-color: royalblue;
    color: white;
  }
</style>
