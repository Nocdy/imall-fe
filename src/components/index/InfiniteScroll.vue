<template>
  <el-row>
    <el-col
      v-for="(item, index) in list"
      :key="index"
      :span="7"
      :offset="1"
    >
      <el-card :body-style="{ padding: '0px' }" shadow="always" v-if="list[index]!=null">
        <el-image :src="list[index].imagePath" class="image"/>
        <div style="padding: 14px">
          <span>{{ list[index].name }}</span>
          <div class="bottom">
            <div v-if="list[index].isPlash">
              <span>距离抢购开始还有: </span>
              <div class="viewallItem_top_l_b_time">
                {{ list[index].countTime.day }}天
                <span class="viewallItem_top_l_b_timesty">
                  {{ list[index].countTime.hour }}
                </span>
                :
                <span class="viewallItem_top_l_b_timesty">
                  {{ list[index].countTime.min }}
                </span>
                :
                <span class="viewallItem_top_l_b_timesty">
                  {{ list[index].countTime.second }}
                </span>
              </div>
              <el-button
                type="text"
                class="button"
                @click="goInfo(list[index])"
                >立即抢购</el-button
              >
            </div>
            <el-button v-else type="text" class="button" @click="goInfo(list[index])">加入购物车</el-button>
          </div>
        </div>
      </el-card>
    </el-col>
  </el-row>
</template>


<script lang="ts">
import { useRouter } from "vue-router";
import { defineComponent, inject,ref } from "vue";
import storage from "@/modules/utils/LocalStorageUtils";

export default defineComponent({
  setup() {
    const router=useRouter();
    let count = inject<number>("count");
    let list = inject<object[]>("list");
    let clientId=ref<number>();
    const goInfo=(goods:any)=>{
      clientId.value=storage.get("ClientInfo").id
      router.push({
        name:"goods",
        params:{
          cid:clientId.value,
          gid:goods.id
        }
      })
    }
    return {
      count,
      list,
      goInfo
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
