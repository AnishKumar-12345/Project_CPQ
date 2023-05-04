import Vue from 'vue'
import App from './views/App.vue'
import router from './router'
import vuetify from './plugins/vuetify'
import VueExcelXlsx from "vue-excel-xlsx";

Vue.config.productionTip = false
Vue.use(VueExcelXlsx);
new Vue({
  router,
  vuetify,
  render: h => h(App)
}).$mount('#app')
