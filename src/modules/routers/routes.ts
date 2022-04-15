import { createRouter, createWebHashHistory } from "vue-router";
import CarouselGoods from "../../components/index/CarouselGoods.vue";
import InfiniteScroll from "../../components/index/InfiniteScroll.vue";
import FormDialog from "../../components/index/FormDialog.vue";
import HeaderMenu from "../../components/index/HeaderMenu.vue";
import GoodsInfo from "../../components/index/goods-page/GoodsInfo.vue";
import ShoppingList from "../../components/index/ShoppingList.vue";
import OrderList from "../../components/index/OrderList.vue";
import FlashOrder from "../../components/index/orderPage/FlashOrder.vue";
import CommonOrder from "../../components/index/orderPage/CommonOrder.vue";
import UserRegistryForm from "../../components/index/UserRegistryForm.vue";
import SearchPage from "../../components/index/SearchPage.vue";

const routes = [
  {
    path: "/",
    components: {
      menu: HeaderMenu,
      dialog: FormDialog,
      registry: UserRegistryForm,
    },
    children: [
      {
        path: "goods/:cid/:gid",
        name: "goods",
        component: GoodsInfo,
      },
      {
        path: "search/:keyword",
        name: "search",
        component: SearchPage,
      },
      {
        path: "",
        components: {
          carousel: CarouselGoods,
          scroll: InfiniteScroll,
        },
      },
      {
        path: "/shoppingList/:cid",
        component: ShoppingList,
        name: "shoppingList",
      },
      {
        path: "/showOrder/:cid",
        component: OrderList,
        name: "showOrder",
        children: [
          {
            path: "/flashOrder",
            component: FlashOrder,
            name: "flashOrder",
          },
          {
            path: "/commonOrder",
            component: CommonOrder,
            name: "commonOrder",
          },
        ],
      },
    ],
  },
  {
    name:"home",
    path:"/home",
    redirect:"/"
  }
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

export default router;
