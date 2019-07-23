import Vue from 'vue'
import App from './App.vue'

Vue.config.productionTip = false
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';

import BetterDPlayer from './index.js'
Vue.use(BetterDPlayer)

Vue.use(ElementUI);
new Vue({
  el: '#app',
  render: h => h(App)
})
