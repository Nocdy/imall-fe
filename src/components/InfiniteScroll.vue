<template>
  <ul>
    <li v-for="i in count" :key="i" class="infinite-list-item">{{ i }}</li>
    
  </ul>
</template>


<script lang="ts">
import { defineComponent, inject } from "vue";

export default defineComponent({
  setup() {
    let count = inject<number>('count');
    return {
      count
    };
  },
});
</script>


<style>
.infinite-list {
  height:960px;
  padding: 0;
  margin: 0;
  list-style: none;
}
.infinite-list .infinite-list-item {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 50px;
  background: var(--el-color-primary-light-9);
  margin: 10px;
  color: var(--el-color-primary);
}
.infinite-list .infinite-list-item + .list-item {
  margin-top: 10px;
}
</style>
