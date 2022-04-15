<template>
  <el-dialog
    v-model="dialogFormVisible"
    title="用户登录"
    :center="true"
    :show-close="false"
    :width="500"
  >
    <user-login-form />
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="closeDialog">取消 </el-button>
        <el-button type="primary" @click="login"> 确认 </el-button>
      </span>
    </template>
  </el-dialog>
</template>

<script lang="ts">
import { defineComponent, inject, provide, reactive } from "vue";
import UserLoginForm from "./form/UserLoginForm.vue";

import { userLogin, getCLientInfo, getUserId } from "../../modules/apis/api";
import storage from "../../modules/utils/LocalStorageUtils";
import LoginRequest from "@/modules/request/AccountRequest";
import { ElNotification } from "element-plus";
export default defineComponent({
  components: {
    UserLoginForm,
  },
  setup() {
    let dialogFormVisible: any = inject("dialogFormVisible");
    let loginStatus: any = inject("loginStatus");
    let LoginRequest = reactive<LoginRequest>({
      loginAccount: "",
      password: "",
      role: "",
      rememberMe: false,
    });
    function closeDialog(): void {
      dialogFormVisible.value = false;
    }
    const login = (): void => {
      if (LoginRequest.role == "客户") {
        LoginRequest.role = "client";
      }
      if (LoginRequest.role == "商家") {
        LoginRequest.role = "vendor";
      }
      userLogin(LoginRequest).then((res) => {
        if (res.data.code == 2002) {
          let obj: any = res.data.data;
          let token: string = obj.token;
          storage.set("ACCESS_TOKEN", token);
          storage.set("UserType", LoginRequest.role);
          dialogFormVisible.value = false;
          LoginRequest.loginAccount = "";
          LoginRequest.password = "";
          LoginRequest.role = "";
          LoginRequest.rememberMe = false;
          ElNotification({
            title: "登录成功",
            message: res.data.message,
            type: "success",
          });
          getCLientInfo().then((res) => {
            loginStatus.value = res.data.data.Client.userName;
            storage.set("ClientInfo", res.data.data.Client);
          });
          getUserId().then((res) => {
            let client = storage.get("ClientInfo");
            client.id = res.data.data.clientId;
            storage.set("ClientInfo", client);
          });
        } else if (res.data.code == 1004) {
          ElNotification({
            title: "登录失败",
            message: res.data.message,
            type: "error",
          });
        }
      });
    };

    provide("LoginRequest", LoginRequest);
    return {
      dialogFormVisible,
      login,
      closeDialog,
      loginStatus,
    };
  },
});
</script>


<style scoped>
.el-button--text {
  margin-right: 15px;
}
.el-select {
  width: 100px;
}
.el-input {
  width: 100px;
}
.dialog-footer button:first-child {
  margin-right: 10px;
}
</style>
