<template>
  <div class="order-layout">
    <el-container>
      <el-aside width="200px">
        <div>
          <el-link type="primary" @click="toCommonOder">普通订单</el-link>
        </div>
        <div>
          <el-link type="primary" @click="toFlashOrder">抢购订单</el-link>
        </div>
        <div>
          <el-link type="primary" @click="backHome">返回主页</el-link>
        </div>
      </el-aside>
      <el-main><router-view/></el-main>
    </el-container>
  </div>
</template>


<script lang="ts">
import { useRoute, useRouter } from "vue-router";
import { defineComponent, onMounted, provide, ref } from "vue";

export default defineComponent({
  setup() {
    let id = ref<number>(0);
    const route = useRoute();
    const router=useRouter();
    const backHome=()=>{
      router.push({
        name:"home"
      })
    }
    const toCommonOder=()=>{
        router.push({
            name:"commonOrder"
        })
    }

    const toFlashOrder=()=>{
        router.push({
            name:"flashOrder"
        })
    }

    onMounted(() => {
      id.value = Number(route.params.cid);
    });
    provide("clientId", id);
    return{
        toFlashOrder,
        toCommonOder,
        backHome,
    }
  },
});
</script>


<style scoped>
.order-layout .el-main {
  color: var(--el-text-color-primary);
  overflow: hidden;
}

.order-layout .el-aside {
  color: var(--el-text-color-primary);
  overflow: hidden;
}
</style>