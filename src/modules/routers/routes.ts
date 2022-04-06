import Router from "vue-router";
import GarouselGoods from "@/components/GarouselGoods.vue";
import InfiniteScroll from "@/components/InfiniteScroll.vue";
import FormDialog from "@/components/FormDialog.vue";
import HeaderMenu from "@/components/HeaderMenu.vue";
const routes = [
  {
    path: "/",
    components: {
      InfiniteScroll,
      GarouselGoods,
      FormDialog,
      HeaderMenu,

    }
  },
];

const router = Router.createRouter({
  history: Router.createWebHashHistory(),
  routes,
});

export default router;
