import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import Vuesax from 'vuesax'
import 'vuesax/dist/vuesax.css' //Vuesax styles
import 'boxicons'
import Antd from 'ant-design-vue';
import 'ant-design-vue/dist/antd.css';
import '@/assets/mainStyle.css';
Vue.config.productionTip = false;
Vue.use(Antd);
Vue.use(Vuesax);

new Vue({
  router,
  render: (h) => h(App),
}).$mount("#app");
