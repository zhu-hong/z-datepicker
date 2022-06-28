import Vue from 'vue'
import App from './App.vue'

import './assets/font_reset.css'
import './assets/reset.css'
import 'uno.css'

import ElementUI from 'element-ui'

Vue.use(ElementUI)

Vue.config.productionTip = false

new Vue({
  render: (h) => h(App),
}).$mount('#app')