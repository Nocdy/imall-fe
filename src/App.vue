<template>
  <div class="common-layout">
    <el-container>
      <el-header>
        <router-view name="menu" />
      </el-header>
      <el-main v-infinite-scroll="load">
        <router-view name="dialog" />
        <router-view name="registry" />
        <router-view>
          <router-view name="carousel" />
          <router-view name="scroll" />
          <router-view />
        </router-view>
        <el-drawer v-model="drawer" title="我的商城">
          <div>
            <el-link type="primary" @click="toShoppingList">我的购物车</el-link>
          </div>
          <div>
            <el-link type="primary" @click="toOrderList">我的订单</el-link>
          </div>
          <el-button @click="logout" class="logout-btn" type="danger" danger>
            <el-icon><switch-button /></el-icon>
            <span>注销账号</span>
          </el-button>
        </el-drawer>
        <el-backtop :right="100" :bottom="100" />
      </el-main>
    </el-container>
  </div>
</template>


<script lang="ts">
import { defineComponent, onMounted, provide, reactive, ref } from "vue";
import countTimeFun from "./modules/utils/CountDownTimeUtils";
import { getNewList, userLogout } from "./modules/apis/api";
import Goods from "./modules/entities/Goods";
import storage from "./modules/utils/LocalStorageUtils";
import { ElMessage, ElMessageBox } from "element-plus";
import { useRouter } from "vue-router";

export default defineComponent({
  setup() {
    const router = useRouter();
    const drawer = ref<boolean>(false);
    const loginStatus = ref<string>("未登录");
    const dialogFormVisible = ref<boolean>(false);
    const registryFormVisble = ref<boolean>(false);
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
    const click = () => {
      console.log("hello");
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

    const logout = () => {
      ElMessageBox.confirm("确认注销账号？", "Warning", {
        confirmButtonText: "确认",
        cancelButtonText: "取消",
        type: "warning",
      }).then(() => {
        localStorage.clear();
        drawer.value = false;
        loginStatus.value = "未登录";
        userLogout().then(() => {
          ElMessage({
            type: "success",
            message: "注销成功",
          });
        });
      });
    };

    const toOrderList = () => {
      let clientId = storage.get("ClientInfo").id;
      router.push({
        name: "showOrder",
        params: {
          cid: clientId,
        },
      });
    };

    const toShoppingList = () => {
      let clientId = storage.get("ClientInfo").id;
      router.push({
        name: "shoppingList",
        params: {
          cid: clientId,
        },
      });
    };

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
    provide("registryFormVisble", registryFormVisble);
    return {
      load,
      imageUrl,
      dialogFormVisible,
      handleAvatarSuccess,
      drawer,
      logout,
      click,
      toShoppingList,
      toOrderList,
    };
  },
});
</script>


<style scoped>
.el-header {
  background-color: #d3dce6;
  color: var(--el-text-color-primary);
  position: sticky;
}

.common-layout .el-main {
  background-color: #d3dce6;
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
