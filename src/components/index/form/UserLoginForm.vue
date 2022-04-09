<template>
  <div class="el-dialog-div">
    <el-form :label-position="top" label-width="100px" class="el-form">
      <el-form-item size="large">
        <el-input
          class="input-box"
          v-model="loginAccount"
          placeholder="用户名/手机号/邮箱"
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
        <div>
        <el-checkbox v-model="rememberMe" class="checkbox">
          <span>记住我</span>
        </el-checkbox>
        </div>
      </el-form-item>
      <el-form-item size="large">
        <el-select v-model="role" class="select-box" placeholder="登录类型">
          <el-option
            v-for="item in options"
            :key="item"
            :value="item"
          >
          </el-option>
        </el-select>
      </el-form-item>
    </el-form>
  </div>
</template>

<script lang="ts">
import { defineComponent, inject, ref, toRefs } from "vue";

export default defineComponent({
  setup() {
    let options = ref<string[]>(["客户", "商家"]);
    let LoginRequest = inject<any>("LoginRequest");
    return {
      options,
      ...toRefs(LoginRequest),
    };
  },
});
</script>

<style scoped>
.input-box {
  width: 250px;
}
.select-box {
  width: 150px;
}
.el-form {
  max-width: 600px;
  margin: auto;
}

.el-dialog-div {
  height: 30vh;
  overflow: auto;
}

.checkbox{
  margin-right: 70px;
}
</style>
