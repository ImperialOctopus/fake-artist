// Webpack CSS import
import 'onsenui/css/onsenui.css';
import 'onsenui/css/onsen-css-components.css';

import Vue from 'vue'
import VueOnsen from 'vue-onsenui';
import App from './App.vue'

Vue.config.productionTip = false
Vue.use(VueOnsen); // VueOnsen set here as plugin to VUE. Done automatically if a call to window.Vue exists in the startup code.

new Vue({
  render: h => h(App),
}).$mount('#app')
