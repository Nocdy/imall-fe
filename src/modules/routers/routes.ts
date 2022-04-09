import { createRouter, createWebHashHistory } from "vue-router";
import CarouselGoods from "../../components/index/CarouselGoods.vue";
import InfiniteScroll from "../../components/index/InfiniteScroll.vue";
import FormDialog from "../../components/index/FormDialog.vue";
import HeaderMenu from "../../components/index/HeaderMenu.vue";
import GoodsInfo from "../../components/index/goods-page/GoodsInfo.vue";
import UserLoginForm from "../../components/index/form/UserLoginForm.vue";

const routes = [
  {
    path: "/",
    components: {
      menu: HeaderMenu,
      dialog: FormDialog,
    },
    children: [
      {
        path: "goods/:cid/:gid",
        name: "goods",
        component: GoodsInfo,
      },
      {
        path: "",
        components: {
          carousel: CarouselGoods,
          scroll: InfiniteScroll,
        },
      },
    ],
  },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

export default router;
