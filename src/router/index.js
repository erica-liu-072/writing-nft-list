import { createRouter, createWebHistory } from "vue-router";
import Global from "@/components/Global.vue";
function loadView(dir, view) {
  return () => import(/* webpackChunkName: "[request]" */ '@/' + dir + '/' + view + '.vue');
}
const rootpatch=Global.rootpatch
const routes = [

  {
    path: rootpatch,
    name:'index',
    component: loadView('views', 'NFThome'),
  },
  {
    path: rootpatch+"creator/:add",
    name:'creator',
    component: loadView('views', 'NFThome'),
  },
  {
    path: rootpatch+"collector",
    name:'collector',
    component: loadView('views', 'Collector'),
  }
];

const router = createRouter({
  history: createWebHistory(),
  //root:  rootpatch,
  base: process.env.BASE_URL,
  routes,
});

export default router;
