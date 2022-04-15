<template>
  <el-dialog
    v-model="registryFormVisble"
    title="用户注册"
    :center="true"
    :show-close="false"
    :width="500"
  >
    <div>
      <el-form :label-position="top" label-width="100px" class="el-form">
        <el-form-item size="large">
          <el-input
            class="input-box"
            v-model="nickName"
            placeholder="账户昵称（登录账号时使用）"
          ></el-input>
        </el-form-item>
        <el-form-item size="large">
          <el-input
            class="input-box"
            placeholder="密码"
            type="password"
            show-password
            v-model="password"
          ></el-input>
        </el-form-item>
        <el-form-item size="large">
          <el-input
            class="input-box"
            placeholder="手机号码"
            v-model="phone"
          ></el-input>
        </el-form-item>
        <el-form-item size="large">
          <el-input
            class="input-box"
            placeholder="用户姓名"
            v-model="name"
          ></el-input>
        </el-form-item>
        <el-form-item size="large">
          <el-select v-model="type" class="select-box" placeholder="用户类型">
            <el-option v-for="item in options" :key="item" :value="item">
            </el-option>
          </el-select>
        </el-form-item>
      </el-form>
    </div>

    <template #footer>
      <span class="dialog-footer">
        <el-button @click="closeDialog">取消 </el-button>
        <el-button type="primary" @click="toRegistry"> 确认 </el-button>
      </span>
    </template>
  </el-dialog>
</template>


<script lang="ts">
import { defineComponent, inject, reactive, toRefs, ref } from "vue";
import RegistryRequest from "@/modules/request/RegistryRequest";
import { userRegistry } from "@/modules/apis/api";
import { ElMessageBox } from "element-plus";

export default defineComponent({
  setup() {
    let request = reactive<RegistryRequest>({
      name: "",
      phone: "",
      password: "",
      nickName: "",
      type: "",
    });
    const closeDialog = () => {
      registryFormVisble.value = false;
    };
    const options = ref<string[]>(["客户", "商家"]);
    let registryFormVisble = inject<any>("registryFormVisble");
    let dialogFormVisible = inject<any>("dialogFormVisible");
    const toRegistry = () => {
      userRegistry(request).then((res) => {
        ElMessageBox.alert(
          res.data.message + ",点击确认以重新登录",
          "注册成功",
          {
            confirmButtonText: "确认",
            callback: () => {
              dialogFormVisible.value = true;
            },
          }
        );
      });
    };



    return {
      registryFormVisble,
      ...toRefs(request),
      options,
      toRegistry,
      closeDialog,
    };
  },
});
</script>


<style scoped>
</style>
