<template>
  <div class="options-content">
    <button class="hard-reset" @click="$emit('hardReset')">
      <span class="name">! Hard reset</span>
      <small>You'll loose all your progress!</small>
    </button>
  </div>
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
  button {
    cursor: pointer;
  }
  .options-content {
    padding: 15px;
  }
  .hard-reset{
    padding: 10px 15px;
    border-color: rgba(0, 0, 0, .1);
    background-color: #FCC;
    color: #D33;
    text-align: center;
  }
  button > .name {
    font-weight: bold;
  }
  button > small {
    display: block;
  }
</style>
