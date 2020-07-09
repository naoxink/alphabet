<template>
  <div>
    <h2>Achievements <small class="extra-small-muted">Completed {{countAchieved}}/{{totalAchievements}}</small></h2>
    <ul class="achievements">
      <Achievement v-for="(achievement, index) of achievements" :key="index" :data="achievement"></Achievement>
    </ul>
  </div>
</template>

<script>
  import { mapState } from 'vuex'
  import Achievement from './Achievement.vue'

  export default {
    name: 'SectionAchievements',
    components: { Achievement },
    computed: {
      ...mapState([
        'achievements',
        'higherDots'
      ]),
      totalAchievements(){
        return Object.keys(this.achievements).length
      },
      countAchieved(){
        let count = 0
        for(let key in this.achievements){
          if(this.achievements[key].done) count++
        }
        return count
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
  .achievements {
    list-style: none;
    margin: 20px 0 0 0;
    padding: 0;
  }
  .extra-small-muted {
    font-size: 0.8em;
    color: gray;
    font-weight: normal;
  }
</style>
