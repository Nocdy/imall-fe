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
        <el-button @click="dialogFormVisible = false"> 取消 </el-button>
        <el-button type="primary" @click="login"> 确认 </el-button>
      </span>
    </template>
  </el-dialog>
</template>

<script lang="ts">
import { defineComponent, inject, provide, reactive, toRefs } from "vue";
import UserLoginForm from "./UserLoginForm.vue"
import * as AccountRequest from "../modules/AccountRequest"

import { getUserlist } from '../modules/api'

export default defineComponent({
  components:{
    UserLoginForm
  },
  setup() {
    let dialogFormVisible = inject("dialogFormVisible");
    let LoginRequest=reactive<AccountRequest.LoginRequest>({
        loginAccount:'',
        password:'',
        role:'用户',
        rememberMe:false
    })
    function login(){
       getUserlist(LoginRequest).then((res) => {
         let obj:string=JSON.stringify(res.data.data)
         let jsonStr:any=JSON.parse(obj)
         let token:string=jsonStr.token
         localStorage.setItem('ACCESS_TOKEN',token)
         console.log(res)
       
    })


    }
    provide('LoginRequest',LoginRequest)
    return {
      dialogFormVisible,
      ...toRefs(LoginRequest),
      login
      
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
