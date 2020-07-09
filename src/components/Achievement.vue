<template>
  <li class="achievement" :class="{ 'done': data.done }">{{ data.title }} <span class="progress">{{ progress }}</span></li>
</template>

<script>
import { mapState } from 'vuex'
import mixin from '../mixins'

export default {
  name: 'Achievement',
  props: [ 'data' ],
  mixins: [ mixin ],
  computed: {
    ...mapState([ 'achievements', 'alphabet', 'upgrades', 'higherDots' ]),
    progress(){
      return typeof this.data.progress === 'function' ? this.data.progress.bind(this)().join('/') : ''
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
  .achievement {
    float: left;
    width: 20%;
    height: 50px;
    padding: 10px 15px;
    border: 1px solid rgba(0, 0, 0, .5);
    margin: 5px;
    -webkit-border-radius: 5px;
    -moz-border-radius: 5px;
    -ms-border-radius: 5px;
    -o-border-radius: 5px;
    border-radius: 5px;
    position: relative;
  }
  .done {
    background-color: royalblue;
    color: white;
  }
  .progress {
    font-size: 3.5em;
    bottom: -10px;
    right: 0;
    color: rgba(0, 0, 0, .1);
    position: absolute;
  }
</style>
