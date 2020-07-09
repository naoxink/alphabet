<template>
  <ul class="nav">
    <li :class="{ 'active': section === 'alphabet' }" @click="changeSection('alphabet')">Alphabet</li>
    <li :class="{ 'active': section === 'upgrades' }" @click="changeSection('upgrades')">Upgrades <span v-if="upgradesAvailable">{{ upgradesAvailable }}</span></li>
    <li :class="{ 'active': section === 'achievements' }" @click="changeSection('achievements')">Achievements</li>
    <li :class="{ 'active': section === 'options' }" @click="changeSection('options')">Options</li>
  </ul>
</template>

<script>
  import { mapState } from 'vuex'

  export default {
    name: 'Achievement',
    props: [ 'data' ],
    computed: {
      ...mapState([
        'section',
        'upgradesAvailable'
      ])
    },
    methods: {
      changeSection(section){
        this.$store.commit('changeSection', section)
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
  .nav {
    margin: 20px 0 0 0;
    padding: 0;
    list-style: none;
    border-bottom: 1px solid black;
  }
  .nav > li {
    color: black;
    display: inline-block;
    padding: 10px 15px;
    -webkit-border-radius: 5px 5px 0 0;
    -moz-border-radius: 5px 5px 0 0;
    -ms-border-radius: 5px 5px 0 0;
    -o-border-radius: 5px 5px 0 0;
    border-radius: 5px 5px 0 0;
    border: 1px solid transparent;
    border-bottom: 0;
  }
  .nav > li.active {
    color: white;
    background-color: black;
  }
  .nav > li:not(.active):hover {
    cursor: pointer;
    background-color: #D9F1FF;
    border-color: rgba(0, 0, 0, .1);
  }
</style>
