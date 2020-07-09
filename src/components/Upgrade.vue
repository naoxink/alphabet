<template>
  <li class="upgrade" v-if="isNear" :class="{ 'owned': data.owned }">
    <div class="title">{{ data.title }}</div>
    <div v-if="!data.owned" class="buy-upgrade" @click="buy"  :class="{ 'can-buy': canBuy }">
      Buy for {{ formatDots(data.cost) }}
      <div class="buy-upgrade-fill" :style="`width: ${percent}%`"></div>
    </div>
  </li>
</template>

<script>
  import { mapState } from 'vuex'
  import mixins from '../mixins'

  export default {
    name: 'Upgrade',
    props: [ 'data' ],
    mixins: [ mixins ],
    computed: {
      ...mapState([
        'dots',
        'higherDots'
      ]),
      percent(){
        return this.calcPercent(this.dots, this.data.cost)
      },
      isNear(){
        return this.higherDots >= this.data.near
      },
      canBuy(){
        return this.dots >= this.data.cost
      }
    },
    methods: {
      buy(){
        if(!this.canBuy) return false
        this.$store.commit('buyUpgrade', this.data)
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
  .upgrade, .buy-upgrade {
    -webkit-border-radius: 5px;
    -moz-border-radius: 5px;
    -ms-border-radius: 5px;
    -o-border-radius: 5px;
    border-radius: 5px;
  }
  .upgrade {
    width: 45%;
    border: 1px solid rgba(0, 0, 0, .1);
    display: inline-block;
    margin: 5px;
    padding: 10px 15px;
  }
  .upgrade.owned {
    border-color: royalblue;
    color: royalblue;
  }
  .upgrade .title {
    font-size: 1.2em;
    font-weight: bold;
  }
  .buy-upgrade {
    padding: 10px;
    cursor: pointer;
    text-align: center;
    margin: 5px;
    height: 20px;
    position: relative;
    border: 1px solid black;
  }
  .buy-upgrade-fill {
    position: absolute;
    top: 0;
    left: 0;
    bottom: 0;
    width: 0%;
    background-color: #D9F1FF;
    z-index: -1;
  }
  .buy-upgrade.can-buy {
    background-color: royalblue;
    color: white;
  }
</style>
