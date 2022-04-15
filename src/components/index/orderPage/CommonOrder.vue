<template>
  <div>
    <el-card>
      <template #header>
        <div>
          <span>普通订单</span>
          <el-button-group style="float: right">
            <el-button
              style="margin-right: 50px"
              @click="finishedOrder"
              type="text"
              >完成订单</el-button
            >
            <el-button @click="backHome" type="text">返回主页</el-button>
          </el-button-group>
        </div>
        <div>
          <span>订单剩余时间: </span>
          <div class="viewallItem_top_l_b_time">
            {{ orderTime.day }}天
            <span class="viewallItem_top_l_b_timesty">
              {{ orderTime.hour }}
            </span>
            :
            <span class="viewallItem_top_l_b_timesty">
              {{ orderTime.min }}
            </span>
            :
            <span class="viewallItem_top_l_b_timesty">
              {{ orderTime.second }}
            </span>
          </div>
        </div>
      </template>
      <div v-for="(item, index) in oList" :key="index">
        <span>{{ item.name }}</span>
      </div>
    </el-card>
  </div>
</template>


<script lang="ts">
import { confirmOrder, getOrder } from "@/modules/apis/api";
import { defineComponent, onMounted, reactive, ref } from "vue";
import OrderFlag from "@/modules/request/OrderFlag";
import { ElMessageBox } from "element-plus";
import MyTime from "@/modules/entities/DefineTime";
import countSecondFun from "@/modules/utils/CountDownSecondUtils";
import storage from "@/modules/utils/LocalStorageUtils";
import { useRouter } from "vue-router";

export default defineComponent({
  setup() {
    let id = ref<any>();
    const router = useRouter();
    let orderFlag = reactive<OrderFlag>({
      clientId: "",
      isFlash: false,
    });
    let orderTime = reactive<MyTime>(new MyTime(0, "00", "00", "00"));
    const TimeNum = (val: any, dataTime: any) => {
      if (val != undefined) {
        dataTime.hour = val.hour;
        dataTime.min = val.min;
        dataTime.second = val.second;
      } else {
        dataTime.second = "00";
      }
      return val;
    };
    const backHome = () => {
      router.push({
        name: "home",
      });
    };

    const finishedOrder = () => {
      confirmOrder(orderFlag).then((res) => {
        if (res.data.code == 2000) {
          ElMessageBox.alert(res.data.data.message, "消息", {
            confirmButtonText: "确认",
          });
        }
      });
    };
    let oList = ref<object[]>([]);
    onMounted(() => {
      id.value = storage.get("ClientInfo").id;
      orderFlag.clientId = id.value;
      getOrder(orderFlag).then((res) => {
        if (res.data.code == 2000) {
          for (let data of res.data.data.Order.goodsList) {
            oList.value.push(data);
          }
          let sec = res.data.data.expiredTime;
          countSecondFun(TimeNum, sec, orderTime);
        }
      });
    });
    return {
      oList,
      finishedOrder,
      orderTime,
      backHome,
    };
  },
});
</script>


<style scoped>
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

