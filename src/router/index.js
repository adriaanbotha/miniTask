import { createRouter, createWebHistory } from "vue-router";
import Home from "../views/Home.vue";
import ProductItem from "../views/ProductItem.vue";

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home,
  },
  {
    path: "/productItem/:id",
    name: "ProductItem",
    component: ProductItem,
  },
];

const history = createWebHistory();
const router = createRouter({
  history,
  routes,
});

export default router;
