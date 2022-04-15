<template>
  <div>
    <el-card class="box-card">
      <template #header>
        <div class="card-header">
          <span>购物车</span>
          <el-button-group>
            <el-button
              style="margin-right: 50px"
              @click="generateOrder"
              type="text"
              >结账</el-button
            >
            <el-button @click="backHome" type="text">返回主页</el-button>
          </el-button-group>
        </div>
      </template>
      <div v-for="(item, index) in gList" :key="index">
        <span>{{ item.name }}</span>
      </div>
    </el-card>
  </div>
</template>

<script lang="ts">
import { useRoute, useRouter } from "vue-router";
import { defineComponent, onMounted, ref } from "vue";
import { commonpurchase, showList } from "@/modules/apis/api";
import { ElMessageBox, ElMessage } from "element-plus";

export default defineComponent({
  setup() {
    const router = useRouter();
    let clientId = ref<number>(0);
    let gList = ref<object[]>([]);
    const route = useRoute();
    const backHome = () => {
      router.push({
        name: "home",
      });
    };
    const generateOrder = () => {
      commonpurchase(clientId.value).then((res) => {
        if (res.data.code == 2000) {
          ElMessageBox.alert("已生成订单！", "消息", {
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
    onMounted(() => {
      clientId.value = Number(route.params.cid);
      showList(clientId.value).then((res) => {
        for (let data of res.data.data.shoppingList.goodsList) {
          gList.value.push(data);
        }
      });
    });
    return {
      gList,
      generateOrder,
      backHome,
    };
  },
});
</script>


<style scoped>
.card-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.text {
  font-size: 14px;
}

.item {
  margin-bottom: 18px;
}
</style>