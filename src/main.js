// Webpack CSS import
import 'onsenui/css/onsenui.css';
import 'onsenui/css/onsen-css-components.css';

import Vue from "vue";
import App from "./App.vue";
import VueOnsen from 'vue-onsenui'; // This imports 'onsenui', so no need to import it separately
import "./registerServiceWorker";

// JS import
Vue.config.productionTip = false;

Vue.use(VueOnsen);

new Vue({
  render: h => h(App)
}).$mount("#app");
