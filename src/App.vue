<template>
  <div class="common-layout">
    <el-container>
      <el-header>
          <header-menu/>
      </el-header>

      <el-main v-infinite-scroll="load">
        <garousel-goods />
        <infinite-scorll />
        <form-dialog />
        <el-backtop :visibility-height="10" />
      </el-main>
    </el-container>
  </div>
</template>


<script lang="ts">
import { defineComponent, provide, ref } from "vue";
import GarouselGoods from "./components/CarouselGoods.vue";
import InfiniteScorll from "./components/InfiniteScroll.vue";
import FormDialog from "./components/FormDialog.vue";
import HeaderMenu from "./components/HeaderMenu.vue"

export default defineComponent({
  components: {
    GarouselGoods,
    InfiniteScorll,
    FormDialog,
    HeaderMenu
  },
  setup() {
    const dialogFormVisible = ref(false);
    const count = ref<number>(0);
    const load = () => {
      count.value += 2;
    };
    provide("count", count);
    provide("dialogFormVisible", dialogFormVisible);
    return {
      count,
      load,
      dialogFormVisible,
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
