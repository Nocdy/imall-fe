<template>
  <el-row >
    <el-col v-for="(item, index) in list" :key="index" :span="7" :offset="1">
      <el-card
        :body-style="{ padding: '0px' }"
        shadow="always"
        v-if="item != null"
      >
        <el-image :src="item.imagePath" class="image" />
        <div style="padding: 14px">
          <span>{{ item.name }}</span>
          <div class="bottom">
            <div v-if="item.isPlash">
              <span>距离抢购开始还有: </span>
              <div class="viewallItem_top_l_b_time">
                {{ item.countTime.day }}天
                <span class="viewallItem_top_l_b_timesty">
                  {{ item.countTime.hour }}
                </span>
                :
                <span class="viewallItem_top_l_b_timesty">
                  {{ item.countTime.min }}
                </span>
                :
                <span class="viewallItem_top_l_b_timesty">
                  {{ item.countTime.second }}
                </span>
              </div>
              <el-button type="text" class="button" @click="goInfo(item)"
                >立即抢购</el-button
              >
            </div>
            <el-button v-else type="text" class="button" @click="goInfo(item)"
              >加入购物车</el-button
            >
          </div>
        </div>
      </el-card>
    </el-col>
  </el-row>
</template>


<script lang="ts">
import { useRoute, useRouter } from "vue-router";
import { defineComponent, onMounted, reactive, ref } from "vue";
import storage from "@/modules/utils/LocalStorageUtils";
import { search } from "@/modules/apis/api";
import countTimeFun from "@/modules/utils/CountDownTimeUtils";
import Goods from "@/modules/entities/Goods";

export default defineComponent({
  setup() {
    const router = useRouter();
    const route = useRoute();
    let list = ref<object[]>([]);
    let clientId = ref<number>();
    let searchWord = ref<string>("");

    onMounted(() => {
      searchWord.value = route.params.keyword.toString();
      search(searchWord.value).then((res) => {
        for (let data of res.data.data.searchList) {
          let goods = convertGoodsRespond(data);
          if (goods.isPlash) {
            countTimeFun(TimeNum, goods);
          }
          list.value.push(goods);
        }
      });
    });

    const convertGoodsRespond = (goods: any) => {
      let convertGoods = reactive<Goods>(new Goods(goods));
      return convertGoods;
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
    const goInfo = (goods: any) => {
      clientId.value = storage.get("ClientInfo").id;
      router.push({
        name: "goods",
        params: {
          cid: clientId.value,
          gid: goods.id,
        },
      });
    };
    return {
      list,
      goInfo,
    };
  },
});
</script>


<style scoped>
.time {
  font-size: 13px;
  color: #999;
}

.bottom {
  margin-top: 13px;
  line-height: 12px;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.button {
  padding: 0;
  min-height: auto;
}

.image {
  width: 100%;
  height: 100%;
  object-fit: fill;
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