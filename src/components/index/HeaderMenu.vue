<template>
  <el-affix :offset="0" z-index="999">
    <div class="bg-red">
      <el-row :gutter="20">
        <el-col :span="6"><div class="grid-content bg-purple"></div></el-col>
        <el-col :span="6" :offset="3"
          ><div class="grid-content bg-purple">
            <el-input placeholder="搜索商品" prefix-icon="Search" v-model="searchKey" @keyup.enter="toSearch" /></div
        ></el-col>
        <el-col :span="6" :offset="3"
          ><div class="grid-content bg-purple">
            <el-button
              type="primary"
              plain
              class="el-button"
              @click="openWindow"
            >
              <el-icon style="vertical-align: middle">
                <avatar />
              </el-icon>
              <span style="vertical-align: middle">{{loginStatus}} </span>
            </el-button></div
        ></el-col>
      </el-row>
    </div>
  </el-affix>
</template>

<script lang="ts">
import { useRouter } from "vue-router";
import { defineComponent, inject,ref } from "vue";

export default defineComponent({
  setup() {
    const router =useRouter();
    let dialogFormVisible = inject<any>("dialogFormVisible");
    let drawer=inject<any>("drawer");
    let loginStatus = inject<any>("loginStatus");
    let searchKey=ref<string>("");
    const openWindow = () => {
      if(localStorage.getItem("ClientInfo")==null){
        dialogFormVisible.value = true;
      }
      else{
        drawer.value=true;
      }
    };

    const toSearch=()=>{
        router.push({
          name:"search",
          params:{
            keyword:searchKey.value
          }
        })
    }
    return {
      dialogFormVisible,
      openWindow,
      loginStatus,
      searchKey,
      toSearch
    };
  },
});
</script>

<style scoped>
.el-button {
  position: absolute;
  top: 5;
  right: 20px;
  bottom: 5px;
}

.el-row {
  margin-bottom: 20px;
}
.el-row:last-child {
  margin-bottom: 0;
}
.el-col {
  border-radius: 4px;
}
.bg-purple-dark {
  background: #99a9bf;
}
.bg-purple {
  background: #d3dce6;
}
.bg-purple-light {
  background: #e5e9f2;
}
.grid-content {
  border-radius: 4px;
  min-height: 60px;
}
.row-bg {
  padding: 10px 0;
  background-color: #f9fafc;
}

.bg-red {
  z-index:999
}
</style>
