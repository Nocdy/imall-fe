<template>
  <div class="common-layout">
    <el-container>
      <el-header>
        <router-view name="menu" />
      </el-header>
      <el-main v-infinite-scroll="load">
        <router-view name="dialog" />
        <router-view>
          <router-view name="carousel" />
          <router-view name="scroll" />
          <router-view />
        </router-view>
        <el-drawer v-model="drawer" title="I am the title" :with-header="false">
          <span>我的购物车</span>
          <span>我的订单</span>
          <el-button @click="logout" class="logout-btn" type="danger" danger>
            <el-icon><switch-button /></el-icon>
            <span>注销账号</span>
          </el-button>
        </el-drawer>
      </el-main>
    </el-container>
  </div>
</template>


<script lang="ts">
import { defineComponent, onMounted, provide, reactive, ref } from "vue";
import countTimeFun from "./modules/utils/CountDownTimeUtils";
import { getNewList } from "./modules/apis/api";
import Goods from "./modules/entities/Goods";
import storage from "./modules/utils/LocalStorageUtils";
import { ElMessage, ElMessageBox } from 'element-plus'

export default defineComponent({
  setup() {
    const drawer = ref<boolean>(false);
    const loginStatus = ref<string>("未登录");
    const dialogFormVisible = ref<boolean>(false);
    const count = ref<number>(1);
    let imageUrl = ref<string>();
    let list = ref<object[]>([]);
    const load = () => {
      getNewList(count.value).then((res) => {
        count.value += 3;
        console.log(res.data.data.newPage);
        for (let data of res.data.data.newPage) {
          if (data != null) {
            let goods = convertGoodsRespond(data);
            if (goods.isPlash) {
              countTimeFun(TimeNum, goods);
            }
            list.value.push(goods);
          }
        }
      });
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

    const logout=()=>{
      ElMessageBox.confirm(
        "确认注销账号？",
        "Warning",
        {
          confirmButtonText:"确认",
          cancelButtonText:"取消",
          type:"warning",
        }
      )
      .then(()=>{
        localStorage.clear();
        drawer.value=false;
        loginStatus.value="未登录";
        ElMessage({
          type:"success",
          message:"注销成功",
        })
      })
    }

    const handleAvatarSuccess = (res: any, file: any) => {
      imageUrl.value = URL.createObjectURL(file.raw);
      console.log(res);
      console.log(file);
      console.log(imageUrl.value);
    };

    const convertGoodsRespond = (goods: any) => {
      let convertGoods = reactive<Goods>(new Goods(goods));
      return convertGoods;
    };

    onMounted(() => {
      if (localStorage.getItem("ClientInfo") != null) {
        loginStatus.value = storage.get("ClientInfo").userName;
      }
    });

    provide("count", count);
    provide("list", list.value);
    provide("dialogFormVisible", dialogFormVisible);
    provide("loginStatus", loginStatus);
    provide("drawer", drawer);
    return {
      load,
      imageUrl,
      dialogFormVisible,
      handleAvatarSuccess,
      drawer,
      logout
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

.logout-btn {
  position: absolute;
  bottom: 0;
  right: 0;
}
</style>
