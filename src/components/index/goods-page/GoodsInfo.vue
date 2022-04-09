<template>
  <div class="page-info">
    <el-container>
      <el-aside width="500px">
        <div>
          <el-image :src="goodsInfo.imagePath" class="goods-img" /></div
      ></el-aside>
      <el-main>
        <div>
          <el-descriptions
            :title="goodsInfo.name"
            :column="3"
            :size="size"
            direction="vertical"
            :style="blockMargin"
          >
            <el-descriptions-item label="商铺">{{
              shopName
            }}</el-descriptions-item>
            <el-descriptions-item label="抢购时间">
              <div class="viewallItem_top_l_b_time">
                {{ goodsInfo.countTime.day }}天
                <span class="viewallItem_top_l_b_timesty">
                  {{ goodsInfo.countTime.hour }}
                </span>
                :
                <span class="viewallItem_top_l_b_timesty">
                  {{ goodsInfo.countTime.min }}
                </span>
                :
                <span class="viewallItem_top_l_b_timesty">
                  {{ goodsInfo.countTime.second }}
                </span>
              </div></el-descriptions-item
            >
            <el-descriptions-item label="剩余数量" :span="2">{{
              goodsInfo.count
            }}</el-descriptions-item>
            <el-descriptions-item label="详细信息" :span="2"
              >{{ goodsInfo.description }}
            </el-descriptions-item>
          </el-descriptions>
          <el-button type="primary" round style="float: right">
            <el-icon><shopping-cart /></el-icon>
            加入购物车
          </el-button>
        </div>
      </el-main>
    </el-container>
  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted, reactive, ref } from "vue";
import { getOneInfo } from "../../../modules/apis/api";
import countTimeFun from "../../../modules/utils/CountDownTimeUtils";
import { useRoute } from "vue-router";
import Goods from "@/modules/entities/Goods";

export default defineComponent({
  setup() {
    const route = useRoute();
    const clientId = ref<number>();
    const goodsId = ref<number>();
    const shopName = ref<string | null>("testShop");
    let goodsInfo = reactive<Goods>({
      id: 0,
      name: "string",
      count: 0,
      sellDate: new Date("2022-04-10 00:00:00"),
      imagePath: "",
      description: "test",
      isPlash: false,
      plashCount: null,
      vendorId: 0,
      countTime: {
        day: 0,
        hour: "00",
        min: "00",
        second: "00",
      },
    });
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
    onMounted(() => {
      console.log(route.params);
      clientId.value = Number(route.params.cid);
      goodsId.value = Number(route.params.gid);

      getOneInfo(clientId.value, goodsId.value).then((res) => {
        let result = res.data.data.goods;
        goodsInfo.id=result.id
        goodsInfo.name=result.name
        goodsInfo.count=result.count
        goodsInfo.sellDate=new Date(result.sellDate)
        goodsInfo.imagePath=result.imagePath
        goodsInfo.description=result.description
        goodsInfo.isPlash=result.isPlash
        goodsInfo.plashCount=result.plashCount
        goodsInfo.vendorId=result.vendorId
      });
      countTimeFun(TimeNum, goodsInfo);
    });
    return {
      clientId,
      goodsInfo,
      shopName,
    };
  },
});
</script>


<style scoped>
.page-info {
  height: auto;
  width: auto;
}
.viewallItem_top_l_b_time {
  color: #bb0a30;
  font-size: 22rpx;
}
.viewallItem_top_l_b_timesty {
  width: 30rpx;
  height: 32rpx;
  line-height: 32rpx;
  text-align: center;
  background: #bb0a30;
  border-radius: 4rpx;
  color: #ffffff;
  display: inline-block;
}
</style>