import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home.vue";
import Chart from "../components/chart.vue";

Vue.use(VueRouter);

const routes = [
  { path: "/", name: "Home", component: Home, },
  { path: "/chart", name: "chart", component: Chart, },
];

const router = new VueRouter({
  routes,
});

export default router;
