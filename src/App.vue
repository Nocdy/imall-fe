<template>
  <div class="common-layout">
    <el-container>
      <el-header>
          <el-button type="primary" plain class="el-button">
            <el-icon style="vertical-align: middle">
              <avatar />
            </el-icon>
            <span style="vertical-align: middle"> 未登录 </span>
          </el-button>
      </el-header>
      <el-main >
        <GarouselGoods/>
        <InfiniteScorll/> 
      </el-main>
    </el-container>
  </div>
</template>


<script lang="ts">
import { defineComponent,ref } from 'vue'
import GarouselGoods from './components/CarouselGoods.vue'
import InfiniteScorll from './components/InfiniteScroll.vue'

export default defineComponent({
  components:{
    GarouselGoods,
    InfiniteScorll
  },
  setup() {
        const count = ref<number>(0);
    const load = () => {
      count.value += 2;
    };
    return {
      count,
      load,
    };
    
  },
})
</script>


<style scoped>
.common-layout .el-header,
.common-layout .el-footer {
  background-color: #b3c0d1;
  color: var(--el-text-color-primary);
  position: relative;
}

.common-layout .el-header .el-button{
  position: absolute;
  right: 10px;
  bottom: 5px;
}


.common-layout .el-main {
  background-color: #e9eef3;
  color: var(--el-text-color-primary);
}

.common-layout > .el-container {
  margin-bottom: 40px;
}

.common-layout .el-footer {
  line-height: 60px;
}




</style>
