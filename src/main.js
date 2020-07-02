import Vue from 'vue'
import App from './App.vue'
import store from './store'
import mixin from './mixins'

Vue.config.productionTip = false

new Vue({
  mixins: [ mixin ],
  store,
  render: function (h) { return h(App) }
}).$mount('#app')
