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
            <el-tooltip placement="bottom" effect="light">
              <template #content>
                <span>店主:</span>{{vendor.contactName}}<br />
                <span>商家电话:</span>{{vendor.contactNumber}}<br />
               </template>
              <el-descriptions-item label="商铺">{{
                vendor.shopName
              }}</el-descriptions-item>
            </el-tooltip>
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
          <el-button-group style="float: right">
            <el-button
              v-if="goodsInfo.isPlash"
              type="primary"
              :disabled="btnSwitch"
              @click="getFlash"
              round
            >
              <el-icon><shopping-cart /></el-icon>
              立即抢购
            </el-button>
            <el-button
              v-else
              type="primary"
              @click="addList"
              round
              :disabled="btnSwitch"
            >
              <el-icon><shopping-cart /></el-icon>
              加入购物车
            </el-button>
            <el-button type="danger" @click="returnHome" round>
              返回主页
              <el-icon><home-filled /></el-icon>
            </el-button>
          </el-button-group>
        </div>
      </el-main>
    </el-container>
  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted, reactive, ref, watch } from "vue";
import {
  addListToShoppingCart,
  flash,
  getOneInfo,
  getVendorInfo,
} from "../../../modules/apis/api";
import countTimeFun from "../../../modules/utils/CountDownTimeUtils";
import { useRoute, useRouter } from "vue-router";
import Goods from "@/modules/entities/Goods";
import { ElMessageBox, ElMessage } from "element-plus";

export default defineComponent({
  setup() {
    const route = useRoute();
    const router = useRouter();
    let btnSwitch = ref<boolean>(false);
    const clientId = ref<number>(0);
    const goodsId = ref<number>(0);
    let shopName = ref<string | null>("");
    let vendor = ref<any>();
    let goodsInfo = reactive<Goods>({
      id: 0,
      name: "",
      count: 0,
      sellDate: "",
      imagePath: "",
      description: "",
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
    const returnHome = () => {
      router.go(-1);
    };

    const getFlash = () => {
      flash(clientId.value, goodsId.value).then((res) => {
        if (res.data.code == 2000) {
          ElMessageBox.alert(res.data.data.message, "消息", {
            confirmButtonText: "确认",
            callback: () => {
              ElMessage({
                type: "warning",
                message: "请注意,订单有效期为15分钟!",
              });
            },
          });
        }
      });
    };

    watch(
      () => goodsInfo.countTime,
      (newValue) => {
        if (
          newValue.day != 0 ||
          newValue.hour != "00" ||
          newValue.min != "00" ||
          newValue.second != "00"
        ) {
          btnSwitch.value = true;
        } else {
          btnSwitch.value = false;
        }
      },
      { immediate: true, deep: true }
    );

    const addList = () => {
      addListToShoppingCart(clientId.value, goodsId.value).then((res) => {
        if (res.data.code == 2000) {
          ElMessageBox.alert("加入购物车成功！", "消息", {
            confirmButtonText: "确认",
          });
        }
      });
    };

    onMounted(() => {
      console.log(route.params);
      clientId.value = Number(route.params.cid);
      goodsId.value = Number(route.params.gid);

      getOneInfo(clientId.value, goodsId.value).then((res) => {
        let result = res.data.data.goods;
        goodsInfo.id = result.id;
        goodsInfo.name = result.name;
        goodsInfo.count = result.count;
        goodsInfo.sellDate = new Date(result.sellDate);
        goodsInfo.imagePath = result.imagePath;
        goodsInfo.description = result.description;
        goodsInfo.isPlash = result.isPlash;
        goodsInfo.plashCount = result.plashCount;
        goodsInfo.vendorId = result.vendorId;
      });

      getVendorInfo(goodsInfo.vendorId).then((res) => {
        vendor = res.data.data.vendor;
      });
      countTimeFun(TimeNum, goodsInfo);
    });
    return {
      clientId,
      goodsInfo,
      shopName,
      returnHome,
      addList,
      btnSwitch,
      getFlash,
      vendor,
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