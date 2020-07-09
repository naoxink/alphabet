<template>
  <div>
    <h2>Available upgrades</h2>
    <ul>
      <Upgrade v-for="(upgrade, index) in upgradesNotOwned" :key="index" :data="upgrade"></Upgrade>
    </ul>
    <template v-if="upgradesOwned.length">
      <h2>Upgrades owned</h2>
      <ul>
        <Upgrade v-for="(upgrade, index) in upgradesOwned" :key="index" :data="upgrade"></Upgrade>
      </ul>
    </template>
  </div>
</template>

<script>
  import { mapState } from 'vuex'
  import Upgrade from './Upgrade.vue'

  export default {
    name: 'SectionUpgrades',
    components: { Upgrade },
    computed: {
      ...mapState([
        'upgrades'
      ]),
      upgradesOwned(){
        return this.upgrades.filter(u => u.owned)
      },
      upgradesNotOwned(){
        return this.upgrades.filter(u => !u.owned).splice(0, 4)
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
</style>
