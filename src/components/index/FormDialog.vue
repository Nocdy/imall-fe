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
import { defineComponent, inject, provide, reactive, toRefs } from "vue";
import UserLoginForm from "./form/UserLoginForm.vue";

import { getCLientInfo, userLogin } from "../../modules/apis/api";
import storage from "../../modules/utils/LocalStorageUtils";
import LoginRequest from "@/modules/request/AccountRequest";

export default defineComponent({
  components: {
    UserLoginForm,
  },
  setup() {
    let dialogFormVisible: any = inject("dialogFormVisible");
    let LoginRequest = reactive<LoginRequest>({
      loginAccount: "",
      password: "",
      role: "client",
      rememberMe: false,
    });
    function closeDialog(): void {
      dialogFormVisible.value = false;
    }
    const login = (): void => {
      userLogin(LoginRequest).then((res) => {
        let obj: any = res.data.data;
        let token: string = obj.token;
        storage.set("ACCESS_TOKEN", token);
        getCLientInfo().then((res) => {
          console.log(res);
        });
      });
    };
    provide("LoginRequest", LoginRequest);
    return {
      dialogFormVisible,
      ...toRefs(LoginRequest),
      login,
      closeDialog,
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
