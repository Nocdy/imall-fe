<template>
  <div class="common-layout">
    <el-container>
      <el-header>
        <header-menu />
      </el-header>
      <el-main v-infinite-scroll="load">
        <garousel-goods />
        <form-dialog />
        <infinite-scroll />
      </el-main>
    </el-container>
  </div>
</template>


<script lang="ts">
import { defineComponent, provide, reactive, ref } from "vue";
import GarouselGoods from "./components/index/CarouselGoods.vue";
import FormDialog from "./components/index/FormDialog.vue";
import InfiniteScroll from "./components/index/InfiniteScroll.vue";
import HeaderMenu from "./components/index/HeaderMenu.vue";
import countTimeFun from "./modules/utils/CountDownTimeUtils";
import { getNewList } from "./modules/apis/api";
import  Goods  from "./modules/entities/Goods";

export default defineComponent({
  components: {
    GarouselGoods,
    FormDialog,
    HeaderMenu,
    InfiniteScroll,
  },
  setup() {
    const dialogFormVisible = ref(false);
    const count = ref<number>(1);
    let imageUrl = ref<string>();
    let list = ref<object[]>([]);
    const load = () => {
      getNewList(count.value).then((res) => {
        count.value += 3;
        console.log(res.data.data.newPage);
        for (let data of res.data.data.newPage) {
          if (data != null) {
            let goods = convertGoodsRespond(data);
            countTimeFun(TimeNum, goods);
            list.value.push(goods); 
          }
        }
      });
    };

    const TimeNum = (val: any, dataTime: any) => {
      if (val != undefined) {
        dataTime.day = val.day;
        dataTime.hour = val.hour;
        dataTime.min = val.min;
        dataTime.second = val.second;
      } else {
        dataTime.second = "00";
      }
      return val;
    };

    const handleAvatarSuccess = (res: any, file: any) => {
      imageUrl.value = URL.createObjectURL(file.raw);
      console.log(res);
      console.log(file);
      console.log(imageUrl.value);
    };

    const convertGoodsRespond = (goods: any) => {
      let convertGoods = reactive<Goods>({
        name: goods.name,
        vendorId: goods.vendorId,
        count: goods.count,
        sellDate: new Date(goods.sellDate),
        isPlash: goods.isPlash,
        description: goods.description,
        imagePath:goods.imagePath,
        countTime: {
          day: 0,
          hour: "00",
          min: "00",
          second: "00",
        },
      });
      return convertGoods;
    };

    provide("count", count);
    provide("list", list.value);
    provide("dialogFormVisible", dialogFormVisible);
    return {
      load,
      imageUrl,
      dialogFormVisible,
      handleAvatarSuccess,
    };
  },
});
</script>


<style scoped>
.el-header {
  background-color: #b3c0d1;
  color: var(--el-text-color-primary);
  position: sticky;
}

.common-layout .el-main {
  background-color: #e9eef3;
  color: var(--el-text-color-primary);
  overflow: hidden;
}

.common-layout > .el-container {
  margin-bottom: 40px;
}
</style>
